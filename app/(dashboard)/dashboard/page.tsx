import { Sparkline } from "@/components/dashboard/area-chart";
import { EmptyState } from "@/components/dashboard/empty-state";
import { PageHeader } from "@/components/dashboard/page-header";
import { SampleDataNotice } from "@/components/dashboard/preview-banner";
import { QuoteBadge } from "@/components/dashboard/quote-badge";
import { StatCard } from "@/components/dashboard/stat-card";
import {
  getDashboardData,
  portfolioTotals,
  withParams,
  type DashboardSearchParams,
} from "@/lib/dashboard";
import {
  formatMoney,
  formatPct,
  formatRelative,
  formatSignedMoney,
  trendClass,
} from "@/lib/format";
import { CandlestickChart, Plus } from "lucide-react";
import Link from "next/link";

type Props = { searchParams: DashboardSearchParams };

export default function DashboardOverview({ searchParams }: Props) {
  const { data, isSample } = getDashboardData(searchParams);
  const { portfolios, watchlists, backtests, news } = data;
  const forceEmpty = !isSample;

  // Aggregate across every portfolio — the overview is a roll-up.
  const totals = portfolios.map(portfolioTotals);
  const invested = totals.reduce((sum, t) => sum + t.invested, 0);
  const currentValue = totals.reduce((sum, t) => sum + t.currentValue, 0);
  const gain = currentValue - invested;
  const gainPct = invested === 0 ? 0 : (gain / invested) * 100;
  const anyPartial = totals.some((t) => t.partial);

  const hasAnything =
    portfolios.length > 0 || watchlists.length > 0 || backtests.length > 0;

  const watchlist = watchlists[0];

  return (
    <>
      {isSample ? <SampleDataNotice /> : null}

      <PageHeader
        title="Overview"
        description="Your holdings, watchlists and saved backtests at a glance."
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

      {!hasAnything ? (
        <EmptyState
          icon={<CandlestickChart className="h-5 w-5" />}
          title="Nothing here yet"
          description="Run a backtest, build a portfolio, or start a watchlist and it will show up here."
          action={{
            label: "Run your first backtest",
            href: "/dashboard/backtests/new",
          }}
          note="Accounts and saved data aren't wired up yet, so nothing persists between visits."
        />
      ) : (
        <>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <StatCard
              label="Portfolio value"
              value={invested === 0 ? "—" : formatMoney(currentValue)}
              delta={
                invested === 0
                  ? undefined
                  : `${formatSignedMoney(gain)} (${formatPct(gainPct)})`
              }
              deltaClassName={trendClass(gain)}
              hint={
                anyPartial
                  ? "Some holdings have no quote; totals fall back to cost basis."
                  : `Across ${portfolios.length} ${
                      portfolios.length === 1 ? "portfolio" : "portfolios"
                    }`
              }
            />
            <StatCard
              label="Total invested"
              value={invested === 0 ? "—" : formatMoney(invested)}
              hint="Sum of quantity × cost basis"
            />
            <StatCard
              label="Saved backtests"
              value={String(backtests.length)}
              hint={
                backtests.length
                  ? `Last run ${formatRelative(backtests[0].createdAt)}`
                  : undefined
              }
            />
            <StatCard
              label="Watchlist symbols"
              value={String(
                watchlists.reduce((sum, w) => sum + w.items.length, 0)
              )}
            />
          </div>

          <div className="grid gap-6 lg:grid-cols-2">
            <section className="rounded-xl border border-slate-200 bg-white p-5">
              <div className="mb-4 flex items-center justify-between">
                <h2 className="text-sm font-semibold text-slate-900">
                  Recent backtests
                </h2>
                <Link
                  href={withParams("/dashboard/backtests", forceEmpty)}
                  className="text-xs font-medium text-slate-600 underline hover:no-underline"
                >
                  View all
                </Link>
              </div>
              <ul className="divide-y divide-slate-100">
                {backtests.slice(0, 4).map((bt) => (
                  <li key={bt.id} className="py-3">
                    <Link
                      href={withParams(
                        `/dashboard/backtests/${bt.id}`,
                        forceEmpty
                      )}
                      className="group flex items-center justify-between gap-4"
                    >
                      <span className="min-w-0">
                        <span className="block truncate text-sm font-medium text-slate-900 group-hover:underline">
                          {bt.name}
                        </span>
                        <span className="text-xs text-slate-500">
                          {bt.symbols.join(" · ")} ·{" "}
                          {formatRelative(bt.createdAt)}
                        </span>
                      </span>
                      <span className="flex shrink-0 items-center gap-3">
                        {bt.series ? (
                          <Sparkline
                            values={bt.series.map((p) => p.value)}
                            className="h-7 w-16"
                          />
                        ) : null}
                        <span
                          className={`text-sm font-semibold tabular-nums ${trendClass(
                            bt.profit
                          )}`}
                        >
                          {formatPct(bt.totalReturnPct)}
                        </span>
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </section>

            <section className="rounded-xl border border-slate-200 bg-white p-5">
              <div className="mb-4 flex items-center justify-between">
                <h2 className="text-sm font-semibold text-slate-900">
                  Watchlist
                </h2>
                <Link
                  href={withParams("/dashboard/watchlists", forceEmpty)}
                  className="text-xs font-medium text-slate-600 underline hover:no-underline"
                >
                  View all
                </Link>
              </div>
              <ul className="divide-y divide-slate-100">
                {watchlist?.items.slice(0, 5).map((row) => (
                  <li
                    key={row.symbol}
                    className="flex items-center justify-between gap-3 py-3"
                  >
                    <div className="min-w-0">
                      <p className="text-sm font-semibold text-slate-900">
                        {row.symbol}
                      </p>
                      <p className="truncate text-xs text-slate-500">
                        {row.name}
                      </p>
                    </div>
                    {row.spark ? (
                      <Sparkline values={row.spark} className="h-7 w-16" />
                    ) : null}
                    <div className="shrink-0 text-right">
                      <p className="text-sm font-medium tabular-nums text-slate-900">
                        {row.quote ? formatMoney(row.quote.price) : "—"}
                      </p>
                      <p
                        className={`text-xs font-medium tabular-nums ${trendClass(
                          row.quote?.changePct ?? 0
                        )}`}
                      >
                        {row.quote ? formatPct(row.quote.changePct) : ""}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
              {watchlist?.items[0] ? (
                <div className="mt-3 border-t border-slate-100 pt-3">
                  <QuoteBadge quote={watchlist.items[0].quote} />
                </div>
              ) : null}
            </section>
          </div>

          <section className="rounded-xl border border-slate-200 bg-white p-5">
            <h2 className="mb-4 text-sm font-semibold text-slate-900">
              Market news
            </h2>
            <ul className="space-y-3">
              {news.map((item) => (
                <li key={item.id} className="text-sm">
                  <p className="font-medium text-slate-900">{item.headline}</p>
                  <p className="text-xs text-slate-500">
                    {item.source} · {formatRelative(item.publishedAt)}
                    {item.symbol ? ` · ${item.symbol}` : ""}
                  </p>
                </li>
              ))}
            </ul>
          </section>
        </>
      )}

      <p className="text-xs text-slate-500">
        Not investment advice. Past performance does not indicate future results.
      </p>
    </>
  );
}
