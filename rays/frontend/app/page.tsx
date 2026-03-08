"use client";
import { useEffect, useRef, useState } from "react";

/* ─── Icons ───────────────────────────────────────────────────────────── */
const ProjectsIcon = () => (
  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/>
  </svg>
);
const AnalyticsIcon = () => (
  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/>
  </svg>
);

const TeamIcon = () => (
  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
  </svg>
);
const HomeIcon = () => (
  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/>
  </svg>
);
const UploadIcon = () => (
  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/>
  </svg>
);
const BellIcon = () => (
  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/>
  </svg>
);
const SearchIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
  </svg>
);
const MenuIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/>
  </svg>
);
const SunIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/>
    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
    <line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/>
    <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
  </svg>
);
const MoonIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
  </svg>
);


/* ─── Data ────────────────────────────────────────────────────────────── */
const navItems = [
  { id: "home",      label: "Overview",    icon: <HomeIcon /> },
  { id: "upload",    label: "Upload",      icon: <UploadIcon /> },
  { id: "projects",  label: "My Projects", icon: <ProjectsIcon />, badge: 4 },
  { id: "analytics", label: "Analytics",   icon: <AnalyticsIcon /> },
  { id: "team",      label: "Team",        icon: <TeamIcon /> },
];

const recentProjects = [
  { title: "Summer Campaign Reels", platform: "Instagram", status: "Live",      statusColor: "#16a34a", date: "May 28", thumb: "🎬" },
  { title: "Product Launch Thread", platform: "Twitter/X", status: "Scheduled", statusColor: "#d97706", date: "Jun 2",  thumb: "📝" },
  { title: "Brand Story Series",    platform: "YouTube",   status: "Draft",     statusColor: "#7c3aed", date: "Jun 5",  thumb: "🎥" },
  { title: "Weekly Newsletter",     platform: "LinkedIn",  status: "Live",      statusColor: "#16a34a", date: "May 25", thumb: "📧" },
];

const statCards = [
  { label: "Total Posts",     value: "248",   delta: "+12%",  lightColor: "#7c3aed", darkColor: "#a78bfa" },
  { label: "Scheduled",       value: "17",    delta: "+3",    lightColor: "#d97706", darkColor: "#fbbf24" },
  { label: "Avg. Engagement", value: "6.4%",  delta: "+0.8%", lightColor: "#16a34a", darkColor: "#4ade80" },
  { label: "Reach This Week", value: "84.2K", delta: "+21%",  lightColor: "#db2777", darkColor: "#f472b6" },
];

/* ─── Theme tokens ───────────────────────────────────────────────────── */
function makeTheme(dark: boolean) {
  return dark ? {
    bg:           "#0c0c10",
    bgSurface:    "rgba(255,255,255,0.03)",
    bgHover:      "rgba(255,255,255,0.06)",
    border:       "rgba(255,255,255,0.08)",
    borderDash:   "rgba(255,255,255,0.15)",
    text:         "#f0eeff",
    textMid:      "rgba(255,255,255,0.55)",
    textSoft:     "rgba(255,255,255,0.3)",
    navBg:        "rgba(12,12,16,0.92)",
    sidebarBg:    "rgba(10,10,14,0.98)",
    heroBg:       "radial-gradient(ellipse at 70% 120%,#4c1d95 0%,#1e1b4b 50%,#0c0c10 100%)",
    accent:       "#7c3aed",
    accentText:   "#a78bfa",
    accentBg:     "rgba(124,58,237,0.18)",
    accentBtn:    "linear-gradient(135deg,#7c3aed,#c026d3)",
    logoGrad:     "linear-gradient(135deg,#a78bfa,#f472b6)",
    avatarGrad:   "linear-gradient(135deg,#7c3aed,#ec4899)",
    statCardFn:   (c: string) => ({ bg: `${c}1a`, color: c }),
    statusFn:     (c: string) => ({ bg: `${c}1c`, color: c }),
    platformDot:  (c: string) => `0 0 7px ${c}90`,
    inputBg:      "rgba(255,255,255,0.05)",
    inputBorder:  "rgba(255,255,255,0.09)",
    divider:      "rgba(255,255,255,0.06)",
    shadow:       "0 1px 3px rgba(0,0,0,0.4)",
  } : {
    bg:           "#f5f4ff",
    bgSurface:    "#ffffff",
    bgHover:      "#f0eeff",
    border:       "#e2e0f0",
    borderDash:   "#c4bfe8",
    text:         "#1a1730",
    textMid:      "#5a546e",
    textSoft:     "#9890b0",
    navBg:        "rgba(245,244,255,0.92)",
    sidebarBg:    "rgba(250,249,255,0.99)",
    heroBg:       "radial-gradient(ellipse at 70% 120%,#7c3aed 0%,#4338ca 50%,#312e81 100%)",
    accent:       "#7c3aed",
    accentText:   "#6d28d9",
    accentBg:     "rgba(124,58,237,0.10)",
    accentBtn:    "linear-gradient(135deg,#7c3aed,#c026d3)",
    logoGrad:     "linear-gradient(135deg,#7c3aed,#c026d3)",
    avatarGrad:   "linear-gradient(135deg,#7c3aed,#ec4899)",
    statCardFn:   (c: string) => ({ bg: `${c}12`, color: c }),
    statusFn:     (c: string) => ({ bg: `${c}14`, color: c }),
    platformDot:  (c: string) => `0 0 5px ${c}60`,
    inputBg:      "#ffffff",
    inputBorder:  "#ddd8f5",
    divider:      "#ece9f8",
    shadow:       "0 1px 4px rgba(100,80,200,0.08)",
  };
}

const API_BASE =process.env.NEXT_PUBLIC_BACKEND_URL || "http://43.204.22.89:8000";

/* ─── Types ───────────────────────────────────────────────────────────── */
type ForecastlyAnalysis = {
  tags: string[];
  virality_rate: number;
  best_upload_times: string[];
  is_misleading: boolean;
  misleading_rate: number | null;
};

// Matches ForecastlyUploadResponse on the backend exactly.
// Fields removed from new backend: content_type, size, source.
// New field added: s3_key.
type ForecastlyUploadResult = {
  filename: string;
  s3_key: string;
  uploaded_at: string;
  analysis: ForecastlyAnalysis;
};

type SnapsortItem = {
  filename: string;
  content_type?: string;
  contentType?: string;
  size?: number;
};

/* ─── Component ───────────────────────────────────────────────────────── */
export default function Home() {
  const [activeNav, setActiveNav]     = useState("home");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [dark, setDark]               = useState(false);   // light mode by default

  const [userName, setUserName] = useState("Aman");
  const userInitial = (userName?.trim()?.charAt(0) || "A").toUpperCase();
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [greeting, setGreeting] = useState("Welcome");

  const [uploadMode, setUploadMode] = useState<"none" | "snapsort" | "forecastly">("none");
  const [snapsortFiles, setSnapsortFiles] = useState<File[]>([]);
  const [snapsortPreviews, setSnapsortPreviews] = useState<string[]>([]);
  const [snapsortUploading, setSnapsortUploading] = useState(false);
  const [forecastFile, setForecastFile] = useState<File | null>(null);
  const [forecastPreview, setForecastPreview] = useState<string | null>(null);
  const [forecastUploading, setForecastUploading]     = useState(false);
  const [forecastUploadStage, setForecastUploadStage] = useState<string | null>(null);
  const [forecastUploadPct, setForecastUploadPct]     = useState(0);
  const [snapsortBackendItems, setSnapsortBackendItems] = useState<{ filename: string; contentType: string; size: number }[]>([]);
  const [forecastBackendItem, setForecastBackendItem] = useState<ForecastlyUploadResult | null>(null);
  const [forecastAnalysis, setForecastAnalysis] = useState<ForecastlyAnalysis | null>(null);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const snapsortInputRef = useRef<HTMLInputElement | null>(null);
  const forecastInputRef = useRef<HTMLInputElement | null>(null);
  const bottomCanvasRef = useRef<HTMLCanvasElement | null>(null);

  const [authMode, setAuthMode] = useState<"none" | "login" | "signup">("none");
  const [authName, setAuthName] = useState("");
  const [authEmail, setAuthEmail] = useState("");
  const [authPassword, setAuthPassword] = useState("");
  const [authLoading, setAuthLoading] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);
  const [authMessage, setAuthMessage] = useState<string | null>(null);

  const t  = makeTheme(dark);
  const SW = sidebarOpen ? 222 : 60;

  useEffect(() => {
    if (typeof window === "undefined") return;
    const stored = window.localStorage.getItem("pravaah_current_user");
    if (!stored) return;
    try {
      const parsed = JSON.parse(stored) as { name?: string; email?: string };
      if (parsed.name) setUserName(parsed.name);
      if (parsed.email) setUserEmail(parsed.email);
      setIsLoggedIn(true);
    } catch {
      // ignore corrupted data
    }
  }, []);

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour >= 5 && hour < 12) {
      setGreeting("Good morning");
    } else if (hour >= 12 && hour < 18) {
      setGreeting("Good afternoon");
    } else {
      setGreeting("Good evening");
    }
  }, []);

  useEffect(() => {
    if (activeNav !== "home") return;
    const canvas = bottomCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    let width = 0;
    let height = 0;
    let mouseX = 0;
    let mouseY = 0;
    let hasMouse = false;

    type Particle = { x: number; y: number; vx: number; vy: number; size: number; baseAlpha: number };
    const particles: Particle[] = [];

    const resize = () => {
      width = canvas.offsetWidth;
      height = canvas.offsetHeight;
      canvas.width = width * (window.devicePixelRatio || 1);
      canvas.height = height * (window.devicePixelRatio || 1);
      ctx.setTransform(window.devicePixelRatio || 1, 0, 0, window.devicePixelRatio || 1, 0, 0);

      particles.length = 0;
      const count = Math.floor(width / 4);
      for (let i = 0; i < count; i++) {
        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.4,
          vy: (Math.random() - 0.5) * 0.4,
          size: Math.random() * 2 + 1,
          baseAlpha: Math.random() * 0.35 + 0.1,
        });
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseX = e.clientX - rect.left;
      mouseY = e.clientY - rect.top;
      hasMouse = mouseX >= 0 && mouseY >= 0 && mouseX <= width && mouseY <= height;
    };

    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;

        let alpha = p.baseAlpha;
        if (hasMouse) {
          const dx = p.x - mouseX;
          const dy = p.y - mouseY;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const influence = Math.max(0, 1 - dist / 140);
          alpha += influence * 0.5;

          if (influence > 0.3) {
            p.x += (dx / dist || 0) * -0.4;
            p.y += (dy / dist || 0) * -0.4;
          }
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = dark
          ? `rgba(129,140,248,${alpha})`
          : `rgba(79,70,229,${alpha})`;
        ctx.fill();
      }

      if (hasMouse) {
        const gradient = ctx.createRadialGradient(mouseX, mouseY, 0, mouseX, mouseY, 120);
        gradient.addColorStop(0, dark ? "rgba(56,189,248,0.5)" : "rgba(59,130,246,0.4)");
        gradient.addColorStop(1, "rgba(15,23,42,0)");
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(mouseX, mouseY, 120, 0, Math.PI * 2);
        ctx.fill();
      }

      animationId = requestAnimationFrame(animate);
    };

    resize();
    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", handleMouseMove);
    animate();

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animationId);
    };
  }, [dark, activeNav]);

  const handleAuthSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!authEmail || !authPassword || (authMode === "signup" && !authName.trim())) {
      setAuthError(
        authMode === "signup"
          ? "Please fill in name, email and password."
          : "Please fill in both email and password."
      );
      return;
    }
    setAuthLoading(true);
    setAuthError(null);
    setAuthMessage(null);
    try {
      if (typeof window === "undefined") {
        setAuthError("Local auth is not available in this environment.");
        return;
      }
      const raw = window.localStorage.getItem("pravaah_users");
      let users: { name: string; email: string; password: string }[] = [];
      if (raw) {
        try {
          users = JSON.parse(raw);
        } catch {
          users = [];
        }
      }

      const normalizedEmail = authEmail.trim().toLowerCase();

      if (authMode === "signup") {
        if (users.some(u => u.email === normalizedEmail)) {
          setAuthError("An account with this email already exists.");
          return;
        }
        const newUser = {
          name: authName.trim(),
          email: normalizedEmail,
          password: authPassword,
        };
        users.push(newUser);
        window.localStorage.setItem("pravaah_users", JSON.stringify(users));
        window.localStorage.setItem(
          "pravaah_current_user",
          JSON.stringify({ name: newUser.name, email: newUser.email }),
        );
        setUserName(newUser.name);
        setUserEmail(newUser.email);
        setIsLoggedIn(true);
        setAuthMessage("Account created successfully.");
      } else {
        const user = users.find(u => u.email === normalizedEmail);
        if (!user || user.password !== authPassword) {
          setAuthError("Invalid email or password.");
          return;
        }
        window.localStorage.setItem(
          "pravaah_current_user",
          JSON.stringify({ name: user.name, email: user.email }),
        );
        setUserName(user.name);
        setUserEmail(user.email);
        setIsLoggedIn(true);
        setAuthMessage("Logged in successfully.");
      }

      setTimeout(() => {
        setAuthMode("none");
        setAuthMessage(null);
        setAuthError(null);
      }, 600);
    } catch (err) {
      setAuthError("Something went wrong locally. Please try again.");
    } finally {
      setAuthLoading(false);
    }
  };

  /* ─── Upload handlers (decoupled from file selection) ─────────────── */
  const handleSnapsortUpload = async () => {
    if (!snapsortFiles.length) return;
    setSnapsortUploading(true);
    setUploadError(null);
    try {
      const formData = new FormData();
      snapsortFiles.forEach(f => formData.append("files", f));
      const res = await fetch(`${API_BASE}/upload/snapsort`, {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      if (!res.ok) {
        setUploadError(data?.detail || "Could not send files to backend.");
        return;
      }
      if (Array.isArray(data.items)) {
        setSnapsortBackendItems(
          data.items.map((it: SnapsortItem) => ({
            filename: it.filename,
            contentType: (it.content_type || it.contentType || ""),
            size: Number(it.size || 0),
          })),
        );
      }
    } catch {
      setUploadError("Could not send files to backend.");
    } finally {
      setSnapsortUploading(false);
    }
  };

  const handleForecastlyUpload = () => {
    if (!forecastFile) return;

    // ── client-side size guard ────────────────────────────────────────────
    const IS_VIDEO    = forecastFile.type.startsWith("video/");
    const MAX_BYTES   = IS_VIDEO ? 500 * 1024 * 1024 : 50 * 1024 * 1024;
    if (forecastFile.size > MAX_BYTES) {
      setUploadError(
        `File too large (${(forecastFile.size / 1024 / 1024).toFixed(0)} MB). `
        + `Limit is ${IS_VIDEO ? "500 MB for videos" : "50 MB for images"}.`
      );
      return;
    }

    setForecastUploading(true);
    setForecastUploadStage("Uploading to S3…");
    setForecastUploadPct(0);
    setUploadError(null);
    setForecastBackendItem(null);
    setForecastAnalysis(null);

    const formData = new FormData();
    formData.append("file", forecastFile);

    // ── XHR gives us progress events — fetch() does not ──────────────────
    const xhr = new XMLHttpRequest();

    xhr.upload.onprogress = (e) => {
      if (!e.lengthComputable) return;
      const pct = Math.round((e.loaded / e.total) * 100);
      setForecastUploadPct(pct);
      if (pct >= 100) setForecastUploadStage("Invoking Bedrock…");
    };

    xhr.onload = () => {
      setForecastUploading(false);
      setForecastUploadStage(null);
      setForecastUploadPct(0);

      let data: Record<string, unknown>;
      try {
        data = JSON.parse(xhr.responseText);
      } catch {
        setUploadError("Server returned an unreadable response.");
        return;
      }

      if (xhr.status >= 400) {
        setUploadError(
          (data?.detail as string) || `Upload failed (HTTP ${xhr.status}).`
        );
        return;
      }

      if (!data.analysis) {
        setUploadError("Upload succeeded but no analysis was returned.");
        return;
      }

      const analysis = data.analysis as Record<string, unknown>;
      const result: ForecastlyUploadResult = {
        filename:    (data.filename    as string) ?? "upload",
        s3_key:      (data.s3_key      as string) ?? "",
        uploaded_at: (data.uploaded_at as string) ?? "",
        analysis: {
          tags:              Array.isArray(analysis.tags)              ? (analysis.tags as string[])              : [],
          virality_rate:     Number(analysis.virality_rate             ?? 0),
          best_upload_times: Array.isArray(analysis.best_upload_times) ? (analysis.best_upload_times as string[]) : [],
          is_misleading:     Boolean(analysis.is_misleading),
          misleading_rate:   (analysis.misleading_rate as number | null) ?? null,
        },
      };
      setForecastBackendItem(result);
      setForecastAnalysis(result.analysis);
    };

    xhr.onerror = () => {
      setForecastUploading(false);
      setForecastUploadStage(null);
      setForecastUploadPct(0);
      setUploadError("Could not reach backend. Check that the server is running.");
    };

    xhr.ontimeout = () => {
      setForecastUploading(false);
      setForecastUploadStage(null);
      setForecastUploadPct(0);
      setUploadError("Request timed out. Try a smaller file or check your connection.");
    };

    // 10-minute timeout — large video + Bedrock analysis can take time
    xhr.timeout = 10 * 60 * 1000;
    xhr.open("POST", `${API_BASE}/upload/forecastly`);
    xhr.send(formData);
  };

  /* helpers */
  const btn = (style: React.CSSProperties, hoverStyle: React.CSSProperties) => ({
    onMouseEnter: (e: React.MouseEvent<HTMLButtonElement>) => Object.assign(e.currentTarget.style, hoverStyle),
    onMouseLeave: (e: React.MouseEvent<HTMLButtonElement>) => Object.assign(e.currentTarget.style, style),
  });

  return (
    <div style={{ fontFamily: "'DM Sans','Segoe UI',sans-serif", background: t.bg, color: t.text, minHeight: "100vh", transition: "background .3s,color .3s" }}>

      {/* ── NAVBAR ────────────────────────────────────────────────── */}
      <header style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 50,
        height: 56, display: "flex", alignItems: "center", padding: "0 18px",
        background: t.navBg, backdropFilter: "blur(18px)",
        borderBottom: `1px solid ${t.border}`,
        transition: "background .3s, border-color .3s",
        boxShadow: t.shadow,
      }}>
        {/* Logo */}
        <div style={{
          width: SW,
          display: "flex",
          alignItems: "center",
          gap: 10,
          flexShrink: 0,
          transition: "width .3s",
        }}>
          <button onClick={() => setSidebarOpen(v => !v)} style={{
            background: "none", border: "none", cursor: "pointer", color: t.textMid,
            padding: 6, borderRadius: 8, display: "flex", alignItems: "center",
          }}
            {...btn({ color: t.textMid }, { color: t.text, background: t.bgHover })}
          ><MenuIcon /></button>
          {sidebarOpen && (
            <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
              <span style={{
                fontWeight: 800,
                fontSize: 16,
                letterSpacing: "-0.03em",
                background: t.logoGrad,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}>
                Pravaah
              </span>
              <span style={{
                fontSize: 10,
                textTransform: "uppercase",
                letterSpacing: "0.18em",
                color: t.textSoft,
              }}>
                AI content studio
              </span>
            </div>
          )}
        </div>

        {/* Right */}
        <div style={{ display: "flex", alignItems: "center", gap: 5, marginLeft: "auto" }}>
          {["Products","Pricing","Docs"].map(l => (
            <a key={l} style={{
              fontSize: 12, color: t.textMid, padding: "5px 10px", borderRadius: 7,
              cursor: "pointer", textDecoration: "none", transition: "color .15s",
            }}
              onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.color = t.text; (e.currentTarget as HTMLAnchorElement).style.background = t.bgHover; }}
              onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.color = t.textMid; (e.currentTarget as HTMLAnchorElement).style.background = "none"; }}
            >{l}</a>
          ))}

          {!isLoggedIn && (
            <>
              <button
                onClick={() => {
                  setAuthMode("login");
                  setAuthName("");
                  setAuthEmail("");
                  setAuthPassword("");
                  setAuthError(null);
                  setAuthMessage(null);
                }}
                style={{
                  fontSize: 12, fontWeight: 600, color: t.textMid,
                  background: "none", border: `1px solid ${t.border}`, borderRadius: 8,
                  padding: "5px 13px", cursor: "pointer", transition: "all .15s",
                }}
                {...btn({ color: t.textMid, background: "none" }, { color: t.text, background: t.bgHover })}
              >
                Log in
              </button>

              <button
                onClick={() => {
                  setAuthMode("signup");
                  setAuthName("");
                  setAuthEmail("");
                  setAuthPassword("");
                  setAuthError(null);
                  setAuthMessage(null);
                }}
                style={{
                  fontSize: 12, fontWeight: 700, color: "#fff",
                  background: t.accentBtn, border: "none", borderRadius: 8,
                  padding: "5px 13px", cursor: "pointer",
                  boxShadow: "0 2px 14px rgba(124,58,237,0.35)",
                }}
              >
                Sign up
              </button>
            </>
          )}

          {/* Bell */}
          <button style={{
            position: "relative", background: "none", border: "none", cursor: "pointer",
            color: t.textMid, padding: 7, borderRadius: 8, display: "flex",
          }}
            {...btn({ color: t.textMid, background: "none" }, { color: t.text, background: t.bgHover })}
          >
            <BellIcon />
            <span style={{ position: "absolute", top: 6, right: 6, width: 7, height: 7, borderRadius: "50%", background: "#f472b6", border: `1.5px solid ${t.bg}` }}/>
          </button>

          {/* User */}
          {isLoggedIn && (
            <div style={{ display: "flex", alignItems: "center", gap: 7, marginLeft: 4 }}>
              <div style={{ position: "relative", cursor: "pointer" }}>
                <div style={{
                  width: 33, height: 33, borderRadius: "50%",
                  background: t.avatarGrad,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontWeight: 700, fontSize: 13, color: "#fff",
                  boxShadow: "0 0 0 2px rgba(124,58,237,0.35)",
                }}>{userInitial}</div>
                <span style={{ position: "absolute", bottom: 1, right: 1, width: 9, height: 9, borderRadius: "50%", background: "#22c55e", border: `2px solid ${t.bg}` }}/>
              </div>
              <div>
                <p style={{ margin: 0, fontSize: 12, fontWeight: 700, color: t.text, lineHeight: 1 }}>{userName}</p>
                <button
                  onClick={() => {
                    setIsLoggedIn(false);
                    setUserEmail(null);
                    setUserName("Aman");
                    if (typeof window !== "undefined") {
                      window.localStorage.removeItem("pravaah_current_user");
                    }
                  }}
                  style={{
                    marginTop: 2,
                    fontSize: 10,
                    color: t.textSoft,
                    background: "none",
                    border: "none",
                    padding: 0,
                    cursor: "pointer",
                    textDecoration: "underline",
                  }}
                >
                  Log out
                </button>
              </div>
            </div>
          )}
        </div>
      </header>

      <div style={{ display: "flex", paddingTop: 56, minHeight: "100vh" }}>

        {/* ── SIDEBAR ───────────────────────────────────────────────── */}
        <aside style={{
          position: "fixed", left: 0, top: 56, bottom: 0, zIndex: 40,
          width: SW, transition: "width .3s, background .3s, border-color .3s",
          background: t.sidebarBg, backdropFilter: "blur(12px)",
          borderRight: `1px solid ${t.border}`,
          display: "flex", flexDirection: "column", overflow: "hidden",
        }}>
          <div style={{ flex: 1, overflowY: "auto", padding: "10px 8px 4px" }}>
            {sidebarOpen && (
              <p style={{ fontSize: 9, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.12em", color: t.textSoft, padding: "0 8px 6px" }}>
                Workspace
              </p>
            )}
            {navItems.map(item => {
              const active = activeNav === item.id;
              const itemStyle: React.CSSProperties = {
                width: "100%", display: "flex", alignItems: "center",
                gap: 10, padding: "8px 10px",
                justifyContent: sidebarOpen ? "flex-start" : "center",
                background: active ? t.accentBg : "none",
                border: "none", borderRadius: 10, cursor: "pointer",
                color: active ? t.accentText : t.textMid,
                fontWeight: active ? 600 : 400, fontSize: 13,
                marginBottom: 2, transition: "all .15s", position: "relative",
              };
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveNav(item.id);
                    if (item.id === "upload") {
                      setUploadMode("none");
                      setSnapsortFiles([]);
                      setSnapsortPreviews([]);
                      setForecastFile(null);
                      setForecastPreview(null);
                      setForecastAnalysis(null);
                    }
                  }}
                  style={itemStyle}
                  onMouseEnter={e => { if (!active) e.currentTarget.style.background = t.bgHover; }}
                  onMouseLeave={e => { if (!active) e.currentTarget.style.background = "none"; }}
                >
                  {active && <span style={{ position: "absolute", left: 0, top: "50%", transform: "translateY(-50%)", width: 3, height: 16, background: t.accent, borderRadius: "0 3px 3px 0" }}/>}
                  <span style={{ color: active ? t.accentText : t.textSoft, flexShrink: 0 }}>{item.icon}</span>
                  {sidebarOpen && (
                    <>
                      <span style={{ flex: 1, textAlign: "left" }}>{item.label}</span>
                      {item.badge && (
                        <span style={{ fontSize: 10, fontWeight: 700, padding: "2px 7px", borderRadius: 99, background: t.accentBg, color: t.accentText }}>
                          {item.badge}
                        </span>
                      )}
                    </>
                  )}
                </button>
              );
            })}

            {/* Appearance toggle */}
            <div style={{ margin: "12px 0 4px", borderTop: `1px solid ${t.divider}`, paddingTop: 10 }}>
              {sidebarOpen && (
                <p style={{ fontSize: 9, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.12em", color: t.textSoft, padding: "0 8px 6px" }}>
                  Appearance
                </p>
              )}
              <div style={{ padding: sidebarOpen ? "4px 4px" : "4px 0", display: "flex", justifyContent: sidebarOpen ? "flex-start" : "center" }}>
                {sidebarOpen ? (
                  /* Pill toggle when sidebar is open */
                  <div style={{
                    display: "flex", alignItems: "center", gap: 0,
                    background: t.bgHover, border: `1px solid ${t.border}`,
                    borderRadius: 10, padding: 3, width: "100%",
                  }}>
                    {[
                      { label: "Light", icon: <SunIcon />, value: false },
                      { label: "Dark",  icon: <MoonIcon />, value: true  },
                    ].map(opt => (
                      <button key={opt.label} onClick={() => setDark(opt.value)} style={{
                        flex: 1, display: "flex", alignItems: "center", justifyContent: "center", gap: 6,
                        padding: "7px 0", borderRadius: 7, border: "none", cursor: "pointer",
                        fontSize: 12, fontWeight: dark === opt.value ? 700 : 500,
                        background: dark === opt.value ? (dark ? "#1e1b2e" : "#fff") : "none",
                        color: dark === opt.value ? t.accentText : t.textSoft,
                        boxShadow: dark === opt.value ? t.shadow : "none",
                        transition: "all .2s",
                      }}>
                        {opt.icon}<span>{opt.label}</span>
                      </button>
                    ))}
                  </div>
                ) : (
                  /* Icon-only toggle when collapsed */
                  <button onClick={() => setDark(v => !v)} style={{
                    background: t.accentBg, border: `1px solid ${t.border}`,
                    borderRadius: 10, padding: 9, cursor: "pointer",
                    color: t.accentText, display: "flex", alignItems: "center",
                    transition: "all .2s",
                  }}>
                    {dark ? <SunIcon /> : <MoonIcon />}
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* User card */}
          {sidebarOpen && (
            <div style={{ padding: 10, borderTop: `1px solid ${t.divider}` }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px", borderRadius: 12, background: t.bgHover }}>
                <div style={{
                  width: 30, height: 30, borderRadius: "50%", flexShrink: 0,
                  background: t.avatarGrad,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontWeight: 700, fontSize: 12, color: "#fff",
                }}>{userInitial}</div>
                <div style={{ minWidth: 0 }}>
                  <p style={{ margin: 0, fontSize: 12, fontWeight: 700, color: t.text }}>{userName}</p>
                  <p style={{ margin: "2px 0 0", fontSize: 10, color: t.textSoft }}>{userEmail || "Not logged in"}</p>
                </div>
              </div>
            </div>
          )}
        </aside>

        {/* ── MAIN CONTENT ──────────────────────────────────────────── */}
        <main style={{ flex: 1, marginLeft: SW, transition: "margin-left .3s", minHeight: "100vh" }}>

          {/* Hero (static background, no animation) */}
          <div style={{ position: "relative", height: 176, overflow: "hidden", background: t.heroBg }}>
            <div style={{ position: "relative", padding: "30px 30px 0" }}>
              {isLoggedIn ? (
                <>
                  <p style={{ color: "rgba(255,255,255,0.5)", fontSize: 12, margin: "0 0 5px" }}>{greeting} ✦</p>
                  <h1 style={{ margin: 0, fontSize: 24, fontWeight: 800, letterSpacing: "-0.03em", color: "#fff" }}>
                    Welcome back, <span style={{ color: "#c4b5fd" }}>{userName}</span>
                  </h1>
                  <p style={{ margin: "5px 0 0", color: "rgba(255,255,255,0.5)", fontSize: 13 }}>
                    You have 2 drafts and 3 posts scheduled this week.
                  </p>
                </>
              ) : (
                <>
                  <p style={{ color: "rgba(255,255,255,0.6)", fontSize: 12, margin: "0 0 5px" }}>Pravaah dashboard</p>
                  <h1 style={{ margin: 0, fontSize: 24, fontWeight: 800, letterSpacing: "-0.03em", color: "#fff" }}>
                    Please log in to use
                  </h1>
                  <p style={{ margin: "5px 0 0", color: "rgba(255,255,255,0.6)", fontSize: 13 }}>
                    Log in or sign up from the top right to start managing your content.
                  </p>
                </>
              )}
            </div>
          </div>

          <div style={{ padding: "24px 26px", display: "flex", flexDirection: "column", gap: 22 }}>

            {activeNav === "team" ? (
              <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
                <div
                  style={{
                    borderRadius: 20,
                    padding: "20px 22px",
                    background:
                      dark
                        ? "radial-gradient(circle at top left, rgba(124,58,237,0.35), rgba(15,23,42,0.9))"
                        : "radial-gradient(circle at top left, rgba(129,140,248,0.28), #ffffff)",
                    border: `1px solid ${t.border}`,
                    boxShadow: t.shadow,
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    gap: 16,
                  }}
                >
                  <div>
                    <p style={{ margin: 0, fontSize: 11, letterSpacing: "0.14em", textTransform: "uppercase", color: t.textSoft }}>
                      Core team
                    </p>
                    <h2
                      style={{
                        margin: "6px 0 4px",
                        fontSize: 20,
                        fontWeight: 800,
                        letterSpacing: "-0.03em",
                        color: t.text,
                      }}
                    >
                      People building Pravaah
                    </h2>
                    <p style={{ margin: 0, fontSize: 12, color: t.textMid, maxWidth: 420 }}>
                      A small, focused team shipping fast. Reach out to any of us for product, design or engineering questions.
                    </p>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "flex-end",
                      gap: 6,
                      fontSize: 11,
                      color: t.textSoft,
                    }}
                  >
                    <span>4 team members</span>
                    <span
                      style={{
                        padding: "4px 9px",
                        borderRadius: 999,
                        border: `1px solid ${t.border}`,
                        background: dark ? "rgba(15,23,42,0.8)" : "#f5f3ff",
                      }}
                    >
                      Team view
                    </span>
                  </div>
                </div>

                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit,minmax(210px,1fr))",
                    gap: 16,
                  }}
                >
                  {[
                    { name: "Rishav Paul",        initials: "RP", accent: "#ec4899" },
                    { name: "Amar Kumar Rajak",   initials: "AK", accent: "#22c55e" },
                    { name: "Shubham Rajwar",      initials: "SR", accent: "#38bdf8" },
                    { name: "Kurmana Yashwanth",  initials: "KY", accent: "#f97316" },
                  ].map(member => (
                    <div
                      key={member.name}
                      style={{
                        borderRadius: 18,
                        padding: "14px 15px",
                        background: t.bgSurface,
                        border: `1px solid ${t.border}`,
                        boxShadow: t.shadow,
                        display: "flex",
                        alignItems: "center",
                        gap: 12,
                        transition: "transform .15s ease, box-shadow .15s ease, border-color .15s ease",
                      }}
                      onMouseEnter={e => {
                        e.currentTarget.style.transform = "translateY(-2px)";
                        e.currentTarget.style.boxShadow = "0 12px 25px rgba(15,23,42,0.26)";
                        e.currentTarget.style.borderColor = t.accent;
                      }}
                      onMouseLeave={e => {
                        e.currentTarget.style.transform = "none";
                        e.currentTarget.style.boxShadow = t.shadow;
                        e.currentTarget.style.borderColor = t.border;
                      }}
                    >
                      <div
                        style={{
                          width: 40,
                          height: 40,
                          borderRadius: "50%",
                          background: `radial-gradient(circle at 30% 0%, ${member.accent}, ${dark ? "#020617" : "#eef2ff"})`,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontWeight: 700,
                          fontSize: 14,
                          color: "#f9fafb",
                          flexShrink: 0,
                        }}
                      >
                        {member.initials}
                      </div>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <p
                          style={{
                            margin: 0,
                            fontSize: 13,
                            fontWeight: 700,
                            color: t.text,
                            whiteSpace: "nowrap",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                          }}
                        >
                          {member.name}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : activeNav === "home" ? (
              <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
                <div
                  style={{
                    borderRadius: 22,
                    padding: "22px 24px 20px",
                    background:
                      dark
                        ? "radial-gradient(circle at top right, rgba(56,189,248,0.16), rgba(15,23,42,0.98))"
                        : "radial-gradient(circle at top right, rgba(56,189,248,0.20), #ffffff)",
                    border: `1px solid ${dark ? "rgba(56,189,248,0.35)" : "#bfdbfe"}`,
                    boxShadow: dark
                      ? "0 18px 45px rgba(15,23,42,0.7)"
                      : "0 18px 40px rgba(148,163,184,0.35)",
                    display: "grid",
                    gridTemplateColumns: "minmax(0,1.4fr) minmax(0,1fr)",
                    gap: 18,
                  }}
                >
                  <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                    <p style={{ margin: 0, fontSize: 11, textTransform: "uppercase", letterSpacing: "0.16em", color: t.textSoft }}>
                      What is Pravaah AI?
                    </p>
                    <h2 style={{ margin: 0, fontSize: 22, fontWeight: 800, letterSpacing: "-0.04em", color: t.text }}>
                      Your creative flow, automated.
                    </h2>
                    <p style={{ margin: 0, fontSize: 13, color: t.textMid, maxWidth: 560, lineHeight: 1.7 }}>
                      Pravaah AI helps content teams go from raw ideas to ready‑to‑ship social posts. It analyzes your
                      photos and videos, predicts how your audience will respond, and suggests when and where to publish.
                    </p>
                  </div>
                  <div
                    style={{
                      alignSelf: "stretch",
                      borderRadius: 16,
                      padding: "10px 12px",
                      border: `1px dashed ${dark ? "rgba(148,163,184,0.6)" : "#c7d2fe"}`,
                      background: dark ? "rgba(15,23,42,0.86)" : "#eff6ff",
                      display: "flex",
                      flexDirection: "column",
                      gap: 6,
                      fontSize: 11,
                      color: t.textMid,
                    }}
                  >
                    <span style={{ fontWeight: 600, color: t.text }}>Why teams use Pravaah:</span>
                    <span>• Keep all creatives and experiments in one workspace.</span>
                    <span>• Forecast engagement before spending budget.</span>
                    <span>• Standardize your brand voice across every platform.</span>
                  </div>
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))", gap: 14 }}>
                  {[
                    { title: "SnapSort", text: "Drag in multiple photos and quickly sort, compare and pick the strongest creatives for your next campaign." },
                    { title: "Forecastly", text: "Upload a single post and get a prediction of engagement, potential risks and how well it fits your content strategy." },
                    { title: "Multi‑platform ready", text: "Design once and adapt your content for Instagram, X, LinkedIn or YouTube without leaving the dashboard." },
                  ].map(card => (
                    <div key={card.title} style={{ borderRadius: 18, padding: "14px 16px", background: t.bgSurface, border: `1px solid ${t.border}`, boxShadow: t.shadow }}>
                      <h3 style={{ margin: "0 0 6px", fontSize: 14, fontWeight: 700, color: t.text }}>{card.title}</h3>
                      <p style={{ margin: 0, fontSize: 12, color: t.textMid, lineHeight: 1.5 }}>{card.text}</p>
                    </div>
                  ))}
                </div>

                <div style={{ marginTop: 10, borderRadius: 18, padding: "14px 16px", border: `1px dashed ${t.borderDash}`, background: dark ? "rgba(15,23,42,0.9)" : "#f9fafb" }}>
                  <p style={{ margin: 0, fontSize: 11, letterSpacing: "0.14em", textTransform: "uppercase", color: t.textSoft }}>
                    How it fits in your workflow
                  </p>
                  <div style={{ marginTop: 8, display: "flex", flexWrap: "wrap", gap: 10, fontSize: 11 }}>
                    {["Plan", "Upload", "Forecast", "Publish"].map((step, index) => (
                      <div key={step} style={{ display: "flex", alignItems: "center", gap: 6, padding: "6px 10px", borderRadius: 999, border: `1px solid ${t.border}`, background: t.bgSurface, cursor: "default" }}>
                        <span style={{ width: 18, height: 18, borderRadius: "999px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10, fontWeight: 700, background: t.accentBg, color: t.accentText }}>
                          {index + 1}
                        </span>
                        <span style={{ color: t.text }}>{step}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Particle canvas */}
                <div style={{ position: "relative", borderRadius: 18, overflow: "hidden", border: `1px solid ${t.border}`, background: dark ? "rgba(15,23,42,0.95)" : "#f0f9ff", height: 140 }}>
                  <canvas ref={bottomCanvasRef} style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }} />
                  <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", pointerEvents: "none" }}>
                    <p style={{ margin: 0, fontSize: 11, letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(248,250,252,0.75)" }}>
                      Move your cursor to wake the flow
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              <>
                {/* ── Analytics ───────────────────────────────────────── */}
                {activeNav === "analytics" && (
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(170px,1fr))", gap: 14 }}>
                    {statCards.map(s => {
                      const c = dark ? s.darkColor : s.lightColor;
                      const sc = t.statCardFn(c);
                      return (
                        <div key={s.label} style={{ borderRadius: 16, padding: "18px 20px", background: t.bgSurface, border: `1px solid ${t.border}`, boxShadow: t.shadow, transition: "background .3s, border-color .3s" }}>
                          <p style={{ margin: "0 0 5px", fontSize: 11, color: t.textMid }}>{s.label}</p>
                          <p style={{ margin: "0 0 8px", fontSize: 28, fontWeight: 800, letterSpacing: "-0.03em", color: t.text }}>{s.value}</p>
                          <span style={{ fontSize: 11, fontWeight: 600, padding: "3px 9px", borderRadius: 99, background: sc.bg, color: sc.color }}>
                            {s.delta} this week
                          </span>
                        </div>
                      );
                    })}
                  </div>
                )}

                {/* ── Upload ──────────────────────────────────────────── */}
                {activeNav === "upload" && (
                  <>
                    {/* ── SnapSort section ───────────────────────────────── */}
                    <div style={{ borderRadius: 18, border: `1px solid ${t.border}`, background: t.bgSurface, padding: "18px 20px", boxShadow: t.shadow, transition: "background .3s, border-color .3s" }}>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
                        <div>
                          <h2 style={{ margin: 0, fontSize: 14, fontWeight: 700, color: t.text }}>SnapSort</h2>
                          <p style={{ margin: "4px 0 0", fontSize: 12, color: t.textSoft }}>
                            Upload multiple photos to organize and prepare content in one place.
                          </p>
                        </div>
                        <button
                          style={{ fontSize: 12, fontWeight: 600, padding: "7px 14px", borderRadius: 999, border: "none", cursor: "pointer", background: uploadMode === "snapsort" ? t.accentBtn : t.bgHover, color: uploadMode === "snapsort" ? "#fff" : t.textMid }}
                          onClick={() => setUploadMode("snapsort")}
                        >
                          {uploadMode === "snapsort" ? "Selected" : "Use SnapSort"}
                        </button>
                      </div>

                      {uploadMode === "snapsort" && (
                        <div style={{ marginTop: 14 }}>
                          {/* Drop zone — always visible; collapses to slim bar once files are queued */}
                          <div
                            style={{
                              borderRadius: 14,
                              border: `2px dashed ${snapsortFiles.length === 0 ? t.accent : t.borderDash}`,
                              background: t.bgHover,
                              padding: snapsortFiles.length === 0 ? "18px 16px" : "10px 16px",
                              display: "flex",
                              flexDirection: snapsortFiles.length === 0 ? "column" : "row",
                              alignItems: snapsortFiles.length === 0 ? "flex-start" : "center",
                              justifyContent: "space-between",
                              gap: 10,
                              cursor: "pointer",
                              transition: "all .2s",
                            }}
                            onClick={() => snapsortInputRef.current?.click()}
                          >
                            {snapsortFiles.length === 0 ? (
                              <>
                                <p style={{ margin: 0, fontSize: 13, fontWeight: 600, color: t.text }}>
                                  Drop images here or click to select
                                </p>
                                <p style={{ margin: 0, fontSize: 11, color: t.textSoft }}>
                                  Supports multiple photos · JPG, PNG, WEBP
                                </p>
                                <button
                                  type="button"
                                  style={{ alignSelf: "flex-start", marginTop: 6, fontSize: 12, fontWeight: 600, padding: "6px 12px", borderRadius: 999, border: `1px solid ${t.border}`, background: t.bgSurface, cursor: "pointer", color: t.textMid }}
                                >
                                  Select photos
                                </button>
                              </>
                            ) : (
                              <>
                                <p style={{ margin: 0, fontSize: 12, color: t.accentText, fontWeight: 600 }}>
                                  + Click here to add more photos
                                </p>
                                <span style={{ fontSize: 11, color: t.textSoft }}>JPG, PNG, WEBP</span>
                              </>
                            )}
                          </div>

                          <input
                            ref={snapsortInputRef}
                            type="file"
                            accept="image/*"
                            multiple
                            style={{ display: "none" }}
                            onChange={e => {
                              const newFiles = Array.from(e.target.files || []);
                              if (!newFiles.length) return;
                              // Merge with existing files (avoid duplicates by name+size)
                              const existing = snapsortFiles;
                              const existingKeys = new Set(existing.map(f => f.name + f.size));
                              const uniqueNew = newFiles.filter(f => !existingKeys.has(f.name + f.size));
                              const merged = [...existing, ...uniqueNew];
                              const newPreviews = uniqueNew.map(f => URL.createObjectURL(f));
                              setSnapsortFiles(merged);
                              setSnapsortPreviews(prev => [...prev, ...newPreviews]);
                              setSnapsortBackendItems([]);
                              setUploadError(null);
                              // Reset input so the same file can be re-selected
                              e.target.value = "";
                            }}
                          />

                          {/* Preview thumbnails + Upload button */}
                          {snapsortFiles.length > 0 && (
                            <div style={{ marginTop: 4 }}>
                              {/* Header row */}
                              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 10 }}>
                                <p style={{ margin: 0, fontSize: 12, fontWeight: 600, color: t.textMid }}>
                                  {snapsortFiles.length} photo{snapsortFiles.length > 1 ? "s" : ""} ready
                                </p>
                                <div style={{ display: "flex", gap: 8 }}>
                                  <button
                                    type="button"
                                    onClick={() => {
                                      snapsortPreviews.forEach(u => URL.revokeObjectURL(u));
                                      setSnapsortFiles([]);
                                      setSnapsortPreviews([]);
                                      setSnapsortBackendItems([]);
                                      setUploadError(null);
                                      if (snapsortInputRef.current) snapsortInputRef.current.value = "";
                                    }}
                                    style={{ fontSize: 11, padding: "5px 11px", borderRadius: 999, border: `1px solid ${t.border}`, background: "none", cursor: "pointer", color: t.textSoft }}
                                  >
                                    Clear all
                                  </button>
                                  <button
                                    type="button"
                                    disabled={snapsortUploading}
                                    onClick={handleSnapsortUpload}
                                    style={{
                                      fontSize: 12, fontWeight: 700, padding: "6px 16px", borderRadius: 999, border: "none",
                                      cursor: snapsortUploading ? "default" : "pointer",
                                      background: t.accentBtn, color: "#fff",
                                      opacity: snapsortUploading ? 0.7 : 1,
                                      boxShadow: "0 2px 10px rgba(124,58,237,0.3)",
                                      display: "flex", alignItems: "center", gap: 6,
                                    }}
                                  >
                                    {snapsortUploading ? (
                                      <>
                                        <span style={{ width: 12, height: 12, border: "2px solid rgba(255,255,255,0.4)", borderTopColor: "#fff", borderRadius: "50%", display: "inline-block", animation: "spin 0.7s linear infinite" }} />
                                        Uploading…
                                      </>
                                    ) : (
                                      <>
                                        <UploadIcon />
                                        Upload {snapsortFiles.length} photo{snapsortFiles.length > 1 ? "s" : ""}
                                      </>
                                    )}
                                  </button>
                                </div>
                              </div>

                              {/* Thumbnail grid */}
                              <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                                {snapsortPreviews.map((src, i) => (
                                  <div
                                    key={src}
                                    title={snapsortFiles[i]?.name}
                                    style={{ position: "relative", width: 64, height: 64, borderRadius: 10, overflow: "hidden", border: `1.5px solid ${t.border}`, flexShrink: 0, background: t.bgHover }}
                                  >
                                    <img
                                      src={src}
                                      alt={snapsortFiles[i]?.name}
                                      style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                                    />
                                    {/* Remove button */}
                                    <button
                                      onClick={e => {
                                        e.stopPropagation();
                                        URL.revokeObjectURL(src);
                                        const newFiles = snapsortFiles.filter((_, idx) => idx !== i);
                                        const newPreviews = snapsortPreviews.filter((_, idx) => idx !== i);
                                        setSnapsortFiles(newFiles);
                                        setSnapsortPreviews(newPreviews);
                                      }}
                                      style={{
                                        position: "absolute", top: 3, right: 3,
                                        width: 18, height: 18, borderRadius: "50%",
                                        background: "rgba(0,0,0,0.55)", border: "none",
                                        color: "#fff", fontSize: 11, lineHeight: 1,
                                        cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center",
                                        fontWeight: 700,
                                      }}
                                    >
                                      ×
                                    </button>
                                  </div>
                                ))}
                              </div>

                              {/* Upload success */}
                              {snapsortBackendItems.length > 0 && (
                                <div style={{ marginTop: 12, padding: "8px 12px", borderRadius: 10, background: "rgba(34,197,94,0.08)", border: "1px solid rgba(34,197,94,0.2)", display: "flex", alignItems: "center", gap: 8 }}>
                                  <span style={{ fontSize: 14 }}>✅</span>
                                  <p style={{ margin: 0, fontSize: 12, color: "#16a34a", fontWeight: 600 }}>
                                    {snapsortBackendItems.length} file{snapsortBackendItems.length > 1 ? "s" : ""} uploaded successfully
                                  </p>
                                </div>
                              )}
                            </div>
                          )}

                          {uploadError && uploadMode === "snapsort" && (
                            <p style={{ margin: "8px 0 0", fontSize: 12, color: "#f97373" }}>{uploadError}</p>
                          )}
                        </div>
                      )}
                    </div>

                    {/* ── Forecastly section ─────────────────────────────── */}
                    <div style={{ borderRadius: 18, border: `1px solid ${t.border}`, background: t.bgSurface, padding: "18px 20px", boxShadow: t.shadow, transition: "background .3s, border-color .3s" }}>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
                        <div>
                          <h2 style={{ margin: 0, fontSize: 14, fontWeight: 700, color: t.text }}>Forecastly</h2>
                          <p style={{ margin: "4px 0 0", fontSize: 12, color: t.textSoft }}>
                            Upload a single photo or video to simulate audience response before posting.
                          </p>
                        </div>
                        <button
                          style={{ fontSize: 12, fontWeight: 600, padding: "7px 14px", borderRadius: 999, border: "none", cursor: "pointer", background: uploadMode === "forecastly" ? t.accentBtn : t.bgHover, color: uploadMode === "forecastly" ? "#fff" : t.textMid }}
                          onClick={() => setUploadMode("forecastly")}
                        >
                          {uploadMode === "forecastly" ? "Selected" : "Use Forecastly"}
                        </button>
                      </div>

                      {uploadMode === "forecastly" && (
                        <div style={{ marginTop: 14 }}>
                          {/* Drop zone — only when no file selected */}
                          {!forecastFile && (
                            <div
                              style={{ borderRadius: 14, border: `1px dashed ${t.borderDash}`, background: t.bgHover, padding: "18px 16px", display: "flex", flexDirection: "column", gap: 10, cursor: "pointer" }}
                              onClick={() => forecastInputRef.current?.click()}
                            >
                              <p style={{ margin: 0, fontSize: 13, fontWeight: 600, color: t.text }}>
                                Drop a file here or click to select
                              </p>
                              <p style={{ margin: 0, fontSize: 11, color: t.textSoft }}>
                                Images up to 50 MB · Videos up to 500 MB · JPG, PNG, WEBP, MP4, MOV, WEBM
                              </p>
                              <button
                                type="button"
                                style={{ alignSelf: "flex-start", marginTop: 6, fontSize: 12, fontWeight: 600, padding: "6px 12px", borderRadius: 999, border: `1px solid ${t.border}`, background: t.bgSurface, cursor: "pointer", color: t.textMid }}
                              >
                                Select file
                              </button>
                            </div>
                          )}

                          <input
                            ref={forecastInputRef}
                            type="file"
                            accept="image/*,video/*"
                            style={{ display: "none" }}
                            onChange={e => {
                              const file = e.target.files?.[0] ?? null;
                              if (!file) return;
                              if (forecastPreview) URL.revokeObjectURL(forecastPreview);
                              setForecastFile(file);
                              setForecastPreview(file.type.startsWith("image/") ? URL.createObjectURL(file) : null);
                              setForecastBackendItem(null);
                              setUploadError(null);
                            }}
                          />

                          {/* Preview + Upload button */}
                          {forecastFile && (
                            <div style={{ marginTop: 4 }}>
                              <div style={{ display: "flex", alignItems: "flex-start", gap: 14 }}>
                                {/* Thumbnail */}
                                <div style={{ position: "relative", flexShrink: 0 }}>
                                  {forecastPreview ? (
                                    <div style={{ width: 72, height: 72, borderRadius: 12, overflow: "hidden", border: `1.5px solid ${t.border}`, background: t.bgHover }}>
                                      <img src={forecastPreview} alt={forecastFile.name} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
                                    </div>
                                  ) : (
                                    /* Video placeholder */
                                    <div style={{ width: 72, height: 72, borderRadius: 12, border: `1.5px solid ${t.border}`, background: t.bgHover, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 28 }}>
                                      🎬
                                    </div>
                                  )}
                                  {/* Remove */}
                                  <button
                                    onClick={() => {
                                      if (forecastPreview) URL.revokeObjectURL(forecastPreview);
                                      setForecastFile(null);
                                      setForecastPreview(null);
                                      setForecastBackendItem(null);
                                      setForecastAnalysis(null);
                                      if (forecastInputRef.current) forecastInputRef.current.value = "";
                                    }}
                                    style={{ position: "absolute", top: -6, right: -6, width: 20, height: 20, borderRadius: "50%", background: "rgba(0,0,0,0.55)", border: "none", color: "#fff", fontSize: 12, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700 }}
                                  >
                                    ×
                                  </button>
                                </div>

                                {/* File info + actions */}
                                <div style={{ flex: 1, minWidth: 0 }}>
                                  <p style={{ margin: "0 0 2px", fontSize: 13, fontWeight: 600, color: t.text, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                                    {forecastFile.name}
                                  </p>
                                  <p style={{ margin: "0 0 10px", fontSize: 11, color: t.textSoft }}>
                                    {(forecastFile.size / 1024 / 1024).toFixed(1)} MB
                                  </p>
                                  <div style={{ display: "flex", gap: 8 }}>
                                    <button
                                      type="button"
                                      onClick={() => forecastInputRef.current?.click()}
                                      style={{ fontSize: 11, padding: "5px 11px", borderRadius: 999, border: `1px solid ${t.border}`, background: "none", cursor: "pointer", color: t.textMid }}
                                    >
                                      Change file
                                    </button>
                                    <button
                                      type="button"
                                      disabled={forecastUploading}
                                      onClick={handleForecastlyUpload}
                                      style={{
                                        fontSize: 12, fontWeight: 700, padding: "6px 16px", borderRadius: 999, border: "none",
                                        cursor: forecastUploading ? "default" : "pointer",
                                        background: t.accentBtn, color: "#fff",
                                        opacity: forecastUploading ? 0.7 : 1,
                                        boxShadow: "0 2px 10px rgba(124,58,237,0.3)",
                                        display: "flex", alignItems: "center", gap: 6,
                                      }}
                                    >
                                      {forecastUploading ? (
                                        <>
                                          <span style={{ width: 12, height: 12, border: "2px solid rgba(255,255,255,0.4)", borderTopColor: "#fff", borderRadius: "50%", display: "inline-block", animation: "spin 0.7s linear infinite" }} />
                                          {forecastUploadStage || "Uploading…"}
                                        </>
                                      ) : (
                                        <>
                                          <UploadIcon />
                                          Upload to Forecastly
                                        </>
                                      )}
                                    </button>
                                  </div>
                                </div>
                              </div>

                              {/* Upload progress bar — visible during upload */}
                              {forecastUploading && (
                                <div style={{ marginTop: 12 }}>
                                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 5 }}>
                                    <span style={{ fontSize: 11, color: t.textMid, fontWeight: 600 }}>
                                      {forecastUploadStage || "Uploading…"}
                                    </span>
                                    <span style={{ fontSize: 11, color: t.textSoft }}>
                                      {forecastUploadPct < 100 ? `${forecastUploadPct}%` : "Processing…"}
                                    </span>
                                  </div>
                                  <div style={{ height: 6, background: dark ? "rgba(255,255,255,0.08)" : "#e9e7ff", borderRadius: 99, overflow: "hidden" }}>
                                    <div style={{
                                      height: "100%",
                                      width: forecastUploadPct < 100 ? `${forecastUploadPct}%` : "100%",
                                      borderRadius: 99,
                                      background: forecastUploadPct < 100
                                        ? "linear-gradient(90deg,#7c3aed,#c026d3)"
                                        : "linear-gradient(90deg,#c026d3,#7c3aed)",
                                      transition: "width 0.3s ease",
                                      animation: forecastUploadPct >= 100 ? "shimmer 1.5s infinite" : "none",
                                    }} />
                                  </div>
                                  {forecastUploadPct >= 100 && (
                                    <p style={{ margin: "5px 0 0", fontSize: 10, color: t.textSoft }}>
                                      File uploaded to S3 · Bedrock is analysing your content…
                                    </p>
                                  )}
                                </div>
                              )}

                              {/* Upload success */}
                              {forecastBackendItem && !forecastUploading && (
                                <div style={{ marginTop: 12, padding: "10px 12px", borderRadius: 10, background: "rgba(34,197,94,0.08)", border: "1px solid rgba(34,197,94,0.2)", display: "flex", flexDirection: "column", gap: 3 }}>
                                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                                    <span style={{ fontSize: 14 }}>✅</span>
                                    <p style={{ margin: 0, fontSize: 12, color: "#16a34a", fontWeight: 600 }}>
                                      Uploaded successfully · {forecastBackendItem.filename}
                                    </p>
                                  </div>
                                  {forecastBackendItem.s3_key && (
                                    <p style={{ margin: "0 0 0 22px", fontSize: 10, color: "#16a34a", opacity: 0.75, fontFamily: "monospace", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                                      s3://{forecastBackendItem.s3_key}
                                    </p>
                                  )}
                                </div>
                              )}

                              {uploadError && uploadMode === "forecastly" && (
                                <p style={{ margin: "8px 0 0", fontSize: 12, color: "#f97373" }}>{uploadError}</p>
                              )}
                            </div>
                          )}

                          {/* Always visible: what Forecastly does */}
                          <div style={{ marginTop: 14 }}>
                            <p style={{ margin: "0 0 6px", fontSize: 12, fontWeight: 600, color: t.text }}>
                              What Forecastly will do:
                            </p>
                            <ul style={{ margin: 0, paddingLeft: 18, fontSize: 11, color: t.textSoft, lineHeight: 1.6 }}>
                              <li>Predicts audience engagement before posting.</li>
                              <li>Optimizes content strategy using past performance.</li>
                              <li>Detects misleading content before it spreads.</li>
                            </ul>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* ── Forecastly Analysis Results ─────────────────────── */}
                    {forecastAnalysis && !forecastUploading && (
                      <div style={{ borderRadius: 18, border: `1px solid ${t.border}`, background: t.bgSurface, padding: "20px 22px", boxShadow: t.shadow, display: "flex", flexDirection: "column", gap: 20, transition: "background .3s, border-color .3s" }}>

                        {/* Header */}
                        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                          <div>
                            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 2 }}>
                              <span style={{ fontSize: 16 }}>🔮</span>
                              <h2 style={{ margin: 0, fontSize: 14, fontWeight: 800, color: t.text }}>Forecastly Analysis</h2>
                              <span style={{ fontSize: 10, fontWeight: 700, padding: "2px 8px", borderRadius: 99, background: "rgba(124,58,237,0.15)", color: "#a78bfa", border: "1px solid rgba(124,58,237,0.25)" }}>Powered by Amazon Bedrock</span>
                            </div>
                            <p style={{ margin: 0, fontSize: 11, color: t.textSoft }}>AI analysis of your uploaded content</p>
                          </div>
                        </div>

                        {/* ── Row 1: Tags ── */}
                        <div style={{ background: dark ? "rgba(255,255,255,0.03)" : "#f9f8ff", borderRadius: 14, padding: "14px 16px", border: `1px solid ${t.border}` }}>
                          <div style={{ display: "flex", alignItems: "center", gap: 7, marginBottom: 12 }}>
                            <span style={{ fontSize: 15 }}>🏷️</span>
                            <p style={{ margin: 0, fontSize: 13, fontWeight: 700, color: t.text }}>Content Tags</p>
                            <span style={{ fontSize: 10, color: t.textSoft, marginLeft: "auto" }}>{forecastAnalysis.tags.length} tags identified</span>
                          </div>
                          <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                            {forecastAnalysis.tags.map((tag, i) => {
                              const tagColors = ["#7c3aed","#0891b2","#0d9488","#b45309","#be185d","#4f46e5","#16a34a","#dc2626"];
                              const color = tagColors[i % tagColors.length];
                              return (
                                <span key={tag} style={{ fontSize: 12, fontWeight: 600, padding: "5px 12px", borderRadius: 999, background: `${color}18`, color: color, border: `1px solid ${color}30` }}>
                                  #{tag}
                                </span>
                              );
                            })}
                          </div>
                        </div>

                        {/* ── Row 2: Virality + Upload Times ── */}
                        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>

                          {/* Virality Rate */}
                          <div style={{ background: dark ? "rgba(255,255,255,0.03)" : "#f9f8ff", borderRadius: 14, padding: "14px 16px", border: `1px solid ${t.border}` }}>
                            <div style={{ display: "flex", alignItems: "center", gap: 7, marginBottom: 12 }}>
                              <span style={{ fontSize: 15 }}>🔥</span>
                              <p style={{ margin: 0, fontSize: 13, fontWeight: 700, color: t.text }}>Virality Rate</p>
                            </div>
                            <div style={{ display: "flex", alignItems: "flex-end", gap: 8, marginBottom: 10 }}>
                              <span style={{ fontSize: 34, fontWeight: 800, lineHeight: 1, color: forecastAnalysis.virality_rate >= 70 ? "#16a34a" : forecastAnalysis.virality_rate >= 40 ? "#d97706" : "#dc2626" }}>
                                {forecastAnalysis.virality_rate}
                              </span>
                              <span style={{ fontSize: 14, color: t.textMid, marginBottom: 4 }}>/100</span>
                            </div>
                            {/* Progress bar */}
                            <div style={{ height: 8, background: dark ? "rgba(255,255,255,0.08)" : "#e9e7ff", borderRadius: 99, overflow: "hidden" }}>
                              <div style={{
                                height: "100%",
                                width: `${forecastAnalysis.virality_rate}%`,
                                borderRadius: 99,
                                background: forecastAnalysis.virality_rate >= 70
                                  ? "linear-gradient(90deg,#16a34a,#4ade80)"
                                  : forecastAnalysis.virality_rate >= 40
                                    ? "linear-gradient(90deg,#d97706,#fbbf24)"
                                    : "linear-gradient(90deg,#dc2626,#f97316)",
                                transition: "width 1s ease",
                              }} />
                            </div>
                            <p style={{ margin: "8px 0 0", fontSize: 11, color: t.textSoft }}>
                              {forecastAnalysis.virality_rate >= 70 ? "🚀 High viral potential" : forecastAnalysis.virality_rate >= 40 ? "📈 Moderate potential" : "📉 Low virality — consider reworking"}
                            </p>
                          </div>

                          {/* Best Upload Times */}
                          <div style={{ background: dark ? "rgba(255,255,255,0.03)" : "#f9f8ff", borderRadius: 14, padding: "14px 16px", border: `1px solid ${t.border}` }}>
                            <div style={{ display: "flex", alignItems: "center", gap: 7, marginBottom: 12 }}>
                              <span style={{ fontSize: 15 }}>⏰</span>
                              <p style={{ margin: 0, fontSize: 13, fontWeight: 700, color: t.text }}>Best Upload Times</p>
                            </div>
                            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                              {forecastAnalysis.best_upload_times.map((slot, i) => (
                                <div key={i} style={{ display: "flex", alignItems: "center", gap: 10, padding: "7px 10px", borderRadius: 10, background: dark ? "rgba(6,182,212,0.08)" : "rgba(6,182,212,0.06)", border: "1px solid rgba(6,182,212,0.2)" }}>
                                  <span style={{ fontSize: 11, fontWeight: 700, width: 18, height: 18, borderRadius: "50%", background: "rgba(6,182,212,0.2)", color: "#0891b2", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                                    {i + 1}
                                  </span>
                                  <span style={{ fontSize: 12, color: t.text, fontWeight: 500 }}>{slot}</span>
                                </div>
                              ))}
                              {forecastAnalysis.best_upload_times.length === 0 && (
                                <p style={{ margin: 0, fontSize: 12, color: t.textSoft }}>No timing data returned.</p>
                              )}
                            </div>
                          </div>
                        </div>

                        {/* ── Row 3: Misleading check ── */}
                        <div style={{
                          background: forecastAnalysis.is_misleading
                            ? (dark ? "rgba(239,68,68,0.08)" : "rgba(254,242,242,1)")
                            : (dark ? "rgba(16,185,129,0.08)" : "rgba(240,253,244,1)"),
                          borderRadius: 14,
                          padding: "14px 16px",
                          border: `1px solid ${forecastAnalysis.is_misleading ? "rgba(239,68,68,0.3)" : "rgba(16,185,129,0.3)"}`,
                        }}>
                          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                            <span style={{ fontSize: 22 }}>{forecastAnalysis.is_misleading ? "⚠️" : "✅"}</span>
                            <div style={{ flex: 1 }}>
                              <p style={{ margin: 0, fontSize: 13, fontWeight: 700, color: forecastAnalysis.is_misleading ? "#dc2626" : "#16a34a" }}>
                                {forecastAnalysis.is_misleading ? "Potentially Misleading Content" : "Content Appears Authentic"}
                              </p>
                              <p style={{ margin: "2px 0 0", fontSize: 12, color: t.textMid }}>
                                {forecastAnalysis.is_misleading
                                  ? "Bedrock detected signs of misleading or manipulated content."
                                  : "No misleading signals detected by Bedrock."}
                              </p>
                            </div>
                            {forecastAnalysis.is_misleading && forecastAnalysis.misleading_rate !== null && (
                              <div style={{ textAlign: "center", flexShrink: 0 }}>
                                <span style={{ fontSize: 26, fontWeight: 800, color: "#dc2626" }}>{forecastAnalysis.misleading_rate}</span>
                                <p style={{ margin: 0, fontSize: 10, color: "#dc2626", fontWeight: 600 }}>/ 100</p>
                                <p style={{ margin: 0, fontSize: 10, color: t.textSoft }}>misleading score</p>
                              </div>
                            )}
                          </div>
                          {forecastAnalysis.is_misleading && forecastAnalysis.misleading_rate !== null && (
                            <div style={{ marginTop: 12 }}>
                              <div style={{ height: 6, background: "rgba(239,68,68,0.15)", borderRadius: 99, overflow: "hidden" }}>
                                <div style={{ height: "100%", width: `${forecastAnalysis.misleading_rate}%`, background: "linear-gradient(90deg,#f97316,#dc2626)", borderRadius: 99, transition: "width 1s ease" }} />
                              </div>
                            </div>
                          )}
                        </div>

                      </div>
                    )}
                  </>
                )}

                {/* ── Projects ─────────────────────────────────────────── */}
                {activeNav === "projects" && (
                  <div style={{ borderRadius: 18, border: `1px solid ${t.border}`, background: t.bgSurface, padding: "18px 20px", boxShadow: t.shadow, transition: "background .3s, border-color .3s" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
                      <div>
                        <h2 style={{ margin: 0, fontSize: 14, fontWeight: 700, color: t.text }}>Recent Projects</h2>
                        <p style={{ margin: "3px 0 0", fontSize: 12, color: t.textSoft }}>Your latest content pieces.</p>
                      </div>
                      <button style={{ fontSize: 11, padding: "5px 12px", borderRadius: 99, border: `1px solid ${t.border}`, background: "none", cursor: "pointer", color: t.textMid }}>
                        View all
                      </button>
                    </div>
                    <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
                      {recentProjects.map((p) => {
                        const sc = t.statusFn(p.statusColor);
                        return (
                          <div key={p.title} style={{ display: "flex", alignItems: "center", gap: 12, padding: "10px 10px", borderRadius: 12, cursor: "pointer", transition: "background .15s" }}
                            onMouseEnter={e => e.currentTarget.style.background = t.bgHover}
                            onMouseLeave={e => e.currentTarget.style.background = "none"}
                          >
                            <div style={{ width: 36, height: 36, borderRadius: 10, background: t.bgHover, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18, flexShrink: 0 }}>
                              {p.thumb}
                            </div>
                            <div style={{ flex: 1, minWidth: 0 }}>
                              <p style={{ margin: 0, fontSize: 13, fontWeight: 600, color: t.text, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{p.title}</p>
                              <p style={{ margin: "2px 0 0", fontSize: 11, color: t.textSoft }}>{p.platform} · {p.date}</p>
                            </div>
                            <span style={{ fontSize: 10, fontWeight: 700, padding: "3px 9px", borderRadius: 99, background: sc.bg, color: sc.color, flexShrink: 0 }}>
                              {p.status}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        </main>
      </div>

      {authMode !== "none" && (
        <div style={{ position: "fixed", inset: 0, background: dark ? "rgba(0,0,0,0.65)" : "rgba(0,0,0,0.45)", zIndex: 100, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <div style={{ width: 360, maxWidth: "90%", borderRadius: 18, background: t.bgSurface, border: `1px solid ${t.border}`, boxShadow: t.shadow, padding: "20px 22px 18px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
              <div>
                <h2 style={{ margin: 0, fontSize: 16, fontWeight: 700, color: t.text }}>
                  {authMode === "login" ? "Log in" : "Sign up"}
                </h2>
                <p style={{ margin: "4px 0 0", fontSize: 12, color: t.textSoft }}>
                  {authMode === "login" ? "Access your Pravaah dashboard." : "Create an account to start using Pravaah."}
                </p>
              </div>
              <button onClick={() => { setAuthMode("none"); setAuthError(null); setAuthMessage(null); }} style={{ border: "none", background: "none", cursor: "pointer", fontSize: 18, lineHeight: 1, color: t.textSoft }}>
                ×
              </button>
            </div>

            <form onSubmit={handleAuthSubmit} style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {authMode === "signup" && (
                <label style={{ fontSize: 12, color: t.textMid }}>
                  Name
                  <input type="text" value={authName} onChange={e => setAuthName(e.target.value)} style={{ marginTop: 4, width: "100%", padding: "8px 10px", borderRadius: 8, border: `1px solid ${t.inputBorder}`, background: t.inputBg, color: t.text, fontSize: 13 }} required={authMode === "signup"} />
                </label>
              )}
              <label style={{ fontSize: 12, color: t.textMid }}>
                Email
                <input type="email" value={authEmail} onChange={e => setAuthEmail(e.target.value)} style={{ marginTop: 4, width: "100%", padding: "8px 10px", borderRadius: 8, border: `1px solid ${t.inputBorder}`, background: t.inputBg, color: t.text, fontSize: 13 }} required />
              </label>
              <label style={{ fontSize: 12, color: t.textMid }}>
                Password
                <input type="password" value={authPassword} onChange={e => setAuthPassword(e.target.value)} style={{ marginTop: 4, width: "100%", padding: "8px 10px", borderRadius: 8, border: `1px solid ${t.inputBorder}`, background: t.inputBg, color: t.text, fontSize: 13 }} required />
              </label>

              {authError && <p style={{ margin: "4px 0 0", fontSize: 12, color: "#f97373" }}>{authError}</p>}
              {authMessage && <p style={{ margin: "4px 0 0", fontSize: 12, color: t.accentText }}>{authMessage}</p>}

              <button type="submit" disabled={authLoading} style={{ marginTop: 6, width: "100%", padding: "8px 12px", borderRadius: 999, border: "none", cursor: authLoading ? "default" : "pointer", background: t.accentBtn, color: "#fff", fontSize: 13, fontWeight: 700, opacity: authLoading ? 0.7 : 1 }}>
                {authLoading ? (authMode === "login" ? "Logging in..." : "Signing up...") : (authMode === "login" ? "Log in" : "Sign up")}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Spinner keyframe */}
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}
