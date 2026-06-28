import { useGetMe, useGetMyStats, getGetMyStatsQueryKey } from "@workspace/api-client-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Eye, MousePointerClick, Link as LinkIcon, Copy, ExternalLink, Sparkles } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Skeleton } from "@/components/ui/skeleton";
import { Link } from "wouter";

export default function DashboardHome() {
  const { data: user, isLoading: userLoading } = useGetMe({ query: { queryKey: ["getMe"] } });
  const { data: stats, isLoading: statsLoading } = useGetMyStats({ query: { queryKey: getGetMyStatsQueryKey() } });
  const { toast } = useToast();

  const handleCopy = () => {
    if (user?.profileUrl) {
      navigator.clipboard.writeText(user.profileUrl);
      toast({
        title: "Copied!",
        description: "Profile URL copied to clipboard",
      });
    }
  };

  if (userLoading || statsLoading) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-10 w-48" />
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {[1, 2, 3, 4].map(i => <Skeleton key={i} className="h-32" />)}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground mt-1">Overview of your Biolink performance.</p>
        </div>
        <div className="flex items-center gap-2 bg-card border border-white/10 rounded-full pl-4 pr-1 py-1 shadow-sm">
          <span className="text-sm font-medium truncate max-w-[200px] text-muted-foreground">
            {user?.profileUrl?.replace('https://', '')}
          </span>
          <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full hover:bg-white/10" onClick={handleCopy}>
            <Copy className="h-4 w-4" />
          </Button>
          <Button asChild variant="secondary" size="sm" className="h-8 rounded-full ml-1">
            <a href={user?.profileUrl || '#'} target="_blank" rel="noopener noreferrer">
              View <ExternalLink className="ml-2 h-3 w-3" />
            </a>
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="bg-card/50 border-white/5 backdrop-blur">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Views</CardTitle>
            <Eye className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{stats?.totalViews || 0}</div>
          </CardContent>
        </Card>
        
        <Card className="bg-card/50 border-white/5 backdrop-blur">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Clicks</CardTitle>
            <MousePointerClick className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{stats?.totalClicks || 0}</div>
          </CardContent>
        </Card>

        <Card className="bg-card/50 border-white/5 backdrop-blur">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium text-muted-foreground">Active Links</CardTitle>
            <LinkIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{stats?.totalLinks || 0}</div>
          </CardContent>
        </Card>

        <Card className={`border-white/5 backdrop-blur relative overflow-hidden ${user?.isPremium ? 'bg-gradient-to-br from-primary/10 to-accent/10 border-primary/20' : 'bg-card/50'}`}>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0 relative z-10">
            <CardTitle className="text-sm font-medium text-muted-foreground">Status</CardTitle>
            <Sparkles className={`h-4 w-4 ${user?.isPremium ? 'text-primary' : 'text-muted-foreground'}`} />
          </CardHeader>
          <CardContent className="relative z-10">
            <div className="text-3xl font-bold">
              {user?.isPremium ? (
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">Premium</span>
              ) : (
                "Free"
              )}
            </div>
            {!user?.isPremium && (
              <p className="text-xs text-muted-foreground mt-1">
                <Link href="/upgrade" className="text-primary hover:underline">Upgrade to unlock features</Link>
              </p>
            )}
          </CardContent>
          {user?.isPremium && (
             <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-primary/20 blur-2xl rounded-full pointer-events-none" />
          )}
        </Card>
      </div>

      <div className="grid gap-8 md:grid-cols-2">
        <div className="space-y-4">
          <h2 className="text-xl font-bold">Quick Actions</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <Link href="/dashboard/links">
              <div className="p-6 rounded-xl border border-white/5 bg-card/50 hover:bg-white/5 transition-colors cursor-pointer group">
                <LinkIcon className="h-8 w-8 text-primary mb-4 group-hover:scale-110 transition-transform" />
                <h3 className="font-semibold mb-1">Manage Links</h3>
                <p className="text-sm text-muted-foreground">Add, edit, or reorder your links.</p>
              </div>
            </Link>
            <Link href="/dashboard/appearance">
              <div className="p-6 rounded-xl border border-white/5 bg-card/50 hover:bg-white/5 transition-colors cursor-pointer group">
                <Sparkles className="h-8 w-8 text-accent mb-4 group-hover:scale-110 transition-transform" />
                <h3 className="font-semibold mb-1">Customize Design</h3>
                <p className="text-sm text-muted-foreground">Change themes, fonts, and colors.</p>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
