import { useParams, useNavigate } from "react-router-dom";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { systemComponents } from "@/lib/data";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft } from "lucide-react";

export default function ComponentDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  const component = systemComponents.find(comp => comp.id === id);
  
  if (!component) {
    return (
      <div className="flex min-h-screen flex-col bg-background text-foreground">
        <Header />
        <main className="flex-1 py-6 md:py-10">
          <div className="container px-4 md:px-6">
            <Button 
              variant="outline" 
              className="mb-6"
              onClick={() => navigate("/")}
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Dashboard
            </Button>
            
            <Card className="mx-auto max-w-md">
              <CardHeader>
                <CardTitle>Component Not Found</CardTitle>
                <CardDescription>
                  The component you're looking for doesn't exist.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button onClick={() => navigate("/")}>
                  Return to Dashboard
                </Button>
              </CardContent>
            </Card>
          </div>
        </main>
        <Footer />
      </div>
    );
  }
  
  const typeColors = {
    input: "bg-blue-900/20 border-blue-700/30",
    processing: "bg-cyan-900/20 border-cyan-700/30",
    model: "bg-indigo-900/20 border-indigo-700/30",
    output: "bg-purple-900/20 border-purple-700/30",
    dashboard: "bg-violet-900/20 border-violet-700/30",
  };

  const badgeColors = {
    input: "bg-blue-900 text-blue-100",
    processing: "bg-cyan-900 text-cyan-100",
    model: "bg-indigo-900 text-indigo-100",
    output: "bg-purple-900 text-purple-100",
    dashboard: "bg-violet-900 text-violet-100",
  };
  
  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <Header />
      <main className="flex-1 py-6 md:py-10">
        <div className="container px-4 md:px-6">
          <Button 
            variant="outline" 
            className="mb-6"
            onClick={() => navigate("/")}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Dashboard
          </Button>
          
          <Card className={`border-border/40 ${typeColors[component.type as keyof typeof typeColors]}`}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {component.icon}
                  <CardTitle>{component.title}</CardTitle>
                </div>
                <Badge className={badgeColors[component.type as keyof typeof badgeColors]}>
                  {component.type.charAt(0).toUpperCase() + component.type.slice(1)}
                </Badge>
              </div>
              <CardDescription>{component.description}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold mb-2">Detailed Description</h3>
                <p className="text-muted-foreground">{component.details}</p>
              </div>
              
              <div>
                <h3 className="font-semibold mb-2">Role in the System</h3>
                <p className="text-muted-foreground">
                  {component.type === "input" && "Provides the raw data that feeds into the entire analysis pipeline. The quality and consistency of this input directly affects the accuracy of all downstream components."}
                  {component.type === "processing" && "Transforms and prepares data for analysis, ensuring that information from different sources is properly integrated and formatted for the analytical models."}
                  {component.type === "model" && "Applies advanced machine learning algorithms to extract patterns, make predictions, and generate insights from the processed data."}
                  {component.type === "output" && "Translates complex analytical results into actionable insights that coaches and analysts can use to make tactical decisions."}
                  {component.type === "dashboard" && "Presents information in an intuitive, interactive format that allows users to explore data, test scenarios, and derive insights."}
                </p>
              </div>
              
              <div>
                <h3 className="font-semibold mb-2">Technical Implementation</h3>
                <p className="text-muted-foreground">
                  {component.type === "input" && "High-definition cameras with specialized lenses capture the match from multiple angles. Video streams are synchronized and preprocessed to normalize lighting and perspective."}
                  {component.type === "processing" && "Distributed computing architecture processes large volumes of data in real-time. Specialized algorithms ensure data consistency and handle missing or corrupted information."}
                  {component.type === "model" && "Deep learning models trained on thousands of matches using GPU acceleration. Transfer learning techniques adapt pre-trained models to specific sports and teams."}
                  {component.type === "output" && "Algorithmic decision trees convert raw predictions into tactical recommendations. Natural language generation creates human-readable insights."}
                  {component.type === "dashboard" && "React-based frontend with WebGL for high-performance visualizations. Real-time updates via WebSockets maintain synchronization with the analytical backend."}
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
}