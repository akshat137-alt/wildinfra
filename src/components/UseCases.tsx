export function UseCases() {
  const cases = [
    {
      id: "search",
      category: "Data Extraction",
      title: "AI Web Search & Matrix Extraction",
      description:
        "Extract clean, structured product catalogs, financial reports, and tables from dynamic JS SPAs directly into typed JSON schemas without parsing raw HTML.",
      metric: "6.2ms avg extraction",
    },
    {
      id: "checkout",
      category: "Autonomous Actions",
      title: "Headless E-Commerce Checkout",
      description:
        "Execute multi-step shopping cart actions, variant selections, and payment form submissions with self-healing semantic action targets.",
      metric: "99.8% checkout success",
    },
    {
      id: "rpa",
      category: "Enterprise Automation",
      title: "Legacy Internal Portal Automation",
      description:
        "Automate banking, ERP, and CRM workflows that lack APIs. Spin up ephemeral sandboxed sessions with automatic proxy rotation and session teardown.",
      metric: "1.8MB RAM per session",
    },
    {
      id: "evals",
      category: "Agent Benchmarking",
      title: "High-Scale Agent Evaluations",
      description:
        "Run 50,000 parallel evaluation runs against live web scenarios to benchmark your LLM agent's reasoning without crashing server memory.",
      metric: "16,000 parallel runs / node",
    },
  ];

  return (
    <section id="use-cases" className="border-b border-white/[0.08] bg-[#0c0c0f] py-20 sm:py-28">
      <div className="mx-auto w-full max-w-6xl px-5 sm:px-8">
        <div className="max-w-2xl">
          <span className="font-mono text-xs font-semibold text-zinc-400 uppercase tracking-wider">
            Use Cases
          </span>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Built for production AI agent workloads.
          </h2>
          <p className="mt-4 text-base leading-relaxed text-zinc-400">
            From search engines to autonomous transaction bots, WildInfra provides the reliable headless substrate.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2">
          {cases.map((c) => (
            <div key={c.id} className="dev-card flex flex-col justify-between rounded-xl p-6 sm:p-7">
              <div>
                <span className="font-mono text-[11px] text-zinc-500 uppercase tracking-wider">
                  {c.category}
                </span>
                <h3 className="mt-2 text-lg font-bold text-white">{c.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-zinc-400">{c.description}</p>
              </div>

              <div className="mt-6 flex items-center justify-between border-t border-white/[0.06] pt-4 font-mono text-xs">
                <span className="text-zinc-500">Benchmark SLA</span>
                <span className="font-semibold text-emerald-400">{c.metric}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
