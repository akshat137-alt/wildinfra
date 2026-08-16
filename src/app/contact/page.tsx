import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact",
};

export default function ContactPage() {
  return (
    <div className="mx-auto w-full max-w-5xl px-5 py-20 sm:px-8">
      <p className="font-mono text-xs tracking-[0.16em] text-muted-foreground uppercase">
        Contact
      </p>
      <h1 className="font-display mt-3 text-3xl font-semibold tracking-[-0.03em] text-foreground sm:text-4xl">
        Talk to the founders
      </h1>
      <p className="mt-4 max-w-2xl text-base leading-7 text-muted">
        Investor and enterprise inquiries:{" "}
        <a
          href="mailto:hello@wildinfra.dev"
          className="text-foreground underline decoration-border-strong underline-offset-4 hover:decoration-foreground"
        >
          hello@wildinfra.dev
        </a>
      </p>
    </div>
  );
}
