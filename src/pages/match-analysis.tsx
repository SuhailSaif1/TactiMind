import { Layout } from "@/components/layout/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MatchTimeline } from "@/components/match/MatchTimeline";
import { Badge } from "@/components/ui/badge";

// Mock timeline events
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

const MatchAnalysis = () => {
  return (
    <Layout>
      <div className="p-6 space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Match Analysis</h1>
          <p className="text-muted-foreground">FC Barcelona vs Real Madrid • Live - 70:25</p>
        </div>

        <Tabs defaultValue="overview">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="opponent">Opponent Analysis</TabsTrigger>
            <TabsTrigger value="patterns">Play Patterns</TabsTrigger>
            <TabsTrigger value="heatmaps">Heatmaps</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="space-y-6 mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Match Statistics</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="text-center w-20">
                        <p className="font-bold">58%</p>
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
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="text-center w-20">
                        <p className="font-bold">12</p>
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
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="text-center w-20">
                        <p className="font-bold">5</p>
                      </div>
                      <div className="flex-1 px-4">
                        <p className="text-xs text-center mb-1">Shots on Target</p>
                        <div className="flex h-2 rounded-full overflow-hidden">
                          <div className="bg-blue-500 h-2" style={{ width: "62%" }}></div>
                          <div className="bg-red-500 h-2" style={{ width: "38%" }}></div>
                        </div>
                      </div>
                      <div className="text-center w-20">
                        <p className="font-bold">3</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="text-center w-20">
                        <p className="font-bold">342</p>
                      </div>
                      <div className="flex-1 px-4">
                        <p className="text-xs text-center mb-1">Passes</p>
                        <div className="flex h-2 rounded-full overflow-hidden">
                          <div className="bg-blue-500 h-2" style={{ width: "55%" }}></div>
                          <div className="bg-red-500 h-2" style={{ width: "45%" }}></div>
                        </div>
                      </div>
                      <div className="text-center w-20">
                        <p className="font-bold">280</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="text-center w-20">
                        <p className="font-bold">87%</p>
                      </div>
                      <div className="flex-1 px-4">
                        <p className="text-xs text-center mb-1">Pass Accuracy</p>
                        <div className="flex h-2 rounded-full overflow-hidden">
                          <div className="bg-blue-500 h-2" style={{ width: "52%" }}></div>
                          <div className="bg-red-500 h-2" style={{ width: "48%" }}></div>
                        </div>
                      </div>
                      <div className="text-center w-20">
                        <p className="font-bold">82%</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="text-center w-20">
                        <p className="font-bold">5</p>
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
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <MatchTimeline events={mockTimelineEvents} />
            </div>
            
            <Card>
              <CardHeader>
                <CardTitle>AI Match Insights</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 border rounded-md">
                    <div className="flex items-center mb-2">
                      <Badge className="bg-blue-500 text-blue-950">Tactical Insight</Badge>
                      <span className="text-xs text-muted-foreground ml-auto">Confidence: 92%</span>
                    </div>
                    <p className="text-sm">
                      Opponent is consistently leaving space behind their left-back when transitioning to attack. 
                      This creates an opportunity for quick counter-attacks down our right flank.
                    </p>
                  </div>
                  
                  <div className="p-4 border rounded-md">
                    <div className="flex items-center mb-2">
                      <Badge className="bg-green-500 text-green-950">Strength</Badge>
                      <span className="text-xs text-muted-foreground ml-auto">Confidence: 88%</span>
                    </div>
                    <p className="text-sm">
                      Our midfield is winning 68% of aerial duels, giving us control of second balls and 
                      allowing us to maintain possession in the middle third.
                    </p>
                  </div>
                  
                  <div className="p-4 border rounded-md">
                    <div className="flex items-center mb-2">
                      <Badge className="bg-red-500 text-red-950">Weakness</Badge>
                      <span className="text-xs text-muted-foreground ml-auto">Confidence: 85%</span>
                    </div>
                    <p className="text-sm">
                      We're vulnerable to through balls between our center-backs. Opponent has attempted 
                      this 5 times, creating 2 high-quality chances.
                    </p>
                  </div>
                  
                  <div className="p-4 border rounded-md">
                    <div className="flex items-center mb-2">
                      <Badge className="bg-purple-500 text-purple-950">Opportunity</Badge>
                      <span className="text-xs text-muted-foreground ml-auto">Confidence: 79%</span>
                    </div>
                    <p className="text-sm">
                      Opponent's defensive line is tiring and dropping deeper. Increasing our pressing intensity 
                      could force errors in their build-up play.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="opponent" className="space-y-6 mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Opponent Analysis</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[400px] flex items-center justify-center text-muted-foreground">
                  Opponent analysis content would appear here
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="patterns" className="space-y-6 mt-6"><Card>
              <CardHeader>
                <CardTitle>Play Patterns</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[400px] flex items-center justify-center text-muted-foreground">
                  Play patterns analysis would appear here
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="heatmaps" className="space-y-6 mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Player Heatmaps</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[400px] flex items-center justify-center text-muted-foreground">
                  Heatmap visualizations would appear here
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default MatchAnalysis;