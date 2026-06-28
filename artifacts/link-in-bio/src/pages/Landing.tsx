import { ArrowRight, Sparkles, Zap, Shield, Smartphone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";

export default function LandingPage() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-24 pb-32 lg:pt-36 lg:pb-40">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_center,rgba(var(--primary),0.15),transparent_50%)]" />
        
        <div className="container relative z-10 flex flex-col items-center text-center">
          <div className="inline-flex items-center rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-sm font-medium text-primary mb-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <Sparkles className="mr-2 h-4 w-4" />
            The premium link-in-bio for creators
          </div>
          
          <h1 className="max-w-4xl text-5xl font-extrabold tracking-tight sm:text-6xl md:text-7xl lg:text-8xl mb-6 animate-in fade-in slide-in-from-bottom-6 duration-700 delay-100">
            Your online identity,<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-accent to-primary bg-300% animate-gradient">amplified.</span>
          </h1>
          
          <p className="max-w-2xl text-lg md:text-xl text-muted-foreground mb-10 animate-in fade-in slide-in-from-bottom-6 duration-700 delay-200">
            A dark, electric, personality-driven platform where your profile page is an extension of your vibe — not a boring list of links.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-300">
            <Button asChild size="lg" className="h-14 px-8 text-base font-bold rounded-full bg-primary hover:bg-primary/90 text-primary-foreground shadow-[0_0_40px_-10px_rgba(var(--primary),0.5)]">
              <Link href="/register">
                Claim your link <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="h-14 px-8 text-base font-semibold rounded-full border-white/10 bg-white/5 hover:bg-white/10">
              <Link href="/login">Log in</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section id="features" className="py-24 bg-card/30 border-y border-white/5 relative">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">Built for the culture.</h2>
            <p className="text-muted-foreground text-lg">Everything you need to stand out from the noise.</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Zap,
                title: "Electric Aesthetics",
                desc: "Deep blacks, vivid glows, and smooth animations. Say goodbye to sterile white backgrounds."
              },
              {
                icon: Smartphone,
                title: "Mobile Optimized",
                desc: "Looks perfect on every device. Fast loading, snappy interactions, and buttery scrolling."
              },
              {
                icon: Shield,
                title: "Premium Exclusives",
                desc: "Animated backgrounds, custom cursors, and verified badges for premium members."
              }
            ].map((feature, i) => (
              <div key={i} className="p-8 rounded-2xl border border-white/5 bg-background/50 hover:bg-white/[0.02] transition-colors relative overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <feature.icon className="h-10 w-10 text-primary mb-6" />
                <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Mockup Section */}
      <section className="py-32 overflow-hidden">
        <div className="container">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <div className="flex-1 space-y-8">
              <h2 className="text-4xl md:text-5xl font-bold tracking-tight leading-tight">
                Not just links.<br />
                <span className="text-primary">An experience.</span>
              </h2>
              <p className="text-lg text-muted-foreground">
                Your followers deserve better than a generic link tree. Give them a destination that matches your energy, with premium themes, animated backgrounds, and glowing accents.
              </p>
              <ul className="space-y-4">
                {[
                  "Unlimited links & social icons",
                  "Deep analytics & click tracking",
                  "Custom themes & gradients",
                  "Zero annoying ads"
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-foreground font-medium">
                    <div className="h-6 w-6 rounded-full bg-primary/20 flex items-center justify-center text-primary">✓</div>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="flex-1 flex justify-center relative">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-primary/20 blur-[100px] rounded-full pointer-events-none" />
              
              {/* Fake Phone Mockup */}
              <div className="relative w-[300px] h-[600px] rounded-[3rem] border-[8px] border-white/10 bg-black overflow-hidden shadow-2xl z-10 rotate-[-5deg] transition-transform hover:rotate-0 duration-500">
                <div className="absolute top-0 inset-x-0 h-6 bg-black z-20 flex justify-center rounded-b-xl w-1/2 mx-auto" />
                <div className="w-full h-full bg-gradient-to-b from-gray-900 to-black p-6 flex flex-col items-center pt-16">
                  <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-primary to-purple-600 p-1 mb-4 shadow-[0_0_20px_rgba(var(--primary),0.4)]">
                    <div className="w-full h-full rounded-full bg-black flex items-center justify-center border-2 border-black">
                      <span className="text-3xl">👽</span>
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-1">@creator</h3>
                  <p className="text-sm text-gray-400 mb-8 text-center">Welcome to my digital realm</p>
                  
                  <div className="w-full space-y-4">
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="w-full py-4 px-6 rounded-xl bg-white/5 border border-white/10 text-center text-sm font-bold text-white hover:bg-white/10 hover:border-primary/50 transition-colors shadow-[0_0_15px_rgba(var(--primary),0.0)] hover:shadow-[0_0_15px_rgba(var(--primary),0.2)] cursor-pointer">
                        Link {i}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-primary/10" />
        <div className="container relative z-10 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Ready to upgrade your bio?</h2>
          <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto">Join thousands of creators who have ditched the boring link trees for something that actually looks good.</p>
          <Button asChild size="lg" className="h-14 px-10 text-lg font-bold rounded-full bg-primary hover:bg-primary/90 text-primary-foreground shadow-[0_0_40px_-10px_rgba(var(--primary),0.5)]">
            <Link href="/register">Create your page for free</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
