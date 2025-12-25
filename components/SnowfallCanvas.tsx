"use client";

import { useEffect, useRef } from "react";

/* =========================
   CONFIG – unchanged values
   ========================= */
const CONFIG = {
  flakeCount: 150,
  windSpeed: 0.15,

  minSize: 1.2,
  maxSize: 5.2,

  minOpacity: 0.25,
  maxOpacity: 0.8,

  minFallSpeed: 0.2,
  maxFallSpeed: 0.8,

  minWobbleAmplitude: 4,
  maxWobbleAmplitude: 30,

  minWobbleSpeed: 0.002,
  maxWobbleSpeed: 0.01,

  colorVar: "--snow-color",
  glowColorVar: "--snow-glow",
  glow: true,
  glowBlur: 5,
};

type Flake = {
  baseX: number;
  y: number;
  r: number;
  speed: number;
  alpha: number;
  wobblePhase: number;
  wobbleSpeed: number;
  wobbleAmplitude: number;
};

export default function SnowfallCanvas() {
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
    let animationId: number;
    let flakes: Flake[] = [];

    function rand(min: number, max: number) {
      return Math.random() * (max - min) + min;
    }

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

    function createFlake(): Flake {
      return {
        baseX: Math.random() * (width + 200) - 200,
        y: -Math.random() * height, // top → bottom
        r: rand(CONFIG.minSize, CONFIG.maxSize),
        speed: rand(CONFIG.minFallSpeed, CONFIG.maxFallSpeed),
        alpha: rand(CONFIG.minOpacity, CONFIG.maxOpacity),
        wobblePhase: Math.random() * Math.PI * 2,
        wobbleSpeed: rand(CONFIG.minWobbleSpeed, CONFIG.maxWobbleSpeed),
        wobbleAmplitude: rand(
          CONFIG.minWobbleAmplitude,
          CONFIG.maxWobbleAmplitude
        ),
      };
    }

    function init() {
      flakes = [];
      for (let i = 0; i < CONFIG.flakeCount; i++) {
        flakes.push(createFlake());
      }
    }

    function draw() {
      ctx.clearRect(0, 0, width, height);

      for (const f of flakes) {
        f.y += f.speed;
        f.wobblePhase += f.wobbleSpeed;

        f.baseX += CONFIG.windSpeed;
        const x = f.baseX + Math.sin(f.wobblePhase) * f.wobbleAmplitude;

        if (f.y > height + 10) {
          Object.assign(f, createFlake());
        }

        ctx.save();

        // ✨ Glow
        if (CONFIG.glow) {
          ctx.shadowColor = cssVarToRgba(CONFIG.glowColorVar, f.alpha);
          ctx.shadowBlur = f.r * 5;
        }

        ctx.beginPath();
        ctx.arc(x, f.y, f.r, 0, Math.PI * 2);
        ctx.fillStyle = cssVarToRgba(CONFIG.colorVar, f.alpha);
        ctx.fill();

        ctx.restore();
      }

      animationId = requestAnimationFrame(draw);
    }

    resize();
    init();
    draw();

    window.addEventListener("resize", resize);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  function cssVarToRgba(varName: string, alpha: number) {
    const value = getComputedStyle(document.documentElement)
      .getPropertyValue(varName)
      .trim();

    // rgb() already — easy case
    if (value.startsWith("rgb")) {
      return value.replace("rgb(", "rgba(").replace(")", `, ${alpha})`);
    }

    // hex (#rgb or #rrggbb)
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

    // fallback (should never happen)
    return `rgba(255,255,255,${alpha})`;
  }

  return (
    <canvas
      ref={canvasRef}
      data-testid="SnowfallCanvas"
      className="pointer-events-none fixed inset-0 z-50"
    />
  );
}
