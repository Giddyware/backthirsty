import { PageHeader } from "@/components/dashboard/page-header";
import { SampleDataNotice } from "@/components/dashboard/preview-banner";
import { QuoteBadge } from "@/components/dashboard/quote-badge";
import { Sparkline } from "@/components/dashboard/area-chart";
import {
  getDashboardData,
  withParams,
  type DashboardSearchParams,
} from "@/lib/dashboard";
import { formatMoney, formatPct, formatSignedMoney, trendClass } from "@/lib/format";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

type Props = {
  params: { id: string };
  searchParams: DashboardSearchParams;
};

export default function WatchlistDetailPage({ params, searchParams }: Props) {
  const { data, isSample } = getDashboardData(searchParams);
  const forceEmpty = !isSample;
  const watchlist = data.watchlists.find((w) => w.id === params.id);

  if (!watchlist) notFound();

  return (
    <>
      {isSample ? <SampleDataNotice /> : null}

      <Link
        href={withParams("/dashboard/watchlists", forceEmpty)}
        className="inline-flex items-center gap-1.5 text-sm text-slate-600 hover:text-slate-900"
      >
        <ArrowLeft className="h-4 w-4" aria-hidden="true" />
        All watchlists
      </Link>

      <PageHeader
        title={watchlist.name}
        description={`${watchlist.items.length} ${
          watchlist.items.length === 1 ? "symbol" : "symbols"
        }`}
      />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {watchlist.items.map((row) => (
          <div
            key={row.symbol}
            className="rounded-xl border border-slate-200 bg-white p-5"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <p className="text-lg font-bold text-slate-900">{row.symbol}</p>
                <p className="truncate text-xs text-slate-500">{row.name}</p>
              </div>
              <span className="shrink-0 rounded bg-slate-100 px-2 py-0.5 text-xs font-medium uppercase text-slate-600">
                {row.assetClass}
              </span>
            </div>

            <p className="mt-4 text-2xl font-bold tabular-nums text-slate-900">
              {row.quote ? formatMoney(row.quote.price) : "—"}
            </p>
            <p
              className={`text-sm font-medium tabular-nums ${trendClass(
                row.quote?.changePct ?? 0
              )}`}
            >
              {row.quote
                ? `${formatSignedMoney(row.quote.change)} (${formatPct(
                    row.quote.changePct
                  )})`
                : "No quote available"}
            </p>

            {row.spark ? (
              <Sparkline values={row.spark} className="mt-3 h-10 w-full" />
            ) : null}

            <div className="mt-3 border-t border-slate-100 pt-3">
              <QuoteBadge quote={row.quote} />
            </div>
          </div>
        ))}
      </div>

      <p className="text-xs text-slate-500">
        Not investment advice. Past performance does not indicate future results.
      </p>
    </>
  );
}
