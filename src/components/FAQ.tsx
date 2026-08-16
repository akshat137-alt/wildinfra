"use client";

import { useState } from "react";

const faqs = [
  {
    q: "How does WildInfra execute dynamic SPAs without a full Chromium browser?",
    a: "WildInfra runs a headless V8 JavaScript engine coupled with a lightweight Rust DOM implementation. It executes client-side scripts, hydrates dynamic React/Vue components, and executes network requests without invoking the Blink visual layout tree, Skia 2D rasterizer, or GPU compositing stages.",
  },
  {
    q: "How does WildInfra compare to Playwright and Puppeteer?",
    a: "Playwright and Puppeteer launch full desktop Chromium instances that consume 350MB+ RAM per tab, render every font and CSS pixel, and rely on brittle XPath/CSS selectors. WildInfra consumes <1.8MB per session, cold-starts in 4.2ms, and returns structured Action Graphs with semantic intent matching.",
  },
  {
    q: "How are anti-bot protections (Cloudflare, DataDome, PerimeterX) handled?",
    a: "WildInfra includes an enterprise proxy layer that rotates residential IPs per session, emits standard TLS fingerprints (JA3/JA4), and automates human-like TCP windowing to avoid anti-bot flags.",
  },
  {
    q: "Can I deploy WildInfra inside our own VPC or Kubernetes cluster?",
    a: "Yes. Enterprise customers can deploy the WildInfra Rust binary directly as a containerized sidecar or Helm chart inside AWS, GCP, Azure, or bare-metal infrastructure with zero external telemetry.",
  },
  {
    q: "What SDKs and agent frameworks are supported?",
    a: "We provide first-party SDKs for Node.js/TypeScript, Python, and Go, plus standard gRPC and REST endpoints compatible with LangChain, LlamaIndex, AutoGPT, and OpenAI Swarm.",
  },
];

export function FAQ() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  return (
    <section id="faq" className="border-b border-white/[0.08] bg-[#0c0c0f] py-20 sm:py-28">
      <div className="mx-auto w-full max-w-4xl px-5 sm:px-8">
        <div className="text-center">
          <span className="font-mono text-xs font-semibold text-zinc-400 uppercase tracking-wider">
            FAQ
          </span>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Frequently asked questions.
          </h2>
        </div>

        <div className="mt-12 divide-y divide-white/[0.08] border-y border-white/[0.08]">
          {faqs.map((faq, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div key={idx} className="py-5">
                <button
                  type="button"
                  onClick={() => setOpenIdx(isOpen ? null : idx)}
                  className="flex w-full items-center justify-between text-left font-medium text-white transition-colors hover:text-zinc-200"
                >
                  <span className="text-sm font-semibold sm:text-base">{faq.q}</span>
                  <span className="ml-4 font-mono text-xs text-zinc-400">
                    {isOpen ? "—" : "+"}
                  </span>
                </button>
                {isOpen && (
                  <p className="mt-3 text-sm leading-relaxed text-zinc-400 pr-6">
                    {faq.a}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
