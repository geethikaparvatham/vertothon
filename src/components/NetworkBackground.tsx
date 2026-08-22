"use client";

import React, { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  baseAlpha: number;
}

export default function NetworkBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const mouseRef = useRef({ x: -1000, y: -1000, active: false });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Controlled particle count for a clean, minimal look
    const count = Math.min(65, Math.floor((width * height) / 28000));
    const particles: Particle[] = [];

    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.35,
        vy: (Math.random() - 0.5) * 0.35,
        radius: Math.random() * 1.5 + 1.2,
        baseAlpha: Math.random() * 0.4 + 0.3,
      });
    }

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current.x = e.clientX - rect.left;
      mouseRef.current.y = e.clientY - rect.top;
      mouseRef.current.active = true;
    };

    const handleMouseLeave = () => {
      mouseRef.current.active = false;
      mouseRef.current.x = -1000;
      mouseRef.current.y = -1000;
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseleave", handleMouseLeave);

    // Subtle floating ambient aura positions
    let auraAngle = 0;

    const render = () => {
      auraAngle += 0.003;
      ctx.clearRect(0, 0, width, height);

      // 1. Sleek Minimal Grid (Subtle dot lattice / grid)
      const dotSpacing = 40;
      ctx.fillStyle = "rgba(255, 255, 255, 0.035)";
      for (let x = 0; x < width; x += dotSpacing) {
        for (let y = 0; y < height; y += dotSpacing) {
          ctx.beginPath();
          ctx.arc(x, y, 0.75, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      // 2. Deep Ambient Atmospheric Glows (Modern SaaS / Vercel style)
      const aura1X = width * 0.35 + Math.cos(auraAngle) * 80;
      const aura1Y = height * 0.3 + Math.sin(auraAngle) * 60;
      const grad1 = ctx.createRadialGradient(aura1X, aura1Y, 0, aura1X, aura1Y, Math.min(width, height) * 0.5);
      grad1.addColorStop(0, "rgba(99, 102, 241, 0.07)");
      grad1.addColorStop(0.5, "rgba(79, 70, 229, 0.03)");
      grad1.addColorStop(1, "rgba(0, 0, 0, 0)");
      ctx.fillStyle = grad1;
      ctx.fillRect(0, 0, width, height);

      const aura2X = width * 0.65 - Math.sin(auraAngle * 0.8) * 80;
      const aura2Y = height * 0.45 + Math.cos(auraAngle * 0.8) * 60;
      const grad2 = ctx.createRadialGradient(aura2X, aura2Y, 0, aura2X, aura2Y, Math.min(width, height) * 0.45);
      grad2.addColorStop(0, "rgba(147, 51, 234, 0.05)");
      grad2.addColorStop(0.5, "rgba(99, 102, 241, 0.02)");
      grad2.addColorStop(1, "rgba(0, 0, 0, 0)");
      ctx.fillStyle = grad2;
      ctx.fillRect(0, 0, width, height);

      // 3. Subtle Interactive Cursor Illumination Spotlight
      if (mouseRef.current.active) {
        const spotlight = ctx.createRadialGradient(
          mouseRef.current.x,
          mouseRef.current.y,
          0,
          mouseRef.current.x,
          mouseRef.current.y,
          260
        );
        spotlight.addColorStop(0, "rgba(99, 102, 241, 0.12)");
        spotlight.addColorStop(0.5, "rgba(139, 92, 246, 0.04)");
        spotlight.addColorStop(1, "rgba(0, 0, 0, 0)");
        ctx.fillStyle = spotlight;
        ctx.beginPath();
        ctx.arc(mouseRef.current.x, mouseRef.current.y, 260, 0, Math.PI * 2);
        ctx.fill();
      }

      // 4. Elegant Geometric Constellation Lines
      const maxDist = 130;
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < maxDist) {
            const alpha = (1 - dist / maxDist) * 0.22;
            ctx.strokeStyle = `rgba(165, 180, 252, ${alpha})`;
            ctx.lineWidth = 0.75;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }

        // Refined interactive line to cursor
        if (mouseRef.current.active) {
          const mdx = particles[i].x - mouseRef.current.x;
          const mdy = particles[i].y - mouseRef.current.y;
          const mDist = Math.sqrt(mdx * mdx + mdy * mdy);
          const mouseMaxDist = 180;

          if (mDist < mouseMaxDist) {
            const mAlpha = (1 - mDist / mouseMaxDist) * 0.35;
            ctx.strokeStyle = `rgba(199, 210, 254, ${mAlpha})`;
            ctx.lineWidth = 0.9;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(mouseRef.current.x, mouseRef.current.y);
            ctx.stroke();

            // Gentle, smooth micro-displacement
            const force = (1 - mDist / mouseMaxDist) * 0.2;
            particles[i].x -= (mdx / mDist) * force;
            particles[i].y -= (mdy / mDist) * force;
          }
        }
      }

      // 5. Clean, Minimalist Particle Nodes
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // Soft halo
        ctx.fillStyle = `rgba(165, 180, 252, ${p.baseAlpha * 0.15})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius * 2.5, 0, Math.PI * 2);
        ctx.fill();

        // Sharp core dot
        ctx.fillStyle = `rgba(224, 231, 255, ${p.baseAlpha})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fill();

        // Smooth drift
        p.x += p.vx;
        p.y += p.vy;

        // Wrap around edges seamlessly
        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseleave", handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none z-0 bg-transparent"
    />
  );
}
