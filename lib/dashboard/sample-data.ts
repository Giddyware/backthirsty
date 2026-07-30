import type {
  BacktestLeg,
  BacktestSummary,
  DashboardData,
  SeriesPoint,
} from "./types";

/**
 * Sample data used while the database and price providers are being built.
 *
 * These numbers are INVENTED. Every page that renders them also renders
 * <SampleDataNotice />, so they are never presented as real prices, holdings or
 * results. Delete this file once the data layer lands.
 *
 * Everything is *derived* rather than hand-written: totals come from the legs,
 * CAGR comes from the totals, and the chart's endpoints come from the stated
 * period. Hand-picking both sides let the per-leg contributions sum to 172% of
 * the total profit, which would have shown a breakdown table that does not
 * reconcile — see sample-data.test.ts.
 */

const asOf = "2026-07-30T15:45:00.000Z";

function quote(price: number, changePct: number, delayed = false) {
  const change = Number(((price * changePct) / 100).toFixed(2));
  return { price, change, changePct, asOf, delayed };
}

// --- date helpers ---------------------------------------------------------

/** Month-end date `offset` months after the month of `from`. */
function monthEnd(from: string, offset: number): string {
  const base = new Date(`${from}T00:00:00Z`);
  // Day 0 of the following month is the last day of the target month.
  const d = new Date(
    Date.UTC(base.getUTCFullYear(), base.getUTCMonth() + offset + 1, 0)
  );
  return d.toISOString().slice(0, 10);
}

function monthsBetween(from: string, to: string): number {
  const a = new Date(`${from}T00:00:00Z`);
  const b = new Date(`${to}T00:00:00Z`);
  return (
    (b.getUTCFullYear() - a.getUTCFullYear()) * 12 +
    (b.getUTCMonth() - a.getUTCMonth())
  );
}

/**
 * Month-end series between two dates following a smooth curve with a mid-period
 * drawdown, so charts show a realistic shape rather than a straight line.
 *
 * Takes the actual start/end dates rather than years, so the chart axis always
 * agrees with the period in the page header.
 */
function series(
  startDate: string,
  endDate: string,
  startValue: number,
  endValue: number,
  drawdown: number
): SeriesPoint[] {
  const months = monthsBetween(startDate, endDate);
  if (months <= 0) return [];

  const step = Math.max(1, Math.round(months / 24)); // ~24 points
  const points: SeriesPoint[] = [];

  for (let m = 0; m <= months; m += step) {
    const t = m / months;
    const growth = startValue * Math.pow(endValue / startValue, t);
    const dip = 1 - drawdown * Math.exp(-Math.pow((t - 0.55) / 0.12, 2));
    const ripple = 1 + 0.035 * Math.sin(m / 2.2);

    points.push({
      date: monthEnd(startDate, m),
      value: Number((growth * dip * ripple).toFixed(2)),
    });
  }

  // Pin both endpoints to the stated figures.
  points[0] = { date: startDate, value: startValue };
  const last = points.length - 1;
  if (points[last].date !== endDate) {
    points.push({ date: endDate, value: endValue });
  } else {
    points[last] = { date: endDate, value: endValue };
  }

  return points;
}

// --- backtest builder -----------------------------------------------------

type LegSpec = {
  symbol: string;
  name: string;
  assetClass: BacktestLeg["assetClass"];
  weightPct: number;
  startPrice: number;
  endPrice: number;
};

/**
 * Builds a complete backtest from its inputs, deriving every output.
 * Guarantees by construction that legs, totals and contributions reconcile.
 */
function backtest(input: {
  id: string;
  name: string;
  initialAmount: number;
  startDate: string;
  endDate: string;
  createdAt: string;
  rebalance: NonNullable<BacktestSummary["rebalance"]>;
  maxDrawdownPct: number;
  legs: LegSpec[];
}): BacktestSummary {
  const { initialAmount, startDate, endDate } = input;

  const partial = input.legs.map((spec) => {
    const startValue = (initialAmount * spec.weightPct) / 100;
    const units = startValue / spec.startPrice;
    const endValue = units * spec.endPrice;
    return { spec, startValue, units, endValue, profit: endValue - startValue };
  });

  const finalAmount = partial.reduce((sum, l) => sum + l.endValue, 0);
  const profit = finalAmount - initialAmount;

  const legs: BacktestLeg[] = partial.map((l) => ({
    symbol: l.spec.symbol,
    name: l.spec.name,
    assetClass: l.spec.assetClass,
    weightPct: l.spec.weightPct,
    startPrice: l.spec.startPrice,
    endPrice: l.spec.endPrice,
    units: Number(l.units.toFixed(6)),
    startValue: Number(l.startValue.toFixed(2)),
    endValue: Number(l.endValue.toFixed(2)),
    returnPct: Number(((l.profit / l.startValue) * 100).toFixed(2)),
    contributionToProfit:
      profit === 0 ? 0 : Number(((l.profit / profit) * 100).toFixed(1)),
  }));

  const years = monthsBetween(startDate, endDate) / 12;
  const cagrPct =
    years < 1
      ? null
      : Number(
          ((Math.pow(finalAmount / initialAmount, 1 / years) - 1) * 100).toFixed(
            2
          )
        );

  return {
    id: input.id,
    name: input.name,
    symbols: legs.map((l) => l.symbol),
    initialAmount,
    finalAmount: Number(finalAmount.toFixed(2)),
    profit: Number(profit.toFixed(2)),
    totalReturnPct: Number(((profit / initialAmount) * 100).toFixed(2)),
    startDate,
    endDate,
    createdAt: input.createdAt,
    cagrPct,
    maxDrawdownPct: input.maxDrawdownPct,
    rebalance: input.rebalance,
    series: series(
      startDate,
      endDate,
      initialAmount,
      Number(finalAmount.toFixed(2)),
      input.maxDrawdownPct / 100
    ),
    legs,
  };
}

// --- data -----------------------------------------------------------------

export const SAMPLE_DASHBOARD: DashboardData = {
  watchlists: [
    {
      id: "wl_sample",
      name: "Watching",
      items: [
        {
          symbol: "AAPL",
          name: "Apple Inc.",
          assetClass: "stock",
          exchange: "NASDAQ",
          quote: quote(220, 1.24),
          spark: [205, 208, 206, 212, 210, 216, 214, 219, 220],
        },
        {
          symbol: "SPY",
          name: "SPDR S&P 500 ETF Trust",
          assetClass: "etf",
          exchange: "NYSE ARCA",
          quote: quote(560, 0.42),
          spark: [538, 542, 540, 547, 551, 549, 555, 558, 560],
        },
        {
          symbol: "BTC",
          name: "Bitcoin",
          assetClass: "crypto",
          historyFrom: "2016-01-01",
          // Crypto is not real-time on a free provider tier.
          quote: quote(64000, -0.85, true),
          spark: [66500, 67200, 65800, 66100, 64900, 65400, 64200, 64600, 64000],
        },
        {
          symbol: "SOL",
          name: "Solana",
          assetClass: "crypto",
          historyFrom: "2021-09-01",
          quote: quote(150, 2.1, true),
          spark: [138, 141, 139, 144, 143, 147, 146, 149, 150],
        },
        {
          symbol: "QQQ",
          name: "Invesco QQQ Trust",
          assetClass: "etf",
          exchange: "NASDAQ",
          quote: quote(480, -0.31),
          spark: [488, 486, 490, 484, 487, 483, 485, 481, 480],
        },
      ],
    },
  ],

  portfolios: [
    {
      id: "pf_sample",
      name: "Long-term",
      baseCurrency: "USD",
      holdings: [
        {
          id: "h_1",
          symbol: "AAPL",
          name: "Apple Inc.",
          assetClass: "stock",
          exchange: "NASDAQ",
          quantity: 10,
          costBasis: 150,
          acquiredAt: "2023-03-14",
          quote: quote(220, 1.24),
        },
        {
          id: "h_2",
          symbol: "SPY",
          name: "SPDR S&P 500 ETF Trust",
          assetClass: "etf",
          exchange: "NYSE ARCA",
          quantity: 5,
          costBasis: 400,
          acquiredAt: "2022-11-02",
          quote: quote(560, 0.42),
        },
        {
          id: "h_3",
          symbol: "BTC",
          name: "Bitcoin",
          assetClass: "crypto",
          historyFrom: "2016-01-01",
          quantity: 0.25,
          costBasis: 30000,
          acquiredAt: "2024-01-20",
          quote: quote(64000, -0.85, true),
        },
      ],
    },
    {
      id: "pf_income",
      name: "Income",
      baseCurrency: "USD",
      holdings: [
        {
          id: "h_4",
          symbol: "QQQ",
          name: "Invesco QQQ Trust",
          assetClass: "etf",
          exchange: "NASDAQ",
          quantity: 4,
          costBasis: 500,
          acquiredAt: "2024-06-11",
          quote: quote(480, -0.31),
        },
      ],
    },
  ],

  backtests: [
    backtest({
      id: "bt_1",
      name: "$1,000 in Apple, 2015–2025",
      initialAmount: 1000,
      startDate: "2015-01-31",
      endDate: "2025-01-31",
      createdAt: "2026-07-28T09:12:00.000Z",
      rebalance: "none",
      maxDrawdownPct: 31.4,
      legs: [
        {
          symbol: "AAPL",
          name: "Apple Inc.",
          assetClass: "stock",
          weightPct: 100,
          startPrice: 27.33,
          endPrice: 175.44,
        },
      ],
    }),
    backtest({
      id: "bt_2",
      name: "60/40 stocks and Bitcoin",
      initialAmount: 5000,
      startDate: "2019-06-30",
      endDate: "2025-06-30",
      createdAt: "2026-07-26T17:40:00.000Z",
      rebalance: "annual",
      maxDrawdownPct: 27.8,
      legs: [
        {
          symbol: "SPY",
          name: "SPDR S&P 500 ETF Trust",
          assetClass: "etf",
          weightPct: 60,
          startPrice: 293,
          endPrice: 545,
        },
        {
          symbol: "BTC",
          name: "Bitcoin",
          assetClass: "crypto",
          weightPct: 40,
          startPrice: 10800,
          endPrice: 61000,
        },
      ],
    }),
    backtest({
      id: "bt_3",
      name: "Bitcoin since 2016",
      initialAmount: 1000,
      startDate: "2016-01-31",
      endDate: "2025-12-31",
      createdAt: "2026-07-20T11:05:00.000Z",
      rebalance: "none",
      maxDrawdownPct: 76.2,
      legs: [
        {
          symbol: "BTC",
          name: "Bitcoin",
          assetClass: "crypto",
          weightPct: 100,
          startPrice: 368,
          endPrice: 54464,
        },
      ],
    }),
    backtest({
      id: "bt_4",
      name: "Equal-weight tech basket",
      initialAmount: 10000,
      startDate: "2018-01-31",
      endDate: "2025-01-31",
      createdAt: "2026-07-15T08:22:00.000Z",
      rebalance: "quarterly",
      maxDrawdownPct: 24.1,
      legs: [
        {
          symbol: "AAPL",
          name: "Apple Inc.",
          assetClass: "stock",
          weightPct: 34,
          startPrice: 41.9,
          endPrice: 175.44,
        },
        {
          symbol: "QQQ",
          name: "Invesco QQQ Trust",
          assetClass: "etf",
          weightPct: 33,
          startPrice: 154,
          endPrice: 425,
        },
        {
          symbol: "SPY",
          name: "SPDR S&P 500 ETF Trust",
          assetClass: "etf",
          weightPct: 33,
          startPrice: 261,
          endPrice: 545,
        },
      ],
    }),
  ],

  news: [
    {
      id: "n_1",
      headline:
        "Sample headline — market news appears here once the news provider is wired up",
      source: "Sample",
      url: "#",
      publishedAt: "2026-07-30T14:00:00.000Z",
    },
    {
      id: "n_2",
      headline:
        "Sample headline — per-ticker news will show on each quote page",
      source: "Sample",
      url: "#",
      publishedAt: "2026-07-30T12:30:00.000Z",
      symbol: "AAPL",
    },
    {
      id: "n_3",
      headline:
        "Sample headline — feeds are cached server-side for 15 minutes",
      source: "Sample",
      url: "#",
      publishedAt: "2026-07-30T09:15:00.000Z",
    },
    {
      id: "n_4",
      headline:
        "Sample headline — free provider tiers cap how often this can refresh",
      source: "Sample",
      url: "#",
      publishedAt: "2026-07-29T16:05:00.000Z",
    },
  ],
};
