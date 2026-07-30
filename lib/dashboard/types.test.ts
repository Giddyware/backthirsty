import { describe, expect, it } from "vitest";
import {
  holdingInvested,
  holdingValue,
  portfolioTotals,
  type Holding,
  type Portfolio,
} from "./types";

function holding(overrides: Partial<Holding> = {}): Holding {
  return {
    id: "h",
    symbol: "AAPL",
    name: "Apple Inc.",
    assetClass: "stock",
    quantity: 10,
    costBasis: 150,
    acquiredAt: "2023-01-01",
    quote: {
      price: 200,
      change: 2,
      changePct: 1,
      asOf: "2026-07-30T00:00:00.000Z",
      delayed: false,
    },
    ...overrides,
  };
}

function portfolio(holdings: Holding[]): Portfolio {
  return { id: "p", name: "Test", baseCurrency: "USD", holdings };
}

describe("holding arithmetic", () => {
  it("computes invested as quantity times cost basis", () => {
    expect(holdingInvested(holding())).toBe(1500);
  });

  it("computes value from the live quote", () => {
    expect(holdingValue(holding())).toBe(2000);
  });

  it("returns null value when there is no quote rather than guessing", () => {
    expect(holdingValue(holding({ quote: null }))).toBeNull();
  });

  it("handles fractional quantities", () => {
    const btc = holding({
      quantity: 0.25,
      costBasis: 30000,
      quote: {
        price: 64000,
        change: 0,
        changePct: 0,
        asOf: "2026-07-30T00:00:00.000Z",
        delayed: true,
      },
    });
    expect(holdingInvested(btc)).toBe(7500);
    expect(holdingValue(btc)).toBe(16000);
  });
});

describe("portfolioTotals", () => {
  it("matches the plan's worked example: 10 @ $150 cost, $200 live", () => {
    const totals = portfolioTotals(portfolio([holding()]));
    expect(totals.invested).toBe(1500);
    expect(totals.currentValue).toBe(2000);
    expect(totals.gain).toBe(500);
    expect(totals.gainPct).toBeCloseTo(33.333, 3);
    expect(totals.partial).toBe(false);
  });

  it("sums across holdings", () => {
    const totals = portfolioTotals(
      portfolio([
        holding({ id: "a" }),
        holding({ id: "b", quantity: 5, costBasis: 400, quote: {
          price: 560, change: 0, changePct: 0,
          asOf: "2026-07-30T00:00:00.000Z", delayed: false,
        } }),
      ]),
    );
    expect(totals.invested).toBe(1500 + 2000);
    expect(totals.currentValue).toBe(2000 + 2800);
    expect(totals.gain).toBe(1300);
  });

  it("flags partial totals and falls back to cost when a quote is missing", () => {
    const totals = portfolioTotals(
      portfolio([holding({ id: "a" }), holding({ id: "b", quote: null })]),
    );
    expect(totals.partial).toBe(true);
    // Second holding contributes its cost (1500), not zero — so the total is
    // never wildly understated, and `partial` tells the UI to caveat it.
    expect(totals.invested).toBe(3000);
    expect(totals.currentValue).toBe(2000 + 1500);
  });

  it("reports a loss as negative rather than clamping at zero", () => {
    const totals = portfolioTotals(
      portfolio([
        holding({
          costBasis: 300,
          quote: {
            price: 200, change: 0, changePct: 0,
            asOf: "2026-07-30T00:00:00.000Z", delayed: false,
          },
        }),
      ]),
    );
    expect(totals.gain).toBe(-1000);
    expect(totals.gainPct).toBeCloseTo(-33.333, 3);
  });

  it("does not divide by zero on an empty portfolio", () => {
    const totals = portfolioTotals(portfolio([]));
    expect(totals.invested).toBe(0);
    expect(totals.currentValue).toBe(0);
    expect(totals.gainPct).toBe(0);
    expect(Number.isNaN(totals.gainPct)).toBe(false);
  });
});
