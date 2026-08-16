"use client";

import { useState } from "react";

type Language = "ts" | "python" | "go" | "curl";

const codeSnippets: Record<Language, { label: string; code: string }> = {
  ts: {
    label: "index.ts",
    code: `import { WildInfra } from "@wildinfra/sdk";

// Connect to the stateless 100K-session runtime
const client = new WildInfra({ apiKey: process.env.WILDINFRA_KEY });

// Execute intent without rasterizing pixels or DOM overhead
const session = await client.spawnSession("https://store.apple.com/buy-mac");
const actionGraph = await session.executeIntent({
  intent: "ADD_TO_BAG",
  variant: "16-inch M3 Max",
});

console.log(\`Parsed in \${actionGraph.latencyMs}ms (\${actionGraph.memoryKb}KB RAM)\`);`,
  },
  python: {
    label: "main.py",
    code: `from wildinfra import WildInfra

# Spawn headless semantic session
client = WildInfra()
session = client.spawn_session("https://store.apple.com/buy-mac")

# Returns semantic action affordances directly in 4.2ms
graph = session.execute_intent(
    intent="ADD_TO_BAG", 
    variant="16-inch M3 Max"
)

print(f"Dispatched: {graph.resolved_nodes} nodes | Latency: {graph.latency_ms}ms")`,
  },
  go: {
    label: "main.go",
    code: `package main

import (
    "context"
    "fmt"
    "github.com/wildinfra/wildinfra-go"
)

func main() {
    client := wildinfra.NewClient()
    session, _ := client.SpawnSession(context.Background(), "https://store.apple.com/buy-mac")
    
    graph, _ := session.ExecuteIntent(wildinfra.IntentParams{
        Intent: "ADD_TO_BAG",
        Variant: "16-inch M3 Max",
    })
    fmt.Printf("Parsed in %vms\\n", graph.LatencyMs)
}`,
  },
  curl: {
    label: "terminal.sh",
    code: `curl -X POST https://api.wildinfra.dev/v1/sessions/dispatch \\
  -H "Authorization: Bearer $WILDINFRA_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "url": "https://store.apple.com/buy-mac",
    "intent": "ADD_TO_BAG",
    "variant": "16-inch M3 Max",
    "renderless": true
  }'`,
  },
};

export function HeroProductPreview() {
  const [lang, setLang] = useState<Language>("ts");
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(codeSnippets[lang].code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative mt-12 w-full overflow-hidden rounded-2xl border border-white/10 bg-[#080c14] shadow-2xl">
      {/* Editor Header Bar */}
      <div className="flex items-center justify-between border-b border-white/[0.08] bg-zinc-950/80 px-4 py-3">
        <div className="flex items-center gap-2">
          <div className="flex gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-zinc-700" />
            <span className="h-2.5 w-2.5 rounded-full bg-zinc-700" />
            <span className="h-2.5 w-2.5 rounded-full bg-zinc-700" />
          </div>
          <span className="ml-3 font-mono text-xs text-zinc-500">{codeSnippets[lang].label}</span>
        </div>

        {/* Language Tabs */}
        <div className="flex items-center gap-1 rounded-lg border border-white/10 bg-black/40 p-1">
          {(["ts", "python", "go", "curl"] as const).map((key) => (
            <button
              key={key}
              type="button"
              onClick={() => setLang(key)}
              className={`rounded px-2.5 py-1 font-mono text-xs transition-colors ${
                lang === key
                  ? "bg-white/15 text-white font-semibold"
                  : "text-zinc-400 hover:text-zinc-200"
              }`}
            >
              {key.toUpperCase()}
            </button>
          ))}
        </div>

        <button
          type="button"
          onClick={handleCopy}
          className="font-mono text-xs text-zinc-400 hover:text-white"
        >
          {copied ? "Copied!" : "Copy Code"}
        </button>
      </div>

      {/* Split Grid: SDK Code & Live Action Graph Output */}
      <div className="grid grid-cols-1 lg:grid-cols-12 divide-y lg:divide-y-0 lg:divide-x divide-white/[0.08]">
        {/* Left: Code Box */}
        <div className="p-5 lg:col-span-7 font-mono text-xs leading-relaxed overflow-x-auto text-zinc-300">
          <pre>
            <code>{codeSnippets[lang].code}</code>
          </pre>
        </div>

        {/* Right: Real-time Action Graph Output */}
        <div className="p-5 lg:col-span-5 bg-black/40 font-mono text-xs">
          <div className="flex items-center justify-between pb-3 mb-3 border-b border-white/[0.06] text-zinc-400">
            <span className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
              COMPILED ACTION GRAPH
            </span>
            <span className="text-emerald-400">4.2ms</span>
          </div>

          <pre className="text-[11px] text-zinc-300 leading-relaxed overflow-x-auto">
{`{
  "status": "READY_FOR_AGENT",
  "runtime": "wildinfra.v1.rust",
  "memory_used": "1.8 MB",
  "pixels_rendered": 0,
  "action_nodes": [
    {
      "id": "btn_add_to_bag",
      "type": "ACTION_CLICK",
      "affordance": "SubmitOrderButton",
      "price": "$3,499.00",
      "confidence": 0.999
    }
  ]
}`}
          </pre>
        </div>
      </div>
    </div>
  );
}
