import Link from "next/link";
import { BrandMark } from "@/components/BrandMark";

export function Footer() {
  return (
    <footer className="border-t border-white/[0.08] bg-[#09090b] py-14 text-xs text-zinc-400">
      <div className="mx-auto w-full max-w-6xl px-5 sm:px-8">
        <div className="flex flex-col justify-between gap-8 md:flex-row md:items-center">
          <div className="space-y-2">
            <BrandMark />
            <p className="text-zinc-500 text-xs">
              The headless browser infrastructure built for AI agents.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-6 text-xs">
            <Link href="#problem" className="hover:text-white transition-colors">
              Why WildInfra
            </Link>
            <Link href="#architecture" className="hover:text-white transition-colors">
              Architecture
            </Link>
            <Link href="#benchmarks" className="hover:text-white transition-colors">
              Benchmarks
            </Link>
            <Link href="#use-cases" className="hover:text-white transition-colors">
              Use Cases
            </Link>
            <Link href="#pricing" className="hover:text-white transition-colors">
              Pricing
            </Link>
            <Link href="/documentation" className="hover:text-white transition-colors">
              Docs
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

        <div className="mt-10 flex flex-col justify-between gap-3 border-t border-white/[0.06] pt-6 sm:flex-row sm:items-center text-[11px] text-zinc-500 font-mono">
          <div className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
            <span>Systems Normal · Global Cluster Active</span>
          </div>
          <div>© {new Date().getFullYear()} WildInfra Inc. All rights reserved.</div>
        </div>
      </div>
    </footer>
  );
}

