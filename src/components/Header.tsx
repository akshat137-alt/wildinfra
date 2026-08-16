"use client";

import Link from "next/link";
import { useState } from "react";
import { BrandMark } from "@/components/BrandMark";

const navLinks = [
  { href: "/#problem", label: "Problem" },
  { href: "/#features", label: "Features" },
  { href: "/#architecture", label: "Architecture" },
  { href: "/#boundaries", label: "Boundaries" },
  { href: "/documentation", label: "Docs" },
] as const;

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-black/60 backdrop-blur-xl transition-all duration-300">
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-5 sm:px-8">
        <Link href="/">
          <BrandMark />
        </Link>

        <nav className="hidden items-center gap-8 md:flex" aria-label="Primary">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-xs font-medium tracking-wide text-zinc-400 transition-colors hover:text-white"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-4 md:flex">
          <div className="flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1 text-[11px] font-mono text-emerald-400">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
            </span>
            500B NODE MESH
          </div>
          <Link
            href="/contact"
            className="inline-flex h-8 items-center justify-center rounded-full border border-white/20 bg-white/5 px-4 text-xs font-medium text-white shadow-inner transition-all hover:border-white/40 hover:bg-white/15 hover:shadow-[0_0_15px_rgba(255,255,255,0.25)]"
          >
            Deploy Agent
          </Link>
        </div>

        <button
          type="button"
          className="inline-flex h-9 w-9 items-center justify-center text-zinc-400 hover:text-white md:hidden"
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((v) => !v)}
        >
          <span className="sr-only">{open ? "Close" : "Menu"}</span>
          <span className="relative block h-3.5 w-4">
            <span
              className={`absolute left-0 block h-px w-full bg-current transition-transform ${open ? "top-1.5 rotate-45" : "top-0.5"}`}
            />
            <span
              className={`absolute left-0 top-1.5 block h-px w-full bg-current transition-opacity ${open ? "opacity-0" : "opacity-100"}`}
            />
            <span
              className={`absolute left-0 block h-px w-full bg-current transition-transform ${open ? "top-1.5 -rotate-45" : "top-2.5"}`}
            />
          </span>
        </button>
      </div>

      {open ? (
        <nav
          id="mobile-nav"
          className="border-b border-white/10 bg-black/95 backdrop-blur-2xl md:hidden"
          aria-label="Mobile"
        >
          <div className="mx-auto flex max-w-6xl flex-col px-5 py-4 sm:px-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="py-3 text-sm font-medium text-zinc-400 transition-colors hover:text-white"
                onClick={() => setOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <div className="mt-4 flex items-center justify-between border-t border-white/10 pt-4">
              <div className="flex items-center gap-2 font-mono text-xs text-emerald-400">
                <span className="h-2 w-2 rounded-full bg-emerald-400" />
                500B NODE MESH ACTIVE
              </div>
              <Link
                href="/contact"
                className="rounded-full bg-white px-4 py-1.5 text-xs font-semibold text-black"
                onClick={() => setOpen(false)}
              >
                Deploy
              </Link>
            </div>
          </div>
        </nav>
      ) : null}
    </header>
  );
}

