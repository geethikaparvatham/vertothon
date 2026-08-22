"use client";

import React, { useEffect, useRef } from "react";

interface Node {
  x: number;
  y: number;
  vx: number;
  vy: number;
  baseRadius: number;
  color: string;
  pulsePhase: number;
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  color: string;
}

export default function NetworkBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const mouseRef = useRef({ x: -1000, y: -1000, active: false, radius: 220 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Dynamic node count with high density
    const nodeCount = Math.min(100, Math.floor((width * height) / 16000));
    const nodes: Node[] = [];
    const particles: Particle[] = [];

    const colors = [
      "rgba(99, 102, 241,", // Indigo
      "rgba(168, 85, 247,", // Purple
      "rgba(59, 130, 246,", // Blue
      "rgba(236, 72, 153,", // Pink
      "rgba(20, 184, 166,", // Teal
    ];

    // Create initial nodes
    for (let i = 0; i < nodeCount; i++) {
      nodes.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.7,
        vy: (Math.random() - 0.5) * 0.7,
        baseRadius: Math.random() * 2 + 1.5,
        color: colors[Math.floor(Math.random() * colors.length)],
        pulsePhase: Math.random() * Math.PI * 2,
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

      // Spawn energetic trail particles when cursor moves
      if (Math.random() > 0.4) {
        particles.push({
          x: mouseRef.current.x,
          y: mouseRef.current.y,
          vx: (Math.random() - 0.5) * 1.5,
          vy: (Math.random() - 0.5) * 1.5,
          life: 0,
          maxLife: 30 + Math.random() * 20,
          color: colors[Math.floor(Math.random() * colors.length)],
        });
      }
    };

    const handleMouseLeave = () => {
      mouseRef.current.active = false;
      mouseRef.current.x = -1000;
      mouseRef.current.y = -1000;
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseleave", handleMouseLeave);

    let time = 0;

    // Render loop
    const render = () => {
      time += 0.02;
      ctx.clearRect(0, 0, width, height);

      // 1. Subtle glowing cyber grid
      ctx.lineWidth = 1;
      const gridSize = 45;
      for (let x = 0; x < width; x += gridSize) {
        ctx.strokeStyle = "rgba(255, 255, 255, 0.02)";
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      for (let y = 0; y < height; y += gridSize) {
        ctx.strokeStyle = "rgba(255, 255, 255, 0.02)";
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      // 2. Cursor Interactive Glow Spotlight
      if (mouseRef.current.active) {
        const mouseGlow = ctx.createRadialGradient(
          mouseRef.current.x,
          mouseRef.current.y,
          0,
          mouseRef.current.x,
          mouseRef.current.y,
          mouseRef.current.radius
        );
        mouseGlow.addColorStop(0, "rgba(99, 102, 241, 0.18)");
        mouseGlow.addColorStop(0.5, "rgba(168, 85, 247, 0.08)");
        mouseGlow.addColorStop(1, "rgba(0, 0, 0, 0)");

        ctx.fillStyle = mouseGlow;
        ctx.beginPath();
        ctx.arc(
          mouseRef.current.x,
          mouseRef.current.y,
          mouseRef.current.radius,
          0,
          Math.PI * 2
        );
        ctx.fill();
      }

      // 3. Render connection web between nodes
      const maxDist = 140;
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < maxDist) {
            const alpha = (1 - dist / maxDist) * 0.35;
            ctx.strokeStyle = `rgba(129, 140, 248, ${alpha})`;
            ctx.lineWidth = 1 - dist / maxDist;
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.stroke();
          }
        }

        // Connect nodes to mouse with magnetic interaction
        if (mouseRef.current.active) {
          const mdx = nodes[i].x - mouseRef.current.x;
          const mdy = nodes[i].y - mouseRef.current.y;
          const mDist = Math.sqrt(mdx * mdx + mdy * mdy);

          if (mDist < mouseRef.current.radius) {
            const mAlpha = (1 - mDist / mouseRef.current.radius) * 0.65;
            ctx.strokeStyle = `rgba(216, 180, 254, ${mAlpha})`;
            ctx.lineWidth = (1 - mDist / mouseRef.current.radius) * 1.5;
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(mouseRef.current.x, mouseRef.current.y);
            ctx.stroke();

            // Slight magnetic pull toward cursor
            const force = (1 - mDist / mouseRef.current.radius) * 0.4;
            nodes[i].x -= (mdx / mDist) * force;
            nodes[i].y -= (mdy / mDist) * force;
          }
        }
      }

      // 4. Draw cursor trail particles
      for (let p = particles.length - 1; p >= 0; p--) {
        const particle = particles[p];
        particle.life++;
        particle.x += particle.vx;
        particle.y += particle.vy;

        const progress = particle.life / particle.maxLife;
        if (progress >= 1) {
          particles.splice(p, 1);
          continue;
        }

        const pAlpha = (1 - progress) * 0.6;
        ctx.fillStyle = `${particle.color}${pAlpha})`;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, 2 * (1 - progress), 0, Math.PI * 2);
        ctx.fill();
      }

      // 5. Draw glowing nodes
      for (let i = 0; i < nodes.length; i++) {
        const node = nodes[i];
        const pulse = Math.sin(time * 2 + node.pulsePhase) * 0.8 + 1;
        const currentRadius = node.baseRadius * pulse;

        // Outer glow
        const glowGradient = ctx.createRadialGradient(
          node.x,
          node.y,
          0,
          node.x,
          node.y,
          currentRadius * 4
        );
        glowGradient.addColorStop(0, `${node.color}0.6)`);
        glowGradient.addColorStop(1, `${node.color}0)`);

        ctx.fillStyle = glowGradient;
        ctx.beginPath();
        ctx.arc(node.x, node.y, currentRadius * 4, 0, Math.PI * 2);
        ctx.fill();

        // Node core
        ctx.fillStyle = `${node.color}0.9)`;
        ctx.beginPath();
        ctx.arc(node.x, node.y, currentRadius, 0, Math.PI * 2);
        ctx.fill();

        // Move nodes with gentle physics
        node.x += node.vx;
        node.y += node.vy;

        // Soft bounce boundaries
        if (node.x < 0 || node.x > width) node.vx *= -1;
        if (node.y < 0 || node.y > height) node.vy *= -1;
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
