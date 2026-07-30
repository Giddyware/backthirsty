import Link from "next/link";

type EmptyStateProps = {
  icon?: React.ReactNode;
  title: string;
  description: string;
  action?: { label: string; href: string };
  /** Rendered under the action — use for honest caveats, not marketing. */
  note?: string;
};

/**
 * The dashboard's default state. Deliberately explicit that there is nothing
 * here yet rather than padding the screen with fake rows.
 */
export const EmptyState = ({
  icon,
  title,
  description,
  action,
  note,
}: EmptyStateProps) => (
  <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-slate-300 bg-white px-6 py-14 text-center">
    {icon ? (
      <div
        className="mb-4 flex h-11 w-11 items-center justify-center rounded-full bg-slate-100 text-slate-500"
        aria-hidden="true"
      >
        {icon}
      </div>
    ) : null}
    <h3 className="text-base font-semibold text-slate-900">{title}</h3>
    <p className="mt-1 max-w-md text-sm text-slate-600">{description}</p>
    {action ? (
      <Link
        href={action.href}
        className="mt-5 inline-flex items-center justify-center rounded-md bg-brand px-4 py-2 text-sm font-semibold text-black transition-colors hover:bg-brand/90"
      >
        {action.label}
      </Link>
    ) : null}
    {note ? <p className="mt-4 max-w-md text-xs text-slate-500">{note}</p> : null}
  </div>
);
