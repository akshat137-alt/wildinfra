import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Founders - WildInfra",
  description: "Get in touch with the WildInfra engineering and founder team.",
};

export default function ContactPage() {
  return (
    <div className="mx-auto w-full max-w-6xl px-5 pb-24 pt-28 sm:px-8">
      <div className="max-w-3xl">
        <span className="inline-flex items-center gap-2 font-mono text-xs tracking-widest text-emerald-400 uppercase">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
          Direct Access
        </span>
        <h1 className="font-display mt-4 text-4xl font-bold tracking-[-0.03em] text-white sm:text-5xl">
          Talk to the Founders
        </h1>
        <p className="mt-4 text-lg leading-8 text-zinc-300">
          Building agentic infrastructure? Partner with us or request dedicated cluster capacity.
        </p>
      </div>

      <div className="mt-12 rounded-2xl border border-white/10 bg-gradient-to-br from-zinc-950 to-black p-8 max-w-xl backdrop-blur-xl shadow-2xl">
        <h2 className="font-display text-xl font-semibold text-white">Investor &amp; Enterprise Inquiries</h2>
        <p className="mt-3 text-sm leading-6 text-zinc-400">
          Reach out directly to discuss enterprise SLAs, custom node clusters, or investment rounds.
        </p>

        <div className="mt-6 pt-6 border-t border-white/10 flex items-center justify-between">
          <a
            href="mailto:hello@wildinfra.dev"
            className="inline-flex h-10 items-center justify-center rounded-full bg-white px-6 text-xs font-semibold text-black transition-all hover:bg-zinc-200"
          >
            hello@wildinfra.dev
          </a>
          <span className="font-mono text-xs text-zinc-500">24h response time</span>
        </div>
      </div>
    </div>
  );
}

