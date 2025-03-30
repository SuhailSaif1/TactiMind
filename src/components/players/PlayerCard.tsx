import { cn } from "@/lib/utils";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { HealthIndicator } from "@/components/health/HealthIndicator";
import { Badge } from "@/components/ui/badge";

interface PlayerCardProps {
  player: {
    id: number;
    name: string;
    position: string;
    number: number;
    image?: string;
    stats: {
      fatigue: number;
      injury: number;
      fitness: number;
    };
    performance: {
      passes: number;
      tackles: number;
      distance: number;
    };
  };
  className?: string;
}

export function PlayerCard({ player, className }: PlayerCardProps) {
  const getPositionColor = (position: string) => {
    switch (position.toLowerCase()) {
      case "goalkeeper":
      case "gk":
        return "bg-yellow-500 text-yellow-950";
      case "defender":
      case "df":
        return "bg-blue-500 text-blue-950";
      case "midfielder":
      case "mf":
        return "bg-green-500 text-green-950";
      case "forward":
      case "fw":
        return "bg-red-500 text-red-950";
      default:
        return "bg-gray-500 text-gray-950";
    }
  };

  return (
    <Card className={cn("overflow-hidden", className)}>
      <CardHeader className="p-0">
        <div className="relative h-24 bg-gradient-to-r from-primary/20 to-primary/5">
          <div className="absolute bottom-0 left-0 right-0 flex items-end justify-between p-4">
            <div>
              <h3 className="font-bold text-lg">{player.name}</h3>
              <Badge className={cn("mt-1", getPositionColor(player.position))}>
                {player.position}
              </Badge>
            </div>
            <div className="flex items-center justify-center w-12 h-12 rounded-full bg-background border-4 border-primary text-xl font-bold">
              {player.number}
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-4">
        <div className="space-y-3">
          <HealthIndicator 
            type="fatigue" 
            value={player.stats.fatigue} 
            label="Fatigue" 
          />
          <HealthIndicator 
            type="injury" 
            value={player.stats.injury} 
            label="Injury Risk" 
          />
          <HealthIndicator 
            type="fitness" 
            value={player.stats.fitness} 
            label="Fitness" 
          />
        </div>
        
        <div className="grid grid-cols-3 gap-2 mt-4 text-center">
          <div className="bg-secondary rounded-md p-2">
            <p className="text-xs text-muted-foreground">Passes</p>
            <p className="font-bold">{player.performance.passes}</p>
          </div>
          <div className="bg-secondary rounded-md p-2">
            <p className="text-xs text-muted-foreground">Tackles</p>
            <p className="font-bold">{player.performance.tackles}</p>
          </div>
          <div className="bg-secondary rounded-md p-2">
            <p className="text-xs text-muted-foreground">Distance</p>
            <p className="font-bold">{player.performance.distance}km</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}