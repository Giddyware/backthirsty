"use client";

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useCallback, useState } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { CryptoPills } from "../crypto/crypto-pills";
import { CalculatorForm } from "./calculator-form";
import { CalculatorResult } from "./calculator-result";
import { CALCULATOR_TABS, ERROR_MESSAGES, type CalculatorTabsType } from "./constants";
import { CalculatorInputs } from "./types";

type CalculationResult = {
  amount: number;
  profit: number;
  percentageChange: number;
};

type TabState = {
  result: CalculationResult | null;
  isLoading: boolean;
  error: string | null;
};

const EMPTY_TAB_STATE: TabState = { result: null, isLoading: false, error: null };

/**
 * State is keyed per tab rather than shared. Previously a single result/error/
 * isLoading triple was shared across both tabs, so calculating on Stocks made
 * that result render inside the Crypto tab too.
 *
 * The state lives here in the parent rather than inside a per-tab component
 * because Radix unmounts inactive TabsContent — per-instance state would be
 * discarded every time the user switched tabs.
 */
export const CalculatorTabs = () => {
  const [tabState, setTabState] = useState<Record<CalculatorTabsType, TabState>>({
    [CALCULATOR_TABS.STOCKS]: EMPTY_TAB_STATE,
    [CALCULATOR_TABS.CRYPTO]: EMPTY_TAB_STATE,
  });

  const patchTab = useCallback((tab: CalculatorTabsType, patch: Partial<TabState>) => {
    setTabState((prev) => ({ ...prev, [tab]: { ...prev[tab], ...patch } }));
  }, []);

  const handleCalculate = useCallback(
    async (tab: CalculatorTabsType, data: CalculatorInputs) => {
      patchTab(tab, { isLoading: true, error: null });

      try {
        const response = await fetch("/api/calculate", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            ticker: data.ticker.toUpperCase(),
            amountInvested: Number(data.amountInvested),
            startDate: data.startDate.toISOString(),
            endDate: data.endDate.toISOString(),
          }),
        });

        const responseData = await response.json();

        if (!response.ok) {
          throw new Error(responseData.error || ERROR_MESSAGES.CALCULATION_FAILED);
        }

        patchTab(tab, { result: responseData, isLoading: false });
      } catch (error) {
        console.error("Calculator Error:", error);
        patchTab(tab, {
          error: error instanceof Error ? error.message : ERROR_MESSAGES.CALCULATION_FAILED,
          isLoading: false,
        });
      }
    },
    [patchTab]
  );

  const renderCalculator = (type: CalculatorTabsType) => {
    const { result, isLoading, error } = tabState[type];

    return (
      <Card className="border-none">
        <CardHeader>
          {type === CALCULATOR_TABS.STOCKS ? (
            <>
              <CardTitle>Stocks</CardTitle>
              <CardDescription>Calculate potential earnings from stock investments.</CardDescription>
            </>
          ) : (
            <CardDescription className="mx-auto">
              <CryptoPills />
            </CardDescription>
          )}
        </CardHeader>
        <CardContent>
          <CalculatorForm
            onSubmit={(data) => handleCalculate(type, data)}
            isLoading={isLoading}
            error={error}
          />
        </CardContent>
        {result !== null && (
          <CardFooter className="flex-col items-stretch w-full">
            <CalculatorResult {...result} />
          </CardFooter>
        )}
      </Card>
    );
  };

  return (
    <ErrorBoundary fallback={<div>Something went wrong. Please try again.</div>}>
      <Tabs defaultValue={CALCULATOR_TABS.STOCKS} className="w-full lg:w-[523px] rounded-[9px] bg-white pt-6 mx-auto">
        <TabsList className="grid max-w-[368px] gap-3 bg-[#F0F0F0] rounded-[10px] p-[2.3px] mx-auto grid-cols-2 h-auto">
          {Object.entries(CALCULATOR_TABS).map(([key, value]) => (
            <TabsTrigger key={value} value={value}>
              {key.charAt(0) + key.slice(1).toLowerCase()}
            </TabsTrigger>
          ))}
        </TabsList>

        {Object.values(CALCULATOR_TABS).map((value) => (
          <TabsContent key={value} value={value}>
            {renderCalculator(value)}
          </TabsContent>
        ))}
      </Tabs>
    </ErrorBoundary>
  );
};
