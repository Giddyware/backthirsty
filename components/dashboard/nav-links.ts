import {
  CandlestickChart,
  LayoutDashboard,
  Settings,
  Star,
  Wallet,
} from "lucide-react";

export type DashboardNavLink = {
  name: string;
  href: string;
  icon: typeof LayoutDashboard;
  /** Match nested routes (e.g. /dashboard/backtests/new) as active too. */
  matchNested?: boolean;
};

export const DASHBOARD_NAV: DashboardNavLink[] = [
  { name: "Overview", href: "/dashboard", icon: LayoutDashboard },
  {
    name: "Backtests",
    href: "/dashboard/backtests",
    icon: CandlestickChart,
    matchNested: true,
  },
  {
    name: "Portfolios",
    href: "/dashboard/portfolios",
    icon: Wallet,
    matchNested: true,
  },
  {
    name: "Watchlists",
    href: "/dashboard/watchlists",
    icon: Star,
    matchNested: true,
  },
  { name: "Settings", href: "/dashboard/settings", icon: Settings },
];

export function isActive(pathname: string, link: DashboardNavLink): boolean {
  if (pathname === link.href) return true;
  return Boolean(link.matchNested) && pathname.startsWith(`${link.href}/`);
}
