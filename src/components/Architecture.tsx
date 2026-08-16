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
      <div className="h-[320px] w-full rounded-2xl border border-white/10 bg-black sm:h-[420px]" />
    ),
  },
);

const moatPoints = [
  {
    id: "scale",
    title: "Built for 500 Billion Agents",
    description:
      "Our architecture is designed so that scaling to planetary agent density is a hardware procurement problem, not a software redesign problem.",
    metric: "100K SESSIONS / NODE",
  },
  {
    id: "hexagonal",
    title: "Event-Driven Microservices",
    description:
      "Built on a Hexagonal Architecture, decoupling the execution engine from the semantic extraction pipeline.",
    metric: "SUB-MILLISECOND EVENT BUS",
  },
  {
    id: "renderless",
    title: "Headless & Renderless Runtime",
    description:
      "No visual rendering engine. We parse for structure and semantics, not pixels, maximizing compute efficiency.",
    metric: "0% GPU PAINT OVERHEAD",
  },
] as const;

export function Architecture() {
  return (
    <section
      id="architecture"
      aria-labelledby="architecture-heading"
      className="scroll-mt-20 border-t border-white/10 bg-black/60 py-24 sm:py-32"
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
            <span className="inline-flex items-center gap-2 font-mono text-xs tracking-widest text-emerald-400 uppercase">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
              Technical Moat
            </span>
            <h2
              id="architecture-heading"
              className="font-display mt-4 text-3xl font-bold tracking-[-0.03em] text-white sm:text-4xl lg:text-5xl"
            >
              Built for planetary agent density.
            </h2>
            <ul className="mt-10 space-y-6">
              {moatPoints.map((point) => (
                <li key={point.id} className="rounded-xl border border-white/10 bg-zinc-950/80 p-5 backdrop-blur-md">
                  <div className="flex items-center justify-between">
                    <h3 className="font-display text-base font-semibold text-white">
                      {point.title}
                    </h3>
                    <span className="font-mono text-[10px] font-semibold text-emerald-400 border border-emerald-500/20 bg-emerald-500/10 px-2 py-0.5 rounded">
                      {point.metric}
                    </span>
                  </div>
                  <p className="mt-2 text-sm leading-6 text-zinc-400">
                    {point.description}
                  </p>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div variants={fadeUpItem} className="min-w-0">
            <ArchitectureScene />
            <div className="mt-4 flex items-center justify-between font-mono text-[11px] text-zinc-500">
              <span>HOVER NODES TO INSPECT ENGINE</span>
              <span className="text-emerald-400">wildinfra.v1 topology</span>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

