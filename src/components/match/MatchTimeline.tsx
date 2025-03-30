import { cn } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Goal, 
  CreditCard as CardIcon, 
  Repeat, 
  AlertTriangle,
  Clock
} from "lucide-react";

interface TimelineEvent {
  id: string;
  type: "goal" | "card" | "substitution" | "injury" | "tactical";
  minute: number;
  description: string;
  team: "home" | "away";
  player?: string;
}

interface MatchTimelineProps {
  events: TimelineEvent[];
  className?: string;
}

export function MatchTimeline({ events, className }: MatchTimelineProps) {
  const sortedEvents = [...events].sort((a, b) => a.minute - b.minute);

  const getEventIcon = (type: string) => {
    switch (type) {
      case "goal": return <Goal className="h-4 w-4" />;
      case "card": return <CardIcon className="h-4 w-4" />;
      case "substitution": return <Repeat className="h-4 w-4" />;
      case "injury": return <AlertTriangle className="h-4 w-4" />;
      case "tactical": return <Clock className="h-4 w-4" />;
      default: return null;
    }
  };

  const getEventColor = (type: string) => {
    switch (type) {
      case "goal": return "bg-green-500 text-green-950";
      case "card": return "bg-yellow-500 text-yellow-950";
      case "substitution": return "bg-blue-500 text-blue-950";
      case "injury": return "bg-red-500 text-red-950";
      case "tactical": return "bg-purple-500 text-purple-950";
      default: return "bg-gray-500 text-gray-950";
    }
  };

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="text-lg">Match Timeline</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="relative pl-6 border-l">
          {sortedEvents.map((event, index) => (
            <div 
              key={event.id} 
              className={cn(
                "mb-4 relative",
                index === sortedEvents.length - 1 ? "" : ""
              )}
            >
              <div className="absolute -left-[25px] p-1 rounded-full bg-background border">
                {getEventIcon(event.type)}
              </div>
              <div className="flex items-center">
                <Badge className={cn("mr-2", getEventColor(event.type))}>
                  {event.minute}'
                </Badge>
                <span className={cn(
                  "text-xs font-medium",
                  event.team === "home" ? "text-blue-500" : "text-red-500"
                )}>
                  {event.team === "home" ? "Home" : "Away"}
                </span>
              </div>
              <p className="text-sm mt-1">{event.description}</p>
              {event.player && (
                <p className="text-xs text-muted-foreground mt-1">
                  Player: {event.player}
                </p>
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}