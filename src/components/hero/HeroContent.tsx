"use client";

import { motion } from "framer-motion";
import { HeroActions } from "./HeroActions";
import { fadeUpItem, staggerContainer } from "@/lib/motion";

export function HeroContent() {
  return (
    <motion.div
      className="mx-auto max-w-3xl text-center"
      initial="hidden"
      animate="visible"
      variants={staggerContainer}
    >
      <motion.p
        variants={fadeUpItem}
        className="font-display text-lg font-semibold tracking-[-0.03em] text-foreground sm:text-xl"
      >
        WildInfra
      </motion.p>

      <motion.h1
        variants={fadeUpItem}
        className="font-display mt-6 text-4xl font-semibold tracking-[-0.04em] text-foreground sm:text-5xl sm:leading-[1.08] lg:text-6xl lg:leading-[1.05]"
      >
        The Execution Layer for Planetary-Scale AI.
      </motion.h1>

      <motion.p
        variants={fadeUpItem}
        className="mx-auto mt-6 max-w-xl text-base leading-7 text-muted sm:text-lg sm:leading-8"
      >
        A programmable, semantic browsing runtime built exclusively for AI
        agents. We strip away the human perception layer to deliver structured,
        intent-aware action graphs.
      </motion.p>

      <motion.div
        variants={fadeUpItem}
        className="mt-10 flex justify-center"
      >
        <HeroActions />
      </motion.div>

      <motion.p
        variants={fadeUpItem}
        className="mt-8 font-mono text-xs tracking-wide text-muted-foreground"
      >
        Built for 500B concurrent agent scale.
      </motion.p>
    </motion.div>
  );
}
