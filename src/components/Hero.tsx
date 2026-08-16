"use client";

import Link from "next/link";
import { useState } from "react";

type Language = "typescript" | "python" | "curl";

const snippets: Record<Language, { filename: string; code: string }> = {
  typescript: {
    filename: "agent.ts",
    code: `import { WildInfra } from "@wildinfra/sdk";

const client = new WildInfra({ apiKey: process.env.WILDINFRA_API_KEY });

// Spawn an ephemeral, renderless session in 4.2ms (<2MB RAM)
const session = await client.spawnSession("https://example.com/checkout");

// Execute semantic action without fragile CSS/XPath selectors
const result = await session.executeIntent({
  intent: "SUBMIT_PAYMENT",
  fields: { name: "Alice Smith", postal: "94103" },
  selfHealing: true
});

console.log(result.status); // "SUCCESS" (executed in 12ms)`,
  },
  python: {
    filename: "agent.py",
    code: `from wildinfra import WildInfra

client = WildInfra()

# Direct semantic compilation in Rust (no Blink/Chromium overhead)
session = client.spawn_session("https://example.com/checkout")

result = session.execute_intent(
    intent="SUBMIT_PAYMENT",
    fields={"name": "Alice Smith", "postal": "94103"},
    self_healing=True
)

print(f"Status: {result.status} | Latency: {result.latency_ms}ms")`,
  },
  curl: {
    filename: "request.sh",
    code: `curl -X POST https://api.wildinfra.dev/v1/sessions/dispatch \\
  -H "Authorization: Bearer $WILDINFRA_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "url": "https://example.com/checkout",
    "intent": "SUBMIT_PAYMENT",
    "fields": { "name": "Alice Smith", "postal": "94103" },
    "renderless": true
  }'`,
  },
};

export function Hero() {
  const [lang, setLang] = useState<Language>("typescript");
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText("npm i @wildinfra/sdk");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="relative border-b border-white/[0.08] bg-[#09090b] pt-28 pb-20 sm:pt-36 sm:pb-28">
      {/* Subtle Dot Grid */}
      <div className="dot-grid pointer-events-none absolute inset-0 opacity-40" />

      <div className="relative mx-auto w-full max-w-6xl px-5 sm:px-8">
        <div className="mx-auto max-w-3xl text-center">
          {/* Top Badge */}
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 font-mono text-xs text-zinc-300">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
            <span>Public Beta v1.0 · Rust Semantic Runtime</span>
          </div>

          {/* Headline */}
          <h1 className="mt-6 text-4xl font-bold tracking-tight text-white sm:text-6xl sm:leading-[1.1]">
            The headless browser built for AI agents.
          </h1>

          {/* Subtitle */}
          <p className="mt-5 text-base leading-relaxed text-zinc-400 sm:text-lg">
            Human browsers waste 300MB+ RAM calculating CSS flexbox, decoding images, and painting pixels. WildInfra strips the overhead and compiles live web pages directly into structured, intent-aware action graphs in Rust in &lt;5ms.
          </p>

          {/* CTAs */}
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              href="/contact"
              className="inline-flex h-10 items-center justify-center rounded-md bg-white px-5 text-sm font-semibold text-black transition-colors hover:bg-zinc-200"
            >
              Start for Free
            </Link>

            <button
              type="button"
              onClick={handleCopy}
              className="inline-flex h-10 items-center gap-3 rounded-md border border-white/10 bg-zinc-900 px-4 font-mono text-xs text-zinc-300 transition-colors hover:border-white/20 hover:text-white"
            >
              <span className="text-zinc-500">$</span>
              <span>npm i @wildinfra/sdk</span>
              <span className="rounded bg-white/10 px-1.5 py-0.5 text-[10px] text-zinc-400">
                {copied ? "Copied" : "Copy"}
              </span>
            </button>
          </div>

          {/* Trust / Compatibility Bar */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-6 font-mono text-xs text-zinc-500">
            <span>✓ LangChain</span>
            <span>✓ LlamaIndex</span>
            <span>✓ AutoGPT</span>
            <span>✓ OpenAI Agents</span>
            <span>✓ Custom REST</span>
          </div>
        </div>

        {/* Code Terminal */}
        <div className="mt-14 overflow-hidden rounded-xl border border-white/10 bg-[#0d0d10] shadow-2xl">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-white/[0.08] bg-[#111114] px-4 py-2.5">
            <div className="flex items-center gap-2">
              <div className="flex gap-1.5">
                <span className="h-3 w-3 rounded-full bg-zinc-700" />
                <span className="h-3 w-3 rounded-full bg-zinc-700" />
                <span className="h-3 w-3 rounded-full bg-zinc-700" />
              </div>
              <span className="ml-2 font-mono text-xs text-zinc-500">{snippets[lang].filename}</span>
            </div>

            {/* Language Switcher */}
            <div className="flex items-center gap-1">
              {(["typescript", "python", "curl"] as const).map((key) => (
                <button
                  key={key}
                  type="button"
                  onClick={() => setLang(key)}
                  className={`rounded px-2.5 py-1 font-mono text-xs transition-colors ${
                    lang === key
                      ? "bg-white/15 text-white font-medium"
                      : "text-zinc-400 hover:text-zinc-200"
                  }`}
                >
                  {key === "typescript" ? "TypeScript" : key === "python" ? "Python" : "cURL"}
                </button>
              ))}
            </div>
          </div>

          {/* Split Code and Compiled Action Graph */}
          <div className="grid grid-cols-1 lg:grid-cols-12 divide-y lg:divide-y-0 lg:divide-x divide-white/[0.08]">
            <div className="p-5 lg:col-span-7 font-mono text-xs leading-relaxed text-zinc-300 overflow-x-auto">
              <pre>
                <code>{snippets[lang].code}</code>
              </pre>
            </div>

            <div className="p-5 lg:col-span-5 bg-black/40 font-mono text-xs">
              <div className="flex items-center justify-between border-b border-white/[0.08] pb-2 mb-3 text-zinc-500 text-[11px]">
                <span className="text-emerald-400 font-semibold">OUTPUT: ACTION GRAPH</span>
                <span>Latency: 4.2ms</span>
              </div>
              <pre className="text-zinc-300 text-[11px] leading-relaxed overflow-x-auto">
{`{
  "status": "READY",
  "memory_used": "1.8 MB",
  "pixels_rendered": 0,
  "nodes": [
    {
      "id": "btn_submit_order",
      "action": "CLICK",
      "affordance": "SubmitOrderButton",
      "confidence": 0.999
    }
  ]
}`}
              </pre>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}




