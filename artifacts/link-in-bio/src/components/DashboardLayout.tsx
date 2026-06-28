import { Link, useLocation } from "wouter";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { LayoutDashboard, Link2, Palette, BarChart3, Settings, Crown, LogOut, Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

const NAV_ITEMS = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/dashboard/links", label: "Links", icon: Link2 },
  { href: "/dashboard/appearance", label: "Appearance", icon: Palette },
  { href: "/dashboard/analytics", label: "Analytics", icon: BarChart3 },
  { href: "/dashboard/settings", label: "Settings", icon: Settings },
];

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [location] = useLocation();
  const { user, signOut } = useAuth();

  const handleSignOut = async () => {
    await signOut();
  };

  const NavLinks = () => (
    <>
      <div className="space-y-1">
        {NAV_ITEMS.map((item) => {
          const isActive = location === item.href;
          const Icon = item.icon;
          return (
            <Link key={item.href} href={item.href}>
              <div
                className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-all hover:bg-white/5 cursor-pointer ${
                  isActive ? "bg-primary/10 text-primary" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <Icon className={`h-4 w-4 ${isActive ? "text-primary" : ""}`} />
                {item.label}
              </div>
            </Link>
          );
        })}
      </div>
      <div className="mt-auto pt-6">
        <Link href="/upgrade">
          <div className="flex items-center gap-3 rounded-lg bg-gradient-to-r from-primary/20 to-accent/20 px-3 py-3 text-sm font-medium text-primary hover:from-primary/30 hover:to-accent/30 transition-all cursor-pointer border border-primary/20">
            <Crown className="h-4 w-4" />
            Upgrade to Premium
          </div>
        </Link>
        <button
          onClick={handleSignOut}
          className="mt-4 flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-all hover:bg-destructive/10 hover:text-destructive"
        >
          <LogOut className="h-4 w-4" />
          Log out
        </button>
      </div>
    </>
  );

  return (
    <div className="grid min-h-[100dvh] w-full md:grid-cols-[240px_1fr] bg-background">
      <aside className="hidden md:flex flex-col border-r border-white/5 bg-card/50">
        <div className="flex h-16 items-center border-b border-white/5 px-6">
          <Link href="/dashboard" className="flex items-center gap-2 font-bold tracking-tight">
            <div className="h-6 w-6 rounded bg-gradient-to-br from-primary to-accent p-[1px]">
              <div className="flex h-full w-full items-center justify-center rounded bg-background">
                <span className="text-xs font-bold leading-none tracking-tighter text-transparent bg-clip-text bg-gradient-to-br from-primary to-accent">B</span>
              </div>
            </div>
            Biolink
          </Link>
        </div>
        <div className="flex flex-1 flex-col gap-2 p-4">
          <div className="mb-6 flex items-center gap-3 px-2">
            <Avatar className="h-10 w-10 border border-white/10">
              <AvatarImage src={user?.user_metadata?.avatar_url} />
              <AvatarFallback className="bg-primary/20 text-primary">
                {user?.email?.charAt(0).toUpperCase() ?? "U"}
              </AvatarFallback>
            </Avatar>
            <div className="flex flex-col overflow-hidden">
              <span className="truncate text-sm font-medium leading-none mb-1">
                {user?.user_metadata?.full_name || user?.user_metadata?.username || "User"}
              </span>
              <span className="truncate text-xs text-muted-foreground leading-none">
                {user?.email}
              </span>
            </div>
          </div>
          <NavLinks />
        </div>
      </aside>

      <div className="flex flex-col flex-1 overflow-hidden">
        <header className="flex h-16 items-center gap-4 border-b border-white/5 bg-card/50 px-6 md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="shrink-0 md:hidden">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[240px] flex flex-col p-0 border-r-white/5">
              <div className="flex h-16 items-center border-b border-white/5 px-6">
                <span className="font-bold tracking-tight">Biolink</span>
              </div>
              <div className="flex flex-1 flex-col gap-2 p-4">
                <NavLinks />
              </div>
            </SheetContent>
          </Sheet>
          <div className="flex-1 flex justify-end">
            <Avatar className="h-8 w-8 border border-white/10">
              <AvatarFallback className="bg-primary/20 text-primary text-xs">
                {user?.email?.charAt(0).toUpperCase() ?? "U"}
              </AvatarFallback>
            </Avatar>
          </div>
        </header>
        <main className="flex-1 overflow-y-auto bg-background/50">
          <div className="container p-6 lg:p-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
