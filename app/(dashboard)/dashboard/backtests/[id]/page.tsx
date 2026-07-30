import { AreaChart } from "@/components/dashboard/area-chart";
import { PageHeader } from "@/components/dashboard/page-header";
import { SampleDataNotice } from "@/components/dashboard/preview-banner";
import { StatCard } from "@/components/dashboard/stat-card";
import {
  getDashboardData,
  withParams,
  type DashboardSearchParams,
} from "@/lib/dashboard";
import {
  formatDate,
  formatMoney,
  formatPct,
  formatQuantity,
  formatSignedMoney,
  trendClass,
} from "@/lib/format";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

type Props = {
  params: { id: string };
  searchParams: DashboardSearchParams;
};

const REBALANCE_LABEL: Record<string, string> = {
  none: "Buy and hold, no rebalancing",
  monthly: "Rebalanced monthly",
  quarterly: "Rebalanced quarterly",
  annual: "Rebalanced annually",
};

export default function BacktestDetailPage({ params, searchParams }: Props) {
  const { data, isSample } = getDashboardData(searchParams);
  const forceEmpty = !isSample;
  const backtest = data.backtests.find((bt) => bt.id === params.id);

  // 404 rather than 403 once auth lands, so ids are not enumerable.
  if (!backtest) notFound();

  const legs = backtest.legs ?? [];

  return (
    <>
      {isSample ? <SampleDataNotice /> : null}

      <Link
        href={withParams("/dashboard/backtests", forceEmpty)}
        className="inline-flex items-center gap-1.5 text-sm text-slate-600 hover:text-slate-900"
      >
        <ArrowLeft className="h-4 w-4" aria-hidden="true" />
        All backtests
      </Link>

      <PageHeader
        title={backtest.name}
        description={`${backtest.symbols.join(" · ")} · ${formatDate(
          backtest.startDate
        )} – ${formatDate(backtest.endDate)}${
          backtest.rebalance
            ? ` · ${REBALANCE_LABEL[backtest.rebalance] ?? backtest.rebalance}`
            : ""
        }`}
      />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Invested" value={formatMoney(backtest.initialAmount)} />
        <StatCard
          label="Final value"
          value={formatMoney(backtest.finalAmount)}
          delta={formatSignedMoney(backtest.profit)}
          deltaClassName={trendClass(backtest.profit)}
        />
        <StatCard
          label="Total return"
          value={formatPct(backtest.totalReturnPct)}
          delta={
            backtest.cagrPct === null || backtest.cagrPct === undefined
              ? "CAGR n/a under 1 year"
              : `${formatPct(backtest.cagrPct)} a year`
          }
          deltaClassName={trendClass(backtest.totalReturnPct)}
        />
        <StatCard
          label="Max drawdown"
          value={
            backtest.maxDrawdownPct === undefined
              ? "—"
              : `−${backtest.maxDrawdownPct.toFixed(1)}%`
          }
          hint="Largest peak-to-trough fall during the period"
        />
      </div>

      <section className="rounded-xl border border-slate-200 bg-white p-5">
        <div className="mb-3 flex flex-wrap items-baseline justify-between gap-2">
          <h2 className="text-sm font-semibold text-slate-900">
            Value over time
          </h2>
          <span className="text-xs text-slate-500">
            Month-end closes · {backtest.series?.length ?? 0} points
          </span>
        </div>
        <AreaChart
          points={backtest.series ?? []}
          baseline={backtest.initialAmount}
        />
      </section>

      <section className="overflow-x-auto rounded-xl border border-slate-200 bg-white">
        <div className="border-b border-slate-200 px-5 py-4">
          <h2 className="text-sm font-semibold text-slate-900">
            Per-asset breakdown
          </h2>
          <p className="mt-0.5 text-xs text-slate-500">
            Which holding actually carried the return.
          </p>
        </div>
        <table className="w-full min-w-[820px] text-sm">
          <thead className="border-b border-slate-200 bg-slate-50 text-left text-xs uppercase tracking-wide text-slate-500">
            <tr>
              <th scope="col" className="px-5 py-3 font-medium">Asset</th>
              <th scope="col" className="px-5 py-3 text-right font-medium">Weight</th>
              <th scope="col" className="px-5 py-3 text-right font-medium">Start price</th>
              <th scope="col" className="px-5 py-3 text-right font-medium">End price</th>
              <th scope="col" className="px-5 py-3 text-right font-medium">Units</th>
              <th scope="col" className="px-5 py-3 text-right font-medium">End value</th>
              <th scope="col" className="px-5 py-3 text-right font-medium">Return</th>
              <th scope="col" className="px-5 py-3 text-right font-medium">Share of profit</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {legs.map((leg) => (
              <tr key={leg.symbol} className="hover:bg-slate-50">
                <td className="px-5 py-3">
                  <p className="font-semibold text-slate-900">{leg.symbol}</p>
                  <p className="text-xs text-slate-500">{leg.name}</p>
                </td>
                <td className="px-5 py-3 text-right tabular-nums text-slate-600">
                  {leg.weightPct}%
                </td>
                <td className="px-5 py-3 text-right tabular-nums text-slate-600">
                  {formatMoney(leg.startPrice)}
                </td>
                <td className="px-5 py-3 text-right tabular-nums text-slate-600">
                  {formatMoney(leg.endPrice)}
                </td>
                <td className="px-5 py-3 text-right tabular-nums text-slate-600">
                  {formatQuantity(leg.units)}
                </td>
                <td className="px-5 py-3 text-right tabular-nums font-medium text-slate-900">
                  {formatMoney(leg.endValue)}
                </td>
                <td
                  className={`px-5 py-3 text-right tabular-nums font-semibold ${trendClass(
                    leg.returnPct
                  )}`}
                >
                  {formatPct(leg.returnPct)}
                </td>
                <td className="px-5 py-3 text-right tabular-nums text-slate-600">
                  {leg.contributionToProfit.toFixed(1)}%
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <div className="rounded-xl border border-slate-200 bg-white p-5 text-xs text-slate-500">
        <p>
          Stock prices are month-end adjusted closes, so the period shown is the
          resolved month-ends rather than the exact dates requested. Lump sum at
          the start date, no recurring contributions.
          {backtest.rebalance && backtest.rebalance !== "none"
            ? " Rebalancing is modelled with no fees and no tax, which flatters it relative to reality."
            : ""}
        </p>
        <p className="mt-2">
          Not investment advice. Past performance does not indicate future
          results.
        </p>
      </div>
    </>
  );
}
