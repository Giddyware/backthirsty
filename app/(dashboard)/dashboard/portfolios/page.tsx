import { EmptyState } from "@/components/dashboard/empty-state";
import { PageHeader } from "@/components/dashboard/page-header";
import { SampleDataNotice } from "@/components/dashboard/preview-banner";
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
  formatSignedMoney,
  trendClass,
} from "@/lib/format";
import { Plus, Wallet } from "lucide-react";
import Link from "next/link";

type Props = { searchParams: DashboardSearchParams };

export default function PortfoliosPage({ searchParams }: Props) {
  const { data, isSample } = getDashboardData(searchParams);
  const { portfolios } = data;
  const forceEmpty = !isSample;

  return (
    <>
      {isSample ? <SampleDataNotice /> : null}

      <PageHeader
        title="Portfolios"
        description="Track what you actually own — quantity and cost basis — and see live value and unrealised gain or loss."
        actions={
          <button
            type="button"
            disabled
            title="Creating a portfolio needs an account, which isn't built yet"
            className="inline-flex cursor-not-allowed items-center gap-1.5 rounded-md bg-slate-200 px-4 py-2 text-sm font-semibold text-slate-500"
          >
            <Plus className="h-4 w-4" aria-hidden="true" />
            New portfolio
          </button>
        }
      />

      {portfolios.length === 0 ? (
        <EmptyState
          icon={<Wallet className="h-5 w-5" />}
          title="No portfolios yet"
          description="Add the holdings you own with their quantity and cost basis to track value and gain over time."
          note="Portfolios need an account and a database, which aren't built yet."
        />
      ) : (
        <div className="space-y-6">
          {portfolios.map((portfolio) => {
            const totals = portfolioTotals(portfolio);

            return (
              <section
                key={portfolio.id}
                className="rounded-xl border border-slate-200 bg-white p-5"
              >
                <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
                  <h2 className="text-base font-semibold text-slate-900">
                    <Link
                      href={withParams(
                        `/dashboard/portfolios/${portfolio.id}`,
                        forceEmpty
                      )}
                      className="hover:underline"
                    >
                      {portfolio.name}
                    </Link>
                  </h2>
                  <span className="text-xs text-slate-500">
                    {portfolio.holdings.length}{" "}
                    {portfolio.holdings.length === 1 ? "holding" : "holdings"} ·{" "}
                    {portfolio.baseCurrency}
                  </span>
                </div>

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
                  <StatCard
                    label="Invested"
                    value={formatMoney(totals.invested)}
                  />
                  <StatCard
                    label="Unrealised gain"
                    value={formatSignedMoney(totals.gain)}
                    delta={formatPct(totals.gainPct)}
                    deltaClassName={trendClass(totals.gain)}
                  />
                </div>
              </section>
            );
          })}
        </div>
      )}

      <p className="text-xs text-slate-500">
        Portfolio tracking is not brokerage- or tax-grade: no dividend
        reinvestment, no fees, and no currency conversion.
      </p>
    </>
  );
}
