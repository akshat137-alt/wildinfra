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

    const rotateX = ((y - centerY) / centerY) * -12;
    const rotateY = ((x - centerX) / centerX) * 12;

    setRotate({ x: rotateX, y: rotateY });
    setGlare({
      x: (x / rect.width) * 100,
      y: (y / rect.height) * 100,
      opacity: 0.25,
    });
  };

  const handleMouseLeave = () => {
    setRotate({ x: 0, y: 0 });
    setGlare((prev) => ({ ...prev, opacity: 0 }));
  };

  return (
    <div className="[perspective:1000px] h-full">
      <article
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          transform: `rotateX(${rotate.x}deg) rotateY(${rotate.y}deg)`,
          transformStyle: "preserve-3d",
        }}
        className="relative flex h-full flex-col overflow-hidden rounded-xl border border-white/10 bg-gradient-to-b from-zinc-900/80 to-black/80 p-7 backdrop-blur-xl transition-all duration-200 ease-out shadow-[0_8px_30px_rgb(0,0,0,0.5)] hover:border-sky-500/40 hover:shadow-[0_0_25px_rgba(56,189,248,0.2)]"
      >
        {/* Dynamic Light Sheen Overlay */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 transition-opacity duration-300"
          style={{
            background: `radial-gradient(circle at ${glare.x}% ${glare.y}%, rgba(255,255,255,0.4) 0%, transparent 60%)`,
            opacity: glare.opacity,
          }}
        />

        <div className="mb-5 inline-flex h-10 w-10 items-center justify-center rounded-lg border border-sky-500/20 bg-sky-500/10 text-sky-400 [transform:translateZ(20px)]">
          <ProblemIcon name={problem.icon} className="h-5 w-5" />
        </div>

        <h3 className="font-display text-lg font-semibold tracking-tight text-white [transform:translateZ(15px)]">
          {problem.title}
        </h3>

        <p className="mt-3 text-sm leading-6 text-zinc-400 [transform:translateZ(10px)]">
          {problem.description}
        </p>

        <div className="mt-auto pt-6 [transform:translateZ(5px)]">
          <span className="inline-flex items-center gap-1.5 font-mono text-[11px] text-red-400/90">
            <span className="h-1.5 w-1.5 rounded-full bg-red-400" />
            HUMAN BROWSER BOTTLENECK
          </span>
        </div>
      </article>
    </div>
  );
}

