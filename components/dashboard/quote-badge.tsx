import type { Quote } from "@/lib/dashboard/types";
import { formatTime } from "@/lib/format";

/**
 * "as of" timestamp plus an explicit Delayed marker.
 *
 * Free provider tiers are real-time only for US equities; crypto and
 * everything else is delayed. Showing a delayed price as though it were live
 * is the kind of thing a finance app must not do, so the state is always
 * visible next to the number.
 */
export const QuoteBadge = ({ quote }: { quote: Quote | null }) => {
  if (!quote) {
    return (
      <span className="text-xs text-slate-500">No quote available</span>
    );
  }

  return (
    <span className="inline-flex items-center gap-1.5 text-xs text-slate-500">
      {quote.delayed ? (
        <span className="rounded bg-slate-100 px-1.5 py-0.5 font-medium text-slate-600">
          Delayed
        </span>
      ) : (
        <span className="rounded bg-emerald-50 px-1.5 py-0.5 font-medium text-emerald-700">
          Real-time
        </span>
      )}
      <span>as of {formatTime(quote.asOf)}</span>
    </span>
  );
};
