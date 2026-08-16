"use client";

import { motion } from "framer-motion";
import { fadeUpItem, staggerContainer, viewportOnce } from "@/lib/motion";

const coreFunctions = [
  {
    id: "translate",
    index: "01",
    title: "Translate",
    description:
      "Converts raw web content—HTML and JS-rendered DOM—into structured, intent-aware action graphs in real time. Agents receive semantic intent, not raw markup.",
  },
  {
    id: "expose",
    index: "02",
    title: "Expose",
    description:
      "A stable, versioned agent-web protocol that abstracts over live web inconsistencies. Agents declare intent rather than issuing imperative browser commands.",
  },
  {
    id: "execute",
    index: "03",
    title: "Execute",
    description:
      "Stateless, session-scoped execution at horizontal scale. Run thousands of parallel agent sessions without state bleed or redundant rendering.",
  },
] as const;

export function CoreFunctions() {
  return (
    <section
      id="features"
      aria-labelledby="features-heading"
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
              Features
            </p>
            <h2
              id="features-heading"
              className="font-display mt-3 text-3xl font-semibold tracking-[-0.03em] text-foreground sm:text-4xl"
            >
              Three irreducible functions.
            </h2>
            <p className="mt-4 text-base leading-7 text-muted">
              Translate. Expose. Execute. Everything else is implementation
              detail.
            </p>
          </motion.div>

          <div className="mt-14 space-y-0 divide-y divide-border border-y border-border">
            {coreFunctions.map((fn) => (
              <motion.div
                key={fn.id}
                variants={fadeUpItem}
                className="grid grid-cols-1 gap-4 py-8 sm:grid-cols-[88px_1fr] sm:gap-10 sm:py-10"
              >
                <span className="font-mono text-xs text-muted-foreground">
                  {fn.index}
                </span>
                <div>
                  <h3 className="font-display text-xl font-semibold tracking-tight text-foreground">
                    {fn.title}
                  </h3>
                  <p className="mt-3 max-w-2xl text-sm leading-7 text-muted sm:text-[15px]">
                    {fn.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
