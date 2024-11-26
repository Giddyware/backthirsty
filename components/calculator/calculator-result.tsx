import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

interface CalculatorResultProps {
  amount: number;
  profit: number;
  percentageChange: number;
}

export const CalculatorResult = ({ amount, profit, percentageChange }: CalculatorResultProps) => {
  const isPositive = profit >= 0;

  return (
    <div className="space-y-4">
      <div className="space-y-1">
        <Label htmlFor="final_amount">Final Amount</Label>
        <Input
          id="final_amount"
          value={`$${amount.toFixed(2)}`}
          readOnly
          className="text-lg font-semibold"
        />
      </div>
      <div className="flex gap-4">
        <div className="space-y-1 flex-1">
          <Label htmlFor="profit">Profit/Loss</Label>
          <Input
            id="profit"
            value={`${isPositive ? '+' : ''}$${profit.toFixed(2)}`}
            readOnly
            className={cn(
              "font-medium",
              isPositive ? "text-green-600" : "text-red-600"
            )}
          />
        </div>
        <div className="space-y-1 flex-1">
          <Label htmlFor="percentage">Percentage</Label>
          <Input
            id="percentage"
            value={`${isPositive ? '+' : ''}${percentageChange.toFixed(2)}%`}
            readOnly
            className={cn(
              "font-medium",
              isPositive ? "text-green-600" : "text-red-600"
            )}
          />
        </div>
      </div>
    </div>
  );
};
