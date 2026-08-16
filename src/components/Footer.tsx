import Link from "next/link";
import { BrandMark } from "@/components/BrandMark";

const footerLinks = [
  { href: "/documentation", label: "Documentation" },
  { href: "/documentation#api", label: "API Reference" },
  { href: "/architecture", label: "System Architecture (TRD)" },
  { href: "/contact", label: "Contact Founders" },
] as const;

export function Footer() {
  return (
    <footer className="mt-auto border-t border-border">
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-10 px-5 py-12 sm:px-8 sm:py-14">
        <div className="flex flex-col gap-10 sm:flex-row sm:justify-between">
          <div className="max-w-xs space-y-3">
            <Link href="/">
              <BrandMark />
            </Link>
            <p className="text-sm leading-6 text-muted">
              Execution infrastructure for planetary-scale AI agents.
            </p>
          </div>
          <nav
            className="flex flex-col gap-3 sm:items-end"
            aria-label="Footer"
          >
            {footerLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="text-sm text-muted transition-colors hover:text-foreground"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
        <p className="font-mono text-[11px] text-muted-foreground">
          © {new Date().getFullYear()} WildInfra
        </p>
      </div>
    </footer>
  );
}
