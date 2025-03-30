import { create } from "zustand";

// Types
export interface Player {
  id: number;
  name: string;
  position: string;
  number: number;
  image?: string;
  stats: {
    fatigue: number;
    injury: number;
    fitness: number;
  };
  performance: {
    passes: number;
    tackles: number;
    distance: number;
  };
}

export interface Formation {
  id: string;
  name: string;
  description: string;
  players: {
    id: number;
    name: string;
    position: string;
    x: number;
    y: number;
    healthStatus: "healthy" | "moderate" | "risk";
  }[];
}

export interface TacticalSuggestion {
  id: string;
  title: string;
  description: string;
  confidence: number;
  type: "formation" | "substitution" | "strategy";
  urgency: "low" | "medium" | "high";
  timestamp: string;
}

interface TactiMindState {
  // Match data
  matchId: string;
  homeTeam: string;
  awayTeam: string;
  score: [number, number];
  matchTime: string;
  
  // Players and formations
  players: Player[];
  formations: Formation[];
  currentFormation: string;
  
  // Tactical suggestions
  suggestions: TacticalSuggestion[];
  appliedSuggestions: string[];
  
  // Actions
  setCurrentFormation: (formationId: string) => void;
  applySuggestion: (suggestionId: string) => void;
  dismissSuggestion: (suggestionId: string) => void;
  updateMatchTime: (time: string) => void;
  updateScore: (score: [number, number]) => void;
}

// Mock data for initial state
const mockPlayers = [
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
  }
  // More players would be here...
];

const mockFormations = [
  {
    id: "f1",
    name: "4-4-2",
    description: "Standard balanced formation",
    players: [
      { id: 1, name: "J. Smith", position: "GK", x: 50, y: 90, healthStatus: "healthy" },
      { id: 2, name: "A. Johnson", position: "DF", x: 20, y: 70, healthStatus: "healthy" },
      { id: 3, name: "M. Williams", position: "DF", x: 40, y: 70, healthStatus: "moderate" },
      { id: 4, name: "R. Jones", position: "DF", x: 60, y: 70, healthStatus: "healthy" },
      { id: 5, name: "T. Brown", position: "DF", x: 80, y: 70, healthStatus: "healthy" },
      { id: 6, name: "S. Davis", position: "MF", x: 30, y: 50, healthStatus: "healthy" },
      { id: 7, name: "K. Miller", position: "MF", x: 50, y: 50, healthStatus: "risk" },
      { id: 8, name: "L. Wilson", position: "MF", x: 70, y: 50, healthStatus: "healthy" },
      { id: 9, name: "G. Moore", position: "FW", x: 35, y: 30, healthStatus: "healthy" },
      { id: 10, name: "P. Taylor", position: "FW", x: 65, y: 30, healthStatus: "moderate" },
      { id: 11, name: "H. Anderson", position: "FW", x: 50, y: 20, healthStatus: "healthy" }
    ]
  },
  {
    id: "f2",
    name: "4-3-3",
    description: "Attacking formation",
    players: [
      { id: 1, name: "J. Smith", position: "GK", x: 50, y: 90, healthStatus: "healthy" },
      { id: 2, name: "A. Johnson", position: "DF", x: 20, y: 70, healthStatus: "healthy" },
      { id: 3, name: "M. Williams", position: "DF", x: 40, y: 70, healthStatus: "moderate" },
      { id: 4, name: "R. Jones", position: "DF", x: 60, y: 70, healthStatus: "healthy" },
      { id: 5, name: "T. Brown", position: "DF", x: 80, y: 70, healthStatus: "healthy" },
      { id: 6, name: "S. Davis", position: "MF", x: 30, y: 50, healthStatus: "healthy" },
      { id: 7, name: "K. Miller", position: "MF", x: 50, y: 50, healthStatus: "risk" },
      { id: 8, name: "L. Wilson", position: "MF", x: 70, y: 50, healthStatus: "healthy" },
      { id: 9, name: "G. Moore", position: "FW", x: 25, y: 25, healthStatus: "healthy" },
      { id: 10, name: "P. Taylor", position: "FW", x: 50, y: 25, healthStatus: "moderate" },
      { id: 11, name: "H. Anderson", position: "FW", x: 75, y: 25, healthStatus: "healthy" }
    ]
  }
  // More formations would be here...
];

const mockSuggestions = [
  {
    id: "sug1",
    title: "Switch to 4-3-3 Formation",
    description: "Opponent is vulnerable on the wings. Switching to 4-3-3 will create more attacking opportunities.",
    confidence: 85,
    type: "formation",
    urgency: "medium",
    timestamp: "65:20"
  },
  {
    id: "sug2",
    title: "Substitute Player #7",
    description: "K. Miller showing signs of fatigue. Consider substitution in next 5-10 minutes.",
    confidence: 92,
    type: "substitution",
    urgency: "high",
    timestamp: "67:15"
  },
  {
    id: "sug3",
    title: "Increase Pressing Intensity",
    description: "Opponent midfield showing signs of fatigue. Increased pressing could force errors.",
    confidence: 78,
    type: "strategy",
    urgency: "low",
    timestamp: "70:05"
  }
];

export const useTactiMindStore = create<TactiMindState>((set) => ({
  // Initial state
  matchId: "match-001",
  homeTeam: "FC Barcelona",
  awayTeam: "Real Madrid",
  score: [1, 1],
  matchTime: "70:25",
  
  players: mockPlayers,
  formations: mockFormations,
  currentFormation: "f1",
  
  suggestions: mockSuggestions,
  appliedSuggestions: [],
  
  // Actions
  setCurrentFormation: (formationId) => 
    set((state) => ({ currentFormation: formationId })),
    
  applySuggestion: (suggestionId) => 
    set((state) => {
      // Handle formation change if it's a formation suggestion
      if (suggestionId === "sug1") {
        return {
          appliedSuggestions: [...state.appliedSuggestions, suggestionId],
          currentFormation: "f2" // Switch to 4-3-3
        };
      }
      
      return {
        appliedSuggestions: [...state.appliedSuggestions, suggestionId]
      };
    }),
    
  dismissSuggestion: (suggestionId) => 
    set((state) => ({
      suggestions: state.suggestions.filter(s => s.id !== suggestionId)
    })),
    
  updateMatchTime: (time) => 
    set(() => ({ matchTime: time })),
    
  updateScore: (score) => 
    set(() => ({ score }))
}));