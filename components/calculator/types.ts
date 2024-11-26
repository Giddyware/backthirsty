import { z } from "zod";

export const calculatorSchema = z.object({
  ticker: z.string().min(1, "Ticker is required"),
  amountInvested: z.number().min(0.01, "Amount must be greater than 0"),
  startDate: z.date().min(new Date('1900-01-01'), "Invalid date"),
  endDate: z.date().max(new Date(), "End date cannot be in the future"),
}).refine((data) => data.startDate < data.endDate, {
  message: "Start date must be before end date",
  path: ["startDate"],
});

export type CalculatorInputs = z.infer<typeof calculatorSchema>;

export interface CalculatorFormProps {
  onSubmit: (data: CalculatorInputs) => Promise<void>;
  isLoading?: boolean;
  error?: string | null;
}
