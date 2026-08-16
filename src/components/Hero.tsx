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
    <section className="relative isolate min-h-[100svh] overflow-hidden bg-[#020408]">
      <HeroScene />

      <div className="relative mx-auto flex min-h-[100svh] w-full max-w-6xl flex-col justify-center px-5 pb-24 pt-32 sm:px-8 lg:px-10">
        <motion.div
          className="max-w-2xl"
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
        >
          {/* Animated Announcement Pill */}
          <motion.div variants={fadeUpItem} className="inline-flex items-center gap-2">
            <span className="inline-flex items-center gap-2 rounded-full border border-sky-400/30 bg-sky-500/10 px-4 py-1.5 text-xs font-mono tracking-wider text-sky-300 backdrop-blur-xl shadow-[0_0_20px_rgba(56,189,248,0.25)]">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-sky-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-sky-400" />
              </span>
              WILDINFRA RUNTIME v1.0 · LIVE
            </span>
          </motion.div>

          <motion.h1
            variants={fadeUpItem}
            className="font-display mt-6 text-4xl font-extrabold tracking-[-0.04em] text-white sm:text-6xl sm:leading-[1.05] lg:text-7xl lg:leading-[1.02]"
          >
            The Execution Layer for{" "}
            <span className="bg-gradient-to-r from-sky-400 via-teal-200 to-indigo-300 bg-clip-text text-transparent drop-shadow-[0_0_35px_rgba(56,189,248,0.3)]">
              Planetary-Scale AI.
            </span>
          </motion.h1>

          <motion.p
            variants={fadeUpItem}
            className="mt-6 max-w-xl text-base leading-8 text-slate-300 sm:text-lg sm:leading-8"
          >
            A programmable, semantic browsing runtime built exclusively for AI
            agents. We bypass visual DOM rendering to deliver structured, intent-aware action graphs at sub-millisecond speeds.
          </motion.p>

          <motion.div variants={fadeUpItem} className="mt-10 flex flex-wrap items-center gap-4">
            <HeroActions />
          </motion.div>

          {/* Glassmorphic Metrics Card */}
          <motion.div
            variants={fadeUpItem}
            className="glass-panel mt-12 grid max-w-xl grid-cols-3 gap-4 rounded-2xl p-5"
          >
            <div>
              <div className="font-mono text-[10px] font-semibold tracking-wider text-slate-400 uppercase">
                Agent Concurrency
              </div>
              <div className="font-display mt-1 text-lg font-bold text-white sm:text-xl">
                500B Scale
              </div>
            </div>
            <div className="border-l border-white/10 pl-4">
              <div className="font-mono text-[10px] font-semibold tracking-wider text-slate-400 uppercase">
                Pixel Overhead
              </div>
              <div className="font-display mt-1 text-lg font-bold text-emerald-400 sm:text-xl">
                0% (Renderless)
              </div>
            </div>
            <div className="border-l border-white/10 pl-4">
              <div className="font-mono text-[10px] font-semibold tracking-wider text-slate-400 uppercase">
                Intent Latency
              </div>
              <div className="font-display mt-1 text-lg font-bold text-sky-400 sm:text-xl">
                &lt; 0.4ms
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}


