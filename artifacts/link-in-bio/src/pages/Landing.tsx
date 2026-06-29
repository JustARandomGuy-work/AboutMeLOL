import { useEffect, useRef, useState, useCallback } from "react";
import { ArrowRight, Sparkles, Zap, Shield, BarChart3, Palette, Link2, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";

/* ── Brand icons (inline SVG) ── */
const DiscordIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-3 h-3">
    <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057.102 18.079.114 18.1.132 18.11a19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/>
  </svg>
);

const TikTokIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-3 h-3">
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.78 1.52V6.75a4.86 4.86 0 0 1-1.01-.06z"/>
  </svg>
);

const InstagramIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-3 h-3">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/>
  </svg>
);

const GithubIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-3 h-3">
    <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
  </svg>
);

/* ── Scroll-reveal hook ── */
function useScrollReveal() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); observer.disconnect(); } },
      { threshold: 0.12 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return { ref, visible };
}

/* ── Reveal wrapper ── */
function Reveal({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  const { ref, visible } = useScrollReveal();
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0px)" : "translateY(40px)",
        transition: `opacity 0.7s ease ${delay}ms, transform 0.7s ease ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

/* ── Background orbs ── */
function ParticleOrbs() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="animate-orb-pulse absolute rounded-full" style={{ width: 600, height: 600, top: "-10%", left: "50%", transform: "translateX(-50%)", background: "radial-gradient(circle, rgba(180,80,255,0.22) 0%, transparent 70%)", filter: "blur(40px)", animationDelay: "0s" }} />
      <div className="animate-orb-pulse absolute rounded-full" style={{ width: 400, height: 400, top: "30%", left: "-8%", background: "radial-gradient(circle, rgba(120,40,200,0.18) 0%, transparent 70%)", filter: "blur(50px)", animationDelay: "2s" }} />
      <div className="animate-orb-pulse absolute rounded-full" style={{ width: 350, height: 350, top: "20%", right: "-5%", background: "radial-gradient(circle, rgba(200,60,255,0.15) 0%, transparent 70%)", filter: "blur(50px)", animationDelay: "1s" }} />
      <div className="animate-orb-pulse absolute rounded-full" style={{ width: 500, height: 500, bottom: "5%", right: "10%", background: "radial-gradient(circle, rgba(150,50,255,0.12) 0%, transparent 70%)", filter: "blur(60px)", animationDelay: "3s" }} />
      <svg className="absolute inset-0 w-full h-full opacity-[0.04]" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="grid" width="60" height="60" patternUnits="userSpaceOnUse">
            <path d="M 60 0 L 0 0 0 60" fill="none" stroke="white" strokeWidth="1"/>
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />
      </svg>
    </div>
  );
}

/* ── Dashboard mockup ── */
function DashboardMockup() {
  return (
    <div className="animate-tilt-hover relative rounded-2xl overflow-hidden shadow-[0_30px_80px_rgba(0,0,0,0.6),0_0_0_1px_rgba(255,255,255,0.08),0_0_60px_rgba(150,80,255,0.15)]" style={{ width: 520, background: "hsl(264,40%,7%)" }}>
      <div className="flex items-center gap-2 px-4 py-3 border-b border-white/8" style={{ background: "hsl(264,40%,9%)" }}>
        <div className="flex gap-1.5">
          <div className="w-3 h-3 rounded-full bg-red-500/70" />
          <div className="w-3 h-3 rounded-full bg-yellow-500/70" />
          <div className="w-3 h-3 rounded-full bg-green-500/70" />
        </div>
        <div className="flex-1 mx-3 h-5 rounded-full bg-white/5 border border-white/8 flex items-center px-3">
          <span className="text-[10px] text-white/30 font-mono">about-me.lol/dashboard</span>
        </div>
      </div>
      <div className="flex" style={{ height: 340 }}>
        <div className="w-44 border-r border-white/5 p-4 flex flex-col gap-1" style={{ background: "hsl(264,40%,6%)" }}>
          <div className="text-[10px] font-bold text-white/30 uppercase tracking-widest mb-2 px-2">Menu</div>
          {[{ label: "Overview", active: true }, { label: "My Links", active: false }, { label: "Appearance", active: false }, { label: "Analytics", active: false }, { label: "Settings", active: false }].map((item) => (
            <div key={item.label} className={`flex items-center gap-2 px-3 py-2 rounded-lg text-[11px] font-medium ${item.active ? "bg-purple-500/20 text-purple-300" : "text-white/40"}`}>
              <div className={`w-1.5 h-1.5 rounded-full ${item.active ? "bg-purple-400" : "bg-white/20"}`} />
              {item.label}
            </div>
          ))}
          <div className="mt-auto">
            <div className="rounded-lg p-3" style={{ background: "linear-gradient(135deg, rgba(150,60,255,0.2), rgba(100,30,200,0.2))", border: "1px solid rgba(150,80,255,0.3)" }}>
              <div className="text-[10px] font-bold text-purple-300 mb-1">✦ Upgrade</div>
              <div className="text-[9px] text-white/40">Unlock premium</div>
            </div>
          </div>
        </div>
        <div className="flex-1 p-4 space-y-3 overflow-hidden">
          <div className="text-sm font-bold text-white/90">Account Overview</div>
          <div className="grid grid-cols-2 gap-2">
            {[{ label: "Profile Views", val: "1,284" }, { label: "Link Clicks", val: "392" }, { label: "Followers", val: "8.4k" }, { label: "Conversion", val: "30.5%" }].map((s) => (
              <div key={s.label} className="rounded-xl p-3 border border-white/5" style={{ background: "hsl(264,35%,10%)" }}>
                <div className="text-[9px] text-white/40 mb-1">{s.label}</div>
                <div className="text-base font-bold text-white">{s.val}</div>
              </div>
            ))}
          </div>
          <div className="rounded-xl p-3 border border-white/5" style={{ background: "hsl(264,35%,10%)" }}>
            <div className="text-[10px] text-white/40 mb-2">Views — last 7 days</div>
            <svg viewBox="0 0 260 60" className="w-full" style={{ height: 60 }}>
              <defs>
                <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="rgba(160,80,255,0.5)" />
                  <stop offset="100%" stopColor="rgba(160,80,255,0)" />
                </linearGradient>
              </defs>
              <path d="M0,50 C30,45 50,20 80,25 C110,30 130,10 160,15 C190,20 220,5 260,8 L260,60 L0,60Z" fill="url(#chartGrad)" />
              <path d="M0,50 C30,45 50,20 80,25 C110,30 130,10 160,15 C190,20 220,5 260,8" fill="none" stroke="rgba(180,100,255,0.8)" strokeWidth="2" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

const SOCIAL_ICONS = [
  { icon: <DiscordIcon />, color: "#5865F2" },
  { icon: <TikTokIcon />, color: "#010101" },
  { icon: <InstagramIcon />, color: "#E1306C" },
  { icon: <GithubIcon />, color: "#333" },
];

/* ── Phone mockup ── */
function PhoneMockup({ handle, bio, animDelay = 0 }: { handle: string; bio: string; animDelay?: number }) {
  return (
    <div
      className="animate-tilt-hover-right relative rounded-[2.5rem] overflow-hidden shadow-[0_30px_80px_rgba(0,0,0,0.7),0_0_0_1px_rgba(255,255,255,0.1),0_0_40px_rgba(150,80,255,0.2)]"
      style={{ width: 200, height: 400, background: "linear-gradient(160deg, hsl(270,50%,10%), hsl(264,50%,7%))", animationDelay: `${animDelay}s`, border: "1.5px solid rgba(255,255,255,0.08)" }}
    >
      <div className="absolute top-0 inset-x-0 h-5 flex justify-center" style={{ zIndex: 10 }}>
        <div className="w-20 h-4 rounded-b-xl" style={{ background: "hsl(264,40%,7%)" }} />
      </div>
      <div className="flex flex-col items-center p-5 pt-10 h-full">
        <div className="w-16 h-16 rounded-full mb-3 flex items-center justify-center text-2xl shadow-[0_0_20px_rgba(180,80,255,0.5)]"
          style={{ background: "linear-gradient(135deg, #a855f7, #7c3aed)", border: "2px solid rgba(255,255,255,0.15)" }}>
          👤
        </div>
        <div className="text-[11px] font-bold text-white mb-0.5">{handle}</div>
        <div className="text-[9px] text-white/40 mb-4 text-center">{bio}</div>
        <div className="flex gap-2 mb-4">
          {SOCIAL_ICONS.map((s, i) => (
            <div key={i} className="w-6 h-6 rounded-full flex items-center justify-center text-white"
              style={{ background: s.color, opacity: 0.9 }}>
              {s.icon}
            </div>
          ))}
        </div>
        <div className="w-full space-y-2">
          {["My Portfolio", "Discord Server", "GitHub"].map((label, i) => (
            <div key={i} className="w-full py-2.5 rounded-xl text-center text-[10px] font-bold text-white"
              style={{ background: i === 0 ? "linear-gradient(90deg, rgba(168,85,247,0.6), rgba(124,58,237,0.6))" : "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.08)" }}>
              {label}
            </div>
          ))}
        </div>
        <div className="mt-auto text-[8px] text-white/20">about-me.lol/{handle.replace("@", "").toLowerCase()}</div>
      </div>
    </div>
  );
}

const FEATURES = [
  { icon: Palette, title: "Fully Customizable", desc: "Themes, gradients, animated backgrounds, custom fonts — make it yours down to the pixel.", glow: "rgba(168,85,247,0.15)" },
  { icon: BarChart3, title: "Deep Analytics", desc: "Track profile views, link clicks, referrers, and geographic data in real time.", glow: "rgba(99,102,241,0.15)" },
  { icon: Zap, title: "Blazing Fast", desc: "Sub-second load times. Static CDN delivery. Your page loads before they blink.", glow: "rgba(245,158,11,0.12)" },
  { icon: Link2, title: "Unlimited Links", desc: "Add as many links as you want. Reorder with drag-and-drop. Toggle visibility instantly.", glow: "rgba(168,85,247,0.15)" },
  { icon: Shield, title: "Secure by Default", desc: "HTTPS everywhere, OAuth login, and no ads. Your data stays yours.", glow: "rgba(16,185,129,0.12)" },
  { icon: Sparkles, title: "$9 Lifetime Premium", desc: "No subscriptions. Pay once, own it forever. Premium effects, badge, and priority features.", glow: "rgba(251,191,36,0.12)" },
];

export default function LandingPage() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);

  return (
    <div className="flex flex-col relative">

      {/* ── HERO ── */}
      <section className="relative overflow-hidden min-h-screen flex flex-col items-center justify-start pt-36 pb-0">
        <ParticleOrbs />

        <div className="relative z-10 flex flex-col items-center text-center px-4 w-full max-w-5xl mx-auto">
          <div className={`inline-flex items-center gap-2 rounded-full border border-purple-500/30 bg-purple-500/10 px-4 py-1.5 text-sm font-semibold text-purple-300 mb-8 transition-all duration-700 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
            <Sparkles className="h-3.5 w-3.5" />
            The modern link-in-bio for creators
          </div>

          <h1 className={`text-6xl sm:text-7xl md:text-8xl lg:text-[96px] font-black tracking-tight leading-[0.9] mb-6 transition-all duration-700 delay-100 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
            Everything you want,{" "}
            <span className="animate-gradient-shift bg-clip-text text-transparent" style={{ backgroundImage: "linear-gradient(90deg, #c084fc, #a855f7, #7c3aed, #c084fc)" }}>
              right here.
            </span>
          </h1>

          <p className={`max-w-2xl text-lg md:text-xl text-white/50 mb-10 transition-all duration-700 delay-200 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
            About Me is your home for modern, feature-rich profile pages. One link. Every platform. Zero compromise.
          </p>

          <div className={`flex flex-col sm:flex-row gap-4 mb-24 transition-all duration-700 delay-300 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
            <Button asChild size="lg" className="h-13 px-8 text-base font-bold rounded-full text-white shadow-[0_0_40px_rgba(150,80,255,0.5)] hover:shadow-[0_0_60px_rgba(150,80,255,0.7)] transition-shadow"
              style={{ background: "linear-gradient(135deg, #a855f7, #7c3aed)", border: "1px solid rgba(255,255,255,0.15)" }}>
              <Link href="/register">Sign Up for Free <ArrowRight className="ml-2 h-5 w-5" /></Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="h-13 px-8 text-base font-semibold rounded-full border-white/10 bg-white/5 hover:bg-white/8 text-white/80">
              <a href="#pricing">View Pricing</a>
            </Button>
          </div>

          {/* 3D Mockups */}
          <div className={`relative w-full flex items-end justify-center gap-6 transition-all duration-1000 delay-500 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-16"}`}
            style={{ perspective: "1200px", minHeight: 380 }}>
            <div className="hidden lg:block" style={{ transform: "translateY(40px)" }}>
              <PhoneMockup handle="@AboutMe" bio="about-me.lol on top" animDelay={1} />
            </div>
            <DashboardMockup />
            <div className="hidden lg:block" style={{ transform: "translateY(60px)" }}>
              <PhoneMockup handle="@Steve" bio="Hi im Steve" animDelay={2} />
            </div>
            <div className="absolute bottom-0 left-0 right-0 pointer-events-none" style={{ height: 180, background: "linear-gradient(to top, hsl(264,60%,5%) 40%, transparent)" }} />
          </div>
        </div>
      </section>

      {/* ── FEATURES ── */}
      <section id="features" className="relative py-28 px-4">
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute w-96 h-96 rounded-full top-0 left-1/2 -translate-x-1/2 -translate-y-1/2"
            style={{ background: "radial-gradient(circle, rgba(120,40,200,0.12) 0%, transparent 70%)", filter: "blur(40px)" }} />
        </div>
        <div className="relative z-10 max-w-6xl mx-auto px-4">
          <Reveal className="text-center mb-16 flex flex-col items-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-purple-500/20 bg-purple-500/8 px-4 py-1.5 text-sm font-semibold text-purple-400 mb-5">
              <Zap className="h-3.5 w-3.5" /> Why About Me
            </div>
            <h2 className="text-4xl md:text-5xl font-black tracking-tight mb-4">Built for the culture.</h2>
            <p className="text-white/50 text-lg max-w-xl">Everything you need to stand out. Nothing you don't.</p>
          </Reveal>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {FEATURES.map((f, i) => (
              <Reveal key={i} delay={i * 80}>
                <div className="group relative rounded-2xl p-6 border border-white/5 overflow-hidden transition-all duration-300 hover:border-purple-500/25 hover:-translate-y-1 h-full"
                  style={{ background: "hsl(264,40%,8%)" }}>
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-2xl"
                    style={{ background: `radial-gradient(circle at 30% 30%, ${f.glow}, transparent 70%)` }} />
                  <div className="relative z-10">
                    <div className="mb-4 inline-flex items-center justify-center w-10 h-10 rounded-xl"
                      style={{ background: f.glow, border: "1px solid rgba(255,255,255,0.08)" }}>
                      <f.icon className="h-5 w-5 text-purple-300" />
                    </div>
                    <h3 className="text-lg font-bold mb-2 text-white">{f.title}</h3>
                    <p className="text-white/45 text-sm leading-relaxed">{f.desc}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── PROFILES SHOWCASE ── */}
      <section className="relative py-28 px-4 overflow-hidden">
        <div className="relative z-10 max-w-6xl mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <Reveal className="flex-1 space-y-6">
              <div className="inline-flex items-center gap-2 rounded-full border border-purple-500/20 bg-purple-500/8 px-4 py-1.5 text-sm font-semibold text-purple-400">
                <Sparkles className="h-3.5 w-3.5" /> Profile Pages
              </div>
              <h2 className="text-4xl md:text-5xl font-black tracking-tight leading-tight">
                Not just links.<br />
                <span className="text-transparent bg-clip-text" style={{ backgroundImage: "linear-gradient(90deg, #c084fc, #7c3aed)" }}>An experience.</span>
              </h2>
              <p className="text-white/50 text-lg leading-relaxed">
                Your followers deserve more than a generic link tree. Give them a destination that matches your energy — premium themes, animated backgrounds, and glowing accents.
              </p>
              <ul className="space-y-3">
                {["Unlimited links & social icons", "Deep analytics & click tracking", "Custom themes, gradients & fonts", "Avatar upload via Cloudflare R2", "Zero annoying ads, ever"].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-white/80 font-medium text-sm">
                    <div className="h-5 w-5 rounded-full flex items-center justify-center shrink-0"
                      style={{ background: "rgba(168,85,247,0.2)", border: "1px solid rgba(168,85,247,0.4)" }}>
                      <Check className="h-3 w-3 text-purple-400" />
                    </div>
                    {item}
                  </li>
                ))}
              </ul>
              <Button asChild className="rounded-full font-bold text-white px-8 h-12 shadow-[0_0_30px_rgba(150,80,255,0.4)]"
                style={{ background: "linear-gradient(135deg, #a855f7, #7c3aed)" }}>
                <Link href="/register">Claim your link <ArrowRight className="ml-2 h-4 w-4" /></Link>
              </Button>
            </Reveal>
            <Reveal delay={150} className="flex-1 flex justify-center items-center gap-6 relative">
              <div className="absolute w-80 h-80 rounded-full"
                style={{ background: "radial-gradient(circle, rgba(168,85,247,0.2) 0%, transparent 70%)", filter: "blur(60px)" }} />
              <div className="animate-float-slow" style={{ animationDelay: "0s" }}>
                <PhoneMockup handle="@AboutMe" bio="about-me.lol on top" />
              </div>
              <div className="animate-float-slow hidden sm:block" style={{ animationDelay: "1.5s", marginTop: 60 }}>
                <PhoneMockup handle="@Steve" bio="Hi im Steve" animDelay={3} />
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── PRICING ── */}
      <section id="pricing" className="relative py-28 px-4">
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute w-[600px] h-[400px] rounded-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
            style={{ background: "radial-gradient(circle, rgba(120,40,200,0.1) 0%, transparent 70%)", filter: "blur(60px)" }} />
        </div>
        <div className="relative z-10 max-w-4xl mx-auto px-4">
          <Reveal className="text-center mb-14 flex flex-col items-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-purple-500/20 bg-purple-500/8 px-4 py-1.5 text-sm font-semibold text-purple-400 mb-5">
              <Sparkles className="h-3.5 w-3.5" /> Simple Pricing
            </div>
            <h2 className="text-4xl md:text-5xl font-black tracking-tight mb-4">Simple. No tricks.</h2>
            <p className="text-white/50 text-lg">No hidden fees. No subscriptions. Just one-time premium or free forever.</p>
          </Reveal>

          <div className="grid md:grid-cols-2 gap-6">
            {[
              {
                name: "Free", price: "$0", sub: "forever", highlight: false,
                features: ["Unlimited links", "Public profile page", "Basic analytics", "Custom username", "Social icons"],
                cta: "Get started free", href: "/register",
              },
              {
                name: "Premium", price: "$9", sub: "one-time, lifetime", highlight: true,
                features: ["Everything in Free", "Animated backgrounds", "Custom fonts & gradients", "Verified badge", "Priority support", "Early access to new features"],
                cta: "Go Premium", href: "/upgrade",
              },
            ].map((plan, pi) => (
              <Reveal key={plan.name} delay={pi * 120}>
                <div className="relative rounded-2xl p-8 flex flex-col border transition-all duration-300 hover:-translate-y-1 h-full"
                  style={{
                    background: plan.highlight ? "linear-gradient(145deg, hsl(270,50%,12%), hsl(264,40%,9%))" : "hsl(264,40%,8%)",
                    border: plan.highlight ? "1px solid rgba(168,85,247,0.4)" : "1px solid rgba(255,255,255,0.06)",
                    boxShadow: plan.highlight ? "0 0 60px rgba(150,80,255,0.12), inset 0 1px 0 rgba(255,255,255,0.08)" : undefined,
                  }}>
                  {plan.highlight && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                      <span className="rounded-full px-4 py-1 text-xs font-bold text-white" style={{ background: "linear-gradient(90deg, #a855f7, #7c3aed)" }}>
                        Most Popular
                      </span>
                    </div>
                  )}
                  <div className="mb-6">
                    <div className="text-sm font-semibold text-white/50 mb-1">{plan.name}</div>
                    <div className="flex items-end gap-2">
                      <span className="text-5xl font-black text-white">{plan.price}</span>
                      <span className="text-white/40 text-sm mb-2">{plan.sub}</span>
                    </div>
                  </div>
                  <ul className="space-y-3 mb-8 flex-1">
                    {plan.features.map((f, i) => (
                      <li key={i} className="flex items-center gap-3 text-sm text-white/70">
                        <div className="h-4 w-4 rounded-full flex items-center justify-center shrink-0"
                          style={{ background: "rgba(168,85,247,0.2)", border: "1px solid rgba(168,85,247,0.35)" }}>
                          <Check className="h-2.5 w-2.5 text-purple-400" />
                        </div>
                        {f}
                      </li>
                    ))}
                  </ul>
                  <Button asChild className="w-full rounded-full font-bold h-12 text-white transition-all"
                    style={{
                      background: plan.highlight ? "linear-gradient(135deg, #a855f7, #7c3aed)" : "rgba(255,255,255,0.07)",
                      border: plan.highlight ? undefined : "1px solid rgba(255,255,255,0.1)",
                    }}>
                    <Link href={plan.href}>{plan.cta}</Link>
                  </Button>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="relative py-28 px-4 overflow-hidden">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse 80% 60% at 50% 50%, rgba(120,40,200,0.15), transparent)" }} />
          <div className="absolute top-0 left-0 right-0 h-px" style={{ background: "linear-gradient(90deg, transparent, rgba(168,85,247,0.4), transparent)" }} />
        </div>
        <Reveal className="relative z-10 text-center max-w-3xl mx-auto px-4 flex flex-col items-center">
          <h2 className="text-4xl md:text-6xl font-black tracking-tight mb-6 leading-tight">
            Your link. Your vibe.<br />
            <span className="text-transparent bg-clip-text animate-gradient-shift"
              style={{ backgroundImage: "linear-gradient(90deg, #c084fc, #a855f7, #7c3aed, #c084fc)" }}>
              Your About Me.
            </span>
          </h2>
          <p className="text-white/50 text-lg mb-10">
            Join thousands of creators who leveled up their bio. Get started free in under 30 seconds.
          </p>
          <Button asChild size="lg" className="h-14 px-12 text-lg font-bold rounded-full text-white shadow-[0_0_50px_rgba(150,80,255,0.5)] hover:shadow-[0_0_70px_rgba(150,80,255,0.7)] transition-shadow"
            style={{ background: "linear-gradient(135deg, #a855f7, #7c3aed)", border: "1px solid rgba(255,255,255,0.15)" }}>
            <Link href="/register">Create your page — it's free</Link>
          </Button>
        </Reveal>
      </section>
    </div>
  );
}
