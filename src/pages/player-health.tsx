import { Layout } from "@/components/layout/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PlayerCard } from "@/components/players/PlayerCard";
import { HealthIndicator } from "@/components/health/HealthIndicator";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle, Activity, ThermometerIcon } from "lucide-react";

// Mock player data
const players = [
  {
    id: 1,
    name: "J. Smith",
    position: "Goalkeeper",
    number: 1,
    stats: {
      fatigue: 45,
      injury: 20,
      fitness: 85
    },
    performance: {
      passes: 22,
      tackles: 0,
      distance: 3.2
    }
  },
  {
    id: 2,
    name: "A. Johnson",
    position: "Defender",
    number: 2,
    stats: {
      fatigue: 62,
      injury: 35,
      fitness: 78
    },
    performance: {
      passes: 45,
      tackles: 4,
      distance: 9.1
    }
  },
  {
    id: 3,
    name: "M. Williams",
    position: "Defender",
    number: 4,
    stats: {
      fatigue: 58,
      injury: 45,
      fitness: 72
    },
    performance: {
      passes: 52,
      tackles: 6,
      distance: 8.7
    }
  },
  {
    id: 4,
    name: "R. Jones",
    position: "Defender",
    number: 5,
    stats: {
      fatigue: 60,
      injury: 30,
      fitness: 75
    },
    performance: {
      passes: 48,
      tackles: 5,
      distance: 8.5
    }
  },
  {
    id: 5,
    name: "T. Brown",
    position: "Defender",
    number: 3,
    stats: {
      fatigue: 65,
      injury: 25,
      fitness: 80
    },
    performance: {
      passes: 38,
      tackles: 3,
      distance: 9.3
    }
  },
  {
    id: 6,
    name: "S. Davis",
    position: "Midfielder",
    number: 6,
    stats: {
      fatigue: 70,
      injury: 40,
      fitness: 75
    },
    performance: {
      passes: 62,
      tackles: 8,
      distance: 10.2
    }
  },
  {
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
  },
  {
    id: 8,
    name: "L. Wilson",
    position: "Midfielder",
    number: 10,
    stats: {
      fatigue: 68,
      injury: 30,
      fitness: 82
    },
    performance: {
      passes: 58,
      tackles: 4,
      distance: 9.8
    }
  },
  {
    id: 9,
    name: "G. Moore",
    position: "Forward",
    number: 7,
    stats: {
      fatigue: 72,
      injury: 35,
      fitness: 78
    },
    performance: {
      passes: 28,
      tackles: 1,
      distance: 9.5
    }
  },
  {
    id: 10,
    name: "P. Taylor",
    position: "Forward",
    number: 9,
    stats: {
      fatigue: 75,
      injury: 55,
      fitness: 70
    },
    performance: {
      passes: 18,
      tackles: 0,
      distance: 8.9
    }
  },
  {
    id: 11,
    name: "H. Anderson",
    position: "Forward",
    number: 11,
    stats: {
      fatigue: 68,
      injury: 25,
      fitness: 85
    },
    performance: {
      passes: 22,
      tackles: 2,
      distance: 9.1
    }
  }
];

const PlayerHealth = () => {
  // Sort players by fatigue level (highest first)
  const sortedByFatigue = [...players].sort((a, b) => b.stats.fatigue - a.stats.fatigue);
  
  // Sort players by injury risk (highest first)
  const sortedByInjuryRisk = [...players].sort((a, b) => b.stats.injury - a.stats.injury);
  
  // Get players with high fatigue (>70%)
  const highFatiguePlayers = players.filter(player => player.stats.fatigue > 70);
  
  // Get players with high injury risk (>50%)
  const highInjuryRiskPlayers = players.filter(player => player.stats.injury > 50);

  return (
    <Layout>
      <div className="p-6 space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Player Health Monitoring</h1>
          <p className="text-muted-foreground">FC Barcelona vs Real Madrid • Live - 70:25</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center">
                <ThermometerIcon className="h-5 w-5 mr-2 text-amber-500" />
                Fatigue Alerts
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Team Average</span>
                  <span className="text-sm font-bold">65%</span>
                </div>
                <div className="w-full bg-secondary h-2 rounded-full">
                  <div className="bg-amber-500 h-2 rounded-full" style={{ width: "65%" }}></div>
                </div>
                <div className="pt-2">
                  <h4 className="text-sm font-medium mb-2">High Fatigue Players</h4>
                  <div className="space-y-2">
                    {highFatiguePlayers.map(player => (
                      <div key={player.id} className="flex items-center justify-between bg-secondary/50 p-2 rounded-md">
                        <div className="flex items-center">
                          <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-xs font-bold mr-2">
                            {player.number}
                          </div>
                          <div>
                            <p className="text-sm font-medium">{player.name}</p>
                            <p className="text-xs text-muted-foreground">{player.position}</p>
                          </div>
                        </div>
                        <Badge className="bg-amber-500 text-amber-950">
                          {player.stats.fatigue}%
                        </Badge>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center">
                <AlertTriangle className="h-5 w-5 mr-2 text-red-500" />
                Injury Risk Alerts
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Team Average</span>
                  <span className="text-sm font-bold">38%</span>
                </div>
                <div className="w-full bg-secondary h-2 rounded-full">
                  <div className="bg-red-500 h-2 rounded-full" style={{ width: "38%" }}></div>
                </div>
                <div className="pt-2">
                  <h4 className="text-sm font-medium mb-2">High Risk Players</h4>
                  <div className="space-y-2">
                    {highInjuryRiskPlayers.map(player => (
                      <div key={player.id} className="flex items-center justify-between bg-secondary/50 p-2 rounded-md">
                        <div className="flex items-center">
                          <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-xs font-bold mr-2">
                            {player.number}
                          </div>
                          <div>
                            <p className="text-sm font-medium">{player.name}</p>
                            <p className="text-xs text-muted-foreground">{player.position}</p>
                          </div>
                        </div>
                        <Badge className="bg-red-500 text-red-950">
                          {player.stats.injury}%
                        </Badge>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center">
                <Activity className="h-5 w-5 mr-2 text-green-500" />
                Fitness Status
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Team Average</span>
                  <span className="text-sm font-bold">77%</span>
                </div>
                <div className="w-full bg-secondary h-2 rounded-full">
                  <div className="bg-green-500 h-2 rounded-full" style={{ width: "77%" }}></div>
                </div>
                <div className="pt-2">
                  <h4 className="text-sm font-medium mb-2">Fitness Distribution</h4>
                  <div className="h-[100px] bg-secondary/50 rounded-md flex items-end justify-around p-2">
                    {players.map((player) => (
                      <div 
                        key={player.id} 
                        className="w-4 bg-gradient-to-t from-red-500 to-green-500 rounded-t"
                        style={{ height: `${player.stats.fitness}%` }}
                      ></div>
                    ))}
                  </div>
                  <div className="flex justify-between mt-1 text-xs text-muted-foreground">
                    <span>Low</span>
                    <span>Medium</span>
                    <span>High</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="all">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="all">All Players</TabsTrigger>
            <TabsTrigger value="fatigue">By Fatigue</TabsTrigger>
            <TabsTrigger value="injury">By Injury Risk</TabsTrigger>
            <TabsTrigger value="position">By Position</TabsTrigger>
          </TabsList>
          
          <TabsContent value="all" className="mt-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {players.map(player => (
                <PlayerCard key={player.id} player={player} />
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="fatigue" className="mt-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {sortedByFatigue.map(player => (
                <PlayerCard key={player.id} player={player} />
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="injury" className="mt-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {sortedByInjuryRisk.map(player => (
                <PlayerCard key={player.id} player={player} />
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="position" className="mt-6">
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-3">Goalkeepers</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                  {players.filter(p => p.position === "Goalkeeper").map(player => (
                    <PlayerCard key={player.id} player={player} />
                  ))}
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold mb-3">Defenders</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                  {players.filter(p => p.position === "Defender").map(player => (
                    <PlayerCard key={player.id} player={player} />
                  ))}
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold mb-3">Midfielders</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                  {players.filter(p => p.position === "Midfielder").map(player => (
                    <PlayerCard key={player.id} player={player} />
                  ))}
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold mb-3">Forwards</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                  {players.filter(p => p.position === "Forward").map(player => (
                    <PlayerCard key={player.id} player={player} />
                  ))}
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default PlayerHealth;