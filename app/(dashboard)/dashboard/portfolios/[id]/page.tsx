import { Donut } from "@/components/dashboard/donut";
import { PageHeader } from "@/components/dashboard/page-header";
import { SampleDataNotice } from "@/components/dashboard/preview-banner";
import { QuoteBadge } from "@/components/dashboard/quote-badge";
import { StatCard } from "@/components/dashboard/stat-card";
import {
  getDashboardData,
  holdingInvested,
  holdingValue,
  portfolioTotals,
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

export default function PortfolioDetailPage({ params, searchParams }: Props) {
  const { data, isSample } = getDashboardData(searchParams);
  const forceEmpty = !isSample;
  const portfolio = data.portfolios.find((p) => p.id === params.id);

  if (!portfolio) notFound();

  const totals = portfolioTotals(portfolio);

  // Allocation is by current value, falling back to cost when a holding has no
  // quote — the same rule portfolioTotals uses, so the donut and the headline
  // figure always agree.
  const slices = portfolio.holdings
    .map((holding) => ({
      label: holding.symbol,
      sublabel: holding.name,
      value: holdingValue(holding) ?? holdingInvested(holding),
    }))
    .sort((a, b) => b.value - a.value);

  return (
    <>
      {isSample ? <SampleDataNotice /> : null}

      <Link
        href={withParams("/dashboard/portfolios", forceEmpty)}
        className="inline-flex items-center gap-1.5 text-sm text-slate-600 hover:text-slate-900"
      >
        <ArrowLeft className="h-4 w-4" aria-hidden="true" />
        All portfolios
      </Link>

      <PageHeader
        title={portfolio.name}
        description={`${portfolio.holdings.length} ${
          portfolio.holdings.length === 1 ? "holding" : "holdings"
        } · ${portfolio.baseCurrency}`}
      />

      <div className="grid gap-4 sm:grid-cols-3">
        <StatCard
          label="Current value"
          value={formatMoney(totals.currentValue)}
          delta={`${formatSignedMoney(totals.gain)} (${formatPct(
            totals.gainPct
          )})`}
          deltaClassName={trendClass(totals.gain)}
          hint={
            totals.partial
              ? "Some holdings have no quote; totals fall back to cost basis."
              : undefined
          }
        />
        <StatCard label="Invested" value={formatMoney(totals.invested)} />
        <StatCard
          label="Unrealised gain"
          value={formatSignedMoney(totals.gain)}
          delta={formatPct(totals.gainPct)}
          deltaClassName={trendClass(totals.gain)}
        />
      </div>

      <section className="overflow-x-auto rounded-xl border border-slate-200 bg-white">
        <table className="w-full min-w-[760px] text-sm">
          <thead className="border-b border-slate-200 bg-slate-50 text-left text-xs uppercase tracking-wide text-slate-500">
            <tr>
              <th scope="col" className="px-4 py-3 font-medium">Asset</th>
              <th scope="col" className="px-4 py-3 text-right font-medium">Quantity</th>
              <th scope="col" className="px-4 py-3 text-right font-medium">Cost basis</th>
              <th scope="col" className="px-4 py-3 text-right font-medium">Price</th>
              <th scope="col" className="px-4 py-3 text-right font-medium">Value</th>
              <th scope="col" className="px-4 py-3 text-right font-medium">Gain</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {portfolio.holdings.map((holding) => {
              const invested = holdingInvested(holding);
              const value = holdingValue(holding);
              const gain = value === null ? null : value - invested;

              return (
                <tr key={holding.id} className="hover:bg-slate-50">
                  <td className="px-4 py-3">
                    <p className="font-semibold text-slate-900">
                      {holding.symbol}
                    </p>
                    <p className="text-xs text-slate-500">{holding.name}</p>
                    <p className="mt-0.5 text-xs text-slate-400">
                      Acquired {formatDate(holding.acquiredAt)}
                    </p>
                  </td>
                  <td className="px-4 py-3 text-right tabular-nums text-slate-600">
                    {formatQuantity(holding.quantity)}
                  </td>
                  <td className="px-4 py-3 text-right tabular-nums text-slate-600">
                    {formatMoney(holding.costBasis)}
                  </td>
                  <td className="px-4 py-3 text-right tabular-nums text-slate-900">
                    {holding.quote ? formatMoney(holding.quote.price) : "—"}
                    <span className="mt-0.5 block">
                      <QuoteBadge quote={holding.quote} />
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right tabular-nums font-medium text-slate-900">
                    {value === null ? "—" : formatMoney(value)}
                  </td>
                  <td
                    className={`px-4 py-3 text-right tabular-nums font-semibold ${
                      gain === null ? "text-slate-500" : trendClass(gain)
                    }`}
                  >
                    {gain === null ? "—" : formatSignedMoney(gain)}
                    {gain !== null && invested > 0 ? (
                      <span className="block text-xs font-normal">
                        {formatPct((gain / invested) * 100)}
                      </span>
                    ) : null}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </section>

      <section className="rounded-xl border border-slate-200 bg-white p-5">
        <h2 className="mb-4 text-sm font-semibold text-slate-900">Allocation</h2>
        <Donut slices={slices} />
      </section>

      <p className="text-xs text-slate-500">
        Not brokerage- or tax-grade: no dividend reinvestment, no fees, no
        currency conversion. Not investment advice.
      </p>
    </>
  );
}
