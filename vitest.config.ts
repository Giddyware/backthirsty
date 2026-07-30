import { defineConfig } from "vitest/config";

export default defineConfig({
  // tsconfig.json sets `jsx: "preserve"` because Next.js runs its own JSX
  // transform. Vite honours that and would leave JSX untransformed, so tests
  // containing JSX fail to parse. Override it here via Vite 8's native Oxc
  // transform — do NOT change tsconfig.json, which Next depends on, and do
  // not reach for @vitejs/plugin-react: its type declarations use a string
  // export name that TypeScript 5.5 cannot parse, which breaks `next build`.
  oxc: { jsx: { runtime: "automatic" } },
  // Resolves the `@/*` alias from tsconfig.json. Native as of Vite 8 /
  // Vitest 4 — no vite-tsconfig-paths plugin needed.
  resolve: { tsconfigPaths: true },
  test: {
    include: ["**/*.{test,spec}.{ts,tsx}"],
    exclude: ["node_modules", ".next"],
    // Node by default (pure logic: pricing math, env, provider parsers).
    // Component tests opt into jsdom via a `@vitest-environment jsdom`
    // docblock, so the fast majority of the suite pays no DOM cost.
    environment: "node",
    setupFiles: ["./vitest.setup.ts"],
    env: {
      // Tests must never reach a live provider: fixtures only. Pointing a
      // watch-mode run at live data would burn the 25/day Alpha Vantage quota.
      MARKET_DATA_MODE: "fixtures",
    },
  },
});
