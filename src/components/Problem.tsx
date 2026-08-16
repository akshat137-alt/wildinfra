"use client";

import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { ProblemCard } from "@/components/problem/ProblemCard";
import { problems } from "@/components/problem/problems";
import { fadeUpItem, staggerContainer, viewportOnce } from "@/lib/motion";

const ProblemScene = dynamic(
  () => import("@/components/three/ProblemScene").then((mod) => mod.ProblemScene),
  { ssr: false }
);

export function Problem() {
  return (
    <section
      id="problem"
      aria-labelledby="problem-heading"
      className="relative isolate overflow-hidden border-t border-white/10 bg-[#020408] py-28 sm:py-36"
    >
      <ProblemScene />

      <div className="mx-auto w-full max-w-6xl px-5 sm:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={staggerContainer}
        >
          <motion.div variants={fadeUpItem} className="max-w-2xl">
            <span className="inline-flex items-center gap-2 rounded-full border border-red-500/30 bg-red-500/10 px-3.5 py-1 font-mono text-xs tracking-wider text-red-400 uppercase">
              <span className="h-1.5 w-1.5 rounded-full bg-red-400" />
              The Architectural Barrier
            </span>
            <h2
              id="problem-heading"
              className="font-display mt-5 text-3xl font-extrabold tracking-[-0.03em] text-white sm:text-5xl lg:text-6xl"
            >
              Agents fail when forced to mimic visual humans.
            </h2>
            <p className="mt-5 text-base leading-8 text-slate-300 sm:text-lg">
              Legacy human browsers carry decades of baggage: layout calculation engines, GPU paint pipelines, and rasterization overhead that waste billions of compute cycles per session.
            </p>
          </motion.div>

          <div className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-3">
            {problems.map((problem) => (
              <motion.div key={problem.id} variants={fadeUpItem}>
                <ProblemCard problem={problem} />
              </motion.div>
            ))}
          </div>

          {/* Benchmark comparison bar */}
          <motion.div
            variants={fadeUpItem}
            className="glass-panel mt-12 flex flex-col gap-6 rounded-2xl p-6 sm:flex-row sm:items-center sm:justify-between"
          >
            <div className="flex items-center gap-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-red-500/30 bg-red-500/10 font-mono text-xs font-bold text-red-400">
                VS
              </div>
              <div>
                <div className="font-display text-sm font-bold text-white">
                  Headless Chrome / Playwright vs WildInfra Runtime
                </div>
                <div className="text-xs text-slate-400">
                  Benchmarked on 10,000 parallel transaction sessions
                </div>
              </div>
            </div>

            <div className="flex items-center gap-8 font-mono text-xs">
              <div>
                <div className="text-slate-400">Chrome RAM/Agent</div>
                <div className="text-sm font-semibold text-red-400">~380 MB</div>
              </div>
              <div>
                <div className="text-slate-400">WildInfra RAM/Agent</div>
                <div className="text-sm font-semibold text-emerald-400">&lt; 1.2 MB</div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}


