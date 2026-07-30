import { PageHeader } from "@/components/dashboard/page-header";
import { SampleDataNotice } from "@/components/dashboard/preview-banner";

/**
 * Builder layout, pre-filled with a sample allocation.
 *
 * The controls are intentionally `disabled` rather than live-but-inert. An
 * enabled form whose submit silently does nothing is the exact pattern this
 * rebuild exists to remove, so until the engine is wired up the state is
 * visible in the UI instead of hidden behind a dead button.
 */

const LEGS = [
  { symbol: "SPY", name: "SPDR S&P 500 ETF Trust", weight: 60 },
  { symbol: "BTC", name: "Bitcoin", weight: 40 },
];

const REBALANCE = ["None (buy and hold)", "Monthly", "Quarterly", "Annually"];

export default function NewBacktestPage() {
  const totalWeight = LEGS.reduce((sum, l) => sum + l.weight, 0);

  return (
    <>
      <SampleDataNotice />

      <PageHeader
        title="New backtest"
        description="Pick one or more assets, set weights, choose a period, and see what the investment would have been worth."
      />

      <form className="space-y-6" aria-describedby="builder-status">
        <fieldset
          disabled
          className="space-y-6 rounded-xl border border-slate-200 bg-white p-6"
        >
          <legend className="sr-only">Backtest inputs</legend>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-1.5">
              <label
                htmlFor="amount"
                className="text-sm font-medium text-slate-900"
              >
                Amount invested
              </label>
              <input
                id="amount"
                type="text"
                defaultValue="$5,000.00"
                className="w-full rounded-md border border-slate-300 bg-slate-50 px-3 py-2 text-sm text-slate-700"
              />
            </div>
            <div className="space-y-1.5">
              <label
                htmlFor="rebalance"
                className="text-sm font-medium text-slate-900"
              >
                Rebalancing
              </label>
              <select
                id="rebalance"
                defaultValue={REBALANCE[3]}
                className="w-full rounded-md border border-slate-300 bg-slate-50 px-3 py-2 text-sm text-slate-700"
              >
                {REBALANCE.map((option) => (
                  <option key={option}>{option}</option>
                ))}
              </select>
            </div>
            <div className="space-y-1.5">
              <label
                htmlFor="start"
                className="text-sm font-medium text-slate-900"
              >
                Start date
              </label>
              <input
                id="start"
                type="text"
                defaultValue="June 30, 2019"
                className="w-full rounded-md border border-slate-300 bg-slate-50 px-3 py-2 text-sm text-slate-700"
              />
            </div>
            <div className="space-y-1.5">
              <label
                htmlFor="end"
                className="text-sm font-medium text-slate-900"
              >
                End date
              </label>
              <input
                id="end"
                type="text"
                defaultValue="June 30, 2025"
                className="w-full rounded-md border border-slate-300 bg-slate-50 px-3 py-2 text-sm text-slate-700"
              />
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex items-baseline justify-between">
              <h2 className="text-sm font-medium text-slate-900">Assets</h2>
              <span
                className={`text-xs font-medium tabular-nums ${
                  totalWeight === 100 ? "text-emerald-600" : "text-red-600"
                }`}
              >
                Weights total {totalWeight}%
                {totalWeight === 100 ? "" : " — must be 100%"}
              </span>
            </div>

            <ul className="space-y-2">
              {LEGS.map((leg) => (
                <li
                  key={leg.symbol}
                  className="flex flex-wrap items-center gap-3 rounded-lg border border-slate-200 bg-slate-50 p-3"
                >
                  <span className="min-w-0 flex-1">
                    <span className="block text-sm font-semibold text-slate-900">
                      {leg.symbol}
                    </span>
                    <span className="block truncate text-xs text-slate-500">
                      {leg.name}
                    </span>
                  </span>
                  <span className="flex items-center gap-1.5">
                    <input
                      type="text"
                      defaultValue={leg.weight}
                      aria-label={`${leg.symbol} weight percent`}
                      className="w-16 rounded-md border border-slate-300 bg-white px-2 py-1.5 text-right text-sm tabular-nums text-slate-700"
                    />
                    <span className="text-sm text-slate-500">%</span>
                  </span>
                </li>
              ))}
            </ul>

            <button
              type="button"
              className="rounded-md border border-dashed border-slate-300 px-3 py-2 text-sm font-medium text-slate-600"
            >
              + Add asset
            </button>
          </div>

          <button
            type="button"
            className="w-full rounded-md bg-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-500 sm:w-auto"
          >
            Run backtest
          </button>
        </fieldset>

        <p
          id="builder-status"
          className="rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm text-slate-600"
        >
          <span className="font-medium text-slate-900">
            The controls are disabled until the engine is connected.
          </span>{" "}
          The single-asset calculator on the{" "}
          <a href="/" className="underline hover:no-underline">
            home page
          </a>{" "}
          works today.
        </p>
      </form>

      <div className="rounded-xl border border-slate-200 bg-white p-5 text-sm text-slate-600">
        <h2 className="mb-2 text-sm font-semibold text-slate-900">
          What the numbers will and won&apos;t include
        </h2>
        <ul className="list-inside list-disc space-y-1.5">
          <li>Lump sum invested at the start date — no recurring contributions.</li>
          <li>
            Stock prices are month-end and adjusted for splits and dividends;
            requested dates resolve to the nearest month-end.
          </li>
          <li>
            Rebalancing, when enabled, is modelled with no fees and no tax — which
            flatters it relative to reality.
          </li>
          <li>
            A backtest is rejected rather than truncated if an asset has no price
            history back to your start date.
          </li>
        </ul>
      </div>
    </>
  );
}
