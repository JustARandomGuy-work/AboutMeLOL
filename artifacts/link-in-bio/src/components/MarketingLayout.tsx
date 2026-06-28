import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";

export function MarketingLayout({ children }: { children: React.ReactNode }) {
  const [location] = useLocation();
  const isAuthPage = location === "/login" || location === "/register" || location === "/forgot-password";

  return (
    <div className="min-h-[100dvh] flex flex-col bg-background text-foreground selection:bg-primary/30">
      {!isAuthPage && (
        <header className="fixed top-4 left-0 right-0 z-50 flex justify-center px-4">
          <div className="flex h-14 items-center justify-between gap-8 rounded-full border border-white/10 bg-[hsl(264,40%,7%)]/80 backdrop-blur-xl px-5 shadow-[0_0_40px_rgba(150,80,255,0.12)] w-full max-w-4xl">
            <Link href="/" className="flex items-center gap-2 transition-opacity hover:opacity-80 shrink-0">
              <div className="h-7 w-7 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-[0_0_12px_rgba(180,80,255,0.5)]">
                <span className="text-sm font-black text-white leading-none">B</span>
              </div>
              <span className="text-base font-bold tracking-tight">Biolink</span>
            </Link>
            <nav className="hidden md:flex items-center gap-1 text-sm font-medium">
              <a href="/#features" className="px-4 py-1.5 rounded-full text-muted-foreground hover:text-foreground hover:bg-white/5 transition-all">Features</a>
              <a href="/#pricing" className="px-4 py-1.5 rounded-full text-muted-foreground hover:text-foreground hover:bg-white/5 transition-all">Pricing</a>
            </nav>
            <div className="flex items-center gap-3 shrink-0">
              <Link href="/login" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors hidden sm:block">
                Log in
              </Link>
              <Button asChild className="bg-primary hover:bg-primary/90 text-white font-semibold rounded-full px-5 h-8 text-sm shadow-[0_0_20px_rgba(150,80,255,0.4)]">
                <Link href="/register">Get Started</Link>
              </Button>
            </div>
          </div>
        </header>
      )}
      <main className="flex-1 flex flex-col">
        {children}
      </main>
      {!isAuthPage && (
        <footer className="border-t border-white/5 py-10 mt-10">
          <div className="container flex flex-col items-center justify-between gap-4 md:flex-row">
            <div className="flex items-center gap-2">
              <div className="h-6 w-6 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                <span className="text-xs font-black text-white">B</span>
              </div>
              <span className="text-sm font-semibold tracking-tight">Biolink</span>
              <span className="text-sm text-muted-foreground">&copy; {new Date().getFullYear()}</span>
            </div>
            <nav className="flex gap-6 text-sm text-muted-foreground">
              <Link href="#" className="hover:text-foreground transition-colors">Terms</Link>
              <Link href="#" className="hover:text-foreground transition-colors">Privacy</Link>
              <Link href="#" className="hover:text-foreground transition-colors">Discord</Link>
            </nav>
          </div>
        </footer>
      )}
    </div>
  );
}
