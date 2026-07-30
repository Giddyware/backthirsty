# BackThirsty

Backtesting for normal people — see what a past investment in a stock or
cryptocurrency would be worth today.

Live at [backthirsty.vercel.app](https://backthirsty.vercel.app/).

## Getting started

```bash
pnpm install
```

```bash
cp .env.example .env.local
```

```bash
pnpm dev
```

The dev server runs on **port 3001** (not 3000): http://localhost:3001

Nothing in `.env.local` is required to render the marketing page. Each variable
gates one feature and, when missing, fails with an error naming both the
variable and what it unlocks. See `.env.example` for the full list and where to
get each key.

## Scripts

| Command | What it does |
|---|---|
| `pnpm dev` | Dev server on port 3001 |
| `pnpm build` | Production build (also typechecks) |
| `pnpm start` | Serve the production build |
| `pnpm lint` | ESLint |
| `pnpm typecheck` | `tsc --noEmit` |
| `pnpm test` | Vitest, once |
| `pnpm test:watch` | Vitest, watch mode |

## Testing

Tests run under Vitest. Pure logic (pricing math, env, provider parsers) runs in
the `node` environment; component tests opt into jsdom with a
`@vitest-environment jsdom` docblock, so most of the suite pays no DOM cost.

**Tests never hit a live data provider.** `MARKET_DATA_MODE` is forced to
`fixtures` in `vitest.config.ts`, which serves canned provider responses. This
is not only for speed — Alpha Vantage's free tier is 25 requests per *day*, and
a single watch-mode run against live data would exhaust it.

Never point a load test, a watch-mode run, or CI at `MARKET_DATA_MODE=live`.

## Data providers and their free-tier limits

Each provider does only what it is verifiably good at on a free tier. The
constraints below are load-bearing, not incidental.

| Provider | Free limit | Role |
|---|---|---|
| Alpha Vantage | 25/day | Stock backtest math — `TIME_SERIES_MONTHLY_ADJUSTED` |
| Coinbase Exchange | keyless, unmetered | Crypto backtests and charts (deep history) |
| Twelve Data | 800/day, 8/min | Stock display charts; crypto Coinbase doesn't list |
| Finnhub | 60/min | Live US quotes, news, profiles, basic financials |
| CoinGecko | 100/min, 10k/mo | Crypto catalog and metadata |

Things worth knowing before changing the data layer:

- **Stock backtests are month-end granularity.** No free provider offers
  *adjusted* daily closes — Alpha Vantage's `DAILY_ADJUSTED` is premium, and
  Twelve Data requires client-side adjustment via `/splits` + `/dividends`.
  Unadjusted data yields wrong long-run returns, so the monthly adjusted series
  is the only correct free option. Results surface the resolved dates, because a
  request for Jan 5 → Mar 15 actually resolves to Jan 31 → Feb 29.
- **Alpha Vantage signals throttling with HTTP 200** and an `Information` key,
  not an error status. Detect it explicitly, or a quota problem looks to the
  user like a bad ticker.
- **`symbol=IBM&apikey=demo` works unmetered forever** — the free stocks smoke
  test. `symbol=AAPL&apikey=demo` returns the throttle payload, which is the
  free way to exercise the rate-limit path.
- **CoinGecko's free plan caps history at 365 days**, plan-wide. It cannot power
  backtests.
- **Finnhub's free tier excludes historical OHLC** (403). It cannot power charts.
- Free market-data tiers generally prohibit commercial redistribution, and
  publicly displaying real-time exchange data can carry licensing obligations.

## Stack

Next.js 14 (App Router) · React 18 · TypeScript · Tailwind CSS · shadcn/ui on
Radix primitives · react-hook-form + zod · Vitest.

Font is [Bricolage Grotesque](https://fonts.google.com/specimen/Bricolage+Grotesque)
via `next/font`, wired to the `--font-sans` variable that `tailwind.config.ts`
expects.

## Notes

- `next` must stay at 14.2.35 or later: versions below 14.2.25 carry
  CVE-2025-29927, a middleware authorization bypass. Middleware is therefore
  treated as UX only, never as a security boundary.
- This is not investment advice. Past performance does not indicate future
  results.
