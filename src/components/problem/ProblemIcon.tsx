import type { ProblemItem } from "./problems";

type ProblemIconProps = {
  name: ProblemItem["icon"];
  className?: string;
};

export function ProblemIcon({ name, className = "h-5 w-5" }: ProblemIconProps) {
  const common = {
    className,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.5,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true,
  };

  switch (name) {
    case "perception":
      return (
        <svg {...common}>
          <path d="M2.5 12s3.5-6.5 9.5-6.5S21.5 12 21.5 12s-3.5 6.5-9.5 6.5S2.5 12 2.5 12Z" />
          <circle cx="12" cy="12" r="2.75" />
          <path d="M4 19.5 20 4.5" />
        </svg>
      );
    case "latency":
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="8.25" />
          <path d="M12 7.5V12l3.25 2" />
          <path d="M12 3.5v1.25M12 19.25V20.5M3.5 12H4.75M19.25 12H20.5" />
        </svg>
      );
    case "security":
      return (
        <svg {...common}>
          <path d="M12 3.5 19 7v5.25c0 4.15-2.85 7.85-7 8.75-4.15-.9-7-4.6-7-8.75V7l7-3.5Z" />
          <path d="M12 9v2.25l1.75 1.25L12 13.75V16" />
        </svg>
      );
  }
}
