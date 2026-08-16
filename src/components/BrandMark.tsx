export function BrandMark({ className = "" }: { className?: string }) {
  return (
    <span className={`inline-flex items-center gap-2 ${className}`}>
      <span
        aria-hidden
        className="flex h-4 w-4 items-center justify-center rounded-[3px] bg-foreground"
      >
        <span className="h-1.5 w-1.5 rounded-[1px] bg-background" />
      </span>
      <span className="font-display text-sm font-semibold tracking-[-0.02em] text-foreground">
        WildInfra
      </span>
    </span>
  );
}
