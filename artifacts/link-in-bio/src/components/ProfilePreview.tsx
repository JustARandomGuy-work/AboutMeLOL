import { useGetMe, useGetMyLinks, useGetAppearance, getGetMyLinksQueryKey, getGetAppearanceQueryKey } from "@workspace/api-client-react";
import { Skeleton } from "@/components/ui/skeleton";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Crown, BadgeCheck } from "lucide-react";

export function ProfilePreview() {
  const { data: user, isLoading: userLoading } = useGetMe({ query: { queryKey: ["getMe"] } });
  const { data: links, isLoading: linksLoading } = useGetMyLinks({ query: { queryKey: getGetMyLinksQueryKey() } });
  const { data: appearance, isLoading: appearanceLoading } = useGetAppearance({ query: { queryKey: getGetAppearanceQueryKey() } });

  if (userLoading || linksLoading || appearanceLoading) {
    return (
      <div className="w-[320px] h-[640px] rounded-[3rem] border-8 border-white/10 bg-card overflow-hidden relative shadow-2xl flex flex-col items-center p-8">
        <Skeleton className="h-24 w-24 rounded-full mb-4" />
        <Skeleton className="h-6 w-32 mb-2" />
        <Skeleton className="h-4 w-48 mb-8" />
        <div className="w-full space-y-4">
          {[1, 2, 3].map(i => <Skeleton key={i} className="h-14 w-full rounded-xl" />)}
        </div>
      </div>
    );
  }

  const bgStyle = appearance?.backgroundType === "color" 
    ? { backgroundColor: appearance?.backgroundColor || "#000000" }
    : appearance?.backgroundType === "gradient"
    ? { backgroundImage: appearance?.backgroundGradient || "linear-gradient(to bottom, #1a1a1a, #000000)" }
    : appearance?.backgroundType === "image" && appearance?.backgroundImageUrl
    ? { backgroundImage: `url(${appearance.backgroundImageUrl})`, backgroundSize: "cover", backgroundPosition: "center" }
    : { backgroundColor: "#000000" };

  const fontFamily = appearance?.fontFamily || "Inter";
  const textColor = appearance?.textColor || "#ffffff";
  const accentColor = appearance?.accentColor || "hsl(var(--primary))";
  
  const buttonStyleClass = appearance?.buttonStyle === "rounded" 
    ? "rounded-full" 
    : appearance?.buttonStyle === "square" 
    ? "rounded-none" 
    : "rounded-xl";

  return (
    <div className="w-[320px] h-[640px] rounded-[3rem] border-[8px] border-black bg-black overflow-hidden relative shadow-2xl mx-auto ring-1 ring-white/10">
      <div className="absolute top-0 inset-x-0 h-6 bg-black z-20 flex justify-center w-1/2 mx-auto rounded-b-xl" />
      
      <div 
        className="w-full h-full p-6 flex flex-col items-center pt-14 overflow-y-auto hide-scrollbar relative"
        style={{ ...bgStyle, fontFamily, color: textColor }}
      >
        {appearance?.animatedBackground && appearance.glowEffect && (
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_center,rgba(var(--primary),0.2),transparent_70%)] animate-pulse pointer-events-none" />
        )}

        <Avatar className={`h-24 w-24 mb-4 ring-2 ring-offset-2 ring-offset-transparent ${appearance?.glowEffect ? 'ring-primary shadow-[0_0_20px_rgba(var(--primary),0.5)]' : 'ring-white/20'}`}>
          <AvatarImage src={user?.avatarUrl || undefined} />
          <AvatarFallback className="bg-primary/20 text-primary text-xl">
            {user?.displayName?.charAt(0) || user?.username.charAt(0) || "U"}
          </AvatarFallback>
        </Avatar>

        <div className="flex items-center gap-2 mb-1">
          <h2 className="text-xl font-bold">{user?.displayName || `@${user?.username}`}</h2>
          {appearance?.showBadge && user?.isPremium && (
            <Crown className="h-4 w-4 text-yellow-400" />
          )}
          {appearance?.showBadge && user?.isVerified && (
            <BadgeCheck className="h-4 w-4 text-blue-400" />
          )}
        </div>

        {user?.bio && (
          <p className="text-sm text-center mb-8 opacity-80 max-w-[250px]">{user.bio}</p>
        )}

        <div className="w-full space-y-3 pb-8">
          {links?.filter(l => l.isVisible).map(link => (
            <a
              key={link.id}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`block w-full py-4 px-6 text-center text-sm font-semibold transition-transform hover:scale-[1.02] border ${buttonStyleClass}`}
              style={{
                backgroundColor: 'rgba(255,255,255,0.1)',
                borderColor: appearance?.glowEffect ? 'transparent' : 'rgba(255,255,255,0.2)',
                color: textColor,
                boxShadow: appearance?.glowEffect ? `0 0 15px ${accentColor}40` : 'none',
              }}
            >
              {link.title}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
