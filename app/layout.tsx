import type { Metadata } from "next";
import { Bricolage_Grotesque } from "next/font/google";
import "./globals.css";

// `variable` is required: tailwind.config.ts declares fontFamily.sans as
// ["var(--font-sans)", ...], so without it every `font-sans` utility silently
// falls back to the default system stack.
const bricolageGrotesque = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "BackThirsty",
  description: "Back Thirsty allows you to calculate potential returns on past investments in stocks and cryptocurrencies.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${bricolageGrotesque.variable} font-sans`}>{children}</body>
    </html>
  );
}

