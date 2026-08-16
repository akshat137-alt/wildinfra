import Link from "next/link";

export function HeroActions() {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
      <Link
        href="/documentation"
        className="relative group inline-flex h-12 items-center justify-center overflow-hidden rounded-full bg-white px-7 text-sm font-semibold text-black shadow-[0_0_25px_rgba(255,255,255,0.3)] transition-all duration-300 hover:bg-slate-100 hover:shadow-[0_0_35px_rgba(255,255,255,0.5)] hover:scale-105"
      >
        <span className="relative z-10 flex items-center gap-2">
          Read Documentation
          <svg className="h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </span>
      </Link>
      <Link
        href="/contact"
        className="glass-panel group inline-flex h-12 items-center justify-center rounded-full px-7 text-sm font-semibold text-white transition-all duration-300 hover:border-sky-400/50 hover:bg-sky-500/10 hover:shadow-[0_0_25px_rgba(56,189,248,0.2)] hover:scale-105"
      >
        <span>Talk to Founders</span>
      </Link>
    </div>
  );
}

