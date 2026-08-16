"use client";

import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { fadeUpItem, staggerContainer, viewportOnce } from "@/lib/motion";

const ArchitectureScene = dynamic(
  () =>
    import("@/components/three/ArchitectureScene").then(
      (mod) => mod.ArchitectureScene,
    ),
  {
    ssr: false,
    loading: () => (
      <div className="h-[340px] w-full rounded-2xl border border-white/10 bg-slate-950 sm:h-[440px]" />
    ),
  },
);

const moatPoints = [
  {
    id: "scale",
    title: "Built for 500 Billion Agents",
    description:
      "Our architecture scales horizontally across planetary clusters. Adding capacity is a hardware procurement routine, never a software re-architecture.",
    metric: "100K SESSIONS / NODE",
  },
  {
    id: "hexagonal",
    title: "Event-Driven Hexagonal Core",
    description:
      "Decouples the headless execution engine from the semantic extraction pipeline via sub-millisecond event buses.",
    metric: "SUB-MS BUS LATENCY",
  },
  {
    id: "renderless",
    title: "Headless & Renderless Engine",
    description:
      "No visual layout engines, no rasterizers, no paint cycles. We parse directly for structured semantics and action affordances.",
    metric: "0% GPU OVERHEAD",
  },
] as const;

export function Architecture() {
  return (
    <section
      id="architecture"
      aria-labelledby="architecture-heading"
      className="scroll-mt-20 border-t border-white/10 bg-[#020408] py-28 sm:py-36"
    >
      <div className="mx-auto w-full max-w-6xl px-5 sm:px-8">
        <motion.div
          className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16"
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={staggerContainer}
        >
          <motion.div variants={fadeUpItem}>
            <span className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3.5 py-1 font-mono text-xs tracking-wider text-emerald-400 uppercase">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
              Technical Moat
            </span>
            <h2
              id="architecture-heading"
              className="font-display mt-5 text-3xl font-extrabold tracking-[-0.03em] text-white sm:text-5xl lg:text-6xl"
            >
              Built for planetary agent density.
            </h2>
            <p className="mt-5 text-base leading-8 text-slate-300 sm:text-lg">
              Every architectural layer is engineered to maximize throughput while minimizing compute overhead.
            </p>
            <ul className="mt-10 space-y-5">
              {moatPoints.map((point) => (
                <li key={point.id} className="glass-panel rounded-2xl p-6 transition-all duration-300 hover:border-emerald-500/40 hover:shadow-[0_0_25px_rgba(16,185,129,0.15)]">
                  <div className="flex items-center justify-between">
                    <h3 className="font-display text-lg font-bold text-white">
                      {point.title}
                    </h3>
                    <span className="font-mono text-[10px] font-bold text-emerald-400 border border-emerald-500/30 bg-emerald-500/10 px-2.5 py-1 rounded-full">
                      {point.metric}
                    </span>
                  </div>
                  <p className="mt-3 text-sm leading-7 text-slate-300">
                    {point.description}
                  </p>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div variants={fadeUpItem} className="min-w-0">
            <ArchitectureScene />
            <div className="mt-4 flex items-center justify-between font-mono text-xs text-slate-400 px-2">
              <span className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                HOVER NODES TO INSPECT ENGINE
              </span>
              <span className="text-emerald-400 font-semibold">wildinfra.v1 topology</span>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}


