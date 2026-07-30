import { MobileNav } from "@/components/dashboard/mobile-nav";
import { SidebarNav } from "@/components/dashboard/sidebar-nav";
import { ArrowUpRight } from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Dashboard · BackThirsty",
  // Nothing here should be indexed: it is a signed-in surface, and until auth
  // lands it is reachable without a session.
  robots: { index: false, follow: false },
};

/**
 * Dashboard chrome: dark sidebar carrying the brand, light content area
 * because this side of the product is mostly tables of numbers.
 *
 * NOTE: this layout does not yet gate on a session — auth is a later phase.
 * When it lands, the real check belongs here (`const session = await auth()`),
 * with every route handler re-checking independently. Middleware is not a
 * security boundary.
 */
export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-slate-50 lg:grid lg:grid-cols-[16rem_1fr]">
      <aside className="sticky top-0 hidden h-screen flex-col gap-8 border-r border-white/10 bg-ink p-6 lg:flex">
        <Link href="/" className="flex items-center gap-1.5">
          <Image
            className="h-7 w-auto"
            src="/logo.png"
            alt=""
            width={28}
            height={28}
          />
          <span className="text-lg font-bold text-white">BackThirsty</span>
        </Link>

        {/* useSearchParams needs a Suspense boundary to keep the shell static. */}
        <Suspense fallback={<div className="h-64" />}>
          <SidebarNav />
        </Suspense>

        <Link
          href="/"
          className="mt-auto inline-flex items-center gap-1 text-xs text-white/50 transition-colors hover:text-white"
        >
          Back to site
          <ArrowUpRight className="h-3 w-3" aria-hidden="true" />
        </Link>
      </aside>

      <div className="flex min-h-screen flex-col">
        <header className="sticky top-0 z-30 flex items-center gap-3 border-b border-slate-200 bg-white/90 px-4 py-3 backdrop-blur lg:px-8">
          <Suspense fallback={null}>
            <MobileNav />
          </Suspense>
          <Link href="/" className="flex items-center gap-1.5 lg:hidden">
            <Image
              className="h-6 w-auto"
              src="/logo.png"
              alt=""
              width={24}
              height={24}
            />
            <span className="font-bold text-slate-900">BackThirsty</span>
          </Link>

          <div className="ml-auto flex items-center gap-3">
            {/* Placeholder for the account menu. Deliberately not a fake
                signed-in identity — auth is not built yet. */}
            <span className="hidden text-xs text-slate-500 sm:inline">
              Not signed in
            </span>
            <span
              className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-200 text-xs font-semibold text-slate-500"
              aria-hidden="true"
            >
              ?
            </span>
          </div>
        </header>

        <main className="flex-1 px-4 py-6 lg:px-8 lg:py-8">
          <div className="mx-auto w-full max-w-6xl space-y-6">{children}</div>
        </main>
      </div>
    </div>
  );
}
