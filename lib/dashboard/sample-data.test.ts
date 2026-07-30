import { describe, expect, it } from "vitest";
import { SAMPLE_DASHBOARD } from "./sample-data";
import { portfolioTotals } from "./types";

/**
 * The sample data stands in for real results, so it must be internally
 * consistent — otherwise the UI's arithmetic is being exercised against
 * figures that contradict each other, and layout bugs hide behind bad inputs.
 */

describe("sample backtests", () => {
  const { backtests } = SAMPLE_DASHBOARD;

  it("has backtests to show", () => {
    expect(backtests.length).toBeGreaterThan(0);
  });

  for (const bt of SAMPLE_DASHBOARD.backtests) {
    describe(bt.name, () => {
      it("profit equals final minus initial", () => {
        expect(bt.finalAmount - bt.initialAmount).toBeCloseTo(bt.profit, 2);
      });

      it("total return matches profit over initial", () => {
        expect((bt.profit / bt.initialAmount) * 100).toBeCloseTo(
          bt.totalReturnPct,
          1,
        );
      });

      it("chart endpoints match the stated period and amounts", () => {
        const series = bt.series ?? [];
        expect(series.length).toBeGreaterThan(2);
        // Regression: series() previously took years, so the axis read
        // "Jan 31" while the header said "Jun 30".
        expect(series[0].date).toBe(bt.startDate);
        expect(series[series.length - 1].date).toBe(bt.endDate);
        expect(series[0].value).toBeCloseTo(bt.initialAmount, 2);
        expect(series[series.length - 1].value).toBeCloseTo(bt.finalAmount, 2);
      });

      it("chart dates increase monotonically", () => {
        const dates = (bt.series ?? []).map((p) => p.date);
        const sorted = [...dates].slice().sort();
        expect(dates).toEqual(sorted);
      });

      it("leg weights sum to 100", () => {
        const total = (bt.legs ?? []).reduce((s, l) => s + l.weightPct, 0);
        expect(total).toBeCloseTo(100, 0);
      });

      it("leg symbols match the summary symbols", () => {
        expect((bt.legs ?? []).map((l) => l.symbol).sort()).toEqual(
          [...bt.symbols].sort(),
        );
      });

      it("profit contributions sum to roughly 100%", () => {
        const total = (bt.legs ?? []).reduce(
          (s, l) => s + l.contributionToProfit,
          0,
        );
        expect(total).toBeGreaterThan(95);
        expect(total).toBeLessThan(105);
      });

      it("each leg's units reconcile its start and end values", () => {
        for (const leg of bt.legs ?? []) {
          expect(leg.units * leg.startPrice).toBeCloseTo(leg.startValue, 1);
          expect(leg.units * leg.endPrice).toBeCloseTo(leg.endValue, 1);
        }
      });
    });
  }
});

describe("sample portfolios", () => {
  it("every portfolio has holdings and a computable total", () => {
    for (const portfolio of SAMPLE_DASHBOARD.portfolios) {
      expect(portfolio.holdings.length).toBeGreaterThan(0);
      const totals = portfolioTotals(portfolio);
      expect(Number.isFinite(totals.currentValue)).toBe(true);
      expect(Number.isFinite(totals.gainPct)).toBe(true);
    }
  });

  it("marks crypto quotes as delayed and US equities as real-time", () => {
    const quotes = [
      ...SAMPLE_DASHBOARD.portfolios.flatMap((p) => p.holdings),
      ...SAMPLE_DASHBOARD.watchlists.flatMap((w) => w.items),
    ];

    for (const row of quotes) {
      if (!row.quote) continue;
      // Free provider tiers are real-time only for US equities/ETFs.
      const expectDelayed = row.assetClass === "crypto";
      expect(row.quote.delayed).toBe(expectDelayed);
    }
  });

  it("gives crypto assets a history_from, since depth varies per asset", () => {
    const crypto = SAMPLE_DASHBOARD.watchlists
      .flatMap((w) => w.items)
      .filter((i) => i.assetClass === "crypto");

    expect(crypto.length).toBeGreaterThan(0);
    for (const asset of crypto) {
      expect(asset.historyFrom).toBeTruthy();
    }
  });
});
