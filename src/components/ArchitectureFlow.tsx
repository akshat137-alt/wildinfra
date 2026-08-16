"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { fadeUpItem, staggerContainer, viewportOnce } from "@/lib/motion";

type PipelineStep = {
  id: string;
  stepNumber: string;
  title: string;
  badge: string;
  description: string;
  input: string;
  output: string;
  latency: string;
};

const steps: PipelineStep[] = [
  {
    id: "ingest",
    stepNumber: "01",
    title: "Network Stream Ingestion",
    badge: "ZERO-RENDER STREAM",
    description:
      "Intercepts raw HTTP/WebSocket frames directly into memory buffers. Ignores images, video codecs, fonts, and CSS animations that waste agent compute.",
    input: "Raw wire packets + Chunked HTML response",
    output: "Clean memory byte buffer (stripped of assets)",
    latency: "0.8ms",
  },
  {
    id: "tokenize",
    stepNumber: "02",
    title: "Rust Semantic Tokenizer",
    badge: "AST COMPILER",
    description:
      "A fast native Rust engine that parses DOM hierarchies directly into abstract syntax trees without invoking Blink/Chromium layout reflows.",
    input: "Unsanitized HTML / DOM strings",
    output: "Typed Semantic Tree with accessible affordances",
    latency: "1.4ms",
  },
  {
    id: "compile",
    stepNumber: "03",
    title: "Action-Graph Compiler",
    badge: "INTENT RESOLUTION",
    description:
      "Compiles interactive nodes (inputs, buttons, dropdowns, tables) into standardized agent action targets with confidence scoring.",
    input: "Semantic AST",
    output: "JSON Action Graph with executable IDs",
    latency: "1.2ms",
  },
  {
    id: "dispatch",
    stepNumber: "04",
    title: "Stateless Agent IPC",
    badge: "ISOLATED IPC",
    description:
      "Delivers the verified Action Graph to the agent reasoning model via high-speed gRPC/IPC streams. Executes actions with cryptographic isolation.",
    input: "Agent Intent (e.g., 'click_checkout')",
    output: "Instant state mutation with zero memory leak",
    latency: "0.8ms",
  },
];

export function ArchitectureFlow() {
  const [activeStep, setActiveStep] = useState<number>(0);
  const current = steps[activeStep];

  return (
    <section id="architecture" className="border-t border-white/[0.08] bg-[#020408] py-24 sm:py-32">
      <div className="mx-auto w-full max-w-6xl px-5 sm:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={staggerContainer}
        >
          <motion.div variants={fadeUpItem} className="max-w-2xl">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3.5 py-1 font-mono text-xs text-zinc-300">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
              Runtime Architecture
            </span>
            <h2 className="font-display mt-5 text-3xl font-bold tracking-tight text-white sm:text-5xl">
              From raw web entropy to structured agent graphs in 4.2ms.
            </h2>
            <p className="mt-4 text-base leading-7 text-zinc-400">
              Decoupling web execution from human visual rendering. Click through the execution lifecycle below.
            </p>
          </motion.div>

          {/* Interactive Pipeline Steps */}
          <div className="mt-14 grid grid-cols-1 gap-8 lg:grid-cols-12 items-start">
            {/* Step Navigation Cards */}
            <div className="space-y-3 lg:col-span-6">
              {steps.map((step, idx) => {
                const isActive = activeStep === idx;
                return (
                  <motion.button
                    key={step.id}
                    variants={fadeUpItem}
                    type="button"
                    onClick={() => setActiveStep(idx)}
                    className={`w-full rounded-xl border p-5 text-left transition-all duration-200 ${
                      isActive
                        ? "border-sky-400/50 bg-white/10 text-white shadow-lg"
                        : "border-white/[0.08] bg-zinc-950/60 text-zinc-400 hover:border-white/20 hover:text-zinc-200"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span className={`font-mono text-xs font-bold ${isActive ? "text-sky-400" : "text-zinc-600"}`}>
                          {step.stepNumber}
                        </span>
                        <span className="font-display text-base font-bold text-white">
                          {step.title}
                        </span>
                      </div>
                      <span className="font-mono text-[10px] text-zinc-400 border border-white/10 px-2 py-0.5 rounded">
                        {step.latency}
                      </span>
                    </div>
                    <p className="mt-2 text-xs leading-relaxed text-zinc-400">
                      {step.description}
                    </p>
                  </motion.button>
                );
              })}
            </div>

            {/* Step Inspector Panel */}
            <motion.div variants={fadeUpItem} className="lg:col-span-6">
              <div className="rounded-2xl border border-white/10 bg-zinc-950 p-6 font-mono text-xs shadow-2xl">
                <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-5 text-zinc-400">
                  <span className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-sky-400 animate-ping" />
                    STAGE {current.stepNumber} INSPECTOR
                  </span>
                  <span className="text-emerald-400 font-semibold">{current.badge}</span>
                </div>

                <div className="space-y-4 text-xs">
                  <div>
                    <div className="text-[10px] uppercase text-zinc-500 font-semibold mb-1">Input Payload</div>
                    <div className="rounded-lg border border-white/10 bg-black/60 p-3 text-zinc-300 overflow-x-auto">
                      <code>{current.input}</code>
                    </div>
                  </div>

                  <div>
                    <div className="text-[10px] uppercase text-zinc-500 font-semibold mb-1">Compiled Output</div>
                    <div className="rounded-lg border border-emerald-500/20 bg-emerald-950/20 p-3 text-emerald-300 overflow-x-auto">
                      <code>{current.output}</code>
                    </div>
                  </div>

                  <div className="pt-2 flex items-center justify-between border-t border-white/[0.08] text-[11px] text-zinc-400">
                    <span>Target Latency: <strong className="text-white">{current.latency}</strong></span>
                    <span>State Bleed: <strong className="text-emerald-400">0% (Stateless)</strong></span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
