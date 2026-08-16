import type { ProblemItem } from "./problems";
import { ProblemIcon } from "./ProblemIcon";

type ProblemCardProps = {
  problem: ProblemItem;
};

export function ProblemCard({ problem }: ProblemCardProps) {
  return (
    <article className="flex h-full flex-col p-6 sm:p-8">
      <div className="mb-5 text-foreground">
        <ProblemIcon name={problem.icon} className="h-5 w-5" />
      </div>
      <h3 className="font-display text-base font-semibold tracking-tight text-foreground">
        {problem.title}
      </h3>
      <p className="mt-3 text-sm leading-6 text-muted">
        {problem.description}
      </p>
    </article>
  );
}
