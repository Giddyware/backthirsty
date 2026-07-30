import type { SeriesPoint } from "@/lib/dashboard/types";
import { formatDate, formatMoney } from "@/lib/format";

/**
 * Value-over-time chart as inline SVG.
 *
 * Deliberately not a charting library: this renders on the server, ships no
 * JavaScript, and scales via viewBox. If interactive tooltips or brushing are
 * needed later, this is the seam to swap in Recharts behind the same props.
 */

const VIEW_W = 720;
const VIEW_H = 220;
const PAD = { top: 12, right: 8, bottom: 22, left: 8 };

type AreaChartProps = {
  points: SeriesPoint[];
  /** Baseline to shade against — usually the amount invested. */
  baseline?: number;
  className?: string;
  label?: string;
};

export const AreaChart = ({
  points,
  baseline,
  className,
  label = "Value over time",
}: AreaChartProps) => {
  if (points.length < 2) {
    return (
      <div className="flex h-56 items-center justify-center rounded-lg border border-dashed border-slate-300 text-sm text-slate-500">
        Not enough data points to chart.
      </div>
    );
  }

  const values = points.map((p) => p.value);
  const candidates = baseline === undefined ? values : [...values, baseline];
  const rawMin = Math.min(...candidates);
  const rawMax = Math.max(...candidates);
  // Guard a flat series, which would otherwise divide by zero.
  const span = rawMax - rawMin || Math.abs(rawMax) || 1;
  const min = rawMin - span * 0.08;
  const max = rawMax + span * 0.08;

  const innerW = VIEW_W - PAD.left - PAD.right;
  const innerH = VIEW_H - PAD.top - PAD.bottom;

  const x = (i: number) => PAD.left + (i / (points.length - 1)) * innerW;
  const y = (v: number) => PAD.top + innerH - ((v - min) / (max - min)) * innerH;

  const line = points.map((p, i) => `${x(i)},${y(p.value)}`).join(" ");
  const area = `${PAD.left},${PAD.top + innerH} ${line} ${
    PAD.left + innerW
  },${PAD.top + innerH}`;

  const first = points[0];
  const last = points[points.length - 1];
  const up = last.value >= first.value;
  const stroke = up ? "#059669" : "#dc2626";
  const fillId = up ? "areaUp" : "areaDown";

  return (
    <figure className={className}>
      <svg
        viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
        className="h-56 w-full"
        role="img"
        aria-label={`${label}: ${formatMoney(first.value)} on ${formatDate(
          first.date
        )} to ${formatMoney(last.value)} on ${formatDate(last.date)}`}
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id={fillId} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={stroke} stopOpacity="0.22" />
            <stop offset="100%" stopColor={stroke} stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* Horizontal guides */}
        {[0, 0.5, 1].map((t) => (
          <line
            key={t}
            x1={PAD.left}
            x2={PAD.left + innerW}
            y1={PAD.top + innerH * t}
            y2={PAD.top + innerH * t}
            stroke="#e2e8f0"
            strokeWidth="1"
          />
        ))}

        {/* Amount invested, so profit is visible as area above the line */}
        {baseline !== undefined ? (
          <line
            x1={PAD.left}
            x2={PAD.left + innerW}
            y1={y(baseline)}
            y2={y(baseline)}
            stroke="#94a3b8"
            strokeWidth="1"
            strokeDasharray="4 4"
          />
        ) : null}

        <polygon points={area} fill={`url(#${fillId})`} />
        <polyline
          points={line}
          fill="none"
          stroke={stroke}
          strokeWidth="2"
          strokeLinejoin="round"
          strokeLinecap="round"
          vectorEffect="non-scaling-stroke"
        />
      </svg>

      <figcaption className="mt-2 flex items-center justify-between text-xs text-slate-500">
        <span>{formatDate(first.date)}</span>
        {baseline !== undefined ? (
          <span className="hidden sm:inline">
            Dashed line = {formatMoney(baseline)} invested
          </span>
        ) : null}
        <span>{formatDate(last.date)}</span>
      </figcaption>
    </figure>
  );
};

/** Compact trend line for table rows. No axes, no labels. */
export const Sparkline = ({
  values,
  className = "h-8 w-24",
}: {
  values: number[];
  className?: string;
}) => {
  if (values.length < 2) return null;

  const min = Math.min(...values);
  const max = Math.max(...values);
  const span = max - min || Math.abs(max) || 1;
  const w = 100;
  const h = 32;

  const line = values
    .map((v, i) => {
      const px = (i / (values.length - 1)) * w;
      const py = h - ((v - min) / span) * (h - 4) - 2;
      return `${px.toFixed(2)},${py.toFixed(2)}`;
    })
    .join(" ");

  const up = values[values.length - 1] >= values[0];

  return (
    <svg
      viewBox={`0 0 ${w} ${h}`}
      className={className}
      aria-hidden="true"
      preserveAspectRatio="none"
    >
      <polyline
        points={line}
        fill="none"
        stroke={up ? "#059669" : "#dc2626"}
        strokeWidth="1.5"
        strokeLinejoin="round"
        strokeLinecap="round"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  );
};
