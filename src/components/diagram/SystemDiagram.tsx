import { useEffect, useRef } from "react";
import mermaid from "mermaid";
import { Card, CardContent } from "@/components/ui/card";
import { useTheme } from "@/components/layout/theme-provider";

export function SystemDiagram() {
  const { theme } = useTheme();
  const mermaidRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    mermaid.initialize({
      startOnLoad: true,
      theme: theme === "dark" ? "dark" : "default",
      securityLevel: "loose",
      fontFamily: "ui-sans-serif, system-ui, sans-serif",
    });
    
    const renderDiagram = async () => {
      if (mermaidRef.current) {
        mermaidRef.current.innerHTML = "";
        const { svg } = await mermaid.render("mermaid-diagram", diagramDefinition);
        mermaidRef.current.innerHTML = svg;
      }
    };
    
    renderDiagram();
  }, [theme]);

  return (
    <Card className="w-full overflow-hidden border-border/40 bg-card/50">
      <CardContent className="p-0 overflow-auto">
        <div className="min-w-[800px] p-6" ref={mermaidRef} />
      </CardContent>
    </Card>
  );
}

const diagramDefinition = `
flowchart TD
    classDef mainNode fill:#2D3748,stroke:#4A5568,color:#E2E8F0,stroke-width:2px
    classDef inputNode fill:#1A365D,stroke:#2B6CB0,color:#EBF8FF,stroke-width:2px
    classDef processingNode fill:#2C5282,stroke:#4299E1,color:#EBF8FF,stroke-width:2px
    classDef modelNode fill:#2A4365,stroke:#63B3ED,color:#EBF8FF,stroke-width:2px
    classDef outputNode fill:#1A4E82,stroke:#3182CE,color:#EBF8FF,stroke-width:2px
    classDef dashboardNode fill:#1E3A8A,stroke:#3B82F6,color:#EBF8FF,stroke-width:2px,stroke-dasharray: 5 5

    A[Raw Match Video<br>Live or historical feed] -->|Video stream| B
    B[Pre-Trained Tracking Models<br>Player & Ball Localization] -->|Tracking data| E
    A -->|Video frames| C[Pre-Trained Event Model<br>Frame-Level Event Labels]
    C -->|Event annotations| E
    D[Specialized Statistics Framework<br>Historical aggregated stats<br>wins, goals, etc.] -->|Statistical context| E
    E[Feature Fusion Module<br>Integrate video features,<br>tracking & event data,<br>and statistical context] -->|Fused features| F
    F[Multi-Modal Neural Network<br>YOLO 11+ LSTM + Dense Layers<br><br>- Processes raw video<br>- Integrates auxiliary data<br>- Multi-task learning] -->|Predictions| G
    G[Enhanced Tactical Analysis Output<br><br>Real-time strategic recommendations,<br>tactical heatmaps, directional summaries] -->|Visualizations| H
    H[Interactive Dashboard & Visualization<br><br>- Pitch visualization<br>- Real-time tactical insights<br>- Detailed match statistics]
    
    GlobalState{Global State Management<br>Zustand} -.->|State updates| B
    GlobalState -.->|State updates| C
    GlobalState -.->|State updates| D
    GlobalState -.->|State updates| E
    GlobalState -.->|State updates| F
    GlobalState -.->|State updates| G
    GlobalState -.->|State updates| H
    
    A:::inputNode
    B:::modelNode
    C:::modelNode
    D:::processingNode
    E:::processingNode
    F:::modelNode
    G:::outputNode
    H:::dashboardNode
    GlobalState:::mainNode
`;