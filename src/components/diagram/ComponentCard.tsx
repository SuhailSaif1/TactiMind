import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface ComponentCardProps {
  title: string;
  description: string;
  type: "input" | "processing" | "model" | "output" | "dashboard";
  icon: React.ReactNode;
  className?: string;
}

export function ComponentCard({
  title,
  description,
  type,
  icon,
  className,
}: ComponentCardProps) {
  const typeColors = {
    input: "bg-blue-900/20 border-blue-700/30 hover:border-blue-600/50",
    processing: "bg-cyan-900/20 border-cyan-700/30 hover:border-cyan-600/50",
    model: "bg-indigo-900/20 border-indigo-700/30 hover:border-indigo-600/50",
    output: "bg-purple-900/20 border-purple-700/30 hover:border-purple-600/50",
    dashboard: "bg-violet-900/20 border-violet-700/30 hover:border-violet-600/50",
  };

  const badgeColors = {
    input: "bg-blue-900 text-blue-100",
    processing: "bg-cyan-900 text-cyan-100",
    model: "bg-indigo-900 text-indigo-100",
    output: "bg-purple-900 text-purple-100",
    dashboard: "bg-violet-900 text-violet-100",
  };

  return (
    <Card className={cn("transition-all duration-300 hover:shadow-md", typeColors[type], className)}>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold flex items-center gap-2">
            {icon}
            {title}
          </CardTitle>
          <Badge className={badgeColors[type]}>
            {type.charAt(0).toUpperCase() + type.slice(1)}
          </Badge>
        </div>
        <CardDescription className="text-sm text-muted-foreground">
          {description}
        </CardDescription>
      </CardHeader>
      <CardContent className="text-sm">
        <p className="text-muted-foreground">
          {type === "input" && "Provides raw data for the system"}
          {type === "processing" && "Processes and transforms data"}
          {type === "model" && "Applies machine learning algorithms"}
          {type === "output" && "Generates analytical results"}
          {type === "dashboard" && "Visualizes insights for users"}
        </p>
      </CardContent>
    </Card>
  );
}