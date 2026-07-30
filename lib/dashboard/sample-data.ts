import type { BacktestLeg, DashboardData, SeriesPoint } from "./types";

/**
 * Sample data used while the database and price providers are being built.
 *
 * These numbers are INVENTED. Every page that renders them also renders
 * <SampleDataNotice />, so they are never presented as real prices, holdings or
 * results. Delete this file once the data layer lands.
 *
 * Values are round and unremarkable on purpose so they cannot be mistaken for
 * a live quote, while still being internally consistent — totals, returns and
 * contributions all add up, so the UI's arithmetic is genuinely exercised.
 */

const asOf = "2026-07-30T15:45:00.000Z";

function quote(price: number, changePct: number, delayed = false) {
  const change = Number(((price * changePct) / 100).toFixed(2));
  return { price, change, changePct, asOf, delayed };
}

/**
 * Builds a monthly series from `from` to `to` following a smooth curve with a
 * mid-period drawdown, so charts show a realistic shape rather than a
 * straight line.
 */
function series(
  startYear: number,
  endYear: number,
  startValue: number,
  endValue: number,
  drawdown = 0.25
): SeriesPoint[] {
  const months = (endYear - startYear) * 12;
  const step = Math.max(1, Math.round(months / 24)); // ~24 points
  const points: SeriesPoint[] = [];

  for (let m = 0; m <= months; m += step) {
    const t = m / months;
    // Exponential growth path between the two endpoints.
    const growth = startValue * Math.pow(endValue / startValue, t);
    // A dip centred around 55% through the period.
    const dip = 1 - drawdown * Math.exp(-Math.pow((t - 0.55) / 0.12, 2));
    // Mild deterministic ripple so it doesn't look synthetic-smooth.
    const ripple = 1 + 0.035 * Math.sin(m / 2.2);

    const date = new Date(Date.UTC(startYear, m, 1));
    // Snap to month-end: stock prices are month-end closes.
    date.setUTCMonth(date.getUTCMonth() + 1);
    date.setUTCDate(0);

    points.push({
      date: date.toISOString().slice(0, 10),
      value: Number((growth * dip * ripple).toFixed(2)),
    });
  }

  // Force the final point to the stated end value so the chart agrees with the
  // headline figure.
  if (points.length) {
    points[points.length - 1] = {
      date: `${endYear}-01-31`,
      value: endValue,
    };
  }

  return points;
}

function leg(
  symbol: string,
  name: string,
  assetClass: BacktestLeg["assetClass"],
  weightPct: number,
  initialAmount: number,
  startPrice: number,
  endPrice: number,
  totalProfit: number
): BacktestLeg {
  const startValue = (initialAmount * weightPct) / 100;
  const units = startValue / startPrice;
  const endValue = units * endPrice;
  const profit = endValue - startValue;

  return {
    symbol,
    name,
    assetClass,
    weightPct,
    startPrice,
    endPrice,
    units: Number(units.toFixed(6)),
    startValue: Number(startValue.toFixed(2)),
    endValue: Number(endValue.toFixed(2)),
    returnPct: Number(((profit / startValue) * 100).toFixed(2)),
    contributionToProfit:
      totalProfit === 0 ? 0 : Number(((profit / totalProfit) * 100).toFixed(1)),
  };
}

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
    {
      id: "bt_1",
      name: "$1,000 in Apple, 2015–2025",
      symbols: ["AAPL"],
      initialAmount: 1000,
      finalAmount: 6420,
      profit: 5420,
      totalReturnPct: 542,
      startDate: "2015-01-31",
      endDate: "2025-01-31",
      createdAt: "2026-07-28T09:12:00.000Z",
      cagrPct: 20.47,
      maxDrawdownPct: 31.4,
      rebalance: "none",
      series: series(2015, 2025, 1000, 6420, 0.22),
      legs: [
        leg("AAPL", "Apple Inc.", "stock", 100, 1000, 27.33, 175.44, 5420),
      ],
    },
    {
      id: "bt_2",
      name: "60/40 stocks and Bitcoin",
      symbols: ["SPY", "BTC"],
      initialAmount: 5000,
      finalAmount: 11875,
      profit: 6875,
      totalReturnPct: 137.5,
      startDate: "2019-06-30",
      endDate: "2025-06-30",
      createdAt: "2026-07-26T17:40:00.000Z",
      cagrPct: 15.51,
      maxDrawdownPct: 27.8,
      rebalance: "annual",
      series: series(2019, 2025, 5000, 11875, 0.28),
      legs: [
        leg("SPY", "SPDR S&P 500 ETF Trust", "etf", 60, 5000, 293.0, 545.0, 6875),
        leg("BTC", "Bitcoin", "crypto", 40, 5000, 10800, 61000, 6875),
      ],
    },
    {
      id: "bt_3",
      name: "Bitcoin since 2016",
      symbols: ["BTC"],
      initialAmount: 1000,
      finalAmount: 148000,
      profit: 147000,
      totalReturnPct: 14700,
      startDate: "2016-01-31",
      endDate: "2025-12-31",
      createdAt: "2026-07-20T11:05:00.000Z",
      cagrPct: 65.32,
      maxDrawdownPct: 76.2,
      rebalance: "none",
      series: series(2016, 2025, 1000, 148000, 0.35),
      legs: [leg("BTC", "Bitcoin", "crypto", 100, 1000, 368.0, 54464.0, 147000)],
    },
    {
      id: "bt_4",
      name: "Equal-weight tech basket",
      symbols: ["AAPL", "QQQ", "SPY"],
      initialAmount: 10000,
      finalAmount: 24300,
      profit: 14300,
      totalReturnPct: 143,
      startDate: "2018-01-31",
      endDate: "2025-01-31",
      createdAt: "2026-07-15T08:22:00.000Z",
      cagrPct: 13.5,
      maxDrawdownPct: 24.1,
      rebalance: "quarterly",
      series: series(2018, 2025, 10000, 24300, 0.24),
      legs: [
        leg("AAPL", "Apple Inc.", "stock", 34, 10000, 41.9, 175.44, 14300),
        leg("QQQ", "Invesco QQQ Trust", "etf", 33, 10000, 154.0, 425.0, 14300),
        leg("SPY", "SPDR S&P 500 ETF Trust", "etf", 33, 10000, 261.0, 545.0, 14300),
      ],
    },
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
