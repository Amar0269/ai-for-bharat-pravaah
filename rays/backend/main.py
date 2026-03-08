"""
Pravaah Backend — Forecastly
=============================
Flow
----
  Browser  →  FastAPI (EC2)  →  S3  →  Lambda  →  Bedrock  →  FastAPI  →  Browser

Why EC2 + S3 for videos?
  Lambda has a hard 6 MB invocation-payload limit.
  A 500 MB video file cannot be base64'd into a Lambda payload.
  Solution: EC2 (FastAPI) streams the file to S3 first, then Lambda reads
  it from S3 — no size limit on what Lambda can analyse.

Images  (≤ 50 MB)  : S3 put_object  → Lambda  → Bedrock (base64 inline)
Videos  (≤ 500 MB) : S3 multipart   → Lambda  → Bedrock (S3 URI)

Lambda contract
---------------
  Input  : { s3_bucket, s3_key, filename, content_type }
  Output : { tags, virality_rate, best_upload_times, is_misleading, misleading_rate }

Required env vars
-----------------
  AUTH_SECRET_KEY        — JWT signing key (no default; server refuses to start)
  AWS_REGION             — default: ap-south-1
  LAMBDA_FUNCTION_NAME   — default: pravaah-forecastly-bedrock
  S3_BUCKET              — default: pravaah-media
  FRONTEND_URL           — default: http://localhost:3000

Run locally (with real AWS creds in env / ~/.aws):
  AUTH_SECRET_KEY=any-dev-key uvicorn main:app --reload --port 8000
"""

import io
import json
import os
import uuid
from datetime import datetime, timezone
from typing import Dict, List, Optional

import boto3
from botocore.exceptions import BotoCoreError, ClientError
from fastapi import FastAPI, File, HTTPException, UploadFile, status
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

# ─────────────────────────────────────────────────────────────────────────────
# STARTUP CONFIG
# ─────────────────────────────────────────────────────────────────────────────

SECRET_KEY = os.getenv("AUTH_SECRET_KEY")
if not SECRET_KEY:
    raise ValueError(
        "AUTH_SECRET_KEY is not set. "
        "Export it before starting: AUTH_SECRET_KEY=<key> uvicorn main:app --reload"
    )

AWS_REGION       = os.getenv("AWS_REGION",           "ap-south-1")
LAMBDA_FUNC_NAME = os.getenv("LAMBDA_FUNCTION_NAME", "pravaah-forecastly-bedrock")
S3_BUCKET        = os.getenv("S3_BUCKET",            "pravaah-media")
FRONTEND_URL     = os.getenv("FRONTEND_URL",         "http://localhost:3000")

# File size limits
IMAGE_MAX_BYTES = 50  * 1024 * 1024   #  50 MB  — put_object (single request)
VIDEO_MAX_BYTES = 500 * 1024 * 1024   # 500 MB  — multipart upload (EC2 handles this)
S3_MULTIPART_THRESHOLD = 10 * 1024 * 1024  # switch to multipart above 10 MB

# Allowed content types
IMAGE_TYPES = {"image/jpeg", "image/png", "image/webp"}
VIDEO_TYPES = {"video/mp4", "video/quicktime", "video/webm"}
ALLOWED_TYPES = IMAGE_TYPES | VIDEO_TYPES

# ─────────────────────────────────────────────────────────────────────────────
# AWS CLIENTS  (created once at startup — EC2 instance role or env credentials)
# ─────────────────────────────────────────────────────────────────────────────

try:
    lambda_client = boto3.client("lambda", region_name=AWS_REGION)
    s3_client     = boto3.client("s3",     region_name=AWS_REGION)
except (BotoCoreError, Exception) as _aws_init_error:
    raise RuntimeError(
        f"Failed to initialise AWS clients: {_aws_init_error}\n"
        "Make sure AWS credentials are available (IAM role, env vars, or ~/.aws/credentials)."
    ) from _aws_init_error

# ─────────────────────────────────────────────────────────────────────────────
# APP + CORS
# ─────────────────────────────────────────────────────────────────────────────

app = FastAPI(title="Pravaah Backend — Forecastly")

app.add_middleware(
    CORSMiddleware,
    allow_origins=[FRONTEND_URL],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ─────────────────────────────────────────────────────────────────────────────
# PYDANTIC MODELS
# ─────────────────────────────────────────────────────────────────────────────

class ForecastlyAnalysis(BaseModel):
    tags:               List[str]
    virality_rate:      int          # 0–100
    best_upload_times:  List[str]
    is_misleading:      bool
    misleading_rate:    Optional[int]  # 0–100, or null


class ForecastlyUploadResponse(BaseModel):
    filename:    str
    s3_key:      str
    uploaded_at: str
    analysis:    ForecastlyAnalysis


# ─────────────────────────────────────────────────────────────────────────────
# S3 UPLOAD HELPERS
# ─────────────────────────────────────────────────────────────────────────────

def _s3_put(body: bytes, s3_key: str, content_type: str) -> None:
    """Single-request upload — used for images and small files (≤ 10 MB)."""
    try:
        s3_client.put_object(
            Bucket=S3_BUCKET,
            Key=s3_key,
            Body=body,
            ContentType=content_type,
        )
    except ClientError as exc:
        raise HTTPException(
            status_code=status.HTTP_502_BAD_GATEWAY,
            detail=f"S3 upload failed: {exc.response['Error']['Message']}",
        )
    except BotoCoreError as exc:
        raise HTTPException(
            status_code=status.HTTP_502_BAD_GATEWAY,
            detail=f"S3 upload error: {exc}",
        )


def _s3_multipart(body: bytes, s3_key: str, content_type: str) -> None:
    """
    Multipart upload — used for large videos on EC2.
    Splits the body into 10 MB parts so we never send one giant request.
    This is the key reason EC2 is needed: Lambda's 15-min timeout and
    6 MB payload limit make large-video handling impossible there.
    """
    PART_SIZE = 10 * 1024 * 1024  # 10 MB per part

    try:
        mpu = s3_client.create_multipart_upload(
            Bucket=S3_BUCKET,
            Key=s3_key,
            ContentType=content_type,
        )
        upload_id = mpu["UploadId"]
    except (ClientError, BotoCoreError) as exc:
        raise HTTPException(
            status_code=status.HTTP_502_BAD_GATEWAY,
            detail=f"S3 multipart init failed: {exc}",
        )

    parts = []
    stream = io.BytesIO(body)
    part_number = 1

    try:
        while True:
            chunk = stream.read(PART_SIZE)
            if not chunk:
                break
            resp = s3_client.upload_part(
                Bucket=S3_BUCKET,
                Key=s3_key,
                UploadId=upload_id,
                PartNumber=part_number,
                Body=chunk,
            )
            parts.append({"PartNumber": part_number, "ETag": resp["ETag"]})
            part_number += 1

        s3_client.complete_multipart_upload(
            Bucket=S3_BUCKET,
            Key=s3_key,
            UploadId=upload_id,
            MultipartUpload={"Parts": parts},
        )

    except (ClientError, BotoCoreError, Exception) as exc:
        # Always abort so orphaned parts don't accumulate (= extra S3 cost)
        try:
            s3_client.abort_multipart_upload(
                Bucket=S3_BUCKET, Key=s3_key, UploadId=upload_id
            )
        except Exception:
            pass
        raise HTTPException(
            status_code=status.HTTP_502_BAD_GATEWAY,
            detail=f"S3 multipart upload failed: {exc}",
        )


def _upload_to_s3(body: bytes, s3_key: str, content_type: str) -> None:
    """
    Route to the right upload strategy based on file size.
    Small files → single put_object (fast, simple).
    Large files → multipart  (EC2 handles chunking, avoids memory spikes).
    """
    if len(body) > S3_MULTIPART_THRESHOLD:
        _s3_multipart(body, s3_key, content_type)
    else:
        _s3_put(body, s3_key, content_type)


# ─────────────────────────────────────────────────────────────────────────────
# LAMBDA → BEDROCK INVOCATION
# ─────────────────────────────────────────────────────────────────────────────

def _invoke_bedrock_lambda(
    s3_key:       str,
    filename:     str,
    content_type: str,
) -> ForecastlyAnalysis:
    """
    Sends only metadata + S3 reference to Lambda.
    Lambda reads the file from S3 itself — no byte payload crosses the
    Lambda invocation limit regardless of file size.
    """

    payload = {
        "s3_bucket":    S3_BUCKET,
        "s3_key":       s3_key,
        "filename":     filename,
        "content_type": content_type,
    }

    # ── Invoke ────────────────────────────────────────────────────────────────
    try:
        response = lambda_client.invoke(
            FunctionName=LAMBDA_FUNC_NAME,
            InvocationType="RequestResponse",
            Payload=json.dumps(payload).encode("utf-8"),
        )
    except ClientError as exc:
        raise HTTPException(
            status_code=status.HTTP_502_BAD_GATEWAY,
            detail=f"Lambda invoke failed: {exc.response['Error']['Message']}",
        )
    except BotoCoreError as exc:
        raise HTTPException(
            status_code=status.HTTP_502_BAD_GATEWAY,
            detail=f"Lambda invoke error: {exc}",
        )

    # ── Lambda-side crash check ───────────────────────────────────────────────
    # boto3 returns HTTP 200 even when the Lambda handler itself threw.
    # The only way to detect this is the FunctionError key.
    if response.get("FunctionError"):
        raw = response["Payload"].read().decode("utf-8", errors="replace")
        raise HTTPException(
            status_code=status.HTTP_502_BAD_GATEWAY,
            detail=f"Lambda function error ({response['FunctionError']}): {raw[:400]}",
        )

    # ── Parse outer payload ───────────────────────────────────────────────────
    try:
        lambda_response = json.loads(response["Payload"].read())
    except json.JSONDecodeError as exc:
        raise HTTPException(
            status_code=status.HTTP_502_BAD_GATEWAY,
            detail=f"Lambda returned non-JSON payload: {exc}",
        )

    # Lambda may wrap the result in a "body" string key (API-Gateway style)
    body = lambda_response.get("body", lambda_response)
    if isinstance(body, str):
        try:
            body = json.loads(body)
        except json.JSONDecodeError as exc:
            raise HTTPException(
                status_code=status.HTTP_502_BAD_GATEWAY,
                detail=f"Lambda body is not valid JSON: {exc}",
            )

    # ── Validate & normalise ──────────────────────────────────────────────────

    # Clamp numeric rates to 0–100 so frontend progress bars never break
    virality_rate = max(0, min(100, int(body.get("virality_rate", 0))))

    raw_mr = body.get("misleading_rate")
    misleading_rate: Optional[int] = (
        max(0, min(100, int(raw_mr))) if raw_mr is not None else None
    )

    # Deduplicate tags (case-insensitive, order-preserving), cap at 10
    seen: Dict[str, bool] = {}
    clean_tags: List[str] = []
    for tag in body.get("tags", []):
        key = str(tag).lower().strip()
        if key and key not in seen:
            seen[key] = True
            clean_tags.append(str(tag).strip())
    tags = clean_tags[:10]

    best_upload_times = body.get("best_upload_times", [])
    if not isinstance(best_upload_times, list):
        best_upload_times = []

    return ForecastlyAnalysis(
        tags=tags,
        virality_rate=virality_rate,
        best_upload_times=best_upload_times,
        is_misleading=bool(body.get("is_misleading", False)),
        misleading_rate=misleading_rate,
    )


# ─────────────────────────────────────────────────────────────────────────────
# ROUTES
# ─────────────────────────────────────────────────────────────────────────────

@app.get("/")
def root() -> dict:
    return {"message": "Pravaah Forecastly backend running 🚀"}


@app.get("/health")
def health() -> dict:
    """Simple health check — used by EC2 load-balancer / monitoring."""
    return {"status": "ok", "region": AWS_REGION, "bucket": S3_BUCKET}


@app.post("/upload/forecastly", response_model=ForecastlyUploadResponse)
async def upload_forecastly(file: UploadFile = File(...)) -> ForecastlyUploadResponse:
    """
    Main Forecastly endpoint.

    1. Validate content-type and file size.
    2. Upload file to S3:
         images (≤ 10 MB)  → single put_object
         images (> 10 MB)  → multipart
         videos (any size) → multipart  (EC2 handles chunking)
    3. Invoke Lambda with { s3_bucket, s3_key, filename, content_type }.
       Lambda reads the file from S3 and calls Bedrock.
    4. Return analysis: tags, virality_rate, best_upload_times,
       is_misleading, misleading_rate.
    """

    # ── 1. Validate content-type ──────────────────────────────────────────────
    if not file.content_type or file.content_type not in ALLOWED_TYPES:
        raise HTTPException(
            status_code=status.HTTP_415_UNSUPPORTED_MEDIA_TYPE,
            detail=(
                f"Unsupported file type: '{file.content_type}'. "
                "Allowed: JPEG, PNG, WEBP (images) · MP4, MOV, WEBM (videos)."
            ),
        )

    is_video = file.content_type in VIDEO_TYPES

    # ── 2. Read file into memory ──────────────────────────────────────────────
    # EC2 has far more RAM than Lambda (typically 4–32 GB vs 128–10240 MB).
    # Reading up to 500 MB is safe here. Lambda would OOM at the same size.
    content = await file.read()
    file_size = len(content)

    max_bytes = VIDEO_MAX_BYTES if is_video else IMAGE_MAX_BYTES
    if file_size > max_bytes:
        limit_mb = max_bytes // (1024 * 1024)
        raise HTTPException(
            status_code=status.HTTP_413_REQUEST_ENTITY_TOO_LARGE,
            detail=(
                f"File is too large ({file_size / 1024 / 1024:.1f} MB). "
                f"Limit for {'videos' if is_video else 'images'} is {limit_mb} MB."
            ),
        )

    if file_size == 0:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Uploaded file is empty.",
        )

    # ── 3. Build S3 key ───────────────────────────────────────────────────────
    safe_filename = file.filename or "upload"
    # Sanitise filename: replace spaces + special chars that cause S3 URL issues
    safe_filename = "".join(
        c if c.isalnum() or c in "._-" else "_" for c in safe_filename
    )
    file_id = str(uuid.uuid4())
    s3_key  = f"uploads/{file_id}-{safe_filename}"

    # ── 4. Upload to S3 ───────────────────────────────────────────────────────
    # Videos and large images use multipart (EC2's advantage over Lambda).
    # Multipart aborts automatically on error — no orphaned parts.
    _upload_to_s3(content, s3_key, file.content_type)

    # ── 5. Lambda → Bedrock ───────────────────────────────────────────────────
    analysis = _invoke_bedrock_lambda(
        s3_key=s3_key,
        filename=safe_filename,
        content_type=file.content_type,
    )

    return ForecastlyUploadResponse(
        filename=safe_filename,
        s3_key=s3_key,
        uploaded_at=datetime.now(timezone.utc).isoformat(),
        analysis=analysis,
    )
