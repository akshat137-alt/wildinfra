"use client";

import Link from "next/link";
import { useState } from "react";

export function HeroActions() {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText("npm i @wildinfra/sdk");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
      <Link
        href="/contact"
        className="inline-flex h-11 items-center justify-center rounded-lg bg-white px-6 text-sm font-semibold text-black transition-all hover:bg-zinc-200"
      >
        Start Building for Free
      </Link>

      <button
        type="button"
        onClick={handleCopy}
        className="group inline-flex h-11 items-center justify-between gap-3 rounded-lg border border-white/10 bg-zinc-950 px-4 font-mono text-xs text-zinc-300 transition-colors hover:border-white/20 hover:text-white"
      >
        <span className="text-zinc-500">$</span>
        <span>npm i @wildinfra/sdk</span>
        <span className="rounded bg-white/10 px-1.5 py-0.5 text-[10px] text-zinc-400 group-hover:text-white">
          {copied ? "Copied!" : "Copy"}
        </span>
      </button>
    </div>
  );
}


