/**
 * View models the dashboard renders.
 *
 * These deliberately mirror the planned database schema (instruments,
 * watchlists, portfolios/holdings, backtests) so that when the data layer
 * lands, pages consume real rows without being rewritten.
 */

export type AssetClass = "stock" | "etf" | "crypto" | "index";

export type Instrument = {
  symbol: string;
  name: string;
  assetClass: AssetClass;
  exchange?: string;
  /** Earliest date this asset has price history for. Varies per asset. */
  historyFrom?: string;
};

export type Quote = {
  price: number;
  change: number;
  changePct: number;
  /** ISO timestamp the price was observed. */
  asOf: string;
  /**
   * True when the feed is delayed rather than real-time. Free tiers are
   * real-time only for US equities, so this must be surfaced, never assumed.
   */
  delayed: boolean;
};

export type WatchlistRow = Instrument & {
  quote: Quote | null;
  /** Recent closes, oldest first, for the row sparkline. */
  spark?: number[];
};

export type Watchlist = {
  id: string;
  name: string;
  items: WatchlistRow[];
};

export type Holding = Instrument & {
  id: string;
  quantity: number;
  /** Per-unit cost basis, in the portfolio's base currency. */
  costBasis: number;
  acquiredAt: string;
  quote: Quote | null;
};

export type Portfolio = {
  id: string;
  name: string;
  baseCurrency: string;
  holdings: Holding[];
};

export type SeriesPoint = { date: string; value: number };

export type BacktestLeg = {
  symbol: string;
  name: string;
  assetClass: AssetClass;
  /** Target allocation. Legs sum to 100. */
  weightPct: number;
  startPrice: number;
  endPrice: number;
  units: number;
  startValue: number;
  endValue: number;
  returnPct: number;
  /** Share of the total profit this leg produced — answers "what carried it". */
  contributionToProfit: number;
};

export type BacktestSummary = {
  id: string;
  name: string;
  /** Legs are snapshotted at run time, so a saved result never changes. */
  symbols: string[];
  initialAmount: number;
  finalAmount: number;
  profit: number;
  totalReturnPct: number;
  startDate: string;
  endDate: string;
  createdAt: string;
  /** Null when the span is under ~1 year, where CAGR misleads. */
  cagrPct?: number | null;
  maxDrawdownPct?: number;
  rebalance?: "none" | "monthly" | "quarterly" | "annual";
  series?: SeriesPoint[];
  legs?: BacktestLeg[];
};

export type NewsItem = {
  id: string;
  headline: string;
  source: string;
  url: string;
  publishedAt: string;
  symbol?: string;
};

/** Everything the dashboard overview needs in one shape. */
export type DashboardData = {
  watchlists: Watchlist[];
  portfolios: Portfolio[];
  backtests: BacktestSummary[];
  news: NewsItem[];
};

export const EMPTY_DASHBOARD: DashboardData = {
  watchlists: [],
  portfolios: [],
  backtests: [],
  news: [],
};

// --- Derived values -------------------------------------------------------
// Kept here rather than in components so they can be unit-tested and so the
// same arithmetic is not reimplemented per page.

export type PortfolioTotals = {
  invested: number;
  currentValue: number;
  gain: number;
  gainPct: number;
  /** True when at least one holding has no quote, so totals are incomplete. */
  partial: boolean;
};

export function holdingInvested(holding: Holding): number {
  return holding.quantity * holding.costBasis;
}

export function holdingValue(holding: Holding): number | null {
  return holding.quote ? holding.quantity * holding.quote.price : null;
}

export function portfolioTotals(portfolio: Portfolio): PortfolioTotals {
  let invested = 0;
  let currentValue = 0;
  let partial = false;

  for (const holding of portfolio.holdings) {
    invested += holdingInvested(holding);
    const value = holdingValue(holding);
    if (value === null) {
      partial = true;
      // Fall back to cost so the total is never wildly understated; `partial`
      // tells the UI to caveat the number.
      currentValue += holdingInvested(holding);
    } else {
      currentValue += value;
    }
  }

  const gain = currentValue - invested;
  return {
    invested,
    currentValue,
    gain,
    gainPct: invested === 0 ? 0 : (gain / invested) * 100,
    partial,
  };
}
