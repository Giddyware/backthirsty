import { z } from "zod";

/**
 * Server-side environment access.
 *
 * Deliberately lenient at parse time and strict at point of use. The app is
 * built in phases, so during early phases most services genuinely do not exist
 * yet — throwing at import time would make `next build` fail for a key that
 * nothing on the current code path actually reads. Instead every optional
 * value is validated for *shape* here, and `required()` throws a message that
 * names the variable and what it unlocks at the moment a feature needs it.
 */

const schema = z.object({
  NODE_ENV: z
    .enum(["development", "test", "production"])
    .default("development"),

  /** `fixtures` serves canned provider responses; `live` hits real APIs. */
  MARKET_DATA_MODE: z.enum(["live", "fixtures"]).default("fixtures"),

  NEXT_PUBLIC_SITE_URL: z.string().url().default("http://localhost:3001"),

  // --- Database -----------------------------------------------------------
  DATABASE_URL: z.string().url().optional(),

  // --- Auth ---------------------------------------------------------------
  AUTH_SECRET: z.string().min(32).optional(),
  AUTH_URL: z.string().url().optional(),
  AUTH_GITHUB_ID: z.string().min(1).optional(),
  AUTH_GITHUB_SECRET: z.string().min(1).optional(),
  AUTH_GOOGLE_ID: z.string().min(1).optional(),
  AUTH_GOOGLE_SECRET: z.string().min(1).optional(),

  // --- Market data providers ---------------------------------------------
  /** Stock backtest math: the only free source of adjusted monthly closes. */
  ALPHA_VANTAGE_API_KEY: z.string().min(1).optional(),
  /** Stock display charts + crypto assets Coinbase does not list. */
  TWELVE_DATA_API_KEY: z.string().min(1).optional(),
  /** Live US quotes, company news, profiles, basic financials. */
  FINNHUB_API_KEY: z.string().min(1).optional(),
  /** Crypto catalog + metadata. Demo tier; history is capped at 365 days. */
  COINGECKO_API_KEY: z.string().min(1).optional(),
  // Coinbase Exchange needs no credentials.

  // --- Ops ----------------------------------------------------------------
  CRON_SECRET: z.string().min(16).optional(),
});

export type Env = z.infer<typeof schema>;

function load(): Env {
  const parsed = schema.safeParse(process.env);

  if (!parsed.success) {
    const issues = parsed.error.issues
      .map((i) => `  ${i.path.join(".")}: ${i.message}`)
      .join("\n");
    throw new Error(
      `Invalid environment variables:\n${issues}\n\n` +
        `These are malformed rather than missing — check .env.example for the expected shape.`,
    );
  }

  return parsed.data;
}

let cached: Env | undefined;

export function env(): Env {
  if (typeof window !== "undefined") {
    throw new Error(
      "lib/env.ts is server-only — importing it into a client component would " +
        "leak secrets into the browser bundle. Pass values down as props from " +
        "a server component instead.",
    );
  }
  cached ??= load();
  return cached;
}

/** What each optional variable unlocks, for the error message. */
const UNLOCKS: Partial<Record<keyof Env, string>> = {
  DATABASE_URL: "the Postgres database (Neon)",
  AUTH_SECRET: "session signing — generate with `openssl rand -base64 32`",
  AUTH_GITHUB_ID: "GitHub sign-in",
  AUTH_GITHUB_SECRET: "GitHub sign-in",
  AUTH_GOOGLE_ID: "Google sign-in",
  AUTH_GOOGLE_SECRET: "Google sign-in",
  ALPHA_VANTAGE_API_KEY: "stock backtests (adjusted monthly closes)",
  TWELVE_DATA_API_KEY: "stock display charts",
  FINNHUB_API_KEY: "live quotes and news",
  COINGECKO_API_KEY: "crypto catalog and metadata",
  CRON_SECRET: "the daily cache-refresh cron endpoint",
};

/**
 * Read a variable that the current code path genuinely needs.
 * Throws a message naming the variable and the feature it gates.
 */
export function required<K extends keyof Env>(key: K): NonNullable<Env[K]> {
  const value = env()[key];
  if (value === undefined || value === "") {
    const unlocks = UNLOCKS[key];
    throw new Error(
      `Missing required environment variable ${key}` +
        (unlocks ? ` — needed for ${unlocks}.` : ".") +
        ` Add it to .env.local (see .env.example).`,
    );
  }
  return value as NonNullable<Env[K]>;
}

/** True when a feature's variables are all present, for graceful degradation. */
export function isConfigured(...keys: (keyof Env)[]): boolean {
  const e = env();
  return keys.every((k) => e[k] !== undefined && e[k] !== "");
}
