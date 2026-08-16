export function BrandMark({ className = "" }: { className?: string }) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <span className="flex h-5 w-5 items-center justify-center rounded bg-white text-black font-mono font-bold text-xs">
        W
      </span>
      <span className="font-semibold text-sm tracking-tight text-white">
        WildInfra
      </span>
    </span>
  );
}



