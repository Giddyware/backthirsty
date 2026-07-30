import { EmptyState } from "@/components/dashboard/empty-state";
import { PageHeader } from "@/components/dashboard/page-header";
import { SampleDataNotice } from "@/components/dashboard/preview-banner";
import {
  getDashboardData,
  withParams,
  type DashboardSearchParams,
} from "@/lib/dashboard";
import {
  formatDate,
  formatMoney,
  formatPct,
  formatSignedMoney,
  trendClass,
} from "@/lib/format";
import { CandlestickChart, Plus } from "lucide-react";
import Link from "next/link";

type Props = { searchParams: DashboardSearchParams };

export default function BacktestsPage({ searchParams }: Props) {
  const { data, isSample } = getDashboardData(searchParams);
  const { backtests } = data;
  const forceEmpty = !isSample;

  return (
    <>
      {isSample ? <SampleDataNotice /> : null}

      <PageHeader
        title="Backtests"
        description="Saved what-if runs. Each result is a snapshot — editing an allocation later never changes a saved number."
        actions={
          <Link
            href={withParams("/dashboard/backtests/new", forceEmpty)}
            className="inline-flex items-center gap-1.5 rounded-md bg-brand px-4 py-2 text-sm font-semibold text-black transition-colors hover:bg-brand/90"
          >
            <Plus className="h-4 w-4" aria-hidden="true" />
            New backtest
          </Link>
        }
      />

      {backtests.length === 0 ? (
        <EmptyState
          icon={<CandlestickChart className="h-5 w-5" />}
          title="No saved backtests"
          description="Run a backtest and save it to keep the result and compare it later."
          action={{
            label: "Run your first backtest",
            href: "/dashboard/backtests/new",
          }}
          note="Saving requires an account, which isn't built yet."
        />
      ) : (
        <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white">
          <table className="w-full min-w-[720px] text-sm">
            <thead className="border-b border-slate-200 bg-slate-50 text-left text-xs uppercase tracking-wide text-slate-500">
              <tr>
                <th scope="col" className="px-4 py-3 font-medium">Name</th>
                <th scope="col" className="px-4 py-3 font-medium">Assets</th>
                <th scope="col" className="px-4 py-3 font-medium">Period</th>
                <th scope="col" className="px-4 py-3 text-right font-medium">Invested</th>
                <th scope="col" className="px-4 py-3 text-right font-medium">Final</th>
                <th scope="col" className="px-4 py-3 text-right font-medium">Return</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {backtests.map((bt) => (
                <tr key={bt.id} className="hover:bg-slate-50">
                  <td className="px-4 py-3">
                    <Link
                      href={withParams(`/dashboard/backtests/${bt.id}`, forceEmpty)}
                      className="font-medium text-slate-900 hover:underline"
                    >
                      {bt.name}
                    </Link>
                  </td>
                  <td className="px-4 py-3 text-slate-600">
                    {bt.symbols.join(" · ")}
                  </td>
                  <td className="whitespace-nowrap px-4 py-3 text-slate-600">
                    {formatDate(bt.startDate)} – {formatDate(bt.endDate)}
                  </td>
                  <td className="px-4 py-3 text-right tabular-nums text-slate-600">
                    {formatMoney(bt.initialAmount)}
                  </td>
                  <td className="px-4 py-3 text-right tabular-nums font-medium text-slate-900">
                    {formatMoney(bt.finalAmount)}
                  </td>
                  <td
                    className={`px-4 py-3 text-right tabular-nums font-semibold ${trendClass(
                      bt.profit
                    )}`}
                  >
                    {formatPct(bt.totalReturnPct)}
                    <span className="block text-xs font-normal">
                      {formatSignedMoney(bt.profit)}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <p className="text-xs text-slate-500">
        Stock backtests use month-end adjusted closing prices, so the dates shown
        are the resolved month-ends rather than the exact dates requested.
      </p>
    </>
  );
}
