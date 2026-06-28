import { useState } from "react";
import { useGetMe, useCreatePaypalOrder, useCapturePaypalOrder } from "@workspace/api-client-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Sparkles, CheckCircle2, Loader2, ArrowLeft } from "lucide-react";
import { Link, useLocation } from "wouter";
import { useToast } from "@/hooks/use-toast";

export default function Upgrade() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const { data: user, isLoading: userLoading } = useGetMe({ query: { queryKey: ["getMe"] } });
  
  const createOrder = useCreatePaypalOrder();
  const captureOrder = useCapturePaypalOrder();
  
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // In a real app, this would handle the return from PayPal.
  // For the sake of this UI demo, we'll just simulate a successful flow or rely on the backend.
  const handleUpgrade = async () => {
    setIsProcessing(true);
    try {
      const { orderId, approvalUrl } = await createOrder.mutateAsync();
      // In a real flow, we would redirect to approvalUrl:
      // window.location.href = approvalUrl;
      
      // For demo simulation without leaving page:
      toast({ title: "Redirecting to PayPal..." });
      
      // Simulate return and capture
      setTimeout(async () => {
        try {
          await captureOrder.mutateAsync({ data: { orderId } });
          setIsSuccess(true);
          toast({ title: "Success!", description: "Welcome to Premium!" });
        } catch (e) {
          toast({ variant: "destructive", title: "Capture failed", description: "Payment processing failed." });
        } finally {
          setIsProcessing(false);
        }
      }, 2000);
      
    } catch (error: any) {
      toast({ variant: "destructive", title: "Error", description: error.message || "Failed to initiate payment." });
      setIsProcessing(false);
    }
  };

  if (userLoading) {
    return <div className="flex justify-center py-20"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div>;
  }

  if (user?.isPremium || isSuccess) {
    return (
      <div className="min-h-[80vh] flex flex-col items-center justify-center text-center">
        <div className="w-20 h-20 bg-primary/20 rounded-full flex items-center justify-center mb-6 relative">
          <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full" />
          <Sparkles className="h-10 w-10 text-primary relative z-10" />
        </div>
        <h1 className="text-4xl font-bold mb-4">You're Premium!</h1>
        <p className="text-xl text-muted-foreground mb-8 max-w-md">
          Thank you for upgrading. All premium features are now unlocked on your account.
        </p>
        <Button asChild size="lg">
          <Link href="/dashboard">Return to Dashboard</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto py-8">
      <Link href="/dashboard" className="text-muted-foreground hover:text-foreground flex items-center gap-2 mb-8 transition-colors w-fit">
        <ArrowLeft className="h-4 w-4" /> Back to Dashboard
      </Link>

      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">Upgrade your identity</h1>
        <p className="text-xl text-muted-foreground">Unlock the full power of Biolink for a one-time payment.</p>
      </div>

      <div className="grid md:grid-cols-2 gap-8 items-center">
        <Card className="bg-card/50 border-white/5 backdrop-blur">
          <CardHeader>
            <CardTitle className="text-2xl">Premium Features</CardTitle>
            <CardDescription>Everything you get with the upgrade</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {[
              "Animated backgrounds",
              "Custom background images",
              "Neon glow effects",
              "Verified premium badge",
              "Advanced analytics insights",
              "Unlimited links",
              "Priority support"
            ].map((feature, i) => (
              <div key={i} className="flex items-center gap-3">
                <CheckCircle2 className="h-5 w-5 text-primary" />
                <span>{feature}</span>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="border-primary/50 bg-gradient-to-b from-primary/10 to-transparent relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4">
            <span className="bg-primary text-primary-foreground text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
              Lifetime Deal
            </span>
          </div>
          <CardHeader className="pt-12">
            <CardTitle className="text-5xl font-extrabold flex items-baseline gap-2">
              $9 <span className="text-xl text-muted-foreground font-normal">forever</span>
            </CardTitle>
            <CardDescription className="text-base mt-2">No monthly subscriptions. Pay once, use forever.</CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <Button 
              size="lg" 
              className="w-full h-14 text-lg font-bold bg-[#0070BA] hover:bg-[#003087] text-white"
              onClick={handleUpgrade}
              disabled={isProcessing}
            >
              {isProcessing ? (
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
              ) : (
                "Pay with PayPal"
              )}
            </Button>
            <p className="text-center text-sm text-muted-foreground mt-4">Secure checkout via PayPal.</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
