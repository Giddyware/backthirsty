"use client";

import { withParams } from "@/lib/dashboard";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { DASHBOARD_NAV, isActive } from "./nav-links";

/**
 * Sidebar links with active-route highlighting. The `empty` flag is carried
 * across navigation so that forcing empty states doesn't reset on every click.
 */
export const SidebarNav = ({ onNavigate }: { onNavigate?: () => void }) => {
  const pathname = usePathname();
  // Both are typed as nullable in Next 14 (they are null when rendered outside
  // a route, e.g. in some test setups), so neither is dereferenced blindly.
  const pathname_ = pathname ?? "";
  const searchParams = useSearchParams();
  const forceEmpty = searchParams?.get("empty") === "1";

  return (
    <nav className="flex flex-col gap-1" aria-label="Dashboard">
      {DASHBOARD_NAV.map((link) => {
        const active = isActive(pathname_, link);
        const Icon = link.icon;

        return (
          <Link
            key={link.href}
            href={withParams(link.href, forceEmpty)}
            onClick={onNavigate}
            aria-current={active ? "page" : undefined}
            className={cn(
              "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
              active
                ? "bg-brand/15 text-brand"
                : "text-white/70 hover:bg-white/10 hover:text-white"
            )}
          >
            <Icon className="h-4 w-4 shrink-0" aria-hidden="true" />
            {link.name}
          </Link>
        );
      })}
    </nav>
  );
};
