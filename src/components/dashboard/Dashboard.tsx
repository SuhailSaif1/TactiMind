import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PitchVisualizer } from "@/components/visualizer/PitchVisualizer";
import { TacticalSuggestion } from "@/components/tactics/TacticalSuggestion";
import { PlayerCard } from "@/components/players/PlayerCard";
import { MatchTimeline } from "@/components/match/MatchTimeline";
import { Badge } from "@/components/ui/badge";
import { 
  BarChart3, 
  TrendingUp, 
  TrendingDown, 
  AlertTriangle,
  Users
} from "lucide-react";

// Mock data
const mockPlayers = [
  { id: 1, name: "J. Smith", position: "GK", x: 50, y: 90, healthStatus: "healthy" as const },
  { id: 2, name: "A. Johnson", position: "DF", x: 20, y: 70, healthStatus: "healthy" as const },
  { id: 3, name: "M. Williams", position: "DF", x: 40, y: 70, healthStatus: "moderate" as const },
  { id: 4, name: "R. Jones", position: "DF", x: 60, y:70, healthStatus: "healthy" as const },
  { id: 5, name: "T. Brown", position: "DF", x: 80, y: 70, healthStatus: "healthy" as const },
  { id: 6, name: "S. Davis", position: "MF", x: 30, y: 50, healthStatus: "healthy" as const },
  { id: 7, name: "K. Miller", position: "MF", x: 50, y: 50, healthStatus: "risk" as const },
  { id: 8, name: "L. Wilson", position: "MF", x: 70, y: 50, healthStatus: "healthy" as const },
  { id: 9, name: "G. Moore", position: "FW", x: 30, y: 30, healthStatus: "healthy" as const },
  { id: 10, name: "P. Taylor", position: "FW", x: 50, y: 20, healthStatus: "moderate" as const },
  { id: 11, name: "H. Anderson", position: "FW", x: 70, y: 30, healthStatus: "healthy" as const },
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

const mockTimelineEvents = [
  {
    id: "evt1",
    type: "goal" as const,
    minute: 23,
    description: "Goal scored by P. Taylor",
    team: "home" as const,
    player: "P. Taylor"
  },
  {
    id: "evt2",
    type: "card" as const,
    minute: 35,
    description: "Yellow card for rough tackle",
    team: "away" as const,
    player: "Opposition Player"
  },
  {
    id: "evt3",
    type: "injury" as const,
    minute: 42,
    description: "Minor injury, continued after treatment",
    team: "home" as const,
    player: "K. Miller"
  },
  {
    id: "evt4",
    type: "tactical" as const,
    minute: 55,
    description: "Formation changed to 4-4-2",
    team: "home" as const
  },
  {
    id: "evt5",
    type: "goal" as const,
    minute: 67,
    description: "Goal conceded from corner",
    team: "away" as const,
    player: "Opposition Player"
  }
];

const playerDetailData = {
  id: 7,
  name: "K. Miller",
  position: "Midfielder",
  number: 8,
  stats: {
    fatigue: 78,
    injury: 65,
    fitness: 72
  },
  performance: {
    passes: 43,
    tackles: 6,
    distance: 8.7
  }
};

export function DashboardContent() {
  return (
    <div className="p-6 space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
        <div>
          <h1 className="text-3xl font-bold">Match Dashboard</h1>
          <p className="text-muted-foreground">FC Barcelona vs Real Madrid • Live - 70:25</p>
        </div>
        <div className="flex items-center mt-4 md:mt-0 space-x-2 bg-secondary p-2 rounded-md">
          <div className="text-center px-3">
            <p className="text-2xl font-bold">1</p>
            <p className="text-xs text-muted-foreground">Home</p>
          </div>
          <div className="text-center px-2">
            <p className="text-sm font-bold">-</p>
          </div>
          <div className="text-center px-3">
            <p className="text-2xl font-bold">1</p>
            <p className="text-xs text-muted-foreground">Away</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Current Formation</CardTitle>
            <CardDescription>4-4-2 with player positions and health status</CardDescription>
          </CardHeader>
          <CardContent>
            <PitchVisualizer 
              formation="4-4-2" 
              players={mockPlayers} 
              className="h-[400px]"
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>AI Recommendations</CardTitle>
            <CardDescription>Real-time tactical suggestions</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {mockSuggestions.map(suggestion => (
              <TacticalSuggestion 
                key={suggestion.id}
                suggestion={suggestion}
                onAccept={(id) => console.log("Accepted:", id)}
                onReject={(id) => console.log("Rejected:", id)}
              />
            ))}
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center">
              <BarChart3 className="h-4 w-4 mr-2 text-blue-500" />
              Possession
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">58%</div>
            <div className="flex items-center mt-1">
              <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
              <span className="text-xs text-green-500">+5% from first half</span>
            </div>
            <div className="w-full bg-secondary h-2 mt-2 rounded-full overflow-hidden">
              <div className="bg-blue-500 h-2 rounded-full" style={{ width: "58%" }}></div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center">
              <Users className="h-4 w-4 mr-2 text-amber-500" />
              Team Fatigue
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">62%</div>
            <div className="flex items-center mt-1">
              <TrendingUp className="h-4 w-4 text-red-500 mr-1" />
              <span className="text-xs text-red-500">+12% from first half</span>
            </div>
            <div className="w-full bg-secondary h-2 mt-2 rounded-full overflow-hidden">
              <div className="bg-amber-500 h-2 rounded-full" style={{ width: "62%" }}></div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center">
              <AlertTriangle className="h-4 w-4 mr-2 text-red-500" />
              Injury Risk
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2 Players</div>
            <div className="flex items-center mt-1">
              <TrendingUp className="h-4 w-4 text-red-500 mr-1" />
              <span className="text-xs text-red-500">+1 from first half</span>
            </div>
            <div className="flex space-x-1 mt-2">
              <Badge variant="outline" className="bg-red-500/10 text-red-500 border-red-500/20">
                K. Miller
              </Badge>
              <Badge variant="outline" className="bg-amber-500/10 text-amber-500 border-amber-500/20">
                P. Taylor
              </Badge>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center">
              <TrendingDown className="h-4 w-4 mr-2 text-green-500" />
              Opponent Pressure
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">43%</div>
            <div className="flex items-center mt-1">
              <TrendingDown className="h-4 w-4 text-green-500 mr-1" />
              <span className="text-xs text-green-500">-8% from first half</span>
            </div>
            <div className="w-full bg-secondary h-2 mt-2 rounded-full overflow-hidden">
              <div className="bg-green-500 h-2 rounded-full" style={{ width: "43%" }}></div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Tabs defaultValue="health" className="lg:col-span-2">
          <TabsList className="grid grid-cols-3 mb-4">
            <TabsTrigger value="health">Player Health</TabsTrigger>
            <TabsTrigger value="performance">Performance</TabsTrigger>
            <TabsTrigger value="comparison">Team Comparison</TabsTrigger>
          </TabsList>
          <TabsContent value="health" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <PlayerCard player={playerDetailData} />
              <Card className="md:col-span-1 lg:col-span-2">
                <CardHeader>
                  <CardTitle>Health Monitoring</CardTitle>
                  <CardDescription>Real-time player health data</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <h4 className="text-sm font-medium mb-2">Team Fatigue Distribution</h4>
                      <div className="h-[150px] bg-secondary/50 rounded-md flex items-end justify-around p-2">
                        {[65, 45, 78, 52, 40, 58, 72, 48, 62, 55, 50].map((value, i) => (
                          <div 
                            key={i} 
                            className="w-6 bg-gradient-to-t from-green-500 to-red-500 rounded-t"
                            style={{ height: `${value}%` }}
                          ></div>
                        ))}
                      </div>
                      <div className="flex justify-between mt-1 text-xs text-muted-foreground">
                        <span>Low Risk</span>
                        <span>Medium Risk</span>
                        <span>High Risk</span>
                      </div>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium mb-2">Injury Risk Factors</h4>
                      <div className="grid grid-cols-2 gap-2">
                        <div className="bg-secondary p-3 rounded-md">
                          <p className="text-xs text-muted-foreground">Previous Injuries</p>
                          <p className="font-bold">2 Players</p>
                        </div>
                        <div className="bg-secondary p-3 rounded-md">
                          <p className="text-xs text-muted-foreground">High Workload</p>
                          <p className="font-bold">3 Players</p>
                        </div>
                        <div className="bg-secondary p-3 rounded-md">
                          <p className="text-xs text-muted-foreground">Recovery Time</p>
                          <p className="font-bold">-12% Avg</p>
                        </div>
                        <div className="bg-secondary p-3 rounded-md">
                          <p className="text-xs text-muted-foreground">Muscle Strain</p>
                          <p className="font-bold">1 Player</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          <TabsContent value="performance">
            <Card>
              <CardHeader>
                <CardTitle>Team Performance Metrics</CardTitle>
                <CardDescription>Key performance indicators</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="bg-secondary p-3 rounded-md text-center">
                      <p className="text-xs text-muted-foreground">Shots</p>
                      <p className="font-bold text-xl">12</p>
                    </div>
                    <div className="bg-secondary p-3 rounded-md text-center">
                      <p className="text-xs text-muted-foreground">Shots on Target</p>
                      <p className="font-bold text-xl">5</p>
                    </div>
                    <div className="bg-secondary p-3 rounded-md text-center">
                      <p className="text-xs text-muted-foreground">Passes</p>
                      <p className="font-bold text-xl">342</p>
                    </div>
                    <div className="bg-secondary p-3 rounded-md text-center">
                      <p className="text-xs text-muted-foreground">Pass Accuracy</p>
                      <p className="font-bold text-xl">87%</p>
                    </div>
                  </div>
                  
                  <div className="h-[200px] bg-secondary/50 rounded-md p-4">
                    <p className="text-sm font-medium mb-2">Performance Chart Placeholder</p>
                    <div className="h-full flex items-center justify-center text-muted-foreground">
                      Performance visualization would appear here
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="comparison">
            <Card>
              <CardHeader>
                <CardTitle>Team Comparison</CardTitle>
                <CardDescription>Head-to-head statistics</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="text-center w-20">
                      <p className="font-bold">58%</p>
                      <p className="text-xs text-muted-foreground">Home</p>
                    </div>
                    <div className="flex-1 px-4">
                      <p className="text-xs text-center mb-1">Possession</p>
                      <div className="flex h-2 rounded-full overflow-hidden">
                        <div className="bg-blue-500 h-2" style={{ width: "58%" }}></div>
                        <div className="bg-red-500 h-2" style={{ width: "42%" }}></div>
                      </div>
                    </div>
                    <div className="text-center w-20">
                      <p className="font-bold">42%</p>
                      <p className="text-xs text-muted-foreground">Away</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="text-center w-20">
                      <p className="font-bold">12</p>
                      <p className="text-xs text-muted-foreground">Home</p>
                    </div>
                    <div className="flex-1 px-4">
                      <p className="text-xs text-center mb-1">Shots</p>
                      <div className="flex h-2 rounded-full overflow-hidden">
                        <div className="bg-blue-500 h-2" style={{ width: "60%" }}></div>
                        <div className="bg-red-500 h-2" style={{ width: "40%" }}></div>
                      </div>
                    </div>
                    <div className="text-center w-20">
                      <p className="font-bold">8</p>
                      <p className="text-xs text-muted-foreground">Away</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="text-center w-20">
                      <p className="font-bold">5</p>
                      <p className="text-xs text-muted-foreground">Home</p>
                    </div>
                    <div className="flex-1 px-4">
                      <p className="text-xs text-center mb-1">Corners</p>
                      <div className="flex h-2 rounded-full overflow-hidden">
                        <div className="bg-blue-500 h-2" style={{ width: "55%" }}></div>
                        <div className="bg-red-500 h-2" style={{ width: "45%" }}></div>
                      </div>
                    </div>
                    <div className="text-center w-20">
                      <p className="font-bold">4</p>
                      <p className="text-xs text-muted-foreground">Away</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="text-center w-20">
                      <p className="font-bold">2</p>
                      <p className="text-xs text-muted-foreground">Home</p>
                    </div>
                    <div className="flex-1 px-4">
                      <p className="text-xs text-center mb-1">Yellow Cards</p>
                      <div className="flex h-2 rounded-full overflow-hidden">
                        <div className="bg-blue-500 h-2" style={{ width: "40%" }}></div>
                        <div className="bg-red-500 h-2" style={{ width: "60%" }}></div>
                      </div>
                    </div>
                    <div className="text-center w-20">
                      <p className="font-bold">3</p>
                      <p className="text-xs text-muted-foreground">Away</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
        
        <MatchTimeline events={mockTimelineEvents} />
      </div>
    </div>
  );
}