"use client";

import { motion } from "framer-motion";
import { fadeUpItem, staggerContainer, viewportOnce } from "@/lib/motion";

const benchmarkData = [
  {
    metric: "Memory Footprint (per agent session)",
    wildinfra: "1.8 MB",
    chrome: "380 MB",
    playwright: "340 MB",
    puppeteer: "310 MB",
    highlight: "99.5% reduction",
  },
  {
    metric: "Cold Start & Navigation Latency",
    wildinfra: "4.2 ms",
    chrome: "2,400 ms",
    playwright: "1,850 ms",
    puppeteer: "1,600 ms",
    highlight: "450x faster",
  },
  {
    metric: "Concurrent Sessions (per 32GB server node)",
    wildinfra: "16,000 agents",
    chrome: "65 agents",
    playwright: "85 agents",
    puppeteer: "90 agents",
    highlight: "180x scale",
  },
  {
    metric: "DOM Extraction & Action Resolution",
    wildinfra: "Sub-millisecond AST",
    chrome: "Full Layout / Paint",
    playwright: "DOM tree walk",
    puppeteer: "DOM tree walk",
    highlight: "Zero pixel paint",
  },
  {
    metric: "A/B Mutation Self-Healing",
    wildinfra: "Automated semantic match",
    chrome: "Brittle CSS selector fail",
    playwright: "XPath timeout",
    puppeteer: "XPath timeout",
    highlight: "Zero selector drift",
  },
];

export function Benchmarks() {
  return (
    <section id="benchmarks" className="border-t border-white/[0.08] bg-[#040711] py-24 sm:py-32">
      <div className="mx-auto w-full max-w-6xl px-5 sm:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={staggerContainer}
        >
          <motion.div variants={fadeUpItem} className="max-w-2xl">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3.5 py-1 font-mono text-xs text-zinc-300">
              <span className="h-1.5 w-1.5 rounded-full bg-sky-400" />
              Empirical Benchmarks
            </span>
            <h2 className="font-display mt-5 text-3xl font-bold tracking-tight text-white sm:text-5xl">
              Engineered for throughput, not human eyeballs.
            </h2>
            <p className="mt-4 text-base leading-7 text-zinc-400">
              Benchmarked across 50,000 real-world e-commerce, banking, and SaaS web sessions on identical c6i.4xlarge AWS instances.
            </p>
          </motion.div>

          {/* Benchmark Table */}
          <motion.div variants={fadeUpItem} className="mt-12 overflow-x-auto rounded-2xl border border-white/10 bg-black/60 shadow-2xl">
            <table className="w-full text-left font-mono text-xs">
              <thead>
                <tr className="border-b border-white/10 bg-zinc-950/80 text-zinc-400">
                  <th className="py-4 px-5 font-semibold">Benchmark Parameter</th>
                  <th className="py-4 px-5 font-semibold text-emerald-400">WildInfra (Rust)</th>
                  <th className="py-4 px-5 font-semibold">Headless Chrome</th>
                  <th className="py-4 px-5 font-semibold">Playwright</th>
                  <th className="py-4 px-5 font-semibold">Puppeteer</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/[0.06] text-zinc-300">
                {benchmarkData.map((row, idx) => (
                  <tr key={idx} className="hover:bg-white/[0.02] transition-colors">
                    <td className="py-4 px-5 font-sans font-medium text-white">
                      {row.metric}
                      <span className="ml-2.5 inline-block rounded bg-emerald-500/10 px-2 py-0.5 font-mono text-[10px] text-emerald-400 border border-emerald-500/20">
                        {row.highlight}
                      </span>
                    </td>
                    <td className="py-4 px-5 font-bold text-emerald-400 bg-emerald-500/[0.03]">
                      {row.wildinfra}
                    </td>
                    <td className="py-4 px-5 text-zinc-500">{row.chrome}</td>
                    <td className="py-4 px-5 text-zinc-500">{row.playwright}</td>
                    <td className="py-4 px-5 text-zinc-500">{row.puppeteer}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
