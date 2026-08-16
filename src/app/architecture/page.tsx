import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Architecture",
};

export default function ArchitecturePage() {
  return (
    <div className="mx-auto w-full max-w-5xl px-5 py-20 sm:px-8">
      <p className="font-mono text-xs tracking-[0.16em] text-muted-foreground uppercase">
        Architecture
      </p>
      <h1 className="font-display mt-3 text-3xl font-semibold tracking-[-0.03em] text-foreground sm:text-4xl">
        System Architecture (TRD)
      </h1>
      <p className="mt-4 max-w-2xl text-base leading-7 text-muted">
        Detailed architecture diagrams and runtime topology will live here.
      </p>
    </div>
  );
}
