import { useGetMyAnalytics, getGetMyAnalyticsQueryKey } from "@workspace/api-client-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Eye, MousePointerClick, TrendingUp } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

export default function DashboardAnalytics() {
  const { data: analytics, isLoading } = useGetMyAnalytics({ query: { queryKey: getGetMyAnalyticsQueryKey() } });

  if (isLoading) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-10 w-48" />
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {[1, 2, 3, 4].map(i => <Skeleton key={i} className="h-32" />)}
        </div>
        <Skeleton className="h-[400px]" />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Analytics</h1>
        <p className="text-muted-foreground mt-1">Monitor your profile's performance.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="bg-card/50 border-white/5 backdrop-blur">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium text-muted-foreground">30-Day Views</CardTitle>
            <Eye className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{analytics?.viewsLast30Days || 0}</div>
          </CardContent>
        </Card>
        
        <Card className="bg-card/50 border-white/5 backdrop-blur">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium text-muted-foreground">30-Day Clicks</CardTitle>
            <MousePointerClick className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{analytics?.clicksLast30Days || 0}</div>
          </CardContent>
        </Card>

        <Card className="bg-card/50 border-white/5 backdrop-blur">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Views</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{analytics?.totalViews || 0}</div>
          </CardContent>
        </Card>

        <Card className="bg-card/50 border-white/5 backdrop-blur">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Clicks</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{analytics?.totalClicks || 0}</div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        <Card className="lg:col-span-2 bg-card/50 border-white/5 backdrop-blur">
          <CardHeader>
            <CardTitle>Views & Clicks (Last 30 Days)</CardTitle>
            <CardDescription>Daily performance breakdown</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] w-full">
              {analytics?.viewsByDay && analytics.viewsByDay.length > 0 ? (
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={analytics.viewsByDay}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" vertical={false} />
                    <XAxis 
                      dataKey="date" 
                      stroke="#888888" 
                      fontSize={12} 
                      tickLine={false} 
                      axisLine={false}
                      tickFormatter={(value) => new Date(value).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
                    />
                    <YAxis 
                      stroke="#888888" 
                      fontSize={12} 
                      tickLine={false} 
                      axisLine={false} 
                      tickFormatter={(value) => `${value}`}
                    />
                    <Tooltip 
                      contentStyle={{ backgroundColor: 'hsl(var(--card))', borderColor: 'rgba(255,255,255,0.1)' }}
                      labelFormatter={(label) => new Date(label).toLocaleDateString()}
                    />
                    <Line type="monotone" dataKey="views" name="Views" stroke="hsl(var(--primary))" strokeWidth={2} dot={false} />
                    <Line type="monotone" dataKey="clicks" name="Clicks" stroke="hsl(var(--accent))" strokeWidth={2} dot={false} />
                  </LineChart>
                </ResponsiveContainer>
              ) : (
                <div className="h-full flex items-center justify-center text-muted-foreground">
                  No data available yet
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card/50 border-white/5 backdrop-blur">
          <CardHeader>
            <CardTitle>Top Links</CardTitle>
            <CardDescription>Most clicked links</CardDescription>
          </CardHeader>
          <CardContent>
            {analytics?.topLinks && analytics.topLinks.length > 0 ? (
              <div className="space-y-4">
                {analytics.topLinks.map((link, index) => (
                  <div key={link.id} className="flex items-center justify-between">
                    <div className="flex items-center gap-3 overflow-hidden">
                      <div className="w-6 text-center text-sm text-muted-foreground font-medium">{index + 1}</div>
                      <div className="truncate font-medium">{link.title}</div>
                    </div>
                    <div className="text-sm font-semibold bg-white/5 px-2 py-1 rounded">{link.clicks}</div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="h-32 flex items-center justify-center text-muted-foreground">
                No clicks yet
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
