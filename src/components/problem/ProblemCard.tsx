"use client";

import { useState } from "react";
import type { ProblemItem } from "./problems";
import { ProblemIcon } from "./ProblemIcon";

type ProblemCardProps = {
  problem: ProblemItem;
};

export function ProblemCard({ problem }: ProblemCardProps) {
  const [rotate, setRotate] = useState({ x: 0, y: 0 });
  const [glare, setGlare] = useState({ x: 50, y: 50, opacity: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -14;
    const rotateY = ((x - centerX) / centerX) * 14;

    setRotate({ x: rotateX, y: rotateY });
    setGlare({
      x: (x / rect.width) * 100,
      y: (y / rect.height) * 100,
      opacity: 0.35,
    });
  };

  const handleMouseLeave = () => {
    setRotate({ x: 0, y: 0 });
    setGlare((prev) => ({ ...prev, opacity: 0 }));
  };

  return (
    <div className="[perspective:1200px] h-full">
      <article
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          transform: `rotateX(${rotate.x}deg) rotateY(${rotate.y}deg)`,
          transformStyle: "preserve-3d",
        }}
        className="relative flex h-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-b from-slate-900/90 via-[#0a0f1d]/90 to-[#020408]/95 p-8 backdrop-blur-2xl transition-all duration-300 ease-out shadow-[0_10px_35px_rgba(0,0,0,0.7)] hover:border-red-500/40 hover:shadow-[0_0_35px_rgba(239,68,68,0.25)]"
      >
        {/* Dynamic Light Sheen Overlay */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 transition-opacity duration-300"
          style={{
            background: `radial-gradient(circle at ${glare.x}% ${glare.y}%, rgba(255,255,255,0.4) 0%, transparent 65%)`,
            opacity: glare.opacity,
          }}
        />

        <div className="flex items-center justify-between [transform:translateZ(25px)]">
          <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl border border-red-500/30 bg-red-500/10 text-red-400 shadow-[0_0_20px_rgba(239,68,68,0.2)]">
            <ProblemIcon name={problem.icon} className="h-6 w-6" />
          </div>
          <span className="font-mono text-[10px] font-semibold text-red-400 border border-red-500/20 bg-red-500/10 px-2.5 py-1 rounded-full">
            OVERHEAD
          </span>
        </div>

        <h3 className="font-display mt-6 text-xl font-bold tracking-tight text-white [transform:translateZ(20px)]">
          {problem.title}
        </h3>

        <p className="mt-3 text-sm leading-7 text-slate-300 [transform:translateZ(15px)]">
          {problem.description}
        </p>

        <div className="mt-auto pt-6 border-t border-white/5 [transform:translateZ(10px)]">
          <span className="inline-flex items-center gap-2 font-mono text-xs text-red-400/90 font-medium">
            <span className="h-1.5 w-1.5 rounded-full bg-red-400 animate-pulse" />
            ELIMINATED BY WILDINFRA
          </span>
        </div>
      </article>
    </div>
  );
}


