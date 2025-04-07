import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle, ArrowRight, CheckCircle, TrendingUp } from "lucide-react";

export function TacticalInsights() {
  const insights = [
    {
      title: "Opponent Vulnerability",
      description: "High pressing on the right flank creates defensive gaps",
      priority: "high",
      icon: <AlertTriangle className="h-4 w-4" />,
    },
    {
      title: "Formation Analysis",
      description: "Opponent switches to 4-3-3 when trailing by 1 goal",
      priority: "medium",
      icon: <TrendingUp className="h-4 w-4" />,
    },
    {
      title: "Counter-Attack Opportunity",
      description: "Central midfielder (#8) leaves position during corner kicks",
      priority: "high",
      icon: <AlertTriangle className="h-4 w-4" />,
    },
    {
      title: "Set Piece Pattern",
      description: "70% of corners directed to near post with dummy run",
      priority: "medium",
      icon: <TrendingUp className="h-4 w-4" />,
    },
    {
      title: "Defensive Structure",
      description: "Consistent 4-4-2 block when defending in own half",
      priority: "low",
      icon: <CheckCircle className="h-4 w-4" />,
    },
  ];

  return (
    <Card className="w-full border-border/40 bg-card/50">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-semibold">Real-Time Tactical Insights</CardTitle>
      </CardHeader>
      <CardContent className="p-4">
        <div className="space-y-4">
          {insights.map((insight, index) => (
            <div
              key={index}
              className="flex items-start gap-3 rounded-lg border border-border/40 bg-card p-3 transition-colors hover:bg-accent/50"
            >
              <div className={`mt-0.5 rounded-full p-1 ${
                insight.priority === "high" 
                  ? "bg-red-900/20 text-red-500" 
                  : insight.priority === "medium"
                  ? "bg-amber-900/20 text-amber-500"
                  : "bg-green-900/20 text-green-500"
              }`}>
                {insight.icon}
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h4 className="font-medium">{insight.title}</h4>
                  <Badge variant={
                    insight.priority === "high" 
                      ? "destructive" 
                      : insight.priority === "medium"
                      ? "default"
                      : "outline"
                  }>
                    {insight.priority}
                  </Badge>
                </div>
                <p className="mt-1 text-sm text-muted-foreground">{insight.description}</p>
              </div>
              <ArrowRight className="h-4 w-4 text-muted-foreground" />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}