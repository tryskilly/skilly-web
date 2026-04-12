import { useState, useEffect, useRef } from "react";

const AMBER = {
  50: "#FEFCE8", 100: "#FEF3C7", 200: "#FDE68A", 300: "#FCD34D",
  400: "#FBBF24", 500: "#F59E0B", 600: "#D97706", 700: "#B45309",
  800: "#92400E", 900: "#78350F",
};
const GRAY = {
  50: "#FAFAF8", 100: "#F5F5F0", 200: "#E5E5E0", 300: "#D4D4CF",
  400: "#A3A39E", 500: "#737370", 600: "#525250", 700: "#3F3F3D",
  800: "#27272A", 900: "#1C1C1E", 950: "#0F0F10",
};

const CursorLogo = ({ size = 32, color = AMBER[500] }) => (
  <svg width={size} height={size} viewBox="0 0 80 80" fill="none">
    <path d="M20 8C18 7 16 9 16 11L16 60C16 62 18 64 20 63L34 52C35 51 37 51 38 52L50 66C51 67 53 68 55 67L61 61C63 59 62 57 61 56L49 44C48 43 48 41 49 40L58 38C60 37 61 35 59 34L20 8Z" fill={color}/>
  </svg>
);

const ArrowIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 12L12 4M12 4H5M12 4V11"/>
  </svg>
);

const CheckIcon = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
    <circle cx="9" cy="9" r="9" fill={AMBER[500]} opacity="0.15"/>
    <path d="M5.5 9.5L7.5 11.5L12.5 6.5" stroke={AMBER[500]} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const apps = ["Blender", "Figma", "After Effects", "DaVinci Resolve", "Premiere Pro"];

const steps = [
  { num: "01", title: "Open any creative app", desc: "Launch Blender, Figma, or any desktop software. Skilly watches your screen." },
  { num: "02", title: "Hold Control+Option and ask", desc: "\"How do I UV unwrap this face?\" — speak naturally, Skilly hears you." },
  { num: "03", title: "Watch the cursor fly", desc: "Skilly points at the exact button, explains what it does, and walks you through it." },
];

const features = [
  { icon: "cursor", title: "Points at your screen", desc: "An amber cursor flies to the exact UI element you need. No more hunting through menus." },
  { icon: "voice", title: "Talks you through it", desc: "Natural voice explanations, not walls of text. Like having an expert sitting next to you." },
  { icon: "brain", title: "Sees what you see", desc: "Screenshots your app in real-time. It knows if you're in Edit Mode or Object Mode." },
  { icon: "path", title: "Learns your pace", desc: "A curriculum engine tracks what you've mastered and what's next. No quizzes, no gates." },
  { icon: "plug", title: "One skill, one file", desc: "Skills are simple Markdown files. Anyone can write one. A marketplace is coming." },
  { icon: "key", title: "One API key", desc: "Bring your own OpenAI key. No account creation, no subscription lock-in required." },
];

const featureIcons = {
  cursor: <path d="M5 3L5 19L9 15L14 21L17 19L12 13L17 12L5 3Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>,
  voice: <><path d="M12 3v10M8 8a4 4 0 008 0" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/><path d="M6 13a6 6 0 0012 0M12 17v4M9 21h6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></>,
  brain: <><circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5"/><path d="M12 3v18M3 12h18M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="0.5" opacity="0.4"/><circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.5"/></>,
  path: <><path d="M4 19L8 15L12 17L16 11L20 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/><circle cx="8" cy="15" r="2" fill="currentColor" opacity="0.3"/><circle cx="16" cy="11" r="2" fill="currentColor" opacity="0.3"/></>,
  plug: <><rect x="5" y="3" width="14" height="18" rx="2" stroke="currentColor" strokeWidth="1.5"/><path d="M9 7h6M9 10h4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></>,
  key: <><circle cx="8" cy="8" r="5" stroke="currentColor" strokeWidth="1.5"/><path d="M12 11l6 6M15 14l3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></>,
};

const tiers = [
  { name: "Free", price: "$0", period: "", desc: "Prove the magic", features: ["10 interactions/day", "Blender Fundamentals skill", "Push-to-talk voice", "Cursor pointing"], cta: "Download for Mac", highlight: false },
  { name: "Learner", price: "$19", period: "/mo", desc: "Learn at your pace", features: ["300 interactions/mo", "All available skills", "Voice + vision", "Curriculum tracking", "Priority voice quality"], cta: "Start learning", highlight: true },
  { name: "BYOK", price: "$9", period: "/mo", desc: "Bring your own key", features: ["Unlimited interactions", "All available skills", "Use your OpenAI API key", "Full curriculum engine", "Zero usage caps"], cta: "Connect your key", highlight: false },
];

const skillYaml = `---
name: Blender Fundamentals
app: Blender
version: "0.1"
recommended_model: gpt-realtime
pointing_mode: always
---

## Teaching Instructions

You are a patient Blender tutor. The user 
is a complete beginner. When they ask about 
any tool or feature:

1. Point at the relevant UI element
2. Explain what it does in plain language
3. Give them one thing to try right now

## Curriculum

### Stage 1: Getting Around
goals:
  - Orbit, pan, zoom the 3D viewport
  - Identify the major UI regions
  - Select an object with left-click
completion_signals:
  - orbit, pan, zoom, navigate, middle mouse

### Stage 2: Selecting & Transforming
goals:
  - Move (G), Rotate (R), Scale (S)
  - Use axis constraints (X, Y, Z)
  - Undo with Ctrl+Z`;

export default function SkillyLanding() {
  const [currentApp, setCurrentApp] = useState(0);
  const [scrolled, setScrolled] = useState(false);
  const [visibleSections, setVisibleSections] = useState(new Set());
  const [waitlistEmail, setWaitlistEmail] = useState("");
  const [waitlistPlatform, setWaitlistPlatform] = useState(null);
  const [waitlistSubmitted, setWaitlistSubmitted] = useState(false);
  const [waitlistLoading, setWaitlistLoading] = useState(false);
  const sectionRefs = useRef({});

  const handleWaitlistSubmit = async () => {
    if (!waitlistEmail || !waitlistPlatform) return;
    setWaitlistLoading(true);
    // Replace with your actual API endpoint (e.g. Buttondown, ConvertKit, or custom endpoint)
    try {
      // await fetch("https://api.tryskilly.app/waitlist", {
      //   method: "POST",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify({ email: waitlistEmail, platform: waitlistPlatform }),
      // });
      await new Promise((r) => setTimeout(r, 800)); // Simulated delay
      setWaitlistSubmitted(true);
    } catch (e) {
      console.error(e);
    } finally {
      setWaitlistLoading(false);
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentApp((prev) => (prev + 1) % apps.length);
    }, 2400);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleSections((prev) => new Set([...prev, entry.target.dataset.section]));
          }
        });
      },
      { threshold: 0.15 }
    );
    Object.values(sectionRefs.current).forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const registerSection = (name) => (el) => {
    if (el) {
      el.dataset.section = name;
      sectionRefs.current[name] = el;
    }
  };

  const isVisible = (name) => visibleSections.has(name);

  return (
    <div style={{ background: GRAY[950], color: GRAY[200], fontFamily: "'DM Sans', sans-serif", minHeight: "100vh", overflow: "hidden" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700&family=JetBrains+Mono:wght@400;500&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        @keyframes fadeUp { from { opacity: 0; transform: translateY(30px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes pulse { 0%, 100% { opacity: 0.4; } 50% { opacity: 1; } }
        @keyframes float { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-8px); } }
        @keyframes cursorFly { 0% { transform: translate(0, 0) rotate(0deg); opacity: 0; } 20% { opacity: 1; } 100% { transform: translate(120px, -60px) rotate(-5deg); opacity: 1; } }
        @keyframes shimmer { 0% { background-position: -200% 0; } 100% { background-position: 200% 0; } }
        @keyframes typewriter { from { width: 0; } to { width: 100%; } }
        .nav-blur { backdrop-filter: blur(16px); -webkit-backdrop-filter: blur(16px); }
        .amber-glow { box-shadow: 0 0 60px ${AMBER[500]}22, 0 0 120px ${AMBER[500]}11; }
        .card-hover { transition: transform 0.3s ease, border-color 0.3s ease; }
        .card-hover:hover { transform: translateY(-4px); border-color: ${AMBER[500]}44 !important; }
        .cta-btn { transition: all 0.2s ease; }
        .cta-btn:hover { background: ${AMBER[600]}; transform: scale(1.02); }
        .cta-btn:active { transform: scale(0.98); }
        .ghost-btn { transition: all 0.2s ease; }
        .ghost-btn:hover { background: rgba(255,255,255,0.06); }
        .code-block { scrollbar-width: thin; scrollbar-color: ${GRAY[700]} transparent; }
        .code-block::-webkit-scrollbar { width: 4px; }
        .code-block::-webkit-scrollbar-track { background: transparent; }
        .code-block::-webkit-scrollbar-thumb { background: ${GRAY[700]}; border-radius: 4px; }
        .grain { position: fixed; top: 0; left: 0; width: 100%; height: 100%; pointer-events: none; z-index: 9999; opacity: 0.015; background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E"); }
      `}</style>

      <div className="grain" />

      {/* NAV */}
      <nav className="nav-blur" style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
        background: scrolled ? `${GRAY[950]}ee` : "transparent",
        borderBottom: scrolled ? `1px solid ${GRAY[800]}` : "1px solid transparent",
        transition: "all 0.3s ease",
      }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px", height: 64, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <CursorLogo size={26} />
            <span style={{ fontSize: 20, fontWeight: 700, letterSpacing: -0.5 }}>skilly</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 32 }}>
            <a href="#how" style={{ color: GRAY[400], textDecoration: "none", fontSize: 15, fontWeight: 500 }}>How it works</a>
            <a href="#features" style={{ color: GRAY[400], textDecoration: "none", fontSize: 15, fontWeight: 500 }}>Features</a>
            <a href="#pricing" style={{ color: GRAY[400], textDecoration: "none", fontSize: 15, fontWeight: 500 }}>Pricing</a>
            <a href="#waitlist" style={{ color: GRAY[400], textDecoration: "none", fontSize: 15, fontWeight: 500 }}>Waitlist</a>
            <button className="cta-btn" style={{
              background: AMBER[500], color: GRAY[950], border: "none", borderRadius: 6,
              padding: "8px 20px", fontSize: 14, fontWeight: 600, cursor: "pointer", fontFamily: "inherit",
              display: "flex", alignItems: "center", gap: 6,
            }}>
              Download <ArrowIcon />
            </button>
          </div>
        </div>
      </nav>

      {/* HERO */}
      <section style={{ minHeight: "100vh", display: "flex", alignItems: "center", position: "relative", overflow: "hidden" }}>
        {/* Ambient glow */}
        <div style={{
          position: "absolute", top: "20%", left: "50%", transform: "translate(-50%, -50%)",
          width: 600, height: 600, borderRadius: "50%",
          background: `radial-gradient(circle, ${AMBER[500]}08 0%, transparent 70%)`,
          pointerEvents: "none",
        }} />
        <div style={{
          position: "absolute", top: 0, right: 0, width: "40%", height: "100%",
          background: `linear-gradient(180deg, ${AMBER[500]}03 0%, transparent 60%)`,
          pointerEvents: "none",
        }} />

        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "140px 24px 80px", width: "100%" }}>
          <div style={{ maxWidth: 720 }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: `${AMBER[500]}10`, border: `1px solid ${AMBER[500]}22`, borderRadius: 100, padding: "6px 16px 6px 10px", marginBottom: 32 }}>
              <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#22C55E", animation: "pulse 2s ease-in-out infinite" }} />
              <span style={{ fontSize: 13, fontWeight: 500, color: AMBER[300] }}>Now in beta — Blender skill available</span>
            </div>

            <h1 style={{ fontSize: 64, fontWeight: 700, lineHeight: 1.08, letterSpacing: -2, marginBottom: 24, color: GRAY[50] }}>
              Your AI companion{" "}
              <br />
              for learning{" "}
              <span style={{ position: "relative", display: "inline-block" }}>
                <span key={currentApp} style={{
                  color: AMBER[500],
                  animation: "fadeIn 0.4s ease",
                  display: "inline-block",
                }}>
                  {apps[currentApp]}
                </span>
                <div style={{
                  position: "absolute", bottom: -4, left: 0, right: 0, height: 3,
                  background: `linear-gradient(90deg, ${AMBER[500]}, ${AMBER[300]})`,
                  borderRadius: 2, opacity: 0.6,
                }} />
              </span>
            </h1>

            <p style={{ fontSize: 20, lineHeight: 1.6, color: GRAY[400], marginBottom: 40, maxWidth: 540 }}>
              Skilly sees your screen, hears your question, and points at exactly what you need. Like having an expert sitting next to you.
            </p>

            <div style={{ display: "flex", gap: 12, alignItems: "center", flexWrap: "wrap" }}>
              <button className="cta-btn" style={{
                background: AMBER[500], color: GRAY[950], border: "none", borderRadius: 8,
                padding: "14px 32px", fontSize: 17, fontWeight: 600, cursor: "pointer", fontFamily: "inherit",
                display: "flex", alignItems: "center", gap: 8,
              }}>
                Download for Mac — Free <ArrowIcon />
              </button>
              <span style={{ fontSize: 13, color: GRAY[500] }}>macOS 14+ · Apple Silicon</span>
            </div>
            <a href="#waitlist" style={{ fontSize: 14, color: GRAY[500], textDecoration: "none", marginTop: 12, display: "inline-block", borderBottom: `1px dashed ${GRAY[700]}` }}>
              Not on Mac? Join the waitlist for Windows, Linux & iOS →
            </a>
          </div>

          {/* Hero visual — floating cursor */}
          <div style={{ position: "absolute", right: "8%", top: "50%", transform: "translateY(-50%)", display: "flex", flexDirection: "column", alignItems: "center" }}>
            <div style={{ position: "relative", width: 320, height: 320 }}>
              <div style={{
                width: 280, height: 200, background: GRAY[900], borderRadius: 12,
                border: `1px solid ${GRAY[800]}`, padding: 16, position: "absolute", top: 40, left: 20,
              }}>
                <div style={{ display: "flex", gap: 6, marginBottom: 12 }}>
                  <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#EF4444" }} />
                  <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#F59E0B" }} />
                  <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#22C55E" }} />
                </div>
                <div style={{ display: "flex", gap: 4, flexDirection: "column" }}>
                  {[80, 60, 100, 45, 75].map((w, i) => (
                    <div key={i} style={{ width: `${w}%`, height: 6, background: GRAY[800], borderRadius: 3 }} />
                  ))}
                </div>
                <div style={{ marginTop: 16, display: "flex", gap: 6 }}>
                  {[40, 55, 35].map((w, i) => (
                    <div key={i} style={{ width: w, height: 20, background: GRAY[800], borderRadius: 4 }} />
                  ))}
                </div>
              </div>
              <div style={{
                position: "absolute", bottom: 60, right: 20,
                animation: "float 3s ease-in-out infinite",
              }}>
                <CursorLogo size={56} />
                <div style={{
                  position: "absolute", top: -8, right: -80,
                  background: GRAY[900], border: `1px solid ${AMBER[500]}44`,
                  borderRadius: 8, padding: "6px 12px", whiteSpace: "nowrap",
                  fontSize: 12, fontWeight: 500, color: AMBER[300],
                }}>
                  UV Unwrap
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section id="how" ref={registerSection("how")} style={{ padding: "120px 24px", position: "relative" }}>
        <div style={{
          position: "absolute", left: 0, right: 0, top: 0, height: 1,
          background: `linear-gradient(90deg, transparent, ${GRAY[800]}, transparent)`,
        }} />
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 80 }}>
            <span style={{ fontSize: 13, fontWeight: 600, color: AMBER[500], letterSpacing: 1.5, textTransform: "uppercase" }}>How it works</span>
            <h2 style={{
              fontSize: 44, fontWeight: 700, letterSpacing: -1.5, marginTop: 12, color: GRAY[50],
              opacity: isVisible("how") ? 1 : 0, transform: isVisible("how") ? "translateY(0)" : "translateY(20px)",
              transition: "all 0.6s ease",
            }}>
              Three steps. Zero setup.
            </h2>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 32 }}>
            {steps.map((step, i) => (
              <div key={i} style={{
                opacity: isVisible("how") ? 1 : 0,
                transform: isVisible("how") ? "translateY(0)" : "translateY(30px)",
                transition: `all 0.6s ease ${i * 0.15}s`,
              }}>
                <div style={{
                  fontSize: 48, fontWeight: 700, color: AMBER[500], opacity: 0.2,
                  fontFamily: "'JetBrains Mono', monospace", marginBottom: 16,
                }}>
                  {step.num}
                </div>
                <h3 style={{ fontSize: 22, fontWeight: 600, marginBottom: 10, color: GRAY[50] }}>{step.title}</h3>
                <p style={{ fontSize: 16, lineHeight: 1.6, color: GRAY[400] }}>{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section id="features" ref={registerSection("features")} style={{ padding: "120px 24px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 80 }}>
            <span style={{ fontSize: 13, fontWeight: 600, color: AMBER[500], letterSpacing: 1.5, textTransform: "uppercase" }}>Features</span>
            <h2 style={{
              fontSize: 44, fontWeight: 700, letterSpacing: -1.5, marginTop: 12, color: GRAY[50],
              opacity: isVisible("features") ? 1 : 0, transform: isVisible("features") ? "translateY(0)" : "translateY(20px)",
              transition: "all 0.6s ease",
            }}>
              Not a chatbot. A companion.
            </h2>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24 }}>
            {features.map((f, i) => (
              <div key={i} className="card-hover" style={{
                background: GRAY[900], borderRadius: 16, padding: 32,
                border: `1px solid ${GRAY[800]}`,
                opacity: isVisible("features") ? 1 : 0,
                transform: isVisible("features") ? "translateY(0)" : "translateY(30px)",
                transition: `all 0.5s ease ${i * 0.08}s`,
              }}>
                <div style={{
                  width: 44, height: 44, borderRadius: 10,
                  background: `${AMBER[500]}12`, border: `1px solid ${AMBER[500]}22`,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  marginBottom: 20, color: AMBER[500],
                }}>
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                    {featureIcons[f.icon]}
                  </svg>
                </div>
                <h3 style={{ fontSize: 18, fontWeight: 600, marginBottom: 8, color: GRAY[50] }}>{f.title}</h3>
                <p style={{ fontSize: 15, lineHeight: 1.6, color: GRAY[400] }}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SKILL FORMAT */}
      <section ref={registerSection("skill")} style={{ padding: "120px 24px", position: "relative" }}>
        <div style={{
          position: "absolute", left: 0, right: 0, top: 0, height: 1,
          background: `linear-gradient(90deg, transparent, ${GRAY[800]}, transparent)`,
        }} />
        <div style={{ maxWidth: 1200, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 64, alignItems: "center" }}>
          <div style={{
            opacity: isVisible("skill") ? 1 : 0,
            transform: isVisible("skill") ? "translateY(0)" : "translateY(20px)",
            transition: "all 0.6s ease",
          }}>
            <span style={{ fontSize: 13, fontWeight: 600, color: AMBER[500], letterSpacing: 1.5, textTransform: "uppercase" }}>Skill format</span>
            <h2 style={{ fontSize: 40, fontWeight: 700, letterSpacing: -1.5, marginTop: 12, marginBottom: 20, color: GRAY[50] }}>
              One Markdown file.{" "}
              <span style={{ color: AMBER[500] }}>That's a skill.</span>
            </h2>
            <p style={{ fontSize: 17, lineHeight: 1.7, color: GRAY[400], marginBottom: 24 }}>
              Skills are simple SKILL.md files with YAML frontmatter. Define the app, the teaching style, curriculum stages, and UI vocabulary. Skilly does the rest.
            </p>
            <p style={{ fontSize: 17, lineHeight: 1.7, color: GRAY[400], marginBottom: 32 }}>
              Anyone can write a skill — no code, no SDK, no API integration. Just Markdown that any AI model consumes natively.
            </p>
            <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
              <span style={{ fontSize: 14, color: GRAY[500] }}>Skill marketplace coming soon</span>
              <div style={{ height: 1, flex: 1, background: GRAY[800] }} />
            </div>
          </div>

          <div className="code-block amber-glow" style={{
            background: GRAY[900], borderRadius: 16, border: `1px solid ${GRAY[800]}`,
            overflow: "hidden",
            opacity: isVisible("skill") ? 1 : 0,
            transform: isVisible("skill") ? "translateY(0)" : "translateY(20px)",
            transition: "all 0.6s ease 0.15s",
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "12px 16px", borderBottom: `1px solid ${GRAY[800]}` }}>
              <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#EF4444" }} />
              <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#F59E0B" }} />
              <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#22C55E" }} />
              <span style={{ marginLeft: 8, fontSize: 12, color: GRAY[500], fontFamily: "'JetBrains Mono', monospace" }}>blender-fundamentals-SKILL.md</span>
            </div>
            <pre style={{
              padding: 20, fontSize: 13, lineHeight: 1.7, color: GRAY[300], overflow: "auto",
              fontFamily: "'JetBrains Mono', monospace", maxHeight: 460,
            }}>
              {skillYaml.split("\n").map((line, i) => {
                let color = GRAY[300];
                if (line.startsWith("---")) color = GRAY[500];
                else if (line.startsWith("##")) color = AMBER[400];
                else if (line.startsWith("###")) color = AMBER[300];
                else if (line.match(/^\w+:/)) color = AMBER[500];
                else if (line.startsWith("  -")) color = GRAY[400];
                return <div key={i} style={{ color }}>{line || "\u00A0"}</div>;
              })}
            </pre>
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section id="pricing" ref={registerSection("pricing")} style={{ padding: "120px 24px", position: "relative" }}>
        <div style={{
          position: "absolute", left: 0, right: 0, top: 0, height: 1,
          background: `linear-gradient(90deg, transparent, ${GRAY[800]}, transparent)`,
        }} />
        <div style={{ maxWidth: 1000, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 80 }}>
            <span style={{ fontSize: 13, fontWeight: 600, color: AMBER[500], letterSpacing: 1.5, textTransform: "uppercase" }}>Pricing</span>
            <h2 style={{
              fontSize: 44, fontWeight: 700, letterSpacing: -1.5, marginTop: 12, color: GRAY[50],
              opacity: isVisible("pricing") ? 1 : 0, transform: isVisible("pricing") ? "translateY(0)" : "translateY(20px)",
              transition: "all 0.6s ease",
            }}>
              Start free. Scale when ready.
            </h2>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20 }}>
            {tiers.map((tier, i) => (
              <div key={i} className="card-hover" style={{
                background: tier.highlight ? GRAY[900] : GRAY[900],
                borderRadius: 20, padding: 36,
                border: tier.highlight ? `2px solid ${AMBER[500]}` : `1px solid ${GRAY[800]}`,
                position: "relative", overflow: "hidden",
                opacity: isVisible("pricing") ? 1 : 0,
                transform: isVisible("pricing") ? "translateY(0)" : "translateY(30px)",
                transition: `all 0.5s ease ${i * 0.1}s`,
              }}>
                {tier.highlight && (
                  <div style={{
                    position: "absolute", top: 16, right: 16,
                    background: `${AMBER[500]}18`, color: AMBER[300],
                    padding: "4px 12px", borderRadius: 100, fontSize: 12, fontWeight: 600,
                  }}>
                    Recommended
                  </div>
                )}
                <div style={{ marginBottom: 24 }}>
                  <h3 style={{ fontSize: 20, fontWeight: 600, color: GRAY[50], marginBottom: 4 }}>{tier.name}</h3>
                  <p style={{ fontSize: 14, color: GRAY[500] }}>{tier.desc}</p>
                </div>
                <div style={{ marginBottom: 28 }}>
                  <span style={{ fontSize: 48, fontWeight: 700, color: GRAY[50] }}>{tier.price}</span>
                  <span style={{ fontSize: 16, color: GRAY[500] }}>{tier.period}</span>
                </div>
                <button className={tier.highlight ? "cta-btn" : "ghost-btn"} style={{
                  width: "100%", padding: "12px 24px", borderRadius: 8,
                  background: tier.highlight ? AMBER[500] : "transparent",
                  color: tier.highlight ? GRAY[950] : GRAY[300],
                  border: tier.highlight ? "none" : `1px solid ${GRAY[700]}`,
                  fontSize: 15, fontWeight: 600, cursor: "pointer", fontFamily: "inherit",
                  marginBottom: 28,
                }}>
                  {tier.cta}
                </button>
                <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                  {tier.features.map((f, j) => (
                    <div key={j} style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 14, color: GRAY[400] }}>
                      <CheckIcon /> {f}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WAITLIST — Other Platforms */}
      <section id="waitlist" ref={registerSection("waitlist")} style={{ padding: "120px 24px", position: "relative" }}>
        <div style={{
          position: "absolute", left: 0, right: 0, top: 0, height: 1,
          background: `linear-gradient(90deg, transparent, ${GRAY[800]}, transparent)`,
        }} />
        <div style={{ maxWidth: 560, margin: "0 auto", textAlign: "center" }}>
          <span style={{ fontSize: 13, fontWeight: 600, color: AMBER[500], letterSpacing: 1.5, textTransform: "uppercase" }}>Coming soon</span>
          <h2 style={{
            fontSize: 40, fontWeight: 700, letterSpacing: -1.5, marginTop: 12, marginBottom: 16, color: GRAY[50],
            opacity: isVisible("waitlist") ? 1 : 0, transform: isVisible("waitlist") ? "translateY(0)" : "translateY(20px)",
            transition: "all 0.6s ease",
          }}>
            Not on Mac?
          </h2>
          <p style={{
            fontSize: 17, lineHeight: 1.6, color: GRAY[400], marginBottom: 40,
            opacity: isVisible("waitlist") ? 1 : 0, transition: "all 0.6s ease 0.1s",
          }}>
            Skilly is Mac-first, but Windows and Linux are on the roadmap. Join the waitlist and we'll email you when your platform launches.
          </p>

          {!waitlistSubmitted ? (
            <div style={{
              background: GRAY[900], borderRadius: 20, border: `1px solid ${GRAY[800]}`,
              padding: 36, textAlign: "left",
              opacity: isVisible("waitlist") ? 1 : 0, transform: isVisible("waitlist") ? "translateY(0)" : "translateY(20px)",
              transition: "all 0.6s ease 0.2s",
            }}>
              <label style={{ fontSize: 14, fontWeight: 500, color: GRAY[300], display: "block", marginBottom: 8 }}>
                Choose your platform
              </label>
              <div style={{ display: "flex", gap: 10, marginBottom: 24 }}>
                {[
                  { id: "windows", label: "Windows", icon: "M2 3h9v9H2V3zm11 0h9v9h-9V3zM2 14h9v9H2v-9zm11 0h9v9h-9v-9z" },
                  { id: "linux", label: "Linux", icon: "M12 2C9 2 7 5 7 8c0 2-2 3-3 5s0 4 1 5c2 2 5 2 7 2s5 0 7-2c1-1 2-3 1-5s-3-3-3-5c0-3-2-6-5-6z" },
                  { id: "ios", label: "iOS / iPad", icon: "M6 2h12a2 2 0 012 2v16a2 2 0 01-2 2H6a2 2 0 01-2-2V4a2 2 0 012-2zm6 17a1 1 0 100 2 1 1 0 000-2z" },
                ].map((p) => (
                  <button
                    key={p.id}
                    onClick={() => setWaitlistPlatform(p.id)}
                    style={{
                      flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 8,
                      padding: "16px 12px", borderRadius: 12, cursor: "pointer", fontFamily: "inherit",
                      background: waitlistPlatform === p.id ? `${AMBER[500]}15` : "transparent",
                      border: waitlistPlatform === p.id ? `2px solid ${AMBER[500]}` : `1px solid ${GRAY[700]}`,
                      transition: "all 0.2s ease",
                    }}
                  >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                      stroke={waitlistPlatform === p.id ? AMBER[500] : GRAY[500]}
                      strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d={p.icon} />
                    </svg>
                    <span style={{
                      fontSize: 13, fontWeight: 500,
                      color: waitlistPlatform === p.id ? AMBER[300] : GRAY[400],
                    }}>
                      {p.label}
                    </span>
                  </button>
                ))}
              </div>

              <label style={{ fontSize: 14, fontWeight: 500, color: GRAY[300], display: "block", marginBottom: 8 }}>
                Email address
              </label>
              <div style={{ display: "flex", gap: 10 }}>
                <input
                  type="email"
                  value={waitlistEmail}
                  onChange={(e) => setWaitlistEmail(e.target.value)}
                  placeholder="you@example.com"
                  onKeyDown={(e) => e.key === "Enter" && handleWaitlistSubmit()}
                  style={{
                    flex: 1, padding: "12px 16px", borderRadius: 8, fontSize: 15,
                    background: GRAY[950], border: `1px solid ${GRAY[700]}`,
                    color: GRAY[200], outline: "none", fontFamily: "inherit",
                    transition: "border-color 0.2s ease",
                  }}
                  onFocus={(e) => e.target.style.borderColor = AMBER[500]}
                  onBlur={(e) => e.target.style.borderColor = GRAY[700]}
                />
                <button
                  onClick={handleWaitlistSubmit}
                  disabled={!waitlistEmail || !waitlistPlatform || waitlistLoading}
                  className="cta-btn"
                  style={{
                    background: (!waitlistEmail || !waitlistPlatform) ? GRAY[700] : AMBER[500],
                    color: (!waitlistEmail || !waitlistPlatform) ? GRAY[500] : GRAY[950],
                    border: "none", borderRadius: 8, padding: "12px 24px",
                    fontSize: 15, fontWeight: 600, cursor: (!waitlistEmail || !waitlistPlatform) ? "not-allowed" : "pointer",
                    fontFamily: "inherit", whiteSpace: "nowrap", transition: "all 0.2s ease",
                    opacity: waitlistLoading ? 0.7 : 1,
                  }}
                >
                  {waitlistLoading ? "Joining..." : "Join waitlist"}
                </button>
              </div>

              <p style={{ fontSize: 12, color: GRAY[600], marginTop: 12 }}>
                No spam. One email when your platform launches. That's it.
              </p>
            </div>
          ) : (
            <div style={{
              background: GRAY[900], borderRadius: 20, border: `1px solid ${AMBER[500]}44`,
              padding: 48, textAlign: "center",
              animation: "fadeUp 0.5s ease",
            }}>
              <div style={{
                width: 56, height: 56, borderRadius: "50%",
                background: `${AMBER[500]}18`, border: `2px solid ${AMBER[500]}44`,
                display: "flex", alignItems: "center", justifyContent: "center",
                margin: "0 auto 20px",
              }}>
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke={AMBER[500]} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12l5 5L20 7" />
                </svg>
              </div>
              <h3 style={{ fontSize: 22, fontWeight: 600, color: GRAY[50], marginBottom: 8 }}>
                You're on the list!
              </h3>
              <p style={{ fontSize: 15, color: GRAY[400], lineHeight: 1.6 }}>
                We'll email <span style={{ color: AMBER[300] }}>{waitlistEmail}</span> when Skilly launches on{" "}
                <span style={{ color: AMBER[300] }}>
                  {waitlistPlatform === "windows" ? "Windows" : waitlistPlatform === "linux" ? "Linux" : "iOS / iPad"}
                </span>.
              </p>
            </div>
          )}

          <div style={{ display: "flex", justifyContent: "center", gap: 24, marginTop: 32 }}>
            {[
              { label: "macOS", status: "Available now", color: "#22C55E" },
              { label: "Windows", status: "In development", color: AMBER[500] },
              { label: "Linux", status: "Planned", color: GRAY[500] },
              { label: "iOS / iPad", status: "Exploring", color: GRAY[500] },
            ].map((p, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 6 }}>
                <div style={{ width: 6, height: 6, borderRadius: "50%", background: p.color }} />
                <span style={{ fontSize: 13, color: GRAY[400] }}>{p.label}</span>
                <span style={{ fontSize: 11, color: GRAY[600] }}>— {p.status}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section ref={registerSection("cta")} style={{ padding: "120px 24px", textAlign: "center" }}>
        <div style={{ maxWidth: 600, margin: "0 auto" }}>
          <CursorLogo size={56} />
          <h2 style={{
            fontSize: 44, fontWeight: 700, letterSpacing: -1.5, marginTop: 24, marginBottom: 16, color: GRAY[50],
            opacity: isVisible("cta") ? 1 : 0, transform: isVisible("cta") ? "translateY(0)" : "translateY(20px)",
            transition: "all 0.6s ease",
          }}>
            Stop watching tutorials.
            <br />
            <span style={{ color: AMBER[500] }}>Start doing.</span>
          </h2>
          <p style={{ fontSize: 18, color: GRAY[400], marginBottom: 36, lineHeight: 1.6 }}>
            Download Skilly, load a skill, and let the cursor show you the way.
          </p>
          <button className="cta-btn" style={{
            background: AMBER[500], color: GRAY[950], border: "none", borderRadius: 8,
            padding: "16px 40px", fontSize: 18, fontWeight: 600, cursor: "pointer", fontFamily: "inherit",
            display: "inline-flex", alignItems: "center", gap: 8,
          }}>
            Download for Mac — Free <ArrowIcon />
          </button>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{
        borderTop: `1px solid ${GRAY[800]}`, padding: "48px 24px",
      }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <CursorLogo size={20} />
            <span style={{ fontSize: 15, fontWeight: 600 }}>skilly</span>
            <span style={{ fontSize: 13, color: GRAY[500], marginLeft: 8 }}>by moelabs.dev</span>
          </div>
          <div style={{ display: "flex", gap: 24 }}>
            <a href="#" style={{ color: GRAY[500], textDecoration: "none", fontSize: 14 }}>GitHub</a>
            <a href="#" style={{ color: GRAY[500], textDecoration: "none", fontSize: 14 }}>X / Twitter</a>
            <a href="#" style={{ color: GRAY[500], textDecoration: "none", fontSize: 14 }}>Discord</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
