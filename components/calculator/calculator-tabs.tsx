import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@radix-ui/react-tabs";
import { useCallback, useState } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { CryptoPills } from "../crypto/crypto-pills";
import { CalculatorForm } from "./calculator-form";
import { CalculatorResult } from "./calculator-result";
import { CALCULATOR_TABS, ERROR_MESSAGES, type CalculatorTabsType } from "./constants";
import { CalculatorInputs } from "./types";

export const CalculatorTabs = () => {
  const [result, setResult] = useState<{
    amount: number;
    profit: number;
    percentageChange: number;
  } | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleCalculate = useCallback(async (data: CalculatorInputs) => {
    try {
      setIsLoading(true);
      setError(null);
      
      const response = await fetch('/api/calculate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
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

      setResult(responseData);
    } catch (error) {
      console.error('Calculator Error:', error);
      setError(error instanceof Error ? error.message : ERROR_MESSAGES.CALCULATION_FAILED);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const renderCalculator = (type: CalculatorTabsType) => (
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
          onSubmit={handleCalculate} 
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

  return (
    <ErrorBoundary fallback={<div>Something went wrong. Please try again.</div>}>
      <Tabs defaultValue={CALCULATOR_TABS.STOCKS} className="w-full lg:w-[523px] rounded-[9px] bg-white pt-6 mx-auto">
        <TabsList className="grid max-w-[368px] gap-3 bg-[#F0F0F0] rounded-[10px] p-[2.3px] mx-auto grid-cols-2">
          {Object.entries(CALCULATOR_TABS).map(([key, value]) => (
            <TabsTrigger
              key={value}
              className="inline-flex items-center justify-center whitespace-nowrap rounded-[10px] px-3 py-2 text-sm font-medium ring-offset-background transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-[#14A83C] data-[state=active]:text-white data-[state=active]:shadow-sm"
              value={value}
            >
              {key.charAt(0) + key.slice(1).toLowerCase()}
            </TabsTrigger>
          ))}
        </TabsList>
        
        {Object.values(CALCULATOR_TABS).map((value) => (
          <TabsContent key={value} value={value}>
            {renderCalculator(value as keyof typeof CALCULATOR_TABS)}
          </TabsContent>
        ))}
      </Tabs>
    </ErrorBoundary>
  );
};
