import Link from "next/link";
import { BrandMark } from "@/components/BrandMark";

const footerLinks = [
  { href: "/documentation", label: "Documentation" },
  { href: "/documentation#api", label: "API Reference" },
  { href: "/architecture", label: "System Architecture (TRD)" },
  { href: "/contact", label: "Contact Founders" },
] as const;

export function Footer() {
  return (
    <footer className="mt-auto border-t border-white/10 bg-black/80 py-12 backdrop-blur-md">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-10 px-5 sm:px-8">
        <div className="flex flex-col gap-8 sm:flex-row sm:items-start sm:justify-between">
          <div className="max-w-xs space-y-3">
            <Link href="/">
              <BrandMark />
            </Link>
            <p className="text-sm leading-6 text-zinc-400">
              Programmable, semantic web execution layer built for 500B concurrent AI agents.
            </p>
          </div>
          <nav
            className="flex flex-col gap-3 sm:items-end font-mono text-xs"
            aria-label="Footer"
          >
            {footerLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="text-zinc-400 transition-colors hover:text-white"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
        <div className="flex flex-col gap-4 border-t border-white/10 pt-6 sm:flex-row sm:items-center sm:justify-between font-mono text-[11px] text-zinc-500">
          <p>© {new Date().getFullYear()} WildInfra Inc. All rights reserved.</p>
          <div className="flex items-center gap-2 text-emerald-400">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
            OPERATIONAL · 500B AGENT MESH
          </div>
        </div>
      </div>
    </footer>
  );
}

