export function ProblemSection() {
  return (
    <section id="problem" className="border-b border-white/[0.08] bg-[#0c0c0f] py-20 sm:py-28">
      <div className="mx-auto w-full max-w-6xl px-5 sm:px-8">
        <div className="max-w-2xl">
          <span className="font-mono text-xs font-semibold text-zinc-400 uppercase tracking-wider">
            The Problem
          </span>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Why Headless Chrome fails for AI agents.
          </h2>
          <p className="mt-4 text-base leading-relaxed text-zinc-400">
            Web browsers were built for human retinas — not autonomous LLM reasoning loops. Running Chromium for AI agents introduces massive compute waste.
          </p>
        </div>

        {/* 3 Core Failure Points */}
        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
          <div className="dev-card rounded-xl p-6">
            <div className="flex h-8 w-8 items-center justify-center rounded bg-red-500/10 font-mono text-xs font-bold text-red-400">
              01
            </div>
            <h3 className="mt-4 text-base font-semibold text-white">
              Layout &amp; Paint Overhead
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-zinc-400">
              Chromium calculates CSS font metrics, decodes images, and rasterizes GPU layers that AI agents never look at, burning 90% of CPU cycles.
            </p>
          </div>

          <div className="dev-card rounded-xl p-6">
            <div className="flex h-8 w-8 items-center justify-center rounded bg-red-500/10 font-mono text-xs font-bold text-red-400">
              02
            </div>
            <h3 className="mt-4 text-base font-semibold text-white">
              Memory Spikes &amp; Leaks
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-zinc-400">
              Each Chromium tab consumes 300MB to 500MB of RAM. A server with 32GB RAM crashes after ~70 concurrent agent sessions.
            </p>
          </div>

          <div className="dev-card rounded-xl p-6">
            <div className="flex h-8 w-8 items-center justify-center rounded bg-red-500/10 font-mono text-xs font-bold text-red-400">
              03
            </div>
            <h3 className="mt-4 text-base font-semibold text-white">
              Brittle CSS / XPath Breakage
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-zinc-400">
              Modern frontend A/B testing and hashed Tailwind class names break imperative selectors weekly, requiring constant maintenance.
            </p>
          </div>
        </div>

        {/* Side-by-Side Comparison Card */}
        <div className="mt-12 overflow-hidden rounded-xl border border-white/10 bg-[#111114]">
          <div className="grid grid-cols-1 divide-y md:grid-cols-2 md:divide-y-0 md:divide-x divide-white/[0.08]">
            {/* Legacy Approach */}
            <div className="p-6 sm:p-8">
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-red-400" />
                <span className="font-mono text-xs font-semibold uppercase tracking-wider text-red-400">
                  Legacy: Headless Chrome / Playwright
                </span>
              </div>
              <ul className="mt-6 space-y-3 font-mono text-xs text-zinc-400">
                <li className="flex items-center justify-between border-b border-white/[0.04] pb-2">
                  <span>RAM per session</span>
                  <span className="text-red-400 font-semibold">350 MB - 500 MB</span>
                </li>
                <li className="flex items-center justify-between border-b border-white/[0.04] pb-2">
                  <span>Page Start Latency</span>
                  <span className="text-red-400 font-semibold">1,800ms - 2,500ms</span>
                </li>
                <li className="flex items-center justify-between border-b border-white/[0.04] pb-2">
                  <span>Concurrency (32GB RAM)</span>
                  <span className="text-red-400 font-semibold">~65 parallel agents</span>
                </li>
                <li className="flex items-center justify-between">
                  <span>Selector Reliability</span>
                  <span className="text-red-400 font-semibold">Fails on DOM changes</span>
                </li>
              </ul>
            </div>

            {/* WildInfra Approach */}
            <div className="p-6 sm:p-8 bg-emerald-500/[0.02]">
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-emerald-400" />
                <span className="font-mono text-xs font-semibold uppercase tracking-wider text-emerald-400">
                  WildInfra: Native Rust Semantic Engine
                </span>
              </div>
              <ul className="mt-6 space-y-3 font-mono text-xs text-zinc-300">
                <li className="flex items-center justify-between border-b border-white/[0.04] pb-2">
                  <span>RAM per session</span>
                  <span className="text-emerald-400 font-bold">&lt; 1.8 MB (99.5% saved)</span>
                </li>
                <li className="flex items-center justify-between border-b border-white/[0.04] pb-2">
                  <span>Page Start Latency</span>
                  <span className="text-emerald-400 font-bold">4.2ms (400x faster)</span>
                </li>
                <li className="flex items-center justify-between border-b border-white/[0.04] pb-2">
                  <span>Concurrency (32GB RAM)</span>
                  <span className="text-emerald-400 font-bold">16,000+ parallel agents</span>
                </li>
                <li className="flex items-center justify-between">
                  <span>Selector Reliability</span>
                  <span className="text-emerald-400 font-bold">Self-healing intent graphs</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
