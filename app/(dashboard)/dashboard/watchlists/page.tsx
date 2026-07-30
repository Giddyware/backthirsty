import { Sparkline } from "@/components/dashboard/area-chart";
import { EmptyState } from "@/components/dashboard/empty-state";
import { PageHeader } from "@/components/dashboard/page-header";
import { SampleDataNotice } from "@/components/dashboard/preview-banner";
import { QuoteBadge } from "@/components/dashboard/quote-badge";
import {
  getDashboardData,
  withParams,
  type DashboardSearchParams,
} from "@/lib/dashboard";
import { formatMoney, formatPct, formatSignedMoney, trendClass } from "@/lib/format";
import { Plus, Star } from "lucide-react";
import Link from "next/link";

type Props = { searchParams: DashboardSearchParams };

export default function WatchlistsPage({ searchParams }: Props) {
  const { data, isSample } = getDashboardData(searchParams);
  const { watchlists } = data;
  const forceEmpty = !isSample;

  return (
    <>
      {isSample ? <SampleDataNotice /> : null}

      <PageHeader
        title="Watchlists"
        description="Symbols you're following, with current prices."
        actions={
          <button
            type="button"
            disabled
            title="Creating a watchlist needs an account, which isn't built yet"
            className="inline-flex cursor-not-allowed items-center gap-1.5 rounded-md bg-slate-200 px-4 py-2 text-sm font-semibold text-slate-500"
          >
            <Plus className="h-4 w-4" aria-hidden="true" />
            New watchlist
          </button>
        }
      />

      {watchlists.length === 0 ? (
        <EmptyState
          icon={<Star className="h-5 w-5" />}
          title="No watchlists yet"
          description="Follow stocks, ETFs and crypto to see their prices in one place."
          note="Watchlists need an account and a database, which aren't built yet."
        />
      ) : (
        <div className="space-y-6">
          {watchlists.map((watchlist) => (
            <section
              key={watchlist.id}
              className="rounded-xl border border-slate-200 bg-white"
            >
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-200 px-5 py-4">
                <h2 className="text-base font-semibold text-slate-900">
                  <Link
                    href={withParams(
                      `/dashboard/watchlists/${watchlist.id}`,
                      forceEmpty
                    )}
                    className="hover:underline"
                  >
                    {watchlist.name}
                  </Link>
                </h2>
                <span className="text-xs text-slate-500">
                  {watchlist.items.length}{" "}
                  {watchlist.items.length === 1 ? "symbol" : "symbols"}
                </span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full min-w-[640px] text-sm">
                  <thead className="border-b border-slate-200 bg-slate-50 text-left text-xs uppercase tracking-wide text-slate-500">
                    <tr>
                      <th scope="col" className="px-5 py-3 font-medium">Symbol</th>
                      <th scope="col" className="px-5 py-3 font-medium">Class</th>
                      <th scope="col" className="px-5 py-3 font-medium">Trend</th>
                      <th scope="col" className="px-5 py-3 text-right font-medium">Price</th>
                      <th scope="col" className="px-5 py-3 text-right font-medium">Change</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {watchlist.items.map((row) => (
                      <tr key={row.symbol} className="hover:bg-slate-50">
                        <td className="px-5 py-3">
                          <p className="font-semibold text-slate-900">
                            {row.symbol}
                          </p>
                          <p className="text-xs text-slate-500">{row.name}</p>
                        </td>
                        <td className="px-5 py-3">
                          <span className="rounded bg-slate-100 px-2 py-0.5 text-xs font-medium uppercase text-slate-600">
                            {row.assetClass}
                          </span>
                          {row.historyFrom ? (
                            <span className="mt-1 block text-xs text-slate-400">
                              History from{" "}
                              {new Date(row.historyFrom).getFullYear()}
                            </span>
                          ) : null}
                        </td>
                        <td className="px-5 py-3">
                          {row.spark ? (
                            <Sparkline values={row.spark} className="h-7 w-20" />
                          ) : (
                            <span className="text-xs text-slate-400">—</span>
                          )}
                        </td>
                        <td className="px-5 py-3 text-right tabular-nums font-medium text-slate-900">
                          {row.quote ? formatMoney(row.quote.price) : "—"}
                          <span className="mt-0.5 block">
                            <QuoteBadge quote={row.quote} />
                          </span>
                        </td>
                        <td
                          className={`px-5 py-3 text-right tabular-nums font-semibold ${trendClass(
                            row.quote?.changePct ?? 0
                          )}`}
                        >
                          {row.quote ? formatPct(row.quote.changePct) : "—"}
                          {row.quote ? (
                            <span className="block text-xs font-normal">
                              {formatSignedMoney(row.quote.change)}
                            </span>
                          ) : null}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          ))}
        </div>
      )}

      <p className="text-xs text-slate-500">
        Prices are real-time for US-listed stocks and delayed for everything
        else; each row states which it is.
      </p>
    </>
  );
}
