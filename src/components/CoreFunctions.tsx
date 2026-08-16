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
      <div className="h-[340px] w-full rounded-2xl border border-white/10 bg-slate-950 sm:h-[420px]" />
    ),
  }
);

const coreFunctions = [
  {
    id: "translate",
    index: "01",
    title: "Translate",
    subtitle: "Semantic Graph Parser",
    description:
      "Converts raw HTML and JS-rendered client DOM trees into structured, intent-aware action graphs in real-time. Eliminates layout calculation and pixel rendering.",
    badge: "SUB-MS PARSE",
    codeSample: "DOM_TREE -> { action: 'SUBMIT_ORDER', targets: ['#btn-pay', 'price: $49.00'] }",
  },
  {
    id: "expose",
    index: "02",
    title: "Expose",
    subtitle: "Unified Agent-Web Protocol",
    description:
      "A stable, versioned protocol that shields AI reasoning models from web entropy, dynamic A/B test variations, and structural DOM mutations.",
    badge: "VERSIONED IPC",
    codeSample: "wildinfra.exposeProtocol({ version: 'v1.4', strictSchema: true })",
  },
  {
    id: "execute",
    index: "03",
    title: "Execute",
    subtitle: "Stateless Session Mesh",
    description:
      "Stateless, micro-isolated execution across horizontal clusters. Run hundreds of thousands of parallel agent sessions without state bleed or memory leaks.",
    badge: "500B HORIZONTAL",
    codeSample: "mesh.dispatch({ concurrency: 10000, isolations: 'hard_memory_sandbox' })",
  },
] as const;

export function CoreFunctions() {
  const [activeStage, setActiveStage] = useState<number>(0);

  return (
    <section
      id="features"
      aria-labelledby="features-heading"
      className="border-t border-white/10 bg-[#020408] py-28 sm:py-36"
    >
      <div className="mx-auto w-full max-w-6xl px-5 sm:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={staggerContainer}
        >
          <motion.div variants={fadeUpItem} className="max-w-2xl">
            <span className="inline-flex items-center gap-2 rounded-full border border-sky-400/30 bg-sky-500/10 px-3.5 py-1 font-mono text-xs tracking-wider text-sky-400 uppercase">
              <span className="h-1.5 w-1.5 rounded-full bg-sky-400" />
              Runtime Mechanics
            </span>
            <h2
              id="features-heading"
              className="font-display mt-5 text-3xl font-extrabold tracking-[-0.03em] text-white sm:text-5xl lg:text-6xl"
            >
              Three irreducible functions.
            </h2>
            <p className="mt-5 text-base leading-8 text-slate-300 sm:text-lg">
              Translate. Expose. Execute. Everything else in browser technology is human perception legacy.
            </p>
          </motion.div>

          <div className="mt-16 grid grid-cols-1 items-center gap-12 lg:grid-cols-12">
            {/* Interactive Stage Selector Cards */}
            <div className="space-y-4 lg:col-span-6">
              {coreFunctions.map((fn, idx) => {
                const isActive = activeStage === idx;
                return (
                  <motion.div
                    key={fn.id}
                    variants={fadeUpItem}
                    onClick={() => setActiveStage(idx)}
                    className={`cursor-pointer rounded-2xl border p-6 transition-all duration-300 ${
                      isActive
                        ? "border-sky-400/60 bg-gradient-to-r from-sky-500/15 via-slate-900/80 to-transparent shadow-[0_0_35px_rgba(56,189,248,0.2)] scale-[1.02]"
                        : "border-white/10 bg-slate-950/60 hover:border-white/20 hover:bg-slate-900/60"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span className={`font-mono text-xs font-bold ${isActive ? "text-sky-400" : "text-slate-500"}`}>
                          {fn.index}
                        </span>
                        <div>
                          <h3 className="font-display text-xl font-bold text-white">
                            {fn.title}
                          </h3>
                          <div className="text-xs text-slate-400 font-mono">{fn.subtitle}</div>
                        </div>
                      </div>
                      <span className="font-mono text-[10px] font-semibold tracking-wider text-sky-300 border border-sky-400/20 bg-sky-500/10 px-2.5 py-1 rounded-full">
                        {fn.badge}
                      </span>
                    </div>

                    <p className="mt-4 text-sm leading-7 text-slate-300">
                      {fn.description}
                    </p>

                    {isActive && (
                      <div className="mt-4 rounded-lg border border-sky-500/20 bg-black/80 px-3.5 py-2 font-mono text-[11px] text-emerald-400 overflow-x-auto">
                        <code>{fn.codeSample}</code>
                      </div>
                    )}
                  </motion.div>
                );
              })}
            </div>

            {/* 3D Pipeline Scene Visualizer */}
            <motion.div variants={fadeUpItem} className="lg:col-span-6">
              <PipelineScene activeStage={activeStage} />
              <div className="mt-4 flex items-center justify-between font-mono text-xs text-slate-400 px-2">
                <span className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-sky-400 animate-pulse" />
                  STAGE 0{activeStage + 1} VISUALIZER
                </span>
                <span className="text-sky-400 font-semibold">CLICK TABS TO SWITCH 3D STAGE</span>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}


