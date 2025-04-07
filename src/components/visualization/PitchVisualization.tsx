import { useEffect, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function PitchVisualization() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  useEffect(() => {
    if (!canvasRef.current) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Set canvas dimensions
    const resizeCanvas = () => {
      const parent = canvas.parentElement;
      if (!parent) return;
      
      canvas.width = parent.clientWidth;
      canvas.height = parent.clientWidth * 0.65; // Aspect ratio for soccer pitch
      
      drawPitch(ctx, canvas.width, canvas.height);
      drawHeatmap(ctx, canvas.width, canvas.height);
      drawPlayers(ctx, canvas.width, canvas.height);
    };
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    return () => {
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);
  
  return (
    <Card className="w-full border-border/40 bg-card/50">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-semibold">Tactical Heatmap</CardTitle>
      </CardHeader>
      <CardContent className="p-4">
        <div className="w-full">
          <canvas 
            ref={canvasRef} 
            className="w-full rounded-md border border-border/40"
          />
        </div>
      </CardContent>
    </Card>
  );
}

function drawPitch(ctx: CanvasRenderingContext2D, width: number, height: number) {
  // Clear canvas
  ctx.clearRect(0, 0, width, height);
  
  // Set pitch color
  ctx.fillStyle = '#0a481e';
  ctx.fillRect(0, 0, width, height);
  
  // Draw pitch lines
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.8)';
  ctx.lineWidth = 2;
  
  // Outline
  ctx.strokeRect(width * 0.05, height * 0.05, width * 0.9, height * 0.9);
  
  // Center line
  ctx.beginPath();
  ctx.moveTo(width * 0.5, height * 0.05);
  ctx.lineTo(width * 0.5, height * 0.95);
  ctx.stroke();
  
  // Center circle
  ctx.beginPath();
  ctx.arc(width * 0.5, height * 0.5, Math.min(width, height) * 0.1, 0, Math.PI * 2);
  ctx.stroke();
  
  // Penalty areas
  // Left
  ctx.strokeRect(width * 0.05, height * 0.3, width * 0.15, height * 0.4);
  // Right
  ctx.strokeRect(width * 0.8, height * 0.3, width * 0.15, height * 0.4);
  
  // Goal areas
  // Left
  ctx.strokeRect(width * 0.05, height * 0.4, width * 0.05, height * 0.2);
  // Right
  ctx.strokeRect(width * 0.9, height * 0.4, width * 0.05, height * 0.2);
  
  // Draw some grass pattern
  for (let i = 0; i < 20; i++) {
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.05)';
    ctx.beginPath();
    ctx.moveTo(0, height * (i / 20));
    ctx.lineTo(width, height * (i / 20));
    ctx.stroke();
  }
}

function drawHeatmap(ctx: CanvasRenderingContext2D, width: number, height: number) {
  // Create gradient for heatmap
  const gradient = ctx.createRadialGradient(
    width * 0.7, height * 0.4, 0,
    width * 0.7, height * 0.4, width * 0.25
  );
  
  gradient.addColorStop(0, 'rgba(255, 0, 0, 0.7)');
  gradient.addColorStop(0.3, 'rgba(255, 165, 0, 0.5)');
  gradient.addColorStop(0.7, 'rgba(255, 255, 0, 0.3)');
  gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
  
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, width, height);
  
  // Second hotspot
  const gradient2 = ctx.createRadialGradient(
    width * 0.3, height * 0.6, 0,
    width * 0.3, height * 0.6, width * 0.15
  );
  
  gradient2.addColorStop(0, 'rgba(0, 0, 255, 0.7)');
  gradient2.addColorStop(0.3, 'rgba(0, 165, 255, 0.5)');
  gradient2.addColorStop(0.7, 'rgba(0, 255, 255, 0.3)');
  gradient2.addColorStop(1, 'rgba(0, 0, 0, 0)');
  
  ctx.fillStyle = gradient2;
  ctx.fillRect(0, 0, width, height);
}

function drawPlayers(ctx: CanvasRenderingContext2D, width: number, height: number) {
  // Team A players (red)
  const teamAPositions = [
    { x: 0.1, y: 0.5 }, // Goalkeeper
    { x: 0.2, y: 0.3 }, // Defender
    { x: 0.2, y: 0.5 }, // Defender
    { x: 0.2, y: 0.7 }, // Defender
    { x: 0.4, y: 0.2 }, // Midfielder
    { x: 0.4, y: 0.5 }, // Midfielder
    { x: 0.4, y: 0.8 }, // Midfielder
    { x: 0.6, y: 0.3 }, // Forward
    { x: 0.6, y: 0.7 }, // Forward
    { x: 0.7, y: 0.5 }, // Striker
  ];
  
  // Team B players (blue)
  const teamBPositions = [
    { x: 0.9, y: 0.5 }, // Goalkeeper
    { x: 0.8, y: 0.3 }, // Defender
    { x: 0.8, y: 0.5 }, // Defender
    { x: 0.8, y: 0.7 }, // Defender
    { x: 0.6, y: 0.2 }, // Midfielder
    { x: 0.6, y: 0.5 }, // Midfielder
    { x: 0.6, y: 0.8 }, // Midfielder
    { x: 0.4, y: 0.3 }, // Forward
    { x: 0.4, y: 0.7 }, // Forward
    { x: 0.3, y: 0.5 }, // Striker
  ];
  
  // Draw team A
  teamAPositions.forEach((pos, i) => {
    ctx.fillStyle = 'rgba(255, 0, 0, 0.8)';
    ctx.beginPath();
    ctx.arc(width * pos.x, height * pos.y, 8, 0, Math.PI * 2);
    ctx.fill();
    
    ctx.fillStyle = 'white';
    ctx.font = '10px Arial';
    ctx.textAlign = 'center';
    ctx.fillText((i + 1).toString(), width * pos.x, height * pos.y + 3);
  });
  
  // Draw team B
  teamBPositions.forEach((pos, i) => {
    ctx.fillStyle = 'rgba(0, 0, 255, 0.8)';
    ctx.beginPath();
    ctx.arc(width * pos.x, height * pos.y, 8, 0, Math.PI * 2);
    ctx.fill();
    
    ctx.fillStyle = 'white';
    ctx.font = '10px Arial';
    ctx.textAlign = 'center';
    ctx.fillText((i + 1).toString(), width * pos.x, height * pos.y + 3);
  });
  
  // Draw ball
  ctx.fillStyle = 'white';
  ctx.beginPath();
  ctx.arc(width * 0.5, height * 0.5, 5, 0, Math.PI * 2);
  ctx.fill();
}