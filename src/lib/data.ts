import React from "react";
import { 
  Video, 
  Brain, 
  BarChart3, 
  Database, 
  Layers, 
  Network, 
  LineChart, 
  LayoutDashboard 
} from "lucide-react";

type ComponentType = "input" | "processing" | "model" | "output" | "dashboard";

interface SystemComponent {
  id: string;
  title: string;
  description: string;
  type: ComponentType;
  icon: React.ReactNode;
  details: string;
}

export const systemComponents: SystemComponent[] = [
  {
    id: "raw-video",
    title: "Raw Match Video",
    description: "Live or historical video feed providing the primary input source for analysis",
    type: "input",
    icon: <Video className="h-4 w-4" />,
    details: "High-definition video streams captured from multiple camera angles around the stadium. These feeds are processed in real-time to extract player movements, ball trajectory, and game events."
  },
  {
    id: "tracking-models",
    title: "Pre-Trained Tracking Models",
    description: "Player & Ball Localization models that extract precise positions and trajectories",
    type: "model",
    icon: <Brain className="h-4 w-4" />,
    details: "Computer vision models trained on thousands of hours of match footage to accurately track players and the ball. These models use deep learning techniques to maintain tracking through occlusions and varying lighting conditions."
  },
  {
    id: "event-model",
    title: "Pre-Trained Event Model",
    description: "Processes video frames to detect and label key events at the frame level",
    type: "model",
    icon: <Brain className="h-4 w-4" />,
    details: "Specialized neural networks that identify game events such as passes, shots, tackles, and fouls. The system categorizes these events and timestamps them for synchronization with tracking data."
  },
  {
    id: "statistics-framework",
    title: "Specialized Statistics Framework",
    description: "Provides macro-level context by integrating historical match statistics",
    type: "processing",
    icon: <BarChart3 className="h-4 w-4" />,
    details: "A comprehensive database of team and player statistics from previous matches, including performance metrics, formation tendencies, and tactical patterns under different game scenarios."
  },
  {
    id: "feature-fusion",
    title: "Feature Fusion Module",
    description: "Fuses outputs from tracking, event detection, and statistical frameworks",
    type: "processing",
    icon: <Layers className="h-4 w-4" />,
    details: "Advanced data integration algorithms that combine spatial, temporal, and statistical data into a unified representation. This module uses attention mechanisms to weight the importance of different data sources based on the current game context."
  },
  {
    id: "neural-network",
    title: "Multi-Modal Neural Network",
    description: "Processes all inputs to predict tactical outcomes using YOLO 11+ LSTM + Dense Layers",
    type: "model",
    icon: <Network className="h-4 w-4" />,
    details: "The core analytical engine that processes the fused data through multiple neural network architectures. It combines convolutional layers for spatial analysis, LSTM layers for temporal patterns, and dense layers for final predictions."
  },
  {
    id: "tactical-analysis",
    title: "Enhanced Tactical Analysis Output",
    description: "Generates real-time strategic recommendations and visual insights",
    type: "output",
    icon: <LineChart className="h-4 w-4" />,
    details: "The system's primary output that translates complex data analysis into actionable tactical insights. This includes formation recommendations, player positioning advice, and predicted opponent strategies."
  },
  {
    id: "dashboard",
    title: "Interactive Dashboard & Visualization",
    description: "Displays pitch visualization, tactical insights, and match statistics",
    type: "dashboard",
    icon: <LayoutDashboard className="h-4 w-4" />,
    details: "A comprehensive user interface designed for coaches and analysts to interact with the system's outputs. Features include interactive pitch maps, tactical heatmaps, and customizable statistical displays."
  },
  {
    id: "data-storage",
    title: "Global State Management",
    description: "Zustand-based state management system for coordinating all components",
    type: "processing",
    icon: <Database className="h-4 w-4" />,
    details: "A centralized state management system that ensures all components have access to the latest data. This enables real-time updates across the system and maintains consistency between different analytical modules."
  }
];