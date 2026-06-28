import { useEffect } from "react";
import { useParams } from "wouter";
import { useGetPublicProfile, useRecordProfileView } from "@workspace/api-client-react";
import { Skeleton } from "@/components/ui/skeleton";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Crown, BadgeCheck } from "lucide-react";
import { useRecordLinkClick } from "@workspace/api-client-react";

export default function PublicProfile() {
  const { username } = useParams<{ username: string }>();
  const { data: profile, isLoading, isError } = useGetPublicProfile(username || "");
  const recordView = useRecordProfileView();
  const recordClick = useRecordLinkClick();

  useEffect(() => {
    if (username && profile && !isError) {
      // Record view once on mount
      recordView.mutate({ username });
    }
  }, [username, profile, isError]); // Added profile and isError so it only triggers if valid

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-8 bg-background">
        <Skeleton className="h-24 w-24 rounded-full mb-4" />
        <Skeleton className="h-8 w-48 mb-4" />
        <Skeleton className="h-4 w-64 mb-12" />
        <div className="w-full max-w-md space-y-4">
          {[1, 2, 3, 4].map(i => <Skeleton key={i} className="h-16 w-full rounded-xl" />)}
        </div>
      </div>
    );
  }

  if (isError || !profile) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-8 bg-background text-center">
        <h1 className="text-4xl font-bold mb-4">User not found</h1>
        <p className="text-muted-foreground">The page you're looking for doesn't exist.</p>
      </div>
    );
  }

  const app = profile.appearance;
  
  const bgStyle = app?.backgroundType === "color" 
    ? { backgroundColor: app?.backgroundColor || "#000000" }
    : app?.backgroundType === "gradient"
    ? { backgroundImage: app?.backgroundGradient || "linear-gradient(to bottom, #1a1a1a, #000000)" }
    : app?.backgroundType === "image" && app?.backgroundImageUrl
    ? { backgroundImage: `url(${app.backgroundImageUrl})`, backgroundSize: "cover", backgroundPosition: "center", backgroundAttachment: "fixed" }
    : { backgroundColor: "#000000" };

  const fontFamily = app?.fontFamily || "Inter";
  const textColor = app?.textColor || "#ffffff";
  const accentColor = app?.accentColor || "hsl(var(--primary))";
  
  const buttonStyleClass = app?.buttonStyle === "rounded" 
    ? "rounded-full" 
    : app?.buttonStyle === "square" 
    ? "rounded-none" 
    : "rounded-xl";

  const handleLinkClick = (id: string, url: string) => {
    // Record click asynchronously
    recordClick.mutate({ id });
    // Navigation is handled by the <a> tag natively
  };

  return (
    <div 
      className="min-h-[100dvh] w-full flex flex-col items-center relative overflow-hidden selection:bg-white/20"
      style={{ ...bgStyle, fontFamily, color: textColor }}
    >
      {app?.animatedBackground && app.glowEffect && (
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_center,rgba(var(--primary),0.15),transparent_60%)] animate-pulse pointer-events-none fixed" />
      )}
      
      {app?.backgroundType === "image" && (
         <div className="absolute inset-0 bg-black/40 pointer-events-none fixed" />
      )}

      <main className="w-full max-w-2xl px-4 py-16 flex flex-col items-center relative z-10 animate-in fade-in slide-in-from-bottom-8 duration-700">
        
        <Avatar className={`h-28 w-28 mb-6 ring-4 ring-offset-4 ring-offset-transparent ${app?.glowEffect ? 'ring-primary shadow-[0_0_30px_rgba(var(--primary),0.6)]' : 'ring-white/20'}`}>
          <AvatarImage src={profile.avatarUrl || undefined} />
          <AvatarFallback className="bg-white/10 text-foreground text-3xl">
            {profile.displayName?.charAt(0) || profile.username.charAt(0)}
          </AvatarFallback>
        </Avatar>

        <div className="flex items-center gap-2 mb-3">
          <h1 className="text-2xl font-bold tracking-tight">{profile.displayName || `@${profile.username}`}</h1>
          {app?.showBadge && profile.isPremium && (
            <Crown className="h-5 w-5 text-yellow-400 drop-shadow-[0_0_8px_rgba(250,204,21,0.5)]" />
          )}
          {app?.showBadge && profile.isVerified && (
            <BadgeCheck className="h-5 w-5 text-blue-400 drop-shadow-[0_0_8px_rgba(96,165,250,0.5)]" />
          )}
        </div>

        {profile.bio && (
          <p className="text-base text-center mb-10 opacity-90 max-w-md leading-relaxed">{profile.bio}</p>
        )}

        <div className="w-full space-y-4">
          {profile.links.map(link => (
            <a
              key={link.id}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => handleLinkClick(link.id, link.url)}
              className={`block w-full py-4 px-6 text-center text-lg font-semibold transition-all hover:scale-[1.02] border backdrop-blur-sm ${buttonStyleClass}`}
              style={{
                backgroundColor: 'rgba(255,255,255,0.05)',
                borderColor: app?.glowEffect ? 'transparent' : 'rgba(255,255,255,0.15)',
                color: textColor,
                boxShadow: app?.glowEffect ? `0 0 20px ${accentColor}30` : 'none',
              }}
            >
              {link.title}
            </a>
          ))}
        </div>
      </main>
      
      <footer className="mt-auto py-8 text-center relative z-10 w-full opacity-60 hover:opacity-100 transition-opacity">
        <a href="/" className="inline-flex items-center gap-2 text-sm font-medium tracking-wide">
          <div className="h-5 w-5 rounded bg-gradient-to-br from-primary to-accent p-[1px]">
            <div className="flex h-full w-full items-center justify-center rounded bg-black">
              <span className="text-[10px] font-bold leading-none text-transparent bg-clip-text bg-gradient-to-br from-primary to-accent">B</span>
            </div>
          </div>
          Create your Biolink
        </a>
      </footer>
    </div>
  );
}
