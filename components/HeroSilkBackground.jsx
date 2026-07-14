"use client";

import { useEffect, useRef } from "react";

const RENDER_WIDTH = 220;
const FRAME_INTERVAL = 1000 / 30;

function noise(x, y) {
  const G = 2.71828;
  const rx = G * Math.sin(G * x);
  const ry = G * Math.sin(G * y);
  return (rx * ry * (1 + x)) % 1;
}

export default function HeroSilkBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const wrap = canvas.parentElement;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const speed = 0.02;
    const scale = 2;
    const noiseIntensity = 0.8;
    let time = 0;
    let rafId;
    let lastDraw = 0;
    let width = RENDER_WIDTH;
    let height = RENDER_WIDTH;
    let imageData = ctx.createImageData(width, height);

    const resize = () => {
      const rect = wrap.getBoundingClientRect();
      const aspect = rect.height / rect.width || 1;
      width = RENDER_WIDTH;
      height = Math.max(60, Math.round(RENDER_WIDTH * aspect));
      canvas.width = width;
      canvas.height = height;
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;
      imageData = ctx.createImageData(width, height);
    };
    resize();
    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(wrap);

    const draw = () => {
      const data = imageData.data;
      const tOffset = speed * time;

      for (let x = 0; x < width; x++) {
        for (let y = 0; y < height; y++) {
          const u = (x / width) * scale;
          const v = (y / height) * scale;

          const tex_x = u;
          const tex_y = v + 0.03 * Math.sin(8.0 * tex_x - tOffset);

          const pattern = 0.6 + 0.4 * Math.sin(
            5.0 * (tex_x + tex_y +
              Math.cos(3.0 * tex_x + 5.0 * tex_y) +
              0.02 * tOffset) +
            Math.sin(20.0 * (tex_x + tex_y - 0.1 * tOffset))
          );

          const rnd = noise(x, y);
          const intensity = Math.max(0, pattern - (rnd / 15.0) * noiseIntensity);

          // Black/graphite silk, near-neutral — brand is black/white/red, no blue/purple
          const shade = Math.floor(26 * intensity);
          const warm = Math.floor(4 * intensity);

          const index = (y * width + x) * 4;
          data[index] = shade + warm;
          data[index + 1] = shade;
          data[index + 2] = shade;
          data[index + 3] = 255;
        }
      }

      ctx.putImageData(imageData, 0, 0);
      time += 1;
    };

    const animate = (t) => {
      if (t - lastDraw >= FRAME_INTERVAL) {
        lastDraw = t;
        draw();
      }
      rafId = requestAnimationFrame(animate);
    };

    rafId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(rafId);
      resizeObserver.disconnect();
    };
  }, []);

  return (
    <div className="absolute inset-0 z-[1] pointer-events-none overflow-hidden">
      <canvas ref={canvasRef} className="block h-full w-full" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/25 via-transparent to-black/55" />
    </div>
  );
}
