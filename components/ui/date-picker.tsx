import { cn } from "@/lib/utils"
import ReactDatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import { Label } from "./label"

interface DatePickerProps {
  onChange: (date: Date | null) => void
  label?: string
  error?: string
  maxDate?: Date
  minDate?: Date
}

export function DatePicker({ onChange, label, error, maxDate, minDate }: DatePickerProps) {
  return (
    <div className="space-y-1">
      {label && <Label>{label}</Label>}
      <ReactDatePicker
        onChange={onChange}
        customInput={
          <input
            className={cn(
              "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background",
              "file:border-0 file:bg-transparent file:text-sm file:font-medium",
              "placeholder:text-muted-foreground",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
              "disabled:cursor-not-allowed disabled:opacity-50",
              error && "border-destructive focus-visible:ring-destructive"
            )}
          />
        }
        maxDate={maxDate}
        minDate={minDate}
        dateFormat="yyyy-MM-dd"
      />
      {error && <p className="text-sm text-destructive">{error}</p>}
    </div>
  )
}
