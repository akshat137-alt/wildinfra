import Link from "next/link";

export function HeroActions() {
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
      <Link
        href="/documentation"
        className="inline-flex h-10 items-center justify-center rounded-full bg-foreground px-5 text-sm font-medium text-background transition-opacity hover:opacity-80"
      >
        Read the Docs
      </Link>
      <Link
        href="/contact"
        className="inline-flex h-10 items-center justify-center rounded-full border border-border-strong px-5 text-sm font-medium text-foreground transition-colors hover:bg-surface"
      >
        Investor Deck
      </Link>
    </div>
  );
}
