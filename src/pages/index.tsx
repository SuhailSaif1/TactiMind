import { useState } from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { SystemDiagram } from "@/components/diagram/SystemDiagram";
import { ComponentCard } from "@/components/diagram/ComponentCard";
import { PitchVisualization } from "@/components/visualization/PitchVisualization";
import { TacticalInsights } from "@/components/visualization/TacticalInsights";
import { systemComponents } from "@/lib/data";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Info } from "lucide-react";

const Index = () => {
  const [activeTab, setActiveTab] = useState("diagram");

  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <Header />
      
      <main className="flex-1 py-6 md:py-10">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center mb-8">
            <Badge className="px-3 py-1 text-sm" variant="outline">Real-Time Analytics</Badge>
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              Sports Tactical Analysis System
            </h1>
            <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
              Advanced real-time tactical analysis for sports teams, providing actionable insights and opponent analysis.
            </p>
          </div>

          <Tabs defaultValue="diagram" className="w-full" onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-3 mb-8">
              <TabsTrigger value="diagram">System Architecture</TabsTrigger>
              <TabsTrigger value="components">System Components</TabsTrigger>
              <TabsTrigger value="visualization">Sample Output</TabsTrigger>
            </TabsList>
            
            <TabsContent value="diagram" className="space-y-4">
              <Card className="border-border/40">
                <CardHeader>
                  <CardTitle>System Architecture Diagram</CardTitle>
                  <CardDescription>
                    Visual representation of the complete tactical analysis pipeline
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <SystemDiagram />
                </CardContent>
              </Card>
              
              <Card className="border-border/40">
                <CardHeader className="flex flex-row items-center gap-2">
                  <Info className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <CardTitle className="text-lg">How It Works</CardTitle>
                    <CardDescription>
                      The system processes video data through multiple AI models to deliver tactical insights
                    </CardDescription>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Raw match video is processed through specialized tracking and event detection models. 
                    This data is combined with historical statistics in the Feature Fusion Module, 
                    then analyzed by a multi-modal neural network to generate tactical recommendations 
                    and visualizations for coaches and analysts.
                  </p>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="components" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {systemComponents.map((component) => (
                  <ComponentCard
                    key={component.id}
                    title={component.title}
                    description={component.description}
                    type={component.type as any}
                    icon={component.icon}
                  />
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="visualization" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <PitchVisualization />
                <TacticalInsights />
              </div>
              
              <Card className="border-border/40">
                <CardHeader>
                  <CardTitle>System Output</CardTitle>
                  <CardDescription>
                    The tactical analysis system provides these visualizations and insights in real-time
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Coaches and analysts receive continuous updates on opponent formations, tactical vulnerabilities, 
                    and strategic opportunities. The system highlights patterns in opponent behavior and recommends 
                    counter-strategies based on real-time analysis of the match situation.
                  </p>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;