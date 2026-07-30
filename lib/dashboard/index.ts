import { SAMPLE_DASHBOARD } from "./sample-data";
import { EMPTY_DASHBOARD, type DashboardData } from "./types";

export type DashboardSearchParams = {
  empty?: string | string[];
};

function flag(raw: string | string[] | undefined): boolean {
  const value = Array.isArray(raw) ? raw[0] : raw;
  return value === "1" || value === "true";
}

/**
 * Resolves what the dashboard should render.
 *
 * Sample data is the default while the app is being built, so every screen is
 * reviewable end to end. `?empty=1` forces the empty states so that code path
 * stays exercised rather than rotting.
 *
 * `isSample` is true whenever invented figures are on screen; callers render
 * <SampleDataNotice /> in that case. Once the data layer lands, this function
 * becomes a session-scoped query and the sample branch is deleted without
 * touching a single page.
 */
export function getDashboardData(searchParams?: DashboardSearchParams): {
  data: DashboardData;
  isSample: boolean;
} {
  const forceEmpty = flag(searchParams?.empty);

  return {
    data: forceEmpty ? EMPTY_DASHBOARD : SAMPLE_DASHBOARD,
    isSample: !forceEmpty,
  };
}

/** Carries the `empty` flag across navigation so the state doesn't reset. */
export function withParams(href: string, forceEmpty: boolean): string {
  if (!forceEmpty) return href;
  return href.includes("?") ? `${href}&empty=1` : `${href}?empty=1`;
}

export * from "./types";
