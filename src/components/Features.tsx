"use client";

import { motion } from "framer-motion";
import { fadeUpItem, staggerContainer, viewportOnce } from "@/lib/motion";

const capabilities = [
  {
    id: "intent",
    title: "Declarative Intent Protocol",
    description:
      "Agents declare semantic intent (e.g. 'submit_payment', 'extract_product_matrix') instead of fragile DOM coordinates or CSS selectors that break on site updates.",
    code: `// Stable intent execution
await session.act({
  intent: "SELECT_OPTION",
  label: "Express Shipping ($14.99)",
  selfHealing: true
});`,
  },
  {
    id: "sandbox",
    title: "Ephemeral Stateless Sandboxes",
    description:
      "Every agent session is an isolated, sub-millisecond ephemeral sandbox. No cookies bleed, no residual cache, and automatic global residential proxy rotation.",
    code: `// Instant sandbox instantiation in 4ms
const sandbox = await runtime.createSandbox({
  geo: "us-east",
  proxyMode: "rotating_residential",
  stateDuration: "ephemeral"
});`,
  },
  {
    id: "tokenizer",
    title: "Native Rust Tokenizer Engine",
    description:
      "Bypasses Chrome's visual layout tree, Skia rasterizer, and GPU compositing pipeline. Processes the web as pure actionable semantic topology.",
    code: `// Direct AST generation
const ast = await tokenizer.parse(stream, {
  stripMedia: true,
  stripCss: true,
  extractAffordancesOnly: true
});`,
  },
  {
    id: "anti-drift",
    title: "Mutation Drift Resiliency",
    description:
      "Websites constantly change class names and DOM structures. WildInfra's semantic alignment compiler automatically maps changing targets without agent retraining.",
    code: `// Mutation-resistant semantic target matching
const target = graph.resolveAffordance("CheckoutCTA");
console.log(target.confidence); // 0.998 match score`,
  },
];

export function Features() {
  return (
    <section id="features" className="border-t border-white/[0.08] bg-[#040711] py-24 sm:py-32">
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
              Core Capabilities
            </span>
            <h2 className="font-display mt-5 text-3xl font-bold tracking-tight text-white sm:text-5xl">
              Built for production AI agent workloads.
            </h2>
            <p className="mt-4 text-base leading-7 text-zinc-400">
              Everything your autonomous agents need to reliably interact with the live web at planetary density.
            </p>
          </motion.div>

          <div className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-2">
            {capabilities.map((item) => (
              <motion.div
                key={item.id}
                variants={fadeUpItem}
                className="flex flex-col justify-between rounded-2xl border border-white/10 bg-zinc-950/80 p-7 shadow-xl hover:border-white/20 transition-colors"
              >
                <div>
                  <h3 className="font-display text-lg font-bold text-white">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-zinc-400">
                    {item.description}
                  </p>
                </div>

                <div className="mt-6 rounded-xl border border-white/[0.08] bg-black/60 p-4 font-mono text-xs text-zinc-300 overflow-x-auto">
                  <pre>
                    <code>{item.code}</code>
                  </pre>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
