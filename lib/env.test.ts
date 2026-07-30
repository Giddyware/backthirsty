import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

/**
 * env() caches its parsed result at module scope, so each test re-imports the
 * module after mutating process.env.
 */
async function freshEnv() {
  vi.resetModules();
  return import("./env");
}

const ORIGINAL = { ...process.env };

beforeEach(() => {
  process.env = { ...ORIGINAL };
});

afterEach(() => {
  process.env = { ...ORIGINAL };
});

describe("env", () => {
  it("defaults MARKET_DATA_MODE to fixtures so tests never hit a live provider", async () => {
    delete process.env.MARKET_DATA_MODE;
    const { env } = await freshEnv();
    expect(env().MARKET_DATA_MODE).toBe("fixtures");
  });

  it("rejects an unknown MARKET_DATA_MODE rather than silently going live", async () => {
    process.env.MARKET_DATA_MODE = "definitely-not-a-mode";
    const { env } = await freshEnv();
    expect(() => env()).toThrow(/MARKET_DATA_MODE/);
  });

  it("treats a missing optional var as absent instead of throwing at parse time", async () => {
    delete process.env.DATABASE_URL;
    const { env, isConfigured } = await freshEnv();
    expect(() => env()).not.toThrow();
    expect(isConfigured("DATABASE_URL")).toBe(false);
  });

  it("names the variable and the feature it gates when required() is unmet", async () => {
    delete process.env.ALPHA_VANTAGE_API_KEY;
    const { required } = await freshEnv();
    // [\s\S] rather than the `s` flag: this tsconfig targets below es2018.
    expect(() => required("ALPHA_VANTAGE_API_KEY")).toThrow(
      /ALPHA_VANTAGE_API_KEY[\s\S]*stock backtests/,
    );
  });

  it("returns the value when required() is satisfied", async () => {
    process.env.ALPHA_VANTAGE_API_KEY = "abc123";
    const { required } = await freshEnv();
    expect(required("ALPHA_VANTAGE_API_KEY")).toBe("abc123");
  });

  it("rejects a malformed DATABASE_URL rather than failing later at connect time", async () => {
    process.env.DATABASE_URL = "not-a-url";
    const { env } = await freshEnv();
    expect(() => env()).toThrow(/DATABASE_URL/);
  });

  it("requires AUTH_SECRET to be long enough to be a real secret", async () => {
    process.env.AUTH_SECRET = "tooshort";
    const { env } = await freshEnv();
    expect(() => env()).toThrow(/AUTH_SECRET/);
  });

  it("isConfigured requires every listed key to be present", async () => {
    process.env.AUTH_GITHUB_ID = "id";
    delete process.env.AUTH_GITHUB_SECRET;
    const { isConfigured } = await freshEnv();
    expect(isConfigured("AUTH_GITHUB_ID")).toBe(true);
    expect(isConfigured("AUTH_GITHUB_ID", "AUTH_GITHUB_SECRET")).toBe(false);
  });
});
