"use client";

import { motion } from "framer-motion";
import { ProblemCard } from "@/components/problem/ProblemCard";
import { problems } from "@/components/problem/problems";
import { fadeUpItem, staggerContainer, viewportOnce } from "@/lib/motion";

export function Problem() {
  return (
    <section
      id="problem"
      aria-labelledby="problem-heading"
      className="border-t border-border"
    >
      <div className="mx-auto w-full max-w-5xl px-5 py-20 sm:px-8 sm:py-28">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={staggerContainer}
        >
          <motion.div variants={fadeUpItem} className="max-w-xl">
            <p className="font-mono text-xs tracking-[0.16em] text-muted-foreground uppercase">
              The Problem
            </p>
            <h2
              id="problem-heading"
              className="font-display mt-3 text-3xl font-semibold tracking-[-0.03em] text-foreground sm:text-4xl"
            >
              Agents fail when forced to act like humans.
            </h2>
          </motion.div>

          <div className="mt-12 grid grid-cols-1 gap-px overflow-hidden rounded-lg border border-border bg-border md:grid-cols-3">
            {problems.map((problem) => (
              <motion.div key={problem.id} variants={fadeUpItem} className="bg-background">
                <ProblemCard problem={problem} />
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
