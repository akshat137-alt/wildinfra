import Link from "next/link";

const tiers = [
  {
    name: "Hobby",
    price: "$0",
    period: "forever",
    description: "For individual builders and hackathon prototypes.",
    features: [
      "10,000 agent sessions / mo",
      "Sub-5ms Rust parser runtime",
      "Shared datacenter proxy pool",
      "Standard gRPC & REST API",
      "Community Discord support",
    ],
    cta: "Start Free",
    href: "/contact",
    featured: false,
  },
  {
    name: "Developer",
    price: "$49",
    period: "per month",
    description: "For production agent startups and scaling workflows.",
    features: [
      "250,000 agent sessions / mo",
      "Sub-5ms Rust parser runtime",
      "Global rotating residential proxies",
      "Automated CAPTCHA & anti-bot bypass",
      "Self-healing semantic action graphs",
      "Priority email & Slack support",
    ],
    cta: "Get API Key",
    href: "/contact",
    featured: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    period: "volume SLA",
    description: "For high-scale enterprises running millions of daily sessions.",
    features: [
      "Unlimited dedicated sessions",
      "Dedicated single-tenant server clusters",
      "Custom VPC peering & on-prem deployment",
      "SOC2 Type II & HIPAA compliance",
      "Custom residential proxy pool integration",
      "Dedicated account manager & 99.99% SLA",
    ],
    cta: "Contact Sales",
    href: "/contact",
    featured: false,
  },
];

export function Pricing() {
  return (
    <section id="pricing" className="border-b border-white/[0.08] bg-[#09090b] py-20 sm:py-28">
      <div className="mx-auto w-full max-w-6xl px-5 sm:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <span className="font-mono text-xs font-semibold text-zinc-400 uppercase tracking-wider">
            Pricing
          </span>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Simple, predictable pricing.
          </h2>
          <p className="mt-4 text-base leading-relaxed text-zinc-400">
            Start for free. Scale to millions of sessions as your agent workload grows.
          </p>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-6 lg:grid-cols-3">
          {tiers.map((tier) => (
            <div
              key={tier.name}
              className={`dev-card flex flex-col justify-between rounded-xl p-7 ${
                tier.featured ? "border-white/40 bg-[#16161a] shadow-xl" : ""
              }`}
            >
              <div>
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-bold text-white">{tier.name}</h3>
                  {tier.featured && (
                    <span className="rounded bg-white/10 px-2 py-0.5 font-mono text-[10px] font-semibold text-white">
                      POPULAR
                    </span>
                  )}
                </div>

                <div className="mt-4 flex items-baseline gap-1">
                  <span className="font-mono text-3xl font-bold text-white sm:text-4xl">{tier.price}</span>
                  <span className="font-mono text-xs text-zinc-500">/{tier.period}</span>
                </div>

                <p className="mt-3 text-xs leading-relaxed text-zinc-400">{tier.description}</p>

                <div className="mt-6 border-t border-white/[0.08] pt-6">
                  <div className="text-[11px] font-mono text-zinc-500 uppercase tracking-wider mb-3">
                    Included Features
                  </div>
                  <ul className="space-y-2.5 font-mono text-xs text-zinc-300">
                    {tier.features.map((feat) => (
                      <li key={feat} className="flex items-center gap-2">
                        <span className="text-emerald-400">✓</span>
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="mt-8">
                <Link
                  href={tier.href}
                  className={`flex h-10 w-full items-center justify-center rounded-md text-xs font-semibold transition-colors ${
                    tier.featured
                      ? "bg-white text-black hover:bg-zinc-200"
                      : "border border-white/10 bg-zinc-900 text-white hover:border-white/20 hover:bg-zinc-800"
                  }`}
                >
                  {tier.cta}
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
