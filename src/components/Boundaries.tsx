"use client";

import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { fadeUpItem, staggerContainer, viewportOnce } from "@/lib/motion";

const BoundariesScene = dynamic(
  () => import("@/components/three/BoundariesScene").then((mod) => mod.BoundariesScene),
  { ssr: false }
);

const whatWeAreNot = [
  "Not a visual browser for human eyes or interactive consumers.",
  "Not a permanent wrapper or dependency on bloated Chromium engines.",
  "Not an LLM reasoning brain or agent planner.",
  "Not an unmanaged, brittle web scraper.",
] as const;

const whatWeAre = [
  "A dedicated semantic web translation & execution engine.",
  "A multi-agent runtime with self-correcting intent navigation.",
  "A unified, versioned agent-web protocol (WildProtocol v1).",
  "Stateless horizontal infrastructure scaling to 500B concurrent agents.",
] as const;

export function Boundaries() {
  return (
    <section
      id="boundaries"
      aria-labelledby="boundaries-heading"
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
              Scope &amp; Product Boundaries
            </span>
            <h2
              id="boundaries-heading"
              className="font-display mt-5 text-3xl font-extrabold tracking-[-0.03em] text-white sm:text-5xl lg:text-6xl"
            >
              Intense, uncompromising focus.
            </h2>
            <p className="mt-5 text-base leading-8 text-slate-300 sm:text-lg">
              We do not build for human eyes. We build the substrate for machine intelligence to navigate the web at planetary density.
            </p>
          </motion.div>

          <div className="mt-14">
            <BoundariesScene />
          </div>

          <div className="mt-14 grid grid-cols-1 gap-8 md:grid-cols-2">
            {/* What We Are Not */}
            <motion.div
              variants={fadeUpItem}
              className="rounded-3xl border border-red-500/30 bg-gradient-to-b from-red-950/20 via-[#0a0505] to-[#020408] p-8 backdrop-blur-2xl shadow-[0_0_35px_rgba(239,68,68,0.1)]"
            >
              <div className="flex items-center gap-2.5">
                <span className="h-2.5 w-2.5 rounded-full bg-red-500 shadow-[0_0_10px_rgba(239,68,68,0.8)]" />
                <h3 className="font-mono text-xs font-bold tracking-widest text-red-400 uppercase">
                  What We Are Not
                </h3>
              </div>
              <ul className="mt-8 space-y-4">
                {whatWeAreNot.map((item) => (
                  <li key={item} className="flex gap-3 text-sm leading-7 text-slate-300">
                    <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-red-500/60" />
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* What We Are */}
            <motion.div
              variants={fadeUpItem}
              className="rounded-3xl border border-sky-400/40 bg-gradient-to-b from-sky-950/25 via-[#050e1f] to-[#020408] p-8 backdrop-blur-2xl shadow-[0_0_45px_rgba(56,189,248,0.15)]"
            >
              <div className="flex items-center gap-2.5">
                <span className="h-2.5 w-2.5 rounded-full bg-sky-400 shadow-[0_0_12px_rgba(56,189,248,0.9)] animate-pulse" />
                <h3 className="font-mono text-xs font-bold tracking-widest text-sky-400 uppercase">
                  What We Are
                </h3>
              </div>
              <ul className="mt-8 space-y-4">
                {whatWeAre.map((item) => (
                  <li key={item} className="flex gap-3 text-sm font-medium leading-7 text-white">
                    <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-sky-400" />
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


