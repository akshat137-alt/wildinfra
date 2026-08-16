"use client";

import { useState } from "react";

type Stage = {
  id: string;
  name: string;
  sub: string;
  details: string;
  code: string;
  metric: string;
};

const stages: Stage[] = [
  {
    id: "ingress",
    name: "01. Ingress & Filter",
    sub: "Network Frame Interception",
    details:
      "Captures chunked HTTP/2 and WebSocket byte streams directly in memory. Strips out image assets, WebGL canvas, video codecs, and CSS font downloads before any processing occurs.",
    code: `// Wire filter: 0 byte wasted on media
ingress.stream({
  ignoreMime: ["image/*", "font/*", "video/*"],
  bufferType: "shared_mem"
});`,
    metric: "0.8ms wire processing",
  },
  {
    id: "parser",
    name: "02. Rust Semantic AST",
    sub: "Zero-Layout DOM Compilation",
    details:
      "A high-throughput native Rust parser transforms HTML and dynamic client-side JS DOMs into an Abstract Syntax Tree (AST) without triggering layout reflows or GPU paint steps.",
    code: `// Native Rust AST Tokenization
let ast = SemanticTokenizer::parse_stream(buffer)?;
let affordances = ast.extract_action_nodes();`,
    metric: "1.4ms compile time",
  },
  {
    id: "compiler",
    name: "03. Action-Graph Compiler",
    sub: "Intent & State Normalization",
    details:
      "Normalizes buttons, inputs, dropdowns, and data matrices into a strict typed JSON schema with unique action handles and confidence scores.",
    code: `{
  "action": "CLICK",
  "target": "SubmitOrderButton",
  "selector_hash": "0x4a91b",
  "confidence": 0.998
}`,
    metric: "1.2ms graph synthesis",
  },
  {
    id: "dispatch",
    name: "04. Stateless Agent IPC",
    sub: "gRPC & REST Session Delivery",
    details:
      "Delivers the Action Graph directly to your agent reasoning model via high-speed gRPC/IPC streams with cryptographic memory isolation and automatic proxy rotation.",
    code: `// Stateless agent dispatch
const result = await session.dispatchIntent({
  intent: "CLICK",
  nodeId: "btn_submit"
});`,
    metric: "0.8ms roundtrip IPC",
  },
];

export function ArchitectureDiagram() {
  const [selected, setSelected] = useState<number>(0);
  const current = stages[selected];

  return (
    <section id="architecture" className="border-b border-white/[0.08] bg-[#09090b] py-20 sm:py-28">
      <div className="mx-auto w-full max-w-6xl px-5 sm:px-8">
        <div className="max-w-2xl">
          <span className="font-mono text-xs font-semibold text-zinc-400 uppercase tracking-wider">
            Architecture
          </span>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-white sm:text-4xl">
            How WildInfra executes in 4.2 milliseconds.
          </h2>
          <p className="mt-4 text-base leading-relaxed text-zinc-400">
            By separating semantic content parsing from human visual rendering, we eliminate 98% of browser runtime overhead.
          </p>
        </div>

        {/* 4-Step Technical Architecture Grid */}
        <div className="mt-12 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {stages.map((stage, idx) => {
            const isSelected = selected === idx;
            return (
              <button
                key={stage.id}
                type="button"
                onClick={() => setSelected(idx)}
                className={`rounded-xl border p-5 text-left transition-all ${
                  isSelected
                    ? "border-white/40 bg-zinc-800/80 shadow-md"
                    : "border-white/[0.08] bg-[#111114] hover:border-white/20 hover:bg-zinc-900/60"
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs font-bold text-white">{stage.name}</span>
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                </div>
                <div className="mt-2 text-xs font-medium text-zinc-400">{stage.sub}</div>
                <div className="mt-4 font-mono text-[11px] text-zinc-500">{stage.metric}</div>
              </button>
            );
          })}
        </div>

        {/* Deep Dive Panel */}
        <div className="mt-6 overflow-hidden rounded-xl border border-white/10 bg-[#111114]">
          <div className="grid grid-cols-1 divide-y lg:grid-cols-12 lg:divide-y-0 lg:divide-x divide-white/[0.08]">
            {/* Left: Details */}
            <div className="p-6 sm:p-8 lg:col-span-6">
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs font-bold text-emerald-400">{current.name}</span>
                <span className="text-zinc-600">·</span>
                <span className="text-xs text-zinc-400">{current.sub}</span>
              </div>
              <p className="mt-4 text-sm leading-relaxed text-zinc-300">
                {current.details}
              </p>
              <div className="mt-6 flex items-center gap-4 font-mono text-xs text-zinc-400 border-t border-white/[0.08] pt-4">
                <span>Latency Contribution: <strong className="text-white">{current.metric}</strong></span>
              </div>
            </div>

            {/* Right: Code Sample */}
            <div className="p-6 sm:p-8 lg:col-span-6 bg-black/40 font-mono text-xs">
              <div className="text-zinc-500 mb-3 uppercase text-[10px] tracking-wider">
                Internal Rust Engine Implementation
              </div>
              <pre className="text-zinc-300 leading-relaxed overflow-x-auto">
                <code>{current.code}</code>
              </pre>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
