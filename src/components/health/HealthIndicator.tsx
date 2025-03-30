import { cn } from "@/lib/utils";
import { 
  AlertTriangle, 
  Activity, 
  ThermometerIcon 
} from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface HealthIndicatorProps {
  type: "fatigue" | "injury" | "fitness";
  value: number; // 0-100
  label?: string;
  className?: string;
}

export function HealthIndicator({ type, value, label, className }: HealthIndicatorProps) {
  const getColor = () => {
    if (value > 75) return type === "fatigue" ? "text-red-500" : "text-green-500";
    if (value > 50) return type === "fatigue" ? "text-amber-500" : "text-amber-500";
    return type === "fatigue" ? "text-green-500" : "text-red-500";
  };

  const getIcon = () => {
    switch (type) {
      case "fatigue":
        return <ThermometerIcon className={cn("h-5 w-5", getColor())} />;
      case "injury":
        return <AlertTriangle className={cn("h-5 w-5", getColor())} />;
      case "fitness":
        return <Activity className={cn("h-5 w-5", getColor())} />;
      default:
        return null;
    }
  };

  const getTooltipText = () => {
    switch (type) {
      case "fatigue":
        return `Fatigue Level: ${value}%`;
      case "injury":
        return `Injury Risk: ${value}%`;
      case "fitness":
        return `Fitness Level: ${value}%`;
      default:
        return "";
    }
  };

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <div className={cn("flex items-center space-x-2", className)}>
            {getIcon()}
            {label && <span className="text-sm font-medium">{label}</span>}
            <div className="w-full bg-secondary rounded-full h-2">
              <div 
                className={cn(
                  "h-2 rounded-full",
                  type === "fatigue" 
                    ? "bg-gradient-to-r from-green-500 to-red-500" 
                    : "bg-gradient-to-r from-red-500 to-green-500"
                )}
                style={{ width: `${value}%` }}
              ></div>
            </div>
            <span className="text-xs font-medium">{value}%</span>
          </div>
        </TooltipTrigger>
        <TooltipContent>
          <p>{getTooltipText()}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}