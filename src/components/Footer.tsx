import Link from "next/link";
import { BrandMark } from "@/components/BrandMark";

export function Footer() {
  return (
    <footer className="border-t border-white/[0.08] bg-[#020408] py-16 font-sans text-xs text-zinc-400">
      <div className="mx-auto w-full max-w-6xl px-5 sm:px-8">
        <div className="flex flex-col justify-between gap-8 md:flex-row md:items-center">
          <div className="space-y-2">
            <BrandMark />
            <p className="text-zinc-500 text-xs">
              The headless semantic browsing runtime built for AI agents.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-6">
            <Link href="#features" className="hover:text-white transition-colors">
              Features
            </Link>
            <Link href="#benchmarks" className="hover:text-white transition-colors">
              Benchmarks
            </Link>
            <Link href="#architecture" className="hover:text-white transition-colors">
              Architecture
            </Link>
            <Link href="/documentation" className="hover:text-white transition-colors">
              Documentation
            </Link>
            <Link href="/contact" className="hover:text-white transition-colors">
              Contact
            </Link>
            <a
              href="https://github.com/akshat137-alt/wildinfra"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors"
            >
              GitHub
            </a>
          </div>
        </div>

        <div className="mt-12 flex flex-col justify-between gap-4 border-t border-white/[0.06] pt-8 sm:flex-row sm:items-center font-mono text-[11px] text-zinc-500">
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-emerald-400" />
            <span>All Systems Operational (500B Node Global Cluster)</span>
          </div>
          <div>© {new Date().getFullYear()} WildInfra Inc. All rights reserved.</div>
        </div>
      </div>
    </footer>
  );
}
