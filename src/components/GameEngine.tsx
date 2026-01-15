"use client";

import { useRef, useEffect } from 'react';
import { useGamePhysics } from '../hooks/useGamePhysics';

export default function GameEngine() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const { player, updatePhysics } = useGamePhysics();
    const requestRef = useRef<number>(0);

    const draw = (ctx: CanvasRenderingContext2D) => {
        // Clear Canvas
        ctx.fillStyle = '#f8fafc'; // Snow White (slate-50)
        ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);

        // Draw Player (Placeholder Circle)
        // Map player.x (0-100) to canvas width
        const playerScreenX = (player.x / 100) * ctx.canvas.width;
        const playerScreenY = 200; // Player stays fixed vertically, world moves up

        // Draw Skier Shadow
        ctx.fillStyle = 'rgba(0,0,0,0.2)';
        ctx.beginPath();
        ctx.ellipse(playerScreenX, playerScreenY + 10, 15, 5, 0, 0, Math.PI * 2);
        ctx.fill();

        // Draw Skier Body
        ctx.fillStyle = '#059669'; // Eaglebrook Green
        ctx.beginPath();
        ctx.arc(playerScreenX, playerScreenY, 15, 0, Math.PI * 2);
        ctx.fill();

        // Draw Tuck Indicator
        if (player.isTucking) {
            ctx.strokeStyle = '#dc2626'; // Red glow
            ctx.lineWidth = 3;
            ctx.stroke();
        }

        // DEBUG HUD
        ctx.fillStyle = 'black';
        ctx.font = '16px monospace';
        ctx.fillText(`Speed: ${Math.round(player.speedY)} mph`, 20, 40);
        ctx.fillText(`Distance: ${Math.round(player.y)} m`, 20, 60);
        if (player.isTucking) ctx.fillText("TUCKING!", 20, 80);
    };

    const loop = () => {
        updatePhysics();

        if (canvasRef.current) {
            const ctx = canvasRef.current.getContext('2d');
            if (ctx) {
                // Handle High DPI scaling
                const rect = canvasRef.current.getBoundingClientRect();
                canvasRef.current.width = rect.width;
                canvasRef.current.height = rect.height;

                draw(ctx);
            }
        }
        requestRef.current = requestAnimationFrame(loop);
    };

    useEffect(() => {
        requestRef.current = requestAnimationFrame(loop);
        return () => cancelAnimationFrame(requestRef.current);
    }, [updatePhysics]);

    return (
        <div className="relative w-full h-[600px] border-4 border-slate-800 rounded-lg overflow-hidden bg-slate-50 shadow-2xl">
            <canvas ref={canvasRef} className="w-full h-full block" />

            {/* Mobile Controls Overlay (Optional) */}
            <div className="absolute bottom-4 left-4 text-xs text-slate-400 font-mono">
                Controls: Arrows to Steer | Down to Tuck
            </div>
        </div>
    );
}
