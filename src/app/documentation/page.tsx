import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Documentation",
};

export default function DocumentationPage() {
  return (
    <div className="mx-auto w-full max-w-5xl px-5 py-20 sm:px-8">
      <p className="font-mono text-xs tracking-[0.16em] text-muted-foreground uppercase">
        Documentation
      </p>
      <h1 className="font-display mt-3 text-3xl font-semibold tracking-[-0.03em] text-foreground sm:text-4xl">
        Product documentation
      </h1>
      <p id="api" className="mt-4 max-w-2xl scroll-mt-24 text-base leading-7 text-muted">
        API references, deployment guides, and integration docs will live here.
      </p>
    </div>
  );
}
