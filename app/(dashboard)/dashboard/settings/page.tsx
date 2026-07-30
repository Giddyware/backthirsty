import { PageHeader } from "@/components/dashboard/page-header";
import { SampleDataNotice } from "@/components/dashboard/preview-banner";
import { Info } from "lucide-react";

const ROWS: { label: string; value: string; note?: string }[] = [
  {
    label: "Sign-in",
    value: "Not configured",
    note: "Will be GitHub or Google. There is no password to manage — and no email sign-in, because sending mail to arbitrary addresses needs a custom domain, which a vercel.app address cannot have.",
  },
  {
    label: "Email notifications",
    value: "Unavailable",
    note: "No outbound email is possible on the current domain, so there is nothing to switch on here yet.",
  },
  {
    label: "Saved data",
    value: "Not persisted",
    note: "Backtests, portfolios and watchlists need the database, which isn't connected yet.",
  },
];

export default function SettingsPage() {
  return (
    <>
      <SampleDataNotice />

      <PageHeader
        title="Settings"
        description="Account and data preferences."
      />

      <div className="flex items-start gap-3 rounded-lg border border-slate-200 bg-white p-4">
        <Info
          className="mt-0.5 h-4 w-4 shrink-0 text-slate-500"
          aria-hidden="true"
        />
        <p className="text-sm text-slate-600">
          Accounts aren&apos;t built yet, so there is nothing to configure. This
          page lists what will live here and why each item is currently
          unavailable.
        </p>
      </div>

      <dl className="divide-y divide-slate-100 rounded-xl border border-slate-200 bg-white">
        {ROWS.map((row) => (
          <div key={row.label} className="px-5 py-4">
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <dt className="text-sm font-medium text-slate-900">{row.label}</dt>
              <dd className="text-sm text-slate-500">{row.value}</dd>
            </div>
            {row.note ? (
              <p className="mt-1.5 max-w-2xl text-xs text-slate-500">
                {row.note}
              </p>
            ) : null}
          </div>
        ))}
      </dl>

      <div className="rounded-xl border border-red-200 bg-white p-5">
        <h2 className="text-sm font-semibold text-slate-900">Delete account</h2>
        <p className="mt-1 text-sm text-slate-600">
          Will permanently remove your account and everything saved with it.
        </p>
        <button
          type="button"
          disabled
          title="There is no account to delete yet"
          className="mt-4 cursor-not-allowed rounded-md bg-slate-200 px-4 py-2 text-sm font-semibold text-slate-500"
        >
          Delete account
        </button>
      </div>
    </>
  );
}
