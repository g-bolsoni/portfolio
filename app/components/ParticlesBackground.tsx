// components/ParticlesBackground.tsx
"use client";

import { useEffect, useRef } from "react";

interface Dot {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
}

export default function ParticlesBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    let dots: Dot[] = [];
    let W = 0, H = 0;

    function resize() {
      if (!canvas) return;
      W = canvas.width = canvas.parentElement?.offsetWidth ?? window.innerWidth;
      H = canvas.height = canvas.parentElement?.offsetHeight ?? window.innerHeight;
    }

    function randomDot(): Dot {
      return {
        x: Math.random() * W,
        y: Math.random() * H,
        vx: (Math.random() - 0.5) * 0.35,
        vy: (Math.random() - 0.5) * 0.35,
        r: Math.random() * 1.5 + 0.5,
      };
    }

    function initDots() {
      dots = Array.from({ length: 55 }, randomDot);
    }

    function draw() {
      ctx!.clearRect(0, 0, W, H);

      dots.forEach((d) => {
        d.x += d.vx;
        d.y += d.vy;
        if (d.x < 0 || d.x > W) d.vx *= -1;
        if (d.y < 0 || d.y > H) d.vy *= -1;

        ctx!.beginPath();
        ctx!.arc(d.x, d.y, d.r, 0, Math.PI * 2);
        ctx!.fillStyle = "rgba(139, 109, 255, 0.65)";
        ctx!.fill();
      });

      dots.forEach((a, i) => {
        dots.slice(i + 1).forEach((b) => {
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 90) {
            ctx!.beginPath();
            ctx!.moveTo(a.x, a.y);
            ctx!.lineTo(b.x, b.y);
            ctx!.strokeStyle = `rgba(139, 109, 255, ${0.12 * (1 - dist / 90)})`;
            ctx!.lineWidth = 0.6;
            ctx!.stroke();
          }
        });
      });

      animationId = requestAnimationFrame(draw);
    }

    resize();
    initDots();
    draw();

    window.addEventListener("resize", () => { resize(); initDots(); });

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", () => { resize(); initDots(); });
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        opacity: 0.55,
      }}
    />
  );
}