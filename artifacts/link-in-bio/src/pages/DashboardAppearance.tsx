import { useState, useEffect } from "react";
import { useGetAppearance, useUpdateAppearance, useGetMe, getGetAppearanceQueryKey } from "@workspace/api-client-react";
import { useQueryClient } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { ProfilePreview } from "@/components/ProfilePreview";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Lock, Sparkles, Image as ImageIcon } from "lucide-react";
import { Link } from "wouter";

export default function DashboardAppearance() {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const { data: user } = useGetMe({ query: { queryKey: ["getMe"] } });
  const { data: appearance, isLoading } = useGetAppearance({ query: { queryKey: getGetAppearanceQueryKey() } });
  const updateAppearance = useUpdateAppearance();

  const [formData, setFormData] = useState<any>(null);

  useEffect(() => {
    if (appearance) {
      setFormData(appearance);
    }
  }, [appearance]);

  const handleChange = (key: string, value: any) => {
    const newData = { ...formData, [key]: value };
    setFormData(newData);
    
    // Optimistic update for preview
    queryClient.setQueryData(getGetAppearanceQueryKey(), newData);
    
    // Debounced save could be added here, or save on blur/change
    updateAppearance.mutate({ data: { [key]: value } }, {
      onError: () => {
        toast({ variant: "destructive", title: "Error", description: "Failed to save changes." });
        queryClient.invalidateQueries({ queryKey: getGetAppearanceQueryKey() });
      }
    });
  };

  if (isLoading || !formData) {
    return <div className="flex justify-center py-20"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div>;
  }

  const isPremium = user?.isPremium;

  return (
    <div className="flex flex-col lg:flex-row gap-8 max-w-6xl mx-auto">
      <div className="flex-1 space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Appearance</h1>
          <p className="text-muted-foreground mt-1">Customize the look and feel of your profile.</p>
        </div>

        <Tabs defaultValue="theme" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="theme">Theme & Bg</TabsTrigger>
            <TabsTrigger value="typography">Typography</TabsTrigger>
            <TabsTrigger value="effects">Effects</TabsTrigger>
          </TabsList>
          
          <TabsContent value="theme" className="space-y-4 mt-4">
            <Card className="bg-card/50 border-white/5 backdrop-blur">
              <CardHeader>
                <CardTitle>Background</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Background Type</Label>
                  <Select value={formData.backgroundType} onValueChange={(val) => handleChange("backgroundType", val)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="color">Solid Color</SelectItem>
                      <SelectItem value="gradient">Gradient</SelectItem>
                      <SelectItem value="image">Image (Premium)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                {formData.backgroundType === "color" && (
                  <div className="space-y-2">
                    <Label>Color</Label>
                    <div className="flex gap-2">
                      <Input type="color" className="w-12 h-12 p-1 bg-card" value={formData.backgroundColor || "#000000"} onChange={(e) => handleChange("backgroundColor", e.target.value)} />
                      <Input type="text" className="flex-1" value={formData.backgroundColor || "#000000"} onChange={(e) => handleChange("backgroundColor", e.target.value)} />
                    </div>
                  </div>
                )}
                
                {formData.backgroundType === "gradient" && (
                  <div className="space-y-2">
                    <Label>Gradient</Label>
                    <Input type="text" placeholder="linear-gradient(...)" value={formData.backgroundGradient || ""} onChange={(e) => handleChange("backgroundGradient", e.target.value)} />
                  </div>
                )}

                {formData.backgroundType === "image" && (
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Label>Background Image URL</Label>
                      {!isPremium && <Lock className="h-3 w-3 text-muted-foreground" />}
                    </div>
                    <Input 
                      type="url" 
                      placeholder="https://..." 
                      value={formData.backgroundImageUrl || ""} 
                      onChange={(e) => handleChange("backgroundImageUrl", e.target.value)} 
                      disabled={!isPremium}
                    />
                    {!isPremium && (
                      <p className="text-xs text-muted-foreground mt-1">
                        <Link href="/upgrade" className="text-primary hover:underline">Upgrade to Premium</Link> to use background images.
                      </p>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="typography" className="space-y-4 mt-4">
            <Card className="bg-card/50 border-white/5 backdrop-blur">
              <CardHeader>
                <CardTitle>Typography & Buttons</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Font Family</Label>
                  <Select value={formData.fontFamily} onValueChange={(val) => handleChange("fontFamily", val)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select font" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Inter">Inter</SelectItem>
                      <SelectItem value="Georgia">Georgia</SelectItem>
                      <SelectItem value="Menlo">Menlo (Mono)</SelectItem>
                      <SelectItem value="system-ui">System UI</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label>Text Color</Label>
                  <div className="flex gap-2">
                    <Input type="color" className="w-12 h-12 p-1 bg-card" value={formData.textColor || "#ffffff"} onChange={(e) => handleChange("textColor", e.target.value)} />
                    <Input type="text" className="flex-1" value={formData.textColor || "#ffffff"} onChange={(e) => handleChange("textColor", e.target.value)} />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Button Style</Label>
                  <Select value={formData.buttonStyle || "rounded"} onValueChange={(val) => handleChange("buttonStyle", val)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select style" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="rounded">Rounded</SelectItem>
                      <SelectItem value="square">Square</SelectItem>
                      <SelectItem value="pill">Pill</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="effects" className="space-y-4 mt-4">
            <Card className="bg-card/50 border-white/5 backdrop-blur">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  Premium Effects <Sparkles className="h-4 w-4 text-primary" />
                </CardTitle>
                <CardDescription>Make your profile stand out</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="flex items-center gap-2">
                      Glow Effects
                      {!isPremium && <Lock className="h-3 w-3 text-muted-foreground" />}
                    </Label>
                    <p className="text-sm text-muted-foreground">Add neon glows to buttons and avatar</p>
                  </div>
                  <Switch 
                    checked={formData.glowEffect} 
                    onCheckedChange={(val) => handleChange("glowEffect", val)} 
                    disabled={!isPremium}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="flex items-center gap-2">
                      Animated Background
                      {!isPremium && <Lock className="h-3 w-3 text-muted-foreground" />}
                    </Label>
                    <p className="text-sm text-muted-foreground">Subtle moving background elements</p>
                  </div>
                  <Switch 
                    checked={formData.animatedBackground} 
                    onCheckedChange={(val) => handleChange("animatedBackground", val)} 
                    disabled={!isPremium}
                  />
                </div>

                <div className="space-y-2">
                  <Label className="flex items-center gap-2">
                    Accent Color
                    {!isPremium && <Lock className="h-3 w-3 text-muted-foreground" />}
                  </Label>
                  <div className="flex gap-2">
                    <Input type="color" className="w-12 h-12 p-1 bg-card" value={formData.accentColor || "#a855f7"} onChange={(e) => handleChange("accentColor", e.target.value)} disabled={!isPremium} />
                    <Input type="text" className="flex-1" value={formData.accentColor || "#a855f7"} onChange={(e) => handleChange("accentColor", e.target.value)} disabled={!isPremium} />
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="flex items-center gap-2">
                      Show Verified Badge
                    </Label>
                    <p className="text-sm text-muted-foreground">Display badge if premium/verified</p>
                  </div>
                  <Switch 
                    checked={formData.showBadge} 
                    onCheckedChange={(val) => handleChange("showBadge", val)} 
                  />
                </div>

                {!isPremium && (
                  <div className="p-4 bg-primary/10 border border-primary/20 rounded-xl">
                    <h4 className="font-semibold text-primary mb-1">Unlock Premium Effects</h4>
                    <p className="text-sm text-muted-foreground mb-3">Upgrade to access glows, animated backgrounds, custom colors, and image backgrounds.</p>
                    <Button asChild size="sm">
                      <Link href="/upgrade">Upgrade Now</Link>
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      <div className="hidden lg:block shrink-0 sticky top-6 self-start">
        <ProfilePreview />
      </div>
    </div>
  );
}
