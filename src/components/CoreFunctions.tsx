"use client";

import dynamic from "next/dynamic";
import { useState } from "react";
import { motion } from "framer-motion";
import { fadeUpItem, staggerContainer, viewportOnce } from "@/lib/motion";

const PipelineScene = dynamic(
  () => import("@/components/three/PipelineScene").then((mod) => mod.PipelineScene),
  {
    ssr: false,
    loading: () => (
      <div className="h-[320px] w-full rounded-2xl border border-white/10 bg-zinc-950 sm:h-[400px]" />
    ),
  }
);

const coreFunctions = [
  {
    id: "translate",
    index: "01",
    title: "Translate",
    subtitle: "Semantic Parser Engine",
    description:
      "Converts raw web content—HTML and JS-rendered DOM—into structured, intent-aware action graphs in real time. Agents receive semantic intent, not raw markup.",
    badge: "SEMANTIC GRAPH",
  },
  {
    id: "expose",
    index: "02",
    title: "Expose",
    subtitle: "Unified Agent Protocol",
    description:
      "A stable, versioned agent-web protocol that abstracts over live web inconsistencies. Agents declare intent rather than issuing imperative browser commands.",
    badge: "STABLE PROTOCOL",
  },
  {
    id: "execute",
    index: "03",
    title: "Execute",
    subtitle: "Stateless Parallel Runtime",
    description:
      "Stateless, session-scoped execution at horizontal scale. Run thousands of parallel agent sessions without state bleed or redundant rendering.",
    badge: "500B HORIZONTAL MESH",
  },
] as const;

export function CoreFunctions() {
  const [activeStage, setActiveStage] = useState<number>(0);

  return (
    <section
      id="features"
      aria-labelledby="features-heading"
      className="border-t border-white/10 bg-black py-24 sm:py-32"
    >
      <div className="mx-auto w-full max-w-6xl px-5 sm:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={staggerContainer}
        >
          <motion.div variants={fadeUpItem} className="max-w-2xl">
            <span className="inline-flex items-center gap-2 font-mono text-xs tracking-widest text-sky-400 uppercase">
              <span className="h-1.5 w-1.5 rounded-full bg-sky-400" />
              Core Architecture
            </span>
            <h2
              id="features-heading"
              className="font-display mt-4 text-3xl font-bold tracking-[-0.03em] text-white sm:text-4xl lg:text-5xl"
            >
              Three irreducible runtime functions.
            </h2>
            <p className="mt-4 text-base leading-7 text-zinc-400">
              Translate. Expose. Execute. Everything else is implementation detail.
            </p>
          </motion.div>

          <div className="mt-14 grid grid-cols-1 items-center gap-12 lg:grid-cols-12">
            {/* Interactive Stage Selector Cards */}
            <div className="space-y-4 lg:col-span-7">
              {coreFunctions.map((fn, idx) => {
                const isActive = activeStage === idx;
                return (
                  <motion.div
                    key={fn.id}
                    variants={fadeUpItem}
                    onClick={() => setActiveStage(idx)}
                    className={`cursor-pointer rounded-xl border p-6 transition-all duration-300 ${
                      isActive
                        ? "border-sky-500/50 bg-gradient-to-r from-sky-500/10 to-transparent shadow-[0_0_30px_rgba(56,189,248,0.15)]"
                        : "border-white/10 bg-zinc-950/60 hover:border-white/20 hover:bg-zinc-900/60"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span className="font-mono text-xs font-semibold text-sky-400">
                          {fn.index}
                        </span>
                        <h3 className="font-display text-xl font-semibold text-white">
                          {fn.title}
                        </h3>
                      </div>
                      <span className="font-mono text-[10px] tracking-wider text-zinc-400 border border-white/10 px-2 py-0.5 rounded-full">
                        {fn.badge}
                      </span>
                    </div>

                    <p className="mt-3 text-sm leading-6 text-zinc-400">
                      {fn.description}
                    </p>
                  </motion.div>
                );
              })}
            </div>

            {/* 3D Pipeline Scene Visualizer */}
            <motion.div variants={fadeUpItem} className="lg:col-span-5">
              <PipelineScene activeStage={activeStage} />
              <div className="mt-3 flex items-center justify-between font-mono text-[11px] text-zinc-500 px-1">
                <span>STAGE 0{activeStage + 1} ACTIVE</span>
                <span className="text-sky-400">INTERACTIVE 3D MODEL</span>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

