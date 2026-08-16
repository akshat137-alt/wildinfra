"use client";

import { motion } from "framer-motion";
import { fadeUpItem, staggerContainer, viewportOnce } from "@/lib/motion";

const whatWeAreNot = [
  "Not a visual browser for humans.",
  "Not a permanent dependency on Chromium.",
  "Not an AI reasoning model or autonomous brain.",
  "Not a general-purpose web scraper.",
] as const;

const whatWeAre = [
  "A semantic web translation engine.",
  "A multi-agent session runtime with self-correcting navigation.",
  "A unified agent-web protocol.",
] as const;

export function Boundaries() {
  return (
    <section
      id="boundaries"
      aria-labelledby="boundaries-heading"
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
              Scope &amp; Boundaries
            </p>
            <h2
              id="boundaries-heading"
              className="font-display mt-3 text-3xl font-semibold tracking-[-0.03em] text-foreground sm:text-4xl"
            >
              Intense product focus.
            </h2>
          </motion.div>

          <div className="mt-12 grid grid-cols-1 gap-px overflow-hidden rounded-lg border border-border bg-border md:grid-cols-2">
            <motion.div variants={fadeUpItem} className="bg-background p-7 sm:p-9">
              <h3 className="text-xs font-medium tracking-[0.14em] text-muted-foreground uppercase">
                What We Are Not
              </h3>
              <ul className="mt-7 space-y-4">
                {whatWeAreNot.map((item) => (
                  <li
                    key={item}
                    className="flex gap-3 text-sm leading-6 text-muted"
                  >
                    <span className="mt-2 h-px w-3 shrink-0 bg-muted-foreground" />
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div variants={fadeUpItem} className="bg-background p-7 sm:p-9">
              <h3 className="text-xs font-medium tracking-[0.14em] text-foreground uppercase">
                What We Are
              </h3>
              <ul className="mt-7 space-y-4">
                {whatWeAre.map((item) => (
                  <li
                    key={item}
                    className="flex gap-3 text-sm leading-6 text-foreground"
                  >
                    <span className="mt-2 h-px w-3 shrink-0 bg-foreground" />
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
