import Link from "next/link";

export function CTA() {
  return (
    <section className="bg-[#09090b] py-20 sm:py-28">
      <div className="mx-auto w-full max-w-4xl px-5 text-center sm:px-8">
        <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
          Start building on the semantic runtime today.
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-zinc-400">
          Get your free API key in seconds with 10,000 complimentary agent sessions. No credit card required.
        </p>

        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link
            href="/contact"
            className="inline-flex h-10 items-center justify-center rounded-md bg-white px-6 text-sm font-semibold text-black transition-colors hover:bg-zinc-200"
          >
            Get Free API Key
          </Link>
          <Link
            href="/documentation"
            className="inline-flex h-10 items-center justify-center rounded-md border border-white/10 bg-zinc-900 px-6 text-sm font-medium text-white transition-colors hover:border-white/20 hover:bg-zinc-800"
          >
            Read Documentation
          </Link>
        </div>
      </div>
    </section>
  );
}
