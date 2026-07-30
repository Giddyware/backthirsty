import { formatMoney, formatPct } from "@/lib/format";

export type DonutSlice = {
  label: string;
  sublabel?: string;
  value: number;
};

/**
 * Allocation donut as inline SVG using stroke-dasharray offsets.
 *
 * Server-rendered, no charting dependency. Colours are a fixed categorical
 * ramp rather than random, so the same asset keeps the same colour between the
 * donut and the legend.
 */

const COLORS = [
  "#14A83C", // brand green, darker variant
  "#0ea5e9",
  "#8b5cf6",
  "#f59e0b",
  "#ec4899",
  "#64748b",
];

const RADIUS = 60;
const STROKE = 22;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

export const Donut = ({ slices }: { slices: DonutSlice[] }) => {
  const total = slices.reduce((sum, s) => sum + s.value, 0);

  if (total <= 0) {
    return (
      <p className="text-sm text-slate-500">
        Nothing to allocate yet.
      </p>
    );
  }

  let offset = 0;

  return (
    <div className="flex flex-col items-center gap-6 sm:flex-row sm:items-center sm:gap-8">
      <svg
        viewBox="0 0 160 160"
        className="h-40 w-40 shrink-0 -rotate-90"
        role="img"
        aria-label={`Allocation across ${slices.length} assets`}
      >
        {slices.map((slice, i) => {
          const fraction = slice.value / total;
          const dash = fraction * CIRCUMFERENCE;
          const circle = (
            <circle
              key={slice.label}
              cx="80"
              cy="80"
              r={RADIUS}
              fill="none"
              stroke={COLORS[i % COLORS.length]}
              strokeWidth={STROKE}
              strokeDasharray={`${dash} ${CIRCUMFERENCE - dash}`}
              strokeDashoffset={-offset}
            />
          );
          offset += dash;
          return circle;
        })}
      </svg>

      <ul className="w-full space-y-2">
        {slices.map((slice, i) => (
          <li
            key={slice.label}
            className="flex items-center justify-between gap-3 text-sm"
          >
            <span className="flex min-w-0 items-center gap-2">
              <span
                className="h-2.5 w-2.5 shrink-0 rounded-full"
                style={{ backgroundColor: COLORS[i % COLORS.length] }}
                aria-hidden="true"
              />
              <span className="truncate font-medium text-slate-900">
                {slice.label}
              </span>
              {slice.sublabel ? (
                <span className="truncate text-xs text-slate-500">
                  {slice.sublabel}
                </span>
              ) : null}
            </span>
            <span className="shrink-0 tabular-nums text-slate-600">
              {formatPct((slice.value / total) * 100).replace("+", "")}
              <span className="ml-2 text-xs text-slate-400">
                {formatMoney(slice.value, true)}
              </span>
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};
