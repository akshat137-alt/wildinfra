"use client";

import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { fadeUpItem, staggerContainer, viewportOnce } from "@/lib/motion";

const BoundariesScene = dynamic(
  () => import("@/components/three/BoundariesScene").then((mod) => mod.BoundariesScene),
  { ssr: false }
);

const whatWeAreNot = [
  "Not a visual browser for human eyes.",
  "Not a permanent dependency on Chromium.",
  "Not an AI reasoning model or autonomous brain.",
  "Not a general-purpose web scraper.",
] as const;

const whatWeAre = [
  "A semantic web translation engine.",
  "A multi-agent session runtime with self-correcting navigation.",
  "A unified agent-web protocol.",
  "Horizontal infrastructure scaling to 500B concurrent agents.",
] as const;

export function Boundaries() {
  return (
    <section
      id="boundaries"
      aria-labelledby="boundaries-heading"
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
              Scope &amp; Focus Boundaries
            </span>
            <h2
              id="boundaries-heading"
              className="font-display mt-4 text-3xl font-bold tracking-[-0.03em] text-white sm:text-4xl lg:text-5xl"
            >
              Intense product focus.
            </h2>
          </motion.div>

          <div className="mt-12">
            <BoundariesScene />
          </div>

          <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2">
            {/* What We Are Not */}
            <motion.div
              variants={fadeUpItem}
              className="rounded-2xl border border-red-500/20 bg-gradient-to-b from-red-950/20 to-black p-8 backdrop-blur-xl"
            >
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-red-500" />
                <h3 className="font-mono text-xs font-bold tracking-widest text-red-400 uppercase">
                  What We Are Not
                </h3>
              </div>
              <ul className="mt-6 space-y-4">
                {whatWeAreNot.map((item) => (
                  <li key={item} className="flex gap-3 text-sm leading-6 text-zinc-400">
                    <span className="mt-2 h-px w-3 shrink-0 bg-red-500/60" />
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* What We Are */}
            <motion.div
              variants={fadeUpItem}
              className="rounded-2xl border border-sky-500/30 bg-gradient-to-b from-sky-950/30 to-black p-8 backdrop-blur-xl shadow-[0_0_35px_rgba(56,189,248,0.1)]"
            >
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-sky-400 animate-pulse" />
                <h3 className="font-mono text-xs font-bold tracking-widest text-sky-400 uppercase">
                  What We Are
                </h3>
              </div>
              <ul className="mt-6 space-y-4">
                {whatWeAre.map((item) => (
                  <li key={item} className="flex gap-3 text-sm font-medium leading-6 text-white">
                    <span className="mt-2 h-px w-3 shrink-0 bg-sky-400" />
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

