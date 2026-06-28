import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { MarketingLayout } from "@/components/MarketingLayout";
import { DashboardLayout } from "@/components/DashboardLayout";
import NotFound from "@/pages/not-found";

// Pages
import Landing from "@/pages/Landing";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import ForgotPassword from "@/pages/ForgotPassword";
import DashboardHome from "@/pages/DashboardHome";
import DashboardLinks from "@/pages/DashboardLinks";
import DashboardAppearance from "@/pages/DashboardAppearance";
import DashboardAnalytics from "@/pages/DashboardAnalytics";
import DashboardSettings from "@/pages/DashboardSettings";
import Upgrade from "@/pages/Upgrade";
import PublicProfile from "@/pages/PublicProfile";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

function Router() {
  return (
    <Switch>
      {/* Marketing / Auth Routes */}
      <Route path="/">
        <MarketingLayout><Landing /></MarketingLayout>
      </Route>
      <Route path="/login">
        <MarketingLayout><Login /></MarketingLayout>
      </Route>
      <Route path="/register">
        <MarketingLayout><Register /></MarketingLayout>
      </Route>
      <Route path="/forgot-password">
        <MarketingLayout><ForgotPassword /></MarketingLayout>
      </Route>

      {/* Dashboard Routes */}
      <Route path="/dashboard">
        <ProtectedRoute>
          <DashboardLayout><DashboardHome /></DashboardLayout>
        </ProtectedRoute>
      </Route>
      <Route path="/dashboard/links">
        <ProtectedRoute>
          <DashboardLayout><DashboardLinks /></DashboardLayout>
        </ProtectedRoute>
      </Route>
      <Route path="/dashboard/appearance">
        <ProtectedRoute>
          <DashboardLayout><DashboardAppearance /></DashboardLayout>
        </ProtectedRoute>
      </Route>
      <Route path="/dashboard/analytics">
        <ProtectedRoute>
          <DashboardLayout><DashboardAnalytics /></DashboardLayout>
        </ProtectedRoute>
      </Route>
      <Route path="/dashboard/settings">
        <ProtectedRoute>
          <DashboardLayout><DashboardSettings /></DashboardLayout>
        </ProtectedRoute>
      </Route>
      <Route path="/upgrade">
        <ProtectedRoute>
          <DashboardLayout><Upgrade /></DashboardLayout>
        </ProtectedRoute>
      </Route>

      {/* Public Profile Route - MUST be last */}
      <Route path="/:username">
        <PublicProfile />
      </Route>

      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
          <Router />
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
