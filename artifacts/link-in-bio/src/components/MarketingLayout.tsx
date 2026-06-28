import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";

export function MarketingLayout({ children }: { children: React.ReactNode }) {
  const [location] = useLocation();
  const isAuthPage = location === "/login" || location === "/register" || location === "/forgot-password";

  return (
    <div className="min-h-[100dvh] flex flex-col bg-background text-foreground selection:bg-primary/30">
      {!isAuthPage && (
        <header className="sticky top-0 z-50 w-full border-b border-white/5 bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="container flex h-16 items-center justify-between">
            <Link href="/" className="flex items-center gap-2 transition-opacity hover:opacity-80">
              <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-primary to-accent p-[1px]">
                <div className="flex h-full w-full items-center justify-center rounded-lg bg-background">
                  <span className="text-lg font-bold leading-none tracking-tighter text-transparent bg-clip-text bg-gradient-to-br from-primary to-accent">B</span>
                </div>
              </div>
              <span className="text-xl font-bold tracking-tight">Biolink</span>
            </Link>
            <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-muted-foreground">
              <Link href="/#features" className="hover:text-foreground transition-colors">Features</Link>
              <Link href="/#pricing" className="hover:text-foreground transition-colors">Pricing</Link>
            </nav>
            <div className="flex items-center gap-4">
              <Link href="/login" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                Log in
              </Link>
              <Button asChild className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold rounded-full px-6">
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
        <footer className="border-t border-white/5 py-12 md:py-16">
          <div className="container flex flex-col items-center justify-between gap-6 md:flex-row">
            <div className="flex items-center gap-2">
              <div className="h-6 w-6 rounded border border-white/10 bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                <span className="text-xs font-bold text-primary">B</span>
              </div>
              <span className="text-sm font-semibold tracking-tight">Biolink</span>
              <span className="text-sm text-muted-foreground">&copy; {new Date().getFullYear()}</span>
            </div>
            <nav className="flex gap-4 text-sm text-muted-foreground">
              <Link href="#" className="hover:text-foreground transition-colors">Terms</Link>
              <Link href="#" className="hover:text-foreground transition-colors">Privacy</Link>
            </nav>
          </div>
        </footer>
      )}
    </div>
  );
}
