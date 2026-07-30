"use client";

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { FaBarsStaggered } from "react-icons/fa6";

/**
 * Only routes that actually exist are listed. Pointing the nav at Pricing /
 * Docs / About before those pages are built would trade dead "#" links for
 * 404s, which is worse. They get added as each page lands.
 */
const NAV_LINKS: { name: string; href: string }[] = [
  { name: "Dashboard", href: "/dashboard" },
];

export const SiteHeader = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="absolute inset-x-0 top-0 z-50">
      <nav
        className="flex items-center justify-between p-6 lg:px-8"
        aria-label="Global"
      >
        <div className="flex lg:flex-1">
          <Link href="/" className="flex items-center gap-1">
            <Image
              className="h-8 w-auto"
              src="/logo.png"
              alt=""
              width={32}
              height={32}
            />
            <span className="text-white font-bold text-2xl">BackThirsty</span>
          </Link>
        </div>

        {/* Mobile: a real drawer. This button previously set state that nothing
            read, so tapping it did nothing at all. */}
        <div className="flex lg:hidden">
          <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
            <SheetTrigger asChild>
              <button
                type="button"
                className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-white"
              >
                <span className="sr-only">Open main menu</span>
                <FaBarsStaggered className="h-6 w-6" aria-hidden="true" />
              </button>
            </SheetTrigger>
            <SheetContent side="right">
              <SheetTitle>Menu</SheetTitle>
              <div className="flex flex-col gap-1">
                {NAV_LINKS.map((link) => (
                  <SheetClose asChild key={link.href}>
                    <Link
                      href={link.href}
                      className="rounded-md px-3 py-2.5 text-base font-medium text-white hover:bg-white/10"
                    >
                      {link.name}
                    </Link>
                  </SheetClose>
                ))}
              </div>
              <SheetClose asChild>
                <Link
                  href="/dashboard"
                  className="rounded-md bg-brand px-6 py-3 text-center text-sm font-semibold text-black hover:bg-brand/90"
                >
                  Open dashboard
                </Link>
              </SheetClose>
            </SheetContent>
          </Sheet>
        </div>

        <div className="hidden lg:flex lg:flex-1 lg:items-center lg:justify-end lg:gap-8">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-semibold leading-6 text-white hover:text-brand"
            >
              {link.name}
            </Link>
          ))}
          <Link
            href="/dashboard"
            className="text-sm font-semibold leading-6 text-gray-900 bg-brand px-10 py-3 rounded-sm hover:bg-brand/90"
          >
            Open dashboard <span aria-hidden="true">&rarr;</span>
          </Link>
        </div>
      </nav>
    </header>
  );
};
