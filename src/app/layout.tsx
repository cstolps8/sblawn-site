import type { Metadata } from "next";
import localFont from "next/font/local";
import { CartProvider } from "@/components/cart";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import "./globals.css";

// Self-hosted (from @fontsource) so builds don't depend on Google Fonts.
const workSans = localFont({
  variable: "--font-work-sans",
  src: "../../node_modules/@fontsource-variable/work-sans/files/work-sans-latin-wght-normal.woff2",
  weight: "100 900",
});
const barlow = localFont({
  variable: "--font-barlow",
  src: [
    { path: "../../node_modules/@fontsource/barlow-condensed/files/barlow-condensed-latin-500-normal.woff2", weight: "500" },
    { path: "../../node_modules/@fontsource/barlow-condensed/files/barlow-condensed-latin-600-normal.woff2", weight: "600" },
    { path: "../../node_modules/@fontsource/barlow-condensed/files/barlow-condensed-latin-700-normal.woff2", weight: "700" },
    { path: "../../node_modules/@fontsource/barlow-condensed/files/barlow-condensed-latin-800-normal.woff2", weight: "800" },
  ],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.sblawnsystems.com"),
  title: {
    default: "Lawn Striping System for Walk-Behind Lawn Mowers | Lawn Stryper®",
    template: "%s | S&B Lawn Systems",
  },
  description:
    "Lawn Stryper® striping systems attach to most 20\"–30\" walk-behind mowers in 15 minutes. Mow and stripe in one pass. Made in Milwaukee, WI.",
  openGraph: { siteName: "S&B Lawn Systems", type: "website" },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${workSans.variable} ${barlow.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col font-sans">
        <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:z-50 focus:bg-white focus:p-3">
          Skip to content
        </a>
        <CartProvider>
          <SiteHeader />
          <main id="main" className="flex-1">
            {children}
          </main>
          <SiteFooter />
        </CartProvider>
      </body>
    </html>
  );
}
