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
      className="relative isolate overflow-hidden border-t border-white/10 bg-black/40 py-24 sm:py-32"
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
            <span className="inline-flex items-center gap-2 font-mono text-xs tracking-widest text-red-400 uppercase">
              <span className="h-1.5 w-1.5 rounded-full bg-red-400" />
              The Architectural Problem
            </span>
            <h2
              id="problem-heading"
              className="font-display mt-4 text-3xl font-bold tracking-[-0.03em] text-white sm:text-4xl lg:text-5xl"
            >
              Agents fail when forced to act like visual humans.
            </h2>
            <p className="mt-4 text-base leading-7 text-zinc-400">
              Legacy web browsers process redundant visual paint steps, layout reflows, and pixel rendering pipelines that consume thousands of CPU cycles per agent session.
            </p>
          </motion.div>

          <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-3">
            {problems.map((problem) => (
              <motion.div key={problem.id} variants={fadeUpItem}>
                <ProblemCard problem={problem} />
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

