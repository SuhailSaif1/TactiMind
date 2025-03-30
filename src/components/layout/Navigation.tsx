import { useState } from "react";
import { Link, useLocation } from "react-router";
import { cn } from "@/lib/utils";
import { 
  BarChart3, 
  Users, 
  Activity, 
  ChessKnight,
  Settings,
  Menu,
  X
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "./theme-toggle";

const navItems = [
  {
    name: "Dashboard",
    path: "/",
    icon: BarChart3,
  },
  {
    name: "Match Analysis",
    path: "/match-analysis",
    icon: ChessKnight,
  },
  {
    name: "Player Health",
    path: "/player-health",
    icon: Activity,
  },
  {
    name: "Tactics",
    path: "/tactics",
    icon: Users,
  },
];

export function Navigation() {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      {/* Mobile Navigation */}
      <div className="lg:hidden flex items-center justify-between p-4 bg-background border-b">
        <div className="flex items-center">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X /> : <Menu />}
          </Button>
          <span className="ml-2 font-bold text-xl">TactiMind</span>
        </div>
        <ThemeToggle />
      </div>

      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-50 bg-background pt-16">
          <nav className="flex flex-col p-4 space-y-4">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  "flex items-center px-4 py-3 rounded-md hover:bg-accent transition-colors",
                  location.pathname === item.path ? "bg-accent text-accent-foreground" : "text-muted-foreground"
                )}
                onClick={() => setMobileMenuOpen(false)}
              >
                <item.icon className="mr-3 h-5 w-5" />
                {item.name}
              </Link>
            ))}
          </nav>
        </div>
      )}

      {/* Desktop Navigation */}
      <div className="hidden lg:flex flex-col h-screen w-64 bg-background border-r">
        <div className="p-6">
          <h1 className="text-2xl font-bold">TactiMind</h1>
          <p className="text-sm text-muted-foreground mt-1">AI Football Strategy</p>
        </div>
        <nav className="flex-1 px-4 space-y-2">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                "flex items-center px-4 py-3 rounded-md hover:bg-accent transition-colors",
                location.pathname === item.path ? "bg-accent text-accent-foreground" : "text-muted-foreground"
              )}
            >
              <item.icon className="mr-3 h-5 w-5" />
              {item.name}
            </Link>
          ))}
        </nav>
        <div className="p-4 border-t">
          <div className="flex items-center justify-between">
            <Button variant="outline" size="sm">
              <Settings className="h-4 w-4 mr-2" />
              Settings
            </Button>
            <ThemeToggle />
          </div>
        </div>
      </div>
    </>
  );
}