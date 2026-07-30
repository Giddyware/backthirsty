import { cn } from "@/lib/utils";

type StatCardProps = {
  label: string;
  /** Pre-formatted. Pass "—" when there is genuinely nothing to show. */
  value: string;
  /** Secondary line, e.g. a signed change. */
  delta?: string;
  deltaClassName?: string;
  hint?: string;
  className?: string;
};

export const StatCard = ({
  label,
  value,
  delta,
  deltaClassName,
  hint,
  className,
}: StatCardProps) => (
  <div
    className={cn(
      "rounded-xl border border-slate-200 bg-white p-5 shadow-sm",
      className
    )}
  >
    <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
      {label}
    </p>
    <p className="mt-2 text-2xl font-bold tabular-nums text-slate-900">
      {value}
    </p>
    {delta ? (
      <p className={cn("mt-1 text-sm font-medium tabular-nums", deltaClassName)}>
        {delta}
      </p>
    ) : null}
    {hint ? <p className="mt-2 text-xs text-slate-500">{hint}</p> : null}
  </div>
);
