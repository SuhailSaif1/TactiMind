import { cn } from "@/lib/utils";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { AlertCircle, Check, X, Lightbulb } from "lucide-react";

interface TacticalSuggestionProps {
  suggestion: {
    id: string;
    title: string;
    description: string;
    confidence: number;
    type: "formation" | "substitution" | "strategy";
    urgency: "low" | "medium" | "high";
    timestamp: string;
  };
  onAccept?: (id: string) => void;
  onReject?: (id: string) => void;
  className?: string;
}

export function TacticalSuggestion({ 
  suggestion, 
  onAccept, 
  onReject, 
  className 
}: TacticalSuggestionProps) {
  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case "high": return "bg-red-500 text-red-950";
      case "medium": return "bg-amber-500 text-amber-950";
      case "low": return "bg-green-500 text-green-950";
      default: return "bg-blue-500 text-blue-950";
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "formation": return "Formation";
      case "substitution": return "Substitution";
      case "strategy": return "Strategy";
      default: return "Tactical";
    }
  };

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 80) return "text-green-500";
    if (confidence >= 60) return "text-amber-500";
    return "text-red-500";
  };

  return (
    <Card className={cn("border-l-4", getUrgencyColor(suggestion.urgency), className)}>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <CardTitle className="text-base font-semibold flex items-center">
            <Lightbulb className="h-4 w-4 mr-2" />
            {suggestion.title}
          </CardTitle>
          <Badge variant="outline">{getTypeIcon(suggestion.type)}</Badge>
        </div>
      </CardHeader>
      <CardContent className="pb-2">
        <p className="text-sm text-muted-foreground">{suggestion.description}</p>
        <div className="flex items-center mt-2">
          <AlertCircle className={cn("h-4 w-4 mr-1", getConfidenceColor(suggestion.confidence))} />
          <span className={cn("text-xs font-medium", getConfidenceColor(suggestion.confidence))}>
            {suggestion.confidence}% confidence
          </span>
          <span className="text-xs text-muted-foreground ml-auto">
            {suggestion.timestamp}
          </span>
        </div>
      </CardContent>
      <CardFooter className="pt-0">
        <div className="flex space-x-2 w-full">
          <Button 
            variant="outline" 
            size="sm" 
            className="flex-1"
            onClick={() => onReject?.(suggestion.id)}
          >
            <X className="h-4 w-4 mr-1" />
            Dismiss
          </Button>
          <Button 
            variant="default" 
            size="sm" 
            className="flex-1"
            onClick={() => onAccept?.(suggestion.id)}
          >
            <Check className="h-4 w-4 mr-1" />
            Apply
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}