import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { TooltipProvider } from "./components/ui/tooltip";
import { ThemeProvider } from "./components/layout/theme-provider";
import "./index.css";
import Index from "./pages";
import LoginForm from "./pages/login";
import SignupForm from "./pages/signup";
import Logout from "./pages/logout";
import ComponentDetail from "./pages/components/[id]";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <ThemeProvider>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<Index />} />
            <Route path='/login' element={<LoginForm />} />
            <Route path='/signup' element={<SignupForm />} />
            <Route path='/logout' element={<Logout />} />
            <Route path='/components/:id' element={<ComponentDetail />} />
          </Routes>
        </BrowserRouter>
        <Sonner />
        <Toaster />
      </ThemeProvider>
    </TooltipProvider>
  </QueryClientProvider>
);