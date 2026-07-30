import { FlaskConical } from "lucide-react";

/**
 * Shown wherever invented figures are on screen.
 *
 * The dashboard runs on sample data until the database and price providers are
 * connected. This is deliberately kept to one quiet line — enough that nobody
 * mistakes these for real prices or real holdings, without shouting over the
 * UI it is labelling.
 */
export const SampleDataNotice = () => (
  <div
    role="status"
    className="flex flex-wrap items-center gap-x-2 gap-y-1 rounded-lg border border-amber-200 bg-amber-50 px-3 py-2 text-xs text-amber-900"
  >
    <FlaskConical className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
    <span className="font-semibold">Sample data.</span>
    <span className="text-amber-800">
      Not real prices, holdings or results — the data layer isn&apos;t connected
      yet.
    </span>
  </div>
);
