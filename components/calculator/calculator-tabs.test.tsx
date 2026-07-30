/**
 * @vitest-environment jsdom
 *
 * Regression tests for tab state isolation.
 *
 * Previously CalculatorTabs held a single result/error/isLoading triple shared
 * by both tabs, so calculating on Stocks made that result render inside the
 * Crypto tab as well. These tests pin the fixed behaviour.
 *
 * CalculatorForm is mocked so the tests exercise the parent's state management
 * rather than react-hook-form, zod and two Radix date-picker popovers. What is
 * under test here is which tab owns which state.
 */
import { cleanup, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("./calculator-form", () => ({
  CalculatorForm: ({
    onSubmit,
    isLoading,
    error,
  }: {
    onSubmit: (data: unknown) => void;
    isLoading?: boolean;
    error?: string | null;
  }) => (
    <div>
      {error ? <p role="alert">{error}</p> : null}
      <span data-testid="loading">{String(Boolean(isLoading))}</span>
      <button
        type="button"
        onClick={() =>
          onSubmit({
            ticker: "ibm",
            amountInvested: 1000,
            startDate: new Date("2020-01-01"),
            endDate: new Date("2021-01-01"),
          })
        }
      >
        run calculation
      </button>
    </div>
  ),
}));

import { CalculatorTabs } from "./calculator-tabs";

const STOCK_RESULT = { amount: 2500, profit: 1500, percentageChange: 150 };

function mockFetchOnce(body: unknown, ok = true) {
  const fetchMock = vi.fn().mockResolvedValue({
    ok,
    json: async () => body,
  });
  vi.stubGlobal("fetch", fetchMock);
  return fetchMock;
}

beforeEach(() => {
  vi.spyOn(console, "error").mockImplementation(() => {});
});

afterEach(() => {
  // Explicit: RTL's automatic cleanup only registers when Vitest runs with
  // `globals: true`, and this suite keeps globals off so the node-environment
  // tests stay clean. Without this, renders accumulate across tests and every
  // query fails with "found multiple elements".
  cleanup();
  vi.unstubAllGlobals();
  vi.restoreAllMocks();
});

describe("CalculatorTabs", () => {
  it("shows a successful result on the tab it was calculated from", async () => {
    mockFetchOnce(STOCK_RESULT);
    const user = userEvent.setup();
    render(<CalculatorTabs />);

    await user.click(screen.getByRole("button", { name: "run calculation" }));

    await waitFor(() => {
      expect(screen.getByLabelText("Final Amount")).toHaveValue("$2500.00");
    });
    expect(screen.getByLabelText("Profit/Loss")).toHaveValue("+$1500.00");
    expect(screen.getByLabelText("Percentage")).toHaveValue("+150.00%");
  });

  it("does not leak a Stocks result into the Crypto tab", async () => {
    mockFetchOnce(STOCK_RESULT);
    const user = userEvent.setup();
    render(<CalculatorTabs />);

    await user.click(screen.getByRole("button", { name: "run calculation" }));
    await waitFor(() => {
      expect(screen.getByLabelText("Final Amount")).toBeInTheDocument();
    });

    await user.click(screen.getByRole("tab", { name: "Crypto" }));

    // The regression: this used to render the Stocks result.
    expect(screen.queryByLabelText("Final Amount")).not.toBeInTheDocument();
  });

  it("keeps each tab's result when switching away and back", async () => {
    mockFetchOnce(STOCK_RESULT);
    const user = userEvent.setup();
    render(<CalculatorTabs />);

    await user.click(screen.getByRole("button", { name: "run calculation" }));
    await waitFor(() => {
      expect(screen.getByLabelText("Final Amount")).toBeInTheDocument();
    });

    await user.click(screen.getByRole("tab", { name: "Crypto" }));
    await user.click(screen.getByRole("tab", { name: "Stocks" }));

    // Radix unmounts inactive panels, so this only holds because the state
    // lives in the parent keyed by tab rather than inside each panel.
    expect(screen.getByLabelText("Final Amount")).toHaveValue("$2500.00");
  });

  it("does not leak an error from one tab to the other", async () => {
    mockFetchOnce({ error: "Rate limited" }, false);
    const user = userEvent.setup();
    render(<CalculatorTabs />);

    await user.click(screen.getByRole("button", { name: "run calculation" }));
    await waitFor(() => {
      expect(screen.getByRole("alert")).toHaveTextContent("Rate limited");
    });

    await user.click(screen.getByRole("tab", { name: "Crypto" }));

    expect(screen.queryByRole("alert")).not.toBeInTheDocument();
  });

  it("scopes the loading state to the tab being calculated", async () => {
    let resolveFetch: (v: unknown) => void = () => {};
    vi.stubGlobal(
      "fetch",
      vi.fn().mockReturnValue(
        new Promise((resolve) => {
          resolveFetch = resolve;
        }),
      ),
    );
    const user = userEvent.setup();
    render(<CalculatorTabs />);

    await user.click(screen.getByRole("button", { name: "run calculation" }));
    await waitFor(() => {
      expect(screen.getByTestId("loading")).toHaveTextContent("true");
    });

    await user.click(screen.getByRole("tab", { name: "Crypto" }));
    expect(screen.getByTestId("loading")).toHaveTextContent("false");

    resolveFetch({ ok: true, json: async () => STOCK_RESULT });
  });

  it("renders both tabs with the Stocks panel active by default", () => {
    mockFetchOnce(STOCK_RESULT);
    render(<CalculatorTabs />);

    expect(screen.getByRole("tab", { name: "Stocks" })).toHaveAttribute(
      "data-state",
      "active",
    );
    expect(screen.getByRole("tab", { name: "Crypto" })).toHaveAttribute(
      "data-state",
      "inactive",
    );
  });
});
