export function BrandMark({ className = "" }: { className?: string }) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <span className="relative flex h-5 w-5 items-center justify-center rounded-md bg-white text-black font-mono font-black text-xs shadow-sm">
        W
      </span>
      <span className="font-display text-sm font-bold tracking-tight text-white">
        WildInfra
      </span>
      <span className="rounded border border-white/10 bg-white/5 px-1.5 py-0.5 font-mono text-[10px] text-zinc-400">
        v1.0
      </span>
    </span>
  );
}


