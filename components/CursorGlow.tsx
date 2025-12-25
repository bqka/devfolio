"use client";

import { useEffect, useRef } from "react";

const CONFIG = {
  radius: 350,
  colorVar: "--cursor-glow",
  intensity: 0.15,

  followSpeed: 0.5,
  followDelay: 8,
};

type Point = { x: number; y: number };

export default function CursorGlow() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const rawCanvas = canvasRef.current;
    if (!rawCanvas) return;
    const canvas = rawCanvas;

    const rawCtx = canvas.getContext("2d");
    if (!rawCtx) return;
    const ctx = rawCtx;

    let width = 0;
    let height = 0;
    let dpr = window.devicePixelRatio || 1;

    let mouseX = 0;
    let mouseY = 0;
    let glowX = 0;
    let glowY = 0;
    let hasMouse = false;

    const history: Point[] = [];
    const MAX_HISTORY = 40;

    function resize() {
      width = window.innerWidth;
      height = window.innerHeight;
      dpr = window.devicePixelRatio || 1;

      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    function onMove(e: MouseEvent) {
      mouseX = e.clientX;
      mouseY = e.clientY;

      history.push({ x: mouseX, y: mouseY });
      if (history.length > MAX_HISTORY) history.shift();

      if (!hasMouse) {
        glowX = mouseX;
        glowY = mouseY;
        hasMouse = true;
      }
    }

    function draw() {
      ctx.clearRect(0, 0, width, height);

      if (hasMouse && history.length) {
        const index = Math.max(0, history.length - 1 - CONFIG.followDelay);
        const target = history[index];

        glowX += (target.x - glowX) * CONFIG.followSpeed;
        glowY += (target.y - glowY) * CONFIG.followSpeed;

        ctx.fillStyle = "rgba(0, 0, 0, 0.18)";
        ctx.fillRect(0, 0, width, height);

        const r = CONFIG.radius * 1.25;

        const gradient = ctx.createRadialGradient(
          glowX,
          glowY,
          0,
          glowX,
          glowY,
          r
        );

        gradient.addColorStop(
          0.0,
          cssVarToRgba(CONFIG.colorVar, CONFIG.intensity)
        );
        gradient.addColorStop(1.0, "rgba(0,0,0,0)");

        ctx.fillStyle = gradient;
        ctx.fillRect(glowX - r, glowY - r, r * 2, r * 2);
      }

      requestAnimationFrame(draw);
    }

    resize();
    draw();

    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", onMove);

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMove);
    };
  }, []);

  function cssVarToRgba(varName: string, alpha: number) {
    const value = getComputedStyle(document.documentElement)
      .getPropertyValue(varName)
      .trim();

    if (value.startsWith("rgb")) {
      return value.replace("rgb(", "rgba(").replace(")", `, ${alpha})`);
    }

    if (value.startsWith("#")) {
      let hex = value.slice(1);
      if (hex.length === 3) {
        hex = hex
          .split("")
          .map((c) => c + c)
          .join("");
      }

      const r = parseInt(hex.slice(0, 2), 16);
      const g = parseInt(hex.slice(2, 4), 16);
      const b = parseInt(hex.slice(4, 6), 16);

      return `rgba(${r}, ${g}, ${b}, ${alpha})`;
    }

    return `rgba(255,255,255,${alpha})`;
  }

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 -z-30"
    />
  );
}
