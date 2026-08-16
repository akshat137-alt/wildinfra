"use client";

import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { HeroActions } from "@/components/hero/HeroActions";
import { fadeUpItem, staggerContainer } from "@/lib/motion";

const HeroScene = dynamic(
  () =>
    import("@/components/three/HeroScene").then((mod) => mod.HeroScene),
  {
    ssr: false,
    loading: () => <div className="absolute inset-0 -z-10 bg-[#020408]" />,
  },
);

export function Hero() {
  return (
    <section className="relative isolate min-h-[100svh] overflow-hidden bg-black">
      <HeroScene />

      <div className="relative mx-auto flex min-h-[100svh] w-full max-w-6xl flex-col justify-center px-5 pb-24 pt-28 sm:px-8 lg:px-10">
        <motion.div
          className="max-w-2xl"
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
        >
          {/* Futuristic 3D Badge */}
          <motion.div variants={fadeUpItem} className="inline-flex items-center gap-2">
            <span className="inline-flex items-center gap-2 rounded-full border border-sky-500/30 bg-sky-500/10 px-3.5 py-1 text-xs font-mono tracking-wider text-sky-400 backdrop-blur-md shadow-[0_0_15px_rgba(56,189,248,0.2)]">
              <span className="h-1.5 w-1.5 animate-ping rounded-full bg-sky-400" />
              PLANETARY EXECUTION RUNTIME v1.0
            </span>
          </motion.div>

          <motion.h1
            variants={fadeUpItem}
            className="font-display mt-6 text-4xl font-bold tracking-[-0.04em] text-white sm:text-5xl sm:leading-[1.05] lg:text-6xl lg:leading-[1.02]"
          >
            The Execution Layer for{" "}
            <span className="bg-gradient-to-r from-sky-400 via-cyan-200 to-white bg-clip-text text-transparent">
              Planetary-Scale AI.
            </span>
          </motion.h1>

          <motion.p
            variants={fadeUpItem}
            className="mt-6 max-w-xl text-base leading-7 text-zinc-300 sm:text-lg sm:leading-8"
          >
            A programmable, semantic browsing runtime built exclusively for AI
            agents. Structured intent—not visual pixels—processed at hyper-scale density.
          </motion.p>

          <motion.div variants={fadeUpItem} className="mt-9 sm:mt-10">
            <HeroActions />
          </motion.div>

          {/* Live Metrics Grid */}
          <motion.div
            variants={fadeUpItem}
            className="mt-12 grid grid-cols-3 gap-4 border-t border-white/10 pt-6 font-mono text-xs max-w-lg"
          >
            <div>
              <div className="text-zinc-500 uppercase tracking-wider text-[10px]">Scale Capacity</div>
              <div className="mt-1 text-sm font-semibold text-white">500B Agents</div>
            </div>
            <div>
              <div className="text-zinc-500 uppercase tracking-wider text-[10px]">Render Overhead</div>
              <div className="mt-1 text-sm font-semibold text-emerald-400">0% Pixels</div>
            </div>
            <div>
              <div className="text-zinc-500 uppercase tracking-wider text-[10px]">Avg Latency</div>
              <div className="mt-1 text-sm font-semibold text-sky-400">&lt; 0.4ms</div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

