import { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PitchVisualizer } from "@/components/visualizer/PitchVisualizer";
import { TacticalSuggestion } from "@/components/tactics/TacticalSuggestion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Save, 
  Plus, 
  Trash2, 
  Copy, 
  Check,
  ArrowRight
} from "lucide-react";

// Mock data
const formations = [
  {
    id: "f1",
    name: "4-4-2",
    description: "Standard balanced formation",
    players: [
      { id: 1, name: "J. Smith", position: "GK", x: 50, y: 90, healthStatus: "healthy" as const },
      { id: 2, name: "A. Johnson", position: "DF", x: 20, y: 70, healthStatus: "healthy" as const },
      { id: 3, name: "M. Williams", position: "DF", x: 40, y: 70, healthStatus: "moderate" as const },
      { id: 4, name: "R. Jones", position: "DF", x: 60, y: 70, healthStatus: "healthy" as const },
      { id: 5, name: "T. Brown", position: "DF", x: 80, y: 70, healthStatus: "healthy" as const },
      { id: 6, name: "S. Davis", position: "MF", x: 30, y: 50, healthStatus: "healthy" as const },
      { id: 7, name: "K. Miller", position: "MF", x: 50, y: 50, healthStatus: "risk" as const },
      { id: 8, name: "L. Wilson", position: "MF", x: 70, y: 50, healthStatus: "healthy" as const },
      { id: 9, name: "G. Moore", position: "FW", x: 35, y: 30, healthStatus: "healthy" as const },
      { id: 10, name: "P. Taylor", position: "FW", x: 65, y: 30, healthStatus: "moderate" as const },
      { id: 11, name: "H. Anderson", position: "FW", x: 50, y: 20, healthStatus: "healthy" as const },
    ]
  },
  {
    id: "f2",
    name: "4-3-3",
    description: "Attacking formation",
    players: [
      { id: 1, name: "J. Smith", position: "GK", x: 50, y: 90, healthStatus: "healthy" as const },
      { id: 2, name: "A. Johnson", position: "DF", x: 20, y: 70, healthStatus: "healthy" as const },
      { id: 3, name: "M. Williams", position: "DF", x: 40, y: 70, healthStatus: "moderate" as const },
      { id: 4, name: "R. Jones", position: "DF", x: 60, y: 70, healthStatus: "healthy" as const },
      { id: 5, name: "T. Brown", position: "DF", x: 80, y: 70, healthStatus: "healthy" as const },
      { id: 6, name: "S. Davis", position: "MF", x: 30, y: 50, healthStatus: "healthy" as const },
      { id: 7, name: "K. Miller", position: "MF", x: 50, y: 50, healthStatus: "risk" as const },
      { id: 8, name: "L. Wilson", position: "MF", x: 70, y: 50, healthStatus: "healthy" as const },
      { id: 9, name: "G. Moore", position: "FW", x: 25, y: 25, healthStatus: "healthy" as const },
      { id: 10, name: "P. Taylor", position: "FW", x: 50, y: 25, healthStatus: "moderate" as const },
      { id: 11, name: "H. Anderson", position: "FW", x: 75, y: 25, healthStatus: "healthy" as const },
    ]
  },
  {
    id: "f3",
    name: "3-5-2",
    description: "Midfield control formation",
    players: [
      { id: 1, name: "J. Smith", position: "GK", x: 50, y: 90, healthStatus: "healthy" as const },
      { id: 2, name: "A. Johnson", position: "DF", x: 30, y: 70, healthStatus: "healthy" as const },
      { id: 3, name: "M. Williams", position: "DF", x: 50, y: 70, healthStatus: "moderate" as const },
      { id: 4, name: "R. Jones", position: "DF", x: 70, y: 70, healthStatus: "healthy" as const },
      { id: 5, name: "T. Brown", position: "MF", x: 20, y: 50, healthStatus: "healthy" as const },
      { id: 6, name: "S. Davis", position: "MF", x: 35, y: 50, healthStatus: "healthy" as const },
      { id: 7, name: "K. Miller", position: "MF", x: 50, y: 50, healthStatus: "risk" as const },
      { id: 8, name: "L. Wilson", position: "MF", x: 65, y: 50, healthStatus: "healthy" as const },
      { id: 9, name: "G. Moore", position: "MF", x: 80, y: 50, healthStatus: "healthy" as const },
      { id: 10, name: "P. Taylor", position: "FW", x: 40, y: 30, healthStatus: "moderate" as const },
      { id: 11, name: "H. Anderson", position: "FW", x: 60, y: 30, healthStatus: "healthy" as const },
    ]
  }
];

const mockSuggestions = [
  {
    id: "sug1",
    title: "Switch to 4-3-3 Formation",
    description: "Opponent is vulnerable on the wings. Switching to 4-3-3 will create more attacking opportunities.",
    confidence: 85,
    type: "formation" as const,
    urgency: "medium" as const,
    timestamp: "65:20"
  },
  {
    id: "sug2",
    title: "Substitute Player #7",
    description: "K. Miller showing signs of fatigue. Consider substitution in next 5-10 minutes.",
    confidence: 92,
    type: "substitution" as const,
    urgency: "high" as const,
    timestamp: "67:15"
  },
  {
    id: "sug3",
    title: "Increase Pressing Intensity",
    description: "Opponent midfield showing signs of fatigue. Increased pressing could force errors.",
    confidence: 78,
    type: "strategy" as const,
    urgency: "low" as const,
    timestamp: "70:05"
  }
];

const Tactics = () => {
  const [selectedFormation, setSelectedFormation] = useState(formations[0]);
  const [appliedSuggestions, setAppliedSuggestions] = useState<string[]>([]);

  const handleApplySuggestion = (id: string) => {
    setAppliedSuggestions(prev => [...prev, id]);
    
    // If it's a formation suggestion, change the formation
    if (id === "sug1") {
      setSelectedFormation(formations[1]);
    }
  };

  return (
    <Layout>
      <div className="p-6 space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Tactics & Formations</h1>
          <p className="text-muted-foreground">FC Barcelona vs Real Madrid • Live - 70:25</p>
        </div>

        <Tabs defaultValue="formations">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="formations">Formations</TabsTrigger>
            <TabsTrigger value="strategies">Strategies</TabsTrigger>
            <TabsTrigger value="setpieces">Set Pieces</TabsTrigger>
          </TabsList>
          
          <TabsContent value="formations" className="space-y-6 mt-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle>Current Formation</CardTitle>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm">
                        <Copy className="h-4 w-4 mr-2" />
                        Clone
                      </Button>
                      <Button variant="default" size="sm">
                        <Save className="h-4 w-4 mr-2" />
                        Save
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <PitchVisualizer 
                      formation={selectedFormation.name} 
                      players={selectedFormation.players} 
                      className="h-[500px]"
                    />
                  </CardContent>
                </Card>
              </div>

              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Formation Library</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {formations.map(formation => (
                      <div 
                        key={formation.id}
                        className={`p-3 border rounded-md cursor-pointer hover:bg-accent transition-colors ${
                          selectedFormation.id === formation.id ? "border-primary bg-accent" : ""
                        }`}
                        onClick={() => setSelectedFormation(formation)}
                      >
                        <div className="flex items-center justify-between">
                          <h3 className="font-semibold">{formation.name}</h3>
                          {selectedFormation.id === formation.id && (
                            <Check className="h-4 w-4 text-primary" />
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground">{formation.description}</p>
                      </div>
                    ))}
                    <Button variant="outline" className="w-full">
                      <Plus className="h-4 w-4 mr-2" />
                      Create New Formation
                    </Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>AI Recommendations</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {mockSuggestions
                      .filter(s => s.type === "formation")
                      .map(suggestion => (
                        <TacticalSuggestion 
                          key={suggestion.id}
                          suggestion={suggestion}
                          onAccept={handleApplySuggestion}
                          onReject={() => {}}
                          className={appliedSuggestions.includes(suggestion.id) ? "opacity-50" : ""}
                        />
                      ))}
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="strategies" className="space-y-6 mt-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Active Strategies</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="p-4 border rounded-md">
                        <div className="flex items-center justify-between">
                          <h3 className="font-semibold">High Press</h3>
                          <Badge>Active</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mt-1">
                          Press opponent high up the pitch to force errors in their defensive third.
                        </p>
                        <div className="flex justify-end mt-2">
                          <Button variant="outline" size="sm" className="mr-2">
                            <Trash2 className="h-4 w-4 mr-1" />
                            Remove
                          </Button>
                          <Button variant="default" size="sm">
                            <ArrowRight className="h-4 w-4 mr-1" />
                            Adjust
                          </Button>
                        </div>
                      </div>
                      
                      <div className="p-4 border rounded-md">
                        <div className="flex items-center justify-between">
                          <h3 className="font-semibold">Counter Attack</h3>
                          <Badge>Active</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mt-1">
                          Quick transitions when possession is regained to exploit spaces behind opponent's defense.
                        </p>
                        <div className="flex justify-end mt-2">
                          <Button variant="outline" size="sm" className="mr-2">
                            <Trash2 className="h-4 w-4 mr-1" />
                            Remove
                          </Button>
                          <Button variant="default" size="sm">
                            <ArrowRight className="h-4 w-4 mr-1" />
                            Adjust
                          </Button>
                        </div>
                      </div>
                      
                      <Button variant="outline" className="w-full">
                        <Plus className="h-4 w-4 mr-2" />
                        Add New Strategy
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div>
                <Card>
                  <CardHeader>
                    <CardTitle>AI Recommendations</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {mockSuggestions
                      .filter(s => s.type === "strategy")
                      .map(suggestion => (
                        <TacticalSuggestion 
                          key={suggestion.id}
                          suggestion={suggestion}
                          onAccept={handleApplySuggestion}
                          onReject={() => {}}
                          className={appliedSuggestions.includes(suggestion.id) ? "opacity-50" : ""}
                        />
                      ))}
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="setpieces" className="space-y-6 mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Set Piece Strategies</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 border rounded-md">
                      <h3 className="font-semibold">Corner Kicks</h3>
                      <p className="text-sm text-muted-foreground mt-1">
                        Near post run with far post target. 3 players in the box.
                      </p>
                      <Button variant="outline" size="sm" className="mt-2">
                        <ArrowRight className="h-4 w-4 mr-1" />
                        View Details
                      </Button>
                    </div>
                    
                    <div className="p-4 border rounded-md">
                      <h3 className="font-semibold">Free Kicks</h3>
                      <p className="text-sm text-muted-foreground mt-1">
                        Direct shot or short pass option based on distance.
                      </p>
                      <Button variant="outline" size="sm" className="mt-2">
                        <ArrowRight className="h-4 w-4 mr-1" />
                        View Details
                      </Button>
                    </div>
                    
                    <div className="p-4 border rounded-md">
                      <h3 className="font-semibold">Throw-ins</h3>
                      <p className="text-sm text-muted-foreground mt-1">
                        Quick throw to feet with support player nearby.
                      </p>
                      <Button variant="outline" size="sm" className="mt-2">
                        <ArrowRight className="h-4 w-4 mr-1" />
                        View Details
                      </Button>
                    </div>
                    
                    <div className="p-4 border rounded-md">
                      <h3 className="font-semibold">Goal Kicks</h3>
                      <p className="text-sm text-muted-foreground mt-1">
                        Short build-up with center backs splitting wide.
                      </p>
                      <Button variant="outline" size="sm" className="mt-2">
                        <ArrowRight className="h-4 w-4 mr-1" />
                        View Details
                      </Button>
                    </div>
                  </div>
                  
                  <div className="h-[300px] bg-secondary/50 rounded-md flex items-center justify-center text-muted-foreground">
                    Set piece visualization would appear here
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default Tactics;