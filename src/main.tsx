import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router";
import { TooltipProvider } from "./components/ui/tooltip";
import { ThemeProvider } from "./components/layout/theme-provider";
import "./index.css";

import Index from "./pages";
import MatchAnalysis from "./pages/match-analysis";
import PlayerHealth from "./pages/player-health";
import Tactics from "./pages/tactics";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <ThemeProvider defaultTheme="dark">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/match-analysis" element={<MatchAnalysis />} />
            <Route path="/player-health" element={<PlayerHealth />} />
            <Route path="/tactics" element={<Tactics />} />
          </Routes>
        </BrowserRouter>
        <Sonner />
        <Toaster />
      </ThemeProvider>
    </TooltipProvider>
  </QueryClientProvider>
);