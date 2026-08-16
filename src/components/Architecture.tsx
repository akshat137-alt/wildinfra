"use client";

import { motion } from "framer-motion";
import { fadeUpItem, staggerContainer, viewportOnce } from "@/lib/motion";

const actionGraphJson = `{
  "session_id": "wi_7f3c9e2a-4d18-4b91-9c0e",
  "protocol": "wildinfra.v1",
  "extraction_confidence": 0.987,
  "action_graph": {
    "nodes": [
      {
        "id": "n_01",
        "intent": "navigate",
        "target": {
          "role": "link",
          "name": "Shipping details",
          "selector_ref": "sem://nav.shipping"
        }
      },
      {
        "id": "n_02",
        "intent": "fill",
        "target": {
          "role": "textbox",
          "name": "Postal code"
        },
        "value_schema": "postal_code"
      }
    ],
    "edges": [["n_01", "n_02"]]
  }
}`;

type Token =
  | { type: "plain"; value: string }
  | { type: "key"; value: string }
  | { type: "string"; value: string }
  | { type: "number"; value: string }
  | { type: "punct"; value: string };

function tokenizeJson(source: string): Token[] {
  const tokens: Token[] = [];
  const pattern =
    /("(?:\\.|[^"\\])*")\s*(:)?|(-?\d+\.?\d*)|([{}[\],])|(\s+)|(:)/g;
  let match: RegExpExecArray | null;

  while ((match = pattern.exec(source)) !== null) {
    const [, stringLiteral, afterColon, number, punct, whitespace, loneColon] =
      match;

    if (whitespace) {
      tokens.push({ type: "plain", value: whitespace });
      continue;
    }
    if (stringLiteral) {
      tokens.push({
        type: afterColon ? "key" : "string",
        value: stringLiteral,
      });
      if (afterColon) tokens.push({ type: "punct", value: ":" });
      continue;
    }
    if (number) {
      tokens.push({ type: "number", value: number });
      continue;
    }
    if (punct) {
      tokens.push({ type: "punct", value: punct });
      continue;
    }
    if (loneColon) tokens.push({ type: "punct", value: loneColon });
  }

  return tokens;
}

const tokenClassName: Record<Token["type"], string> = {
  plain: "text-zinc-600",
  key: "text-zinc-300",
  string: "text-zinc-400",
  number: "text-zinc-200",
  punct: "text-zinc-600",
};

function ActionGraphCodeBlock() {
  const tokens = tokenizeJson(actionGraphJson);

  return (
    <div className="overflow-hidden rounded-lg border border-border bg-surface">
      <div className="flex items-center justify-between border-b border-border px-4 py-2.5">
        <span className="font-mono text-[11px] text-muted-foreground">
          action_graph.json
        </span>
        <span className="font-mono text-[11px] text-muted-foreground">
          wildinfra.v1
        </span>
      </div>
      <pre className="overflow-x-auto p-4 text-[12px] leading-6 sm:p-5 sm:text-[13px] sm:leading-7">
        <code className="font-mono">
          {tokens.map((token, index) => (
            <span
              key={`${token.type}-${index}`}
              className={tokenClassName[token.type]}
            >
              {token.value}
            </span>
          ))}
        </code>
      </pre>
    </div>
  );
}

const moatPoints = [
  {
    id: "scale",
    title: "Built for 500 Billion Agents",
    description:
      "Our architecture is designed so that scaling to planetary agent density is a hardware procurement problem, not a software redesign problem.",
  },
  {
    id: "hexagonal",
    title: "Event-Driven Microservices",
    description:
      "Built on a Hexagonal Architecture, decoupling the execution engine from the semantic extraction pipeline.",
  },
  {
    id: "renderless",
    title: "Headless & Renderless",
    description:
      "No visual rendering engine. We parse for structure and semantics, not pixels, maximizing compute efficiency.",
  },
] as const;

export function Architecture() {
  return (
    <section
      id="architecture"
      aria-labelledby="architecture-heading"
      className="scroll-mt-20 border-t border-border"
    >
      <div className="mx-auto w-full max-w-5xl px-5 py-20 sm:px-8 sm:py-28">
        <motion.div
          className="grid grid-cols-1 items-start gap-12 lg:grid-cols-2 lg:gap-16"
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={staggerContainer}
        >
          <motion.div variants={fadeUpItem}>
            <p className="font-mono text-xs tracking-[0.16em] text-muted-foreground uppercase">
              Technical Moat
            </p>
            <h2
              id="architecture-heading"
              className="font-display mt-3 text-3xl font-semibold tracking-[-0.03em] text-foreground sm:text-4xl"
            >
              Built for planetary agent density.
            </h2>
            <ul className="mt-10 space-y-8">
              {moatPoints.map((point) => (
                <li key={point.id}>
                  <h3 className="text-sm font-semibold text-foreground sm:text-base">
                    {point.title}
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-muted">
                    {point.description}
                  </p>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div variants={fadeUpItem} className="min-w-0 lg:sticky lg:top-24">
            <ActionGraphCodeBlock />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
