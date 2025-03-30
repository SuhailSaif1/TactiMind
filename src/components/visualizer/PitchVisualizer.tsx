import { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { 
  ArrowLeft, 
  ArrowRight, 
  ZoomIn, 
  ZoomOut,
  RotateCw
} from "lucide-react";

interface Player {
  id: number;
  name: string;
  position: string;
  x: number;
  y: number;
  healthStatus: "healthy" | "moderate" | "risk";
}

interface PitchVisualizerProps {
  formation: string;
  players: Player[];
  className?: string;
}

export function PitchVisualizer({ formation, players, className }: PitchVisualizerProps) {
  const [zoom, setZoom] = useState(1);
  const [rotation, setRotation] = useState(0);

  const handleZoomIn = () => setZoom(prev => Math.min(prev + 0.1, 1.5));
  const handleZoomOut = () => setZoom(prev => Math.max(prev - 0.1, 0.7));
  const handleRotate = () => setRotation(prev => (prev + 180) % 360);

  const getHealthColor = (status: string) => {
    switch (status) {
      case "healthy": return "bg-green-500";
      case "moderate": return "bg-yellow-500";
      case "risk": return "bg-red-500";
      default: return "bg-green-500";
    }
  };

  return (
    <div className={cn("relative rounded-lg overflow-hidden border", className)}>
      <div className="absolute top-4 left-4 z-10 bg-background/80 backdrop-blur-sm p-2 rounded-md">
        <h3 className="font-semibold">{formation}</h3>
      </div>
      
      <div className="absolute top-4 right-4 z-10 flex space-x-2">
        <Button variant="outline" size="icon" onClick={handleZoomOut}>
          <ZoomOut className="h-4 w-4" />
        </Button>
        <Button variant="outline" size="icon" onClick={handleZoomIn}>
          <ZoomIn className="h-4 w-4" />
        </Button>
        <Button variant="outline" size="icon" onClick={handleRotate}>
          <RotateCw className="h-4 w-4" />
        </Button>
      </div>
      
      <div 
        className="relative bg-emerald-800 w-full aspect-[3/2]"
        style={{
          transform: `scale(${zoom}) rotate(${rotation}deg)`,
          transition: "transform 0.3s ease"
        }}
      >
        {/* Pitch markings */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-[80%] h-[90%] border-2 border-white/70"></div>
        </div>
        
        {/* Center circle */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[20%] aspect-square rounded-full border-2 border-white/70"></div>
        
        {/* Center line */}
        <div className="absolute top-0 left-1/2 h-full w-0.5 bg-white/70"></div>
        
        {/* Penalty areas */}
        <div className="absolute top-[20%] left-0 w-[15%] h-[60%] border-2 border-l-0 border-white/70"></div>
        <div className="absolute top-[20%] right-0 w-[15%] h-[60%] border-2 border-r-0 border-white/70"></div>
        
        {/* Goal areas */}
        <div className="absolute top-[35%] left-0 w-[5%] h-[30%] border-2 border-l-0 border-white/70"></div>
        <div className="absolute top-[35%] right-0 w-[5%] h-[30%] border-2 border-r-0 border-white/70"></div>
        
        {/* Players */}
        {players.map((player) => (
          <div 
            key={player.id}
            className="absolute flex flex-col items-center"
            style={{
              left: `${player.x}%`,
              top: `${player.y}%`,
              transform: "translate(-50%, -50%)"
            }}
          >
            <div className={cn(
              "w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold border-2 border-white",
              getHealthColor(player.healthStatus)
            )}>
              {player.id}
            </div>
            <span className="mt-1 text-xs font-medium bg-background/80 px-1 rounded text-foreground">
              {player.name}
            </span>
          </div>
        ))}
      </div>
      
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-4 z-10">
        <Button variant="outline" size="sm">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Previous
        </Button>
        <Button variant="outline" size="sm">
          Next
          <ArrowRight className="h-4 w-4 ml-2" />
        </Button>
      </div>
    </div>
  );
}