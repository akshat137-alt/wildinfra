export function BrandMark({ className = "" }: { className?: string }) {
  return (
    <span className={`group inline-flex items-center gap-3 ${className}`}>
      <span className="relative flex h-6 w-6 items-center justify-center [perspective:1000px]">
        <span className="absolute inset-0 rounded-md bg-gradient-to-tr from-cyan-500/30 to-white/30 blur-xs transition-opacity group-hover:opacity-100" />
        <span className="relative h-4 w-4 rounded-[3px] border border-white/60 bg-gradient-to-br from-zinc-800 to-black p-0.5 shadow-[0_0_12px_rgba(255,255,255,0.2)] transition-transform duration-500 ease-out group-hover:[transform:rotateX(25deg)_rotateY(35deg)]">
          <span className="block h-full w-full rounded-[1px] bg-gradient-to-tr from-white via-zinc-200 to-cyan-300" />
        </span>
      </span>
      <span className="font-display text-sm font-semibold tracking-[-0.02em] text-foreground">
        WildInfra
      </span>
    </span>
  );
}

