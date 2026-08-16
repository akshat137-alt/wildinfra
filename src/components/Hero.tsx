"use client";

import { motion } from "framer-motion";
import { HeroActions } from "@/components/hero/HeroActions";
import { HeroProductPreview } from "@/components/hero/HeroProductPreview";
import { fadeUpItem, staggerContainer } from "@/lib/motion";

export function Hero() {
  return (
    <section className="relative isolate min-h-[100svh] overflow-hidden bg-[#020408] pb-24 pt-32 sm:pt-40">
      {/* Subtle grid background */}
      <div className="cyber-grid pointer-events-none absolute inset-0 opacity-40" />
      <div className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 h-[500px] w-[800px] rounded-full bg-sky-500/10 blur-[120px]" />

      <div className="relative mx-auto w-full max-w-6xl px-5 sm:px-8">
        <motion.div
          className="mx-auto max-w-3xl text-center"
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
        >
          {/* Top Pill */}
          <motion.div variants={fadeUpItem} className="inline-flex items-center justify-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3.5 py-1 font-mono text-xs text-zinc-300 backdrop-blur-md">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Public Beta v1.0 · Rust Semantic Runtime
            </span>
          </motion.div>

          <motion.h1
            variants={fadeUpItem}
            className="font-display mt-6 text-4xl font-bold tracking-[-0.04em] text-white sm:text-6xl sm:leading-[1.08] lg:text-7xl lg:leading-[1.05]"
          >
            The headless semantic runtime for AI agents.
          </motion.h1>

          <motion.p
            variants={fadeUpItem}
            className="mx-auto mt-6 max-w-2xl text-base leading-8 text-zinc-400 sm:text-lg sm:leading-8"
          >
            Run 100,000 parallel agent browsing sessions on a single server node. Zero pixel rendering, 4ms DOM-to-Action compilation, and &lt;2MB RAM per session.
          </motion.p>

          <motion.div variants={fadeUpItem} className="mt-8 flex justify-center">
            <HeroActions />
          </motion.div>
        </motion.div>

        {/* Live Code / Product Visualizer */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <HeroProductPreview />
        </motion.div>

        {/* Quick Highlights Bar */}
        <div className="mt-12 grid grid-cols-2 gap-4 border-t border-white/[0.08] pt-8 sm:grid-cols-4 font-mono text-xs">
          <div>
            <div className="text-zinc-500 uppercase tracking-wider text-[10px]">Cold Start Time</div>
            <div className="mt-1 text-sm font-semibold text-emerald-400">4.2ms</div>
          </div>
          <div>
            <div className="text-zinc-500 uppercase tracking-wider text-[10px]">Memory / Session</div>
            <div className="mt-1 text-sm font-semibold text-white">&lt; 1.8 MB (99.5% saved)</div>
          </div>
          <div>
            <div className="text-zinc-500 uppercase tracking-wider text-[10px]">Per-Node Concurrency</div>
            <div className="mt-1 text-sm font-semibold text-sky-400">100K Parallel Agents</div>
          </div>
          <div>
            <div className="text-zinc-500 uppercase tracking-wider text-[10px]">Render Overhead</div>
            <div className="mt-1 text-sm font-semibold text-white">0% (Pure Headless)</div>
          </div>
        </div>
      </div>
    </section>
  );
}



