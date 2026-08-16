import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Documentation - WildInfra",
  description: "API reference and quickstart guide for WildInfra agent browsing runtime.",
};

export default function DocumentationPage() {
  return (
    <div className="mx-auto w-full max-w-6xl px-5 pb-24 pt-28 sm:px-8">
      <div className="max-w-3xl">
        <span className="inline-flex items-center gap-2 font-mono text-xs tracking-widest text-sky-400 uppercase">
          <span className="h-1.5 w-1.5 rounded-full bg-sky-400" />
          Developer Quickstart
        </span>
        <h1 className="font-display mt-4 text-4xl font-bold tracking-[-0.03em] text-white sm:text-5xl">
          Product Documentation
        </h1>
        <p className="mt-4 text-lg leading-8 text-zinc-300">
          Connect your AI agents to planetary-scale semantic web runtime in under 5 minutes.
        </p>
      </div>

      {/* Code Example Card */}
      <div className="mt-12 rounded-2xl border border-white/10 bg-zinc-950 p-6 font-mono text-xs shadow-2xl">
        <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-4 text-zinc-400">
          <span>quickstart.ts</span>
          <span className="text-emerald-400">TypeScript SDK v1.0</span>
        </div>
        <pre className="overflow-x-auto text-zinc-300 leading-relaxed">
{`import { WildInfra } from '@wildinfra/sdk';

// Initialize connection to 500B agent node mesh
const client = new WildInfra({ apiKey: process.env.WILDINFRA_KEY });

// Spawn stateless semantic session
const session = await client.createSession({
  targetUrl: 'https://example.com/checkout',
  mode: 'renderless_semantic',
});

// Declare intent instead of imperative browser clicks
const result = await session.executeIntent({
  action: 'EXTRACT_ACTION_GRAPH',
  filter: 'interactive_elements',
});

console.log(result.semanticNodes);`}
        </pre>
      </div>
    </div>
  );
}

