import { Link } from "react-router-dom";
import { ChartBar, BarChart3, Activity } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "./theme-toggle";

export function Header() {
  return (
    <header className="border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-16 items-center px-4 md:px-6">
        <Link to="/" className="flex items-center gap-2 font-bold text-xl">
          <BarChart3 className="h-6 w-6 text-primary" />
          <span className="hidden md:inline">Sports Tactical Analysis System</span>
          <span className="md:hidden">STAS</span>
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6">
          <Button asChild variant="ghost">
            <Link to="/" className="flex items-center gap-2">
              <Activity className="h-4 w-4" />
              <span>Dashboard</span>
            </Link>
          </Button>
          <Button asChild variant="ghost">
            <Link to="/components/visualization" className="flex items-center gap-2">
              <ChartBar className="h-4 w-4" />
              <span>Visualizations</span>
            </Link>
          </Button>
          <ModeToggle />
        </nav>
      </div>
    </header>
  );
}