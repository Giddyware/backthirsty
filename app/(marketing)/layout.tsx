import { Footer } from "@/components/footer";
import { SiteHeader } from "@/components/site-header";
import { navigationConstants } from "@/constants/navigation-link";

/**
 * Chrome shared by every public page. The header and footer used to be
 * rendered inside the landing page's own sections, so any new page shipped
 * without them.
 */
export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <SiteHeader />
      <main>{children}</main>
      <Footer navigation={navigationConstants} />
    </>
  );
}
