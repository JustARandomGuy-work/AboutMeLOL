import { useEffect, useRef, useState } from "react";
import { ArrowRight, Sparkles, Zap, Shield, BarChart3, Palette, Link2, Check, Diamond } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";

/* ── Brand icons ── */
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

/* ── Scroll-reveal ── */
function useScrollReveal() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } }, { threshold: 0.1 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return { ref, visible };
}

function Reveal({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  const { ref, visible } = useScrollReveal();
  return (
    <div ref={ref} className={className} style={{ opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(32px)", transition: `opacity 0.6s ease ${delay}ms, transform 0.6s ease ${delay}ms` }}>
      {children}
    </div>
  );
}

/* ── Orbs ── */
function ParticleOrbs() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="animate-orb-pulse absolute rounded-full" style={{ width: 500, height: 500, top: "-8%", left: "50%", transform: "translateX(-50%)", background: "radial-gradient(circle, rgba(180,80,255,0.2) 0%, transparent 70%)", filter: "blur(40px)" }} />
      <div className="animate-orb-pulse absolute rounded-full" style={{ width: 300, height: 300, top: "30%", left: "-5%", background: "radial-gradient(circle, rgba(120,40,200,0.16) 0%, transparent 70%)", filter: "blur(50px)", animationDelay: "2s" }} />
      <div className="animate-orb-pulse absolute rounded-full" style={{ width: 280, height: 280, top: "15%", right: "-3%", background: "radial-gradient(circle, rgba(200,60,255,0.13) 0%, transparent 70%)", filter: "blur(50px)", animationDelay: "1s" }} />
      <svg className="absolute inset-0 w-full h-full opacity-[0.035]" xmlns="http://www.w3.org/2000/svg">
        <defs><pattern id="grid" width="50" height="50" patternUnits="userSpaceOnUse"><path d="M 50 0 L 0 0 0 50" fill="none" stroke="white" strokeWidth="1"/></pattern></defs>
        <rect width="100%" height="100%" fill="url(#grid)" />
      </svg>
    </div>
  );
}

/* ── Dashboard mockup ── */
function DashboardMockup() {
  return (
    <div className="animate-tilt-hover relative rounded-xl overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.6),0_0_0_1px_rgba(255,255,255,0.07),0_0_40px_rgba(150,80,255,0.12)]" style={{ width: 460, background: "hsl(264,40%,7%)" }}>
      <div className="flex items-center gap-2 px-3 py-2 border-b border-white/8" style={{ background: "hsl(264,40%,9%)" }}>
        <div className="flex gap-1"><div className="w-2.5 h-2.5 rounded-full bg-red-500/70" /><div className="w-2.5 h-2.5 rounded-full bg-yellow-500/70" /><div className="w-2.5 h-2.5 rounded-full bg-green-500/70" /></div>
        <div className="flex-1 mx-2 h-4 rounded-full bg-white/5 border border-white/8 flex items-center px-2">
          <span className="text-[9px] text-white/30 font-mono">about-me.lol/dashboard</span>
        </div>
      </div>
      <div className="flex" style={{ height: 280 }}>
        <div className="w-36 border-r border-white/5 p-3 flex flex-col gap-0.5" style={{ background: "hsl(264,40%,6%)" }}>
          <div className="text-[9px] font-bold text-white/30 uppercase tracking-widest mb-2 px-2">Menu</div>
          {["Overview","My Links","Appearance","Analytics","Settings"].map((label, i) => (
            <div key={label} className={`flex items-center gap-1.5 px-2 py-1.5 rounded-lg text-[10px] font-medium ${i === 0 ? "bg-purple-500/20 text-purple-300" : "text-white/40"}`}>
              <div className={`w-1 h-1 rounded-full ${i === 0 ? "bg-purple-400" : "bg-white/20"}`} />{label}
            </div>
          ))}
          <div className="mt-auto">
            <div className="rounded-lg p-2" style={{ background: "linear-gradient(135deg, rgba(150,60,255,0.2), rgba(100,30,200,0.2))", border: "1px solid rgba(150,80,255,0.3)" }}>
              <div className="text-[9px] font-bold text-purple-300">✦ Upgrade</div>
              <div className="text-[8px] text-white/40">Unlock premium</div>
            </div>
          </div>
        </div>
        <div className="flex-1 p-3 space-y-2 overflow-hidden">
          <div className="text-xs font-bold text-white/90">Account Overview</div>
          <div className="grid grid-cols-2 gap-1.5">
            {[{ label: "Profile Views", val: "1,284" },{ label: "Link Clicks", val: "392" },{ label: "Followers", val: "8.4k" },{ label: "Conversion", val: "30.5%" }].map(s => (
              <div key={s.label} className="rounded-lg p-2 border border-white/5" style={{ background: "hsl(264,35%,10%)" }}>
                <div className="text-[8px] text-white/40">{s.label}</div>
                <div className="text-sm font-bold text-white">{s.val}</div>
              </div>
            ))}
          </div>
          <div className="rounded-lg p-2 border border-white/5" style={{ background: "hsl(264,35%,10%)" }}>
            <div className="text-[9px] text-white/40 mb-1">Views — last 7 days</div>
            <svg viewBox="0 0 240 50" className="w-full" style={{ height: 50 }}>
              <defs><linearGradient id="cg" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="rgba(160,80,255,0.5)"/><stop offset="100%" stopColor="rgba(160,80,255,0)"/></linearGradient></defs>
              <path d="M0,42 C25,38 45,16 70,20 C95,24 115,6 140,10 C165,14 195,2 240,4 L240,50 L0,50Z" fill="url(#cg)"/>
              <path d="M0,42 C25,38 45,16 70,20 C95,24 115,6 140,10 C165,14 195,2 240,4" fill="none" stroke="rgba(180,100,255,0.8)" strokeWidth="1.5"/>
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

const SOCIAL_ICONS = [
  { icon: <DiscordIcon />, color: "#5865F2" },
  { icon: <TikTokIcon />, color: "#111" },
  { icon: <InstagramIcon />, color: "#E1306C" },
  { icon: <GithubIcon />, color: "#24292e" },
];

function PhoneMockup({ handle, bio, animDelay = 0 }: { handle: string; bio: string; animDelay?: number }) {
  return (
    <div className="animate-tilt-hover-right relative rounded-[2rem] overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.7),0_0_0_1px_rgba(255,255,255,0.09),0_0_30px_rgba(150,80,255,0.18)]"
      style={{ width: 168, height: 336, background: "linear-gradient(160deg, hsl(270,50%,10%), hsl(264,50%,7%))", animationDelay: `${animDelay}s`, border: "1.5px solid rgba(255,255,255,0.08)" }}>
      <div className="absolute top-0 inset-x-0 h-4 flex justify-center" style={{ zIndex: 10 }}>
        <div className="w-16 h-3 rounded-b-xl" style={{ background: "hsl(264,40%,7%)" }} />
      </div>
      <div className="flex flex-col items-center p-4 pt-8 h-full">
        <div className="w-12 h-12 rounded-full mb-2 flex items-center justify-center text-xl shadow-[0_0_15px_rgba(180,80,255,0.5)]"
          style={{ background: "linear-gradient(135deg, #a855f7, #7c3aed)", border: "2px solid rgba(255,255,255,0.12)" }}>👤</div>
        <div className="text-[10px] font-bold text-white mb-0.5">{handle}</div>
        <div className="text-[8px] text-white/40 mb-3 text-center">{bio}</div>
        <div className="flex gap-1.5 mb-3">
          {SOCIAL_ICONS.map((s, i) => (
            <div key={i} className="w-5 h-5 rounded-full flex items-center justify-center text-white" style={{ background: s.color }}>{s.icon}</div>
          ))}
        </div>
        <div className="w-full space-y-1.5">
          {["My Portfolio", "Discord Server", "GitHub"].map((label, i) => (
            <div key={i} className="w-full py-2 rounded-xl text-center text-[9px] font-bold text-white"
              style={{ background: i === 0 ? "linear-gradient(90deg, rgba(168,85,247,0.6), rgba(124,58,237,0.6))" : "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.08)" }}>
              {label}
            </div>
          ))}
        </div>
        <div className="mt-auto text-[7px] text-white/20">about-me.lol/{handle.replace("@","").toLowerCase()}</div>
      </div>
    </div>
  );
}

const FEATURES = [
  { icon: Palette, title: "Fully Customizable", desc: "Themes, gradients, animated backgrounds, custom fonts.", glow: "rgba(168,85,247,0.15)" },
  { icon: BarChart3, title: "Deep Analytics", desc: "Profile views, link clicks, referrers, geographic data.", glow: "rgba(99,102,241,0.15)" },
  { icon: Zap, title: "Blazing Fast", desc: "Sub-second loads. Static CDN delivery globally.", glow: "rgba(245,158,11,0.12)" },
  { icon: Link2, title: "Unlimited Links", desc: "Drag-and-drop reorder. Toggle visibility instantly.", glow: "rgba(168,85,247,0.15)" },
  { icon: Shield, title: "Secure by Default", desc: "HTTPS, OAuth login, no ads. Your data stays yours.", glow: "rgba(16,185,129,0.12)" },
  { icon: Sparkles, title: "$9 Lifetime Premium", desc: "Pay once, own it forever. Premium effects & badge.", glow: "rgba(251,191,36,0.12)" },
];

export default function LandingPage() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);

  return (
    <div className="flex flex-col relative">

      {/* ── HERO ── */}
      <section className="relative overflow-hidden min-h-[92vh] flex flex-col items-center justify-start pt-28 pb-0">
        <ParticleOrbs />
        <div className="relative z-10 flex flex-col items-center text-center px-4 w-full max-w-5xl mx-auto">
          <div className={`inline-flex items-center gap-2 rounded-full border border-purple-500/30 bg-purple-500/10 px-3.5 py-1 text-xs font-semibold text-purple-300 mb-6 transition-all duration-700 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
            <Sparkles className="h-3 w-3" /> The modern link-in-bio for creators
          </div>
          <h1 className={`text-5xl sm:text-6xl md:text-7xl lg:text-[84px] font-black tracking-tight leading-[0.92] mb-5 transition-all duration-700 delay-100 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
            Everything you want,{" "}
            <span className="animate-gradient-shift bg-clip-text text-transparent" style={{ backgroundImage: "linear-gradient(90deg, #c084fc, #a855f7, #7c3aed, #c084fc)" }}>right here.</span>
          </h1>
          <p className={`max-w-xl text-base md:text-lg text-white/50 mb-8 transition-all duration-700 delay-200 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
            About Me is your home for modern, feature-rich profile pages. One link. Every platform. Zero compromise.
          </p>
          <div className={`flex flex-col sm:flex-row gap-3 mb-16 transition-all duration-700 delay-300 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
            <Button asChild size="lg" className="h-11 px-7 text-sm font-bold rounded-full text-white shadow-[0_0_30px_rgba(150,80,255,0.45)] hover:shadow-[0_0_50px_rgba(150,80,255,0.65)] transition-shadow"
              style={{ background: "linear-gradient(135deg, #a855f7, #7c3aed)", border: "1px solid rgba(255,255,255,0.12)" }}>
              <Link href="/register">Sign Up for Free <ArrowRight className="ml-1.5 h-4 w-4" /></Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="h-11 px-7 text-sm font-semibold rounded-full border-white/10 bg-white/5 hover:bg-white/8 text-white/80">
              <a href="#pricing">View Pricing</a>
            </Button>
          </div>

          {/* 3D Mockups */}
          <div className={`relative w-full flex items-end justify-center gap-5 transition-all duration-1000 delay-500 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`}
            style={{ perspective: "1200px", minHeight: 320 }}>
            <div className="hidden lg:block" style={{ transform: "translateY(30px)" }}>
              <PhoneMockup handle="@AboutMe" bio="about-me.lol on top" animDelay={1} />
            </div>
            <DashboardMockup />
            <div className="hidden lg:block" style={{ transform: "translateY(48px)" }}>
              <PhoneMockup handle="@Steve" bio="Hi im Steve" animDelay={2} />
            </div>
            <div className="absolute bottom-0 left-0 right-0 pointer-events-none" style={{ height: 140, background: "linear-gradient(to top, hsl(264,60%,5%) 40%, transparent)" }} />
          </div>
        </div>
      </section>

      {/* ── FEATURES ── */}
      <section id="features" className="relative py-16 px-4">
        <div className="relative z-10 max-w-5xl mx-auto">
          <Reveal className="text-center mb-10 flex flex-col items-center">
            <div className="inline-flex items-center gap-1.5 rounded-full border border-purple-500/20 bg-purple-500/8 px-3 py-1 text-xs font-semibold text-purple-400 mb-3">
              <Zap className="h-3 w-3" /> Why Us
            </div>
            <h2 className="text-3xl md:text-4xl font-black tracking-tight mb-2">Built for the culture.</h2>
            <p className="text-white/50 text-sm max-w-sm">Everything you need to stand out. Nothing you don't.</p>
          </Reveal>
          {/* Bento grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 auto-rows-auto">

            {/* Row 1 col A — Fully Customizable (wide, 2-col) */}
            <Reveal className="sm:col-span-2">
              <div className="group relative rounded-xl p-5 border border-white/5 overflow-hidden transition-all duration-300 hover:border-purple-500/25 hover:-translate-y-0.5 h-full" style={{ background: "hsl(264,40%,8%)" }}>
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none rounded-xl" style={{ background: "radial-gradient(circle at 20% 50%, rgba(168,85,247,0.12), transparent 65%)" }} />
                <div className="relative z-10 flex flex-col h-full">
                  <div className="mb-3 inline-flex items-center justify-center w-8 h-8 rounded-lg" style={{ background: "rgba(168,85,247,0.15)", border: "1px solid rgba(255,255,255,0.07)" }}>
                    <Palette className="h-4 w-4 text-purple-300" />
                  </div>
                  <h3 className="text-sm font-bold mb-1 text-white">Fully Customizable</h3>
                  <p className="text-white/45 text-xs leading-relaxed mb-4">Themes, gradients, animated backgrounds, custom fonts — make it yours down to the pixel.</p>
                  {/* Theme swatch preview */}
                  <div className="mt-auto flex gap-2 flex-wrap">
                    {[
                      ["#a855f7","#7c3aed"],["#06b6d4","#0284c7"],["#f97316","#dc2626"],
                      ["#10b981","#059669"],["#f59e0b","#d97706"],["#ec4899","#db2777"],
                    ].map(([a,b], i) => (
                      <div key={i} className="h-7 w-14 rounded-lg shadow-sm" style={{ background: `linear-gradient(135deg, ${a}, ${b})`, border: "1px solid rgba(255,255,255,0.1)" }} />
                    ))}
                    <div className="h-7 w-14 rounded-lg flex items-center justify-center text-white/30 text-[10px] font-bold" style={{ border: "1px dashed rgba(255,255,255,0.12)" }}>+more</div>
                  </div>
                </div>
              </div>
            </Reveal>

            {/* Row 1 col B — Blazing Fast (small) */}
            <Reveal delay={80}>
              <div className="group relative rounded-xl p-5 border border-white/5 overflow-hidden transition-all duration-300 hover:border-yellow-500/20 hover:-translate-y-0.5 h-full" style={{ background: "hsl(264,40%,8%)" }}>
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none rounded-xl" style={{ background: "radial-gradient(circle at 30% 30%, rgba(245,158,11,0.1), transparent 70%)" }} />
                <div className="relative z-10">
                  <div className="mb-3 inline-flex items-center justify-center w-8 h-8 rounded-lg" style={{ background: "rgba(245,158,11,0.12)", border: "1px solid rgba(255,255,255,0.07)" }}>
                    <Zap className="h-4 w-4 text-yellow-400" />
                  </div>
                  <h3 className="text-sm font-bold mb-1 text-white">Blazing Fast</h3>
                  <p className="text-white/45 text-xs leading-relaxed">Sub-second loads. Static CDN delivery globally.</p>
                  <div className="mt-4 flex items-center gap-1.5">
                    <div className="text-2xl font-black text-yellow-400">&lt;1s</div>
                    <div className="text-[9px] text-white/30 leading-tight">avg load<br/>time</div>
                  </div>
                </div>
              </div>
            </Reveal>

            {/* Row 2 col A — Deep Analytics (wide, 2-col) with mini chart */}
            <Reveal delay={60} className="sm:col-span-2">
              <div className="group relative rounded-xl p-5 border border-white/5 overflow-hidden transition-all duration-300 hover:border-indigo-500/25 hover:-translate-y-0.5 h-full" style={{ background: "hsl(264,40%,8%)" }}>
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none rounded-xl" style={{ background: "radial-gradient(circle at 20% 50%, rgba(99,102,241,0.12), transparent 65%)" }} />
                <div className="relative z-10 flex flex-col h-full">
                  <div className="mb-3 inline-flex items-center justify-center w-8 h-8 rounded-lg" style={{ background: "rgba(99,102,241,0.15)", border: "1px solid rgba(255,255,255,0.07)" }}>
                    <BarChart3 className="h-4 w-4 text-indigo-300" />
                  </div>
                  <h3 className="text-sm font-bold mb-1 text-white">Deep Analytics</h3>
                  <p className="text-white/45 text-xs leading-relaxed mb-4">Profile views, link clicks, referrers, and geographic data — all in real time.</p>
                  {/* Mini stats + chart */}
                  <div className="mt-auto space-y-3">
                    <div className="flex gap-4">
                      {[["1,284","Profile Views"],["392","Link Clicks"],["30.5%","Conversion"]].map(([val, label]) => (
                        <div key={label}>
                          <div className="text-base font-black text-white">{val}</div>
                          <div className="text-[9px] text-white/35">{label}</div>
                        </div>
                      ))}
                    </div>
                    <svg viewBox="0 0 300 48" className="w-full" style={{ height: 48 }}>
                      <defs>
                        <linearGradient id="bg2" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="rgba(99,102,241,0.4)"/>
                          <stop offset="100%" stopColor="rgba(99,102,241,0)"/>
                        </linearGradient>
                      </defs>
                      <path d="M0,40 C20,36 40,28 60,24 C80,20 100,30 120,22 C140,14 160,8 180,12 C200,16 220,4 240,6 C260,8 280,2 300,4 L300,48 L0,48Z" fill="url(#bg2)"/>
                      <path d="M0,40 C20,36 40,28 60,24 C80,20 100,30 120,22 C140,14 160,8 180,12 C200,16 220,4 240,6 C260,8 280,2 300,4" fill="none" stroke="rgba(129,140,248,0.9)" strokeWidth="1.5"/>
                      {[[60,24],[120,22],[180,12],[240,6],[300,4]].map(([x,y],i) => (
                        <circle key={i} cx={x} cy={y} r="2.5" fill="rgba(129,140,248,1)" />
                      ))}
                    </svg>
                  </div>
                </div>
              </div>
            </Reveal>

            {/* Row 2 col B — Unlimited Links (small) */}
            <Reveal delay={120}>
              <div className="group relative rounded-xl p-5 border border-white/5 overflow-hidden transition-all duration-300 hover:border-purple-500/25 hover:-translate-y-0.5 h-full" style={{ background: "hsl(264,40%,8%)" }}>
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none rounded-xl" style={{ background: "radial-gradient(circle at 30% 30%, rgba(168,85,247,0.12), transparent 70%)" }} />
                <div className="relative z-10">
                  <div className="mb-3 inline-flex items-center justify-center w-8 h-8 rounded-lg" style={{ background: "rgba(168,85,247,0.15)", border: "1px solid rgba(255,255,255,0.07)" }}>
                    <Link2 className="h-4 w-4 text-purple-300" />
                  </div>
                  <h3 className="text-sm font-bold mb-1 text-white">Unlimited Links</h3>
                  <p className="text-white/45 text-xs leading-relaxed">Drag-and-drop reorder. Toggle visibility instantly.</p>
                  <div className="mt-4 space-y-1.5">
                    {["Portfolio","Discord","GitHub"].map((l, i) => (
                      <div key={l} className="flex items-center gap-2 rounded-lg px-2 py-1.5" style={{ background: i === 0 ? "rgba(168,85,247,0.15)" : "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.06)" }}>
                        <div className="w-1.5 h-1.5 rounded-full" style={{ background: i === 0 ? "#a855f7" : "rgba(255,255,255,0.2)" }} />
                        <span className="text-[10px] text-white/60 font-medium">{l}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </Reveal>

            {/* Row 3 col A — Secure (small) */}
            <Reveal delay={80}>
              <div className="group relative rounded-xl p-5 border border-white/5 overflow-hidden transition-all duration-300 hover:border-emerald-500/20 hover:-translate-y-0.5 h-full" style={{ background: "hsl(264,40%,8%)" }}>
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none rounded-xl" style={{ background: "radial-gradient(circle at 30% 30%, rgba(16,185,129,0.1), transparent 70%)" }} />
                <div className="relative z-10">
                  <div className="mb-3 inline-flex items-center justify-center w-8 h-8 rounded-lg" style={{ background: "rgba(16,185,129,0.12)", border: "1px solid rgba(255,255,255,0.07)" }}>
                    <Shield className="h-4 w-4 text-emerald-400" />
                  </div>
                  <h3 className="text-sm font-bold mb-1 text-white">Secure by Default</h3>
                  <p className="text-white/45 text-xs leading-relaxed">HTTPS, OAuth login, no ads. Your data stays yours.</p>
                  <div className="mt-4 flex items-center gap-1.5">
                    <div className="h-5 w-5 rounded-full flex items-center justify-center" style={{ background: "rgba(16,185,129,0.2)" }}>
                      <Check className="h-3 w-3 text-emerald-400" />
                    </div>
                    <span className="text-[10px] text-emerald-400 font-semibold">SSL + OAuth protected</span>
                  </div>
                </div>
              </div>
            </Reveal>

            {/* Row 3 col B+C — $9 Premium (wide, 2-col) */}
            <Reveal delay={120} className="sm:col-span-2">
              <div className="group relative rounded-xl p-5 border overflow-hidden transition-all duration-300 hover:-translate-y-0.5 h-full"
                style={{ background: "linear-gradient(135deg, hsl(272,50%,11%), hsl(264,40%,8%))", border: "1px solid rgba(168,85,247,0.25)", boxShadow: "0 0 30px rgba(150,80,255,0.07)" }}>
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none rounded-xl" style={{ background: "radial-gradient(circle at 80% 50%, rgba(251,191,36,0.08), transparent 65%)" }} />
                <div className="relative z-10 flex flex-col sm:flex-row sm:items-center gap-4">
                  <div className="flex-1">
                    <div className="mb-3 inline-flex items-center justify-center w-8 h-8 rounded-lg" style={{ background: "rgba(251,191,36,0.12)", border: "1px solid rgba(255,255,255,0.07)" }}>
                      <Sparkles className="h-4 w-4 text-yellow-400" />
                    </div>
                    <h3 className="text-sm font-bold mb-1 text-white">$9 Lifetime Premium</h3>
                    <p className="text-white/45 text-xs leading-relaxed">No subscriptions. Pay once, own it forever. Unlock animated effects, verified badge, custom fonts &amp; SEO tools.</p>
                  </div>
                  <div className="shrink-0">
                    <div className="rounded-xl px-5 py-3 text-center" style={{ background: "linear-gradient(135deg, rgba(168,85,247,0.25), rgba(124,58,237,0.2))", border: "1px solid rgba(168,85,247,0.35)" }}>
                      <div className="text-3xl font-black text-white mb-0.5">$9</div>
                      <div className="text-[10px] text-purple-300 font-semibold">one-time</div>
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>

          </div>
        </div>
      </section>

      {/* ── PROFILES SHOWCASE ── */}
      <section className="relative py-16 px-4 overflow-hidden">
        <div className="relative z-10 max-w-5xl mx-auto">
          <div className="flex flex-col lg:flex-row items-center gap-10">
            <Reveal className="flex-1 space-y-4">
              <div className="inline-flex items-center gap-1.5 rounded-full border border-purple-500/20 bg-purple-500/8 px-3 py-1 text-xs font-semibold text-purple-400">
                <Sparkles className="h-3 w-3" /> Profile Pages
              </div>
              <h2 className="text-3xl md:text-4xl font-black tracking-tight leading-tight">
                Not just links.<br />
                <span className="text-transparent bg-clip-text" style={{ backgroundImage: "linear-gradient(90deg, #c084fc, #7c3aed)" }}>An experience.</span>
              </h2>
              <p className="text-white/50 text-sm leading-relaxed max-w-sm">Premium themes, animated backgrounds, and glowing accents. Give your followers a destination that matches your energy.</p>
              <ul className="space-y-2">
                {["Unlimited links & social icons","Deep analytics & click tracking","Custom themes, gradients & fonts","Avatar upload via Cloudflare R2","Zero annoying ads, ever"].map((item, i) => (
                  <li key={i} className="flex items-center gap-2.5 text-white/80 font-medium text-xs">
                    <div className="h-4 w-4 rounded-full flex items-center justify-center shrink-0" style={{ background: "rgba(168,85,247,0.2)", border: "1px solid rgba(168,85,247,0.4)" }}>
                      <Check className="h-2.5 w-2.5 text-purple-400" />
                    </div>
                    {item}
                  </li>
                ))}
              </ul>
              <Button asChild className="rounded-full font-bold text-white px-6 h-10 text-sm shadow-[0_0_25px_rgba(150,80,255,0.35)]"
                style={{ background: "linear-gradient(135deg, #a855f7, #7c3aed)" }}>
                <Link href="/register">Claim your link <ArrowRight className="ml-1.5 h-3.5 w-3.5" /></Link>
              </Button>
            </Reveal>
            <Reveal delay={120} className="flex-1 flex justify-center items-center gap-5 relative">
              <div className="absolute w-64 h-64 rounded-full" style={{ background: "radial-gradient(circle, rgba(168,85,247,0.18) 0%, transparent 70%)", filter: "blur(50px)" }} />
              <div className="animate-float-slow"><PhoneMockup handle="@AboutMe" bio="about-me.lol on top" /></div>
              <div className="animate-float-slow hidden sm:block" style={{ animationDelay: "1.5s", marginTop: 48 }}>
                <PhoneMockup handle="@Steve" bio="Hi im Steve" animDelay={3} />
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── PRICING ── */}
      <section id="pricing" className="relative py-16 px-4">
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute w-[500px] h-[300px] rounded-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
            style={{ background: "radial-gradient(circle, rgba(120,40,200,0.1) 0%, transparent 70%)", filter: "blur(60px)" }} />
        </div>
        <div className="relative z-10 max-w-3xl mx-auto">
          <Reveal className="text-center mb-10 flex flex-col items-center">
            <h2 className="text-3xl md:text-4xl font-black tracking-tight mb-1">
              Explore our exclusive plans and join{" "}
              <span style={{ color: "#c084fc" }}>51,600+</span> subscribers
            </h2>
          </Reveal>

          {/* Cards — unequal sizes like the screenshot */}
          <div className="flex flex-col sm:flex-row items-end gap-4">

            {/* FREE — shorter, sits lower */}
            <Reveal className="flex-1 min-w-0">
              <div className="rounded-2xl p-6 flex flex-col border border-white/8 transition-all duration-300 hover:-translate-y-0.5"
                style={{ background: "hsl(264,35%,9%)" }}>
                <div className="text-lg font-black text-white mb-4">Free</div>
                <div className="flex items-end gap-1 mb-2">
                  <span className="text-4xl font-black text-white">$0</span>
                  <span className="text-white/40 text-sm mb-1">/Lifetime</span>
                </div>
                <p className="text-white/45 text-xs mb-5 leading-relaxed">For beginners — link all your socials in one place.</p>
                <ul className="space-y-2.5 mb-6">
                  {["Basic Customization","Profile Analytics","Basic Effects","Add Your Socials"].map((f, i) => (
                    <li key={i} className="flex items-center gap-2 text-xs text-white/70">
                      <Check className="h-3.5 w-3.5 text-purple-400 shrink-0" />{f}
                    </li>
                  ))}
                </ul>
                <Button asChild className="w-full rounded-full font-bold h-10 text-sm text-white/80 transition-all"
                  style={{ background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.1)" }}>
                  <Link href="/register">Get Started</Link>
                </Button>
              </div>
            </Reveal>

            {/* PREMIUM — taller, floats higher via negative margin-bottom on container */}
            <Reveal delay={100} className="flex-1 min-w-0" style={{ marginBottom: "-24px" } as React.CSSProperties}>
              <div className="relative rounded-2xl p-6 flex flex-col border transition-all duration-300 hover:-translate-y-0.5"
                style={{ background: "linear-gradient(145deg, hsl(272,45%,13%), hsl(264,40%,9%))", border: "1px solid rgba(168,85,247,0.35)", boxShadow: "0 0 50px rgba(150,80,255,0.1), inset 0 1px 0 rgba(255,255,255,0.06)" }}>
                {/* Most Popular badge */}
                <div className="absolute top-4 right-4">
                  <span className="rounded-full px-3 py-1 text-[10px] font-bold text-white" style={{ background: "rgba(168,85,247,0.3)", border: "1px solid rgba(168,85,247,0.4)" }}>
                    Most Popular
                  </span>
                </div>
                <div className="flex items-center gap-2 mb-4">
                  <Diamond className="h-5 w-5 text-purple-300" />
                  <span className="text-lg font-black text-white">Premium</span>
                </div>
                <div className="flex items-end gap-1 mb-1">
                  <span className="text-4xl font-black text-white">$9</span>
                  <span className="text-white/40 text-sm mb-1">/Lifetime</span>
                </div>
                <p className="text-sm font-semibold mb-1" style={{ color: "#c084fc" }}>Pay once. Keep it forever.</p>
                <p className="text-white/45 text-xs mb-5 leading-relaxed">The perfect plan to discover your creativity &amp; unlock more features.</p>
                <ul className="space-y-2.5 mb-6">
                  {["Exclusive Badge","Profile Layouts","Custom Fonts","Typewriter Animation","Special Profile Effects","Advanced Customization","Metadata & SEO Customization"].map((f, i) => (
                    <li key={i} className="flex items-center gap-2 text-xs text-white/70">
                      <Check className="h-3.5 w-3.5 text-purple-400 shrink-0" />{f}
                    </li>
                  ))}
                </ul>
                <Button asChild className="w-full rounded-full font-bold h-10 text-sm text-white transition-all shadow-[0_0_20px_rgba(150,80,255,0.3)]"
                  style={{ background: "linear-gradient(135deg, #a855f7, #7c3aed)" }}>
                  <Link href="/upgrade">Learn More</Link>
                </Button>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="relative py-16 px-4 overflow-hidden">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse 70% 50% at 50% 50%, rgba(120,40,200,0.13), transparent)" }} />
          <div className="absolute top-0 left-0 right-0 h-px" style={{ background: "linear-gradient(90deg, transparent, rgba(168,85,247,0.35), transparent)" }} />
        </div>
        <Reveal className="relative z-10 text-center max-w-2xl mx-auto flex flex-col items-center">
          <h2 className="text-3xl md:text-5xl font-black tracking-tight mb-4 leading-tight">
            Your link. Your vibe.<br />
            <span className="text-transparent bg-clip-text animate-gradient-shift"
              style={{ backgroundImage: "linear-gradient(90deg, #c084fc, #a855f7, #7c3aed, #c084fc)" }}>
              Your About Me.
            </span>
          </h2>
          <p className="text-white/50 text-sm mb-8">Join thousands of creators who leveled up their bio. Free in under 30 seconds.</p>
          <Button asChild size="lg" className="h-12 px-10 text-base font-bold rounded-full text-white shadow-[0_0_40px_rgba(150,80,255,0.45)] hover:shadow-[0_0_60px_rgba(150,80,255,0.65)] transition-shadow"
            style={{ background: "linear-gradient(135deg, #a855f7, #7c3aed)", border: "1px solid rgba(255,255,255,0.12)" }}>
            <Link href="/register">Create your page — it's free</Link>
          </Button>
        </Reveal>
      </section>
    </div>
  );
}
