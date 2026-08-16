"use client";

import dynamic from "next/dynamic";

const ArchitectureScene = dynamic(
  () => import("@/components/three/ArchitectureScene").then((m) => m.ArchitectureScene),
  { ssr: false }
);

export function ArchitectureView() {
  return (
    <div className="mx-auto w-full max-w-6xl px-5 pb-24 pt-28 sm:px-8">
      <div className="max-w-3xl">
        <span className="inline-flex items-center gap-2 font-mono text-xs tracking-widest text-emerald-400 uppercase">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
          Technical Reference Document
        </span>
        <h1 className="font-display mt-4 text-4xl font-bold tracking-[-0.03em] text-white sm:text-5xl">
          System Architecture (TRD)
        </h1>
        <p className="mt-4 text-lg leading-8 text-zinc-300">
          WildInfra decouples agent intent resolution from human pixel paint pipelines through an event-driven hexagonal microservices mesh.
        </p>
      </div>

      <div className="mt-12">
        <ArchitectureScene />
      </div>

      <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-3 font-mono text-xs">
        <div className="rounded-xl border border-white/10 bg-zinc-950 p-6">
          <div className="text-sky-400 font-bold mb-2">01 / SEMANTIC PARSER ENGINE</div>
          <p className="text-zinc-400 leading-relaxed font-sans text-sm">
            Parses incoming DOM nodes directly into abstract action syntax trees in sub-millisecond execution loops.
          </p>
        </div>
        <div className="rounded-xl border border-white/10 bg-zinc-950 p-6">
          <div className="text-emerald-400 font-bold mb-2">02 / STATELESS SESSION MESH</div>
          <p className="text-zinc-400 leading-relaxed font-sans text-sm">
            Supports 100,000 active concurrent agent browser instances per hardware node without state bleed.
          </p>
        </div>
        <div className="rounded-xl border border-white/10 bg-zinc-950 p-6">
          <div className="text-indigo-400 font-bold mb-2">03 / UNIFIED AGENT PROTOCOL</div>
          <p className="text-zinc-400 leading-relaxed font-sans text-sm">
            Stable versioned IPC boundary protecting autonomous agent brains from DOM mutation drift.
          </p>
        </div>
      </div>
    </div>
  );
}
