"use client";

import { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  size: number;
  life: number;
  maxLife: number;
  color: string;
  vx: number;
  vy: number;
}

export function CursorTrail() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const mouseRef = useRef({ x: 0, y: 0 });
  const lastTimeRef = useRef(0);
  const lastMousePosRef = useRef({ x: 0, y: 0 });
  const isMovingRef = useRef(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    const colors = [
      "rgba(74, 222, 128, 0.6)", // Primary green - moderate opacity
      "rgba(45, 212, 191, 0.5)", // Accent teal - moderate opacity
      "rgba(255, 255, 255, 0.4)", // White - moderate opacity
    ];

    // Track mouse movement
    const handleMouseMove = (e: MouseEvent) => {
      const newX = e.clientX;
      const newY = e.clientY;

      const dx = newX - lastMousePosRef.current.x;
      const dy = newY - lastMousePosRef.current.y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      isMovingRef.current = distance > 1;

      mouseRef.current = { x: newX, y: newY };
      lastMousePosRef.current = { x: newX, y: newY };
    };
    window.addEventListener("mousemove", handleMouseMove);

    // Animation loop
    const animate = (currentTime: number) => {
      const deltaTime = currentTime - lastTimeRef.current;

      const spawnInterval = isMovingRef.current ? 40 : 500;

      if (deltaTime > spawnInterval) {
        const particleCount = isMovingRef.current
          ? 1
          : Math.random() > 0.7
          ? 1
          : 0;
        for (let i = 0; i < particleCount; i++) {
          particlesRef.current.push({
            x: mouseRef.current.x + (Math.random() - 0.5) * 10,
            y: mouseRef.current.y + (Math.random() - 0.5) * 10,
            size: Math.random() * 2.5 + 1.5, // Moderate size (1.5-4px)
            life: 1,
            maxLife: Math.random() * 60 + 50, // Moderate life
            color: colors[Math.floor(Math.random() * colors.length)],
            vx: (Math.random() - 0.5) * 0.8, // Moderate movement
            vy: (Math.random() - 0.5) * 0.8,
          });
        }
        lastTimeRef.current = currentTime;
      }

      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Update and draw particles
      particlesRef.current = particlesRef.current.filter((particle) => {
        particle.life++;

        // Fade out
        const alpha = 1 - particle.life / particle.maxLife;

        if (particle.life >= particle.maxLife) {
          return false;
        }

        ctx.save();
        ctx.globalAlpha = alpha * 0.5; // Moderate visibility

        ctx.shadowBlur = 4;
        ctx.shadowColor = particle.color;

        ctx.fillStyle = particle.color;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();

        particle.y += particle.vy;
        particle.x += particle.vx;

        return true;
      });

      requestAnimationFrame(animate);
    };

    requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-50"
      style={{ mixBlendMode: "screen" }}
    />
  );
}
