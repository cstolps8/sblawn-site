import Image from "next/image";
import Link from "next/link";
import { contact, media } from "@/lib/mock-data";
import { CartButton } from "./cart";
import { MobileNav } from "./mobile-nav";

export const nav = [
  { href: "/product-overview/", label: "Product Overview" },
  { href: "/product-category/striping-systems/", label: "Shop" },
  { href: "/product-category/lawn-stryper-replacement-parts/", label: "Parts" },
  { href: "/mower-fit/", label: "Find My Fit" },
  { href: "/support/", label: "Support" },
  { href: "/contact/", label: "Contact" },
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-black/5 bg-white/95 backdrop-blur">
      <div className="bg-charcoal text-xs text-white/85">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-1.5 sm:px-6">
          <p>
            <span className="font-semibold text-turf">Free shipping</span> on all replacement parts · UPS Ground with tracking
          </p>
          <a href={`tel:${contact.phone.replace(/\D/g, "")}`} className="hidden hover:text-white sm:block">
            {contact.phone}
          </a>
        </div>
      </div>
      <div className="mx-auto flex max-w-7xl items-center gap-6 px-4 py-3 sm:px-6">
        <Link href="/" className="shrink-0" aria-label="S&B Lawn Systems home">
          <Image src={media.logo} alt="S&B Lawn Systems, Inc." width={180} height={53} priority className="h-11 w-auto" />
        </Link>
        <nav aria-label="Main" className="hidden flex-1 lg:block">
          <ul className="flex items-center gap-1 font-display text-lg font-semibold uppercase tracking-wide">
            {nav.map((n) => (
              <li key={n.href}>
                <Link href={n.href} className="rounded px-3 py-2 hover:bg-turf-50 hover:text-turf-800">
                  {n.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="ml-auto flex items-center gap-2">
          <form action="/search/" className="hidden md:block" role="search">
            <label htmlFor="q" className="sr-only">
              Search products and mower models
            </label>
            <input
              id="q"
              name="q"
              placeholder="Search parts or your mower…"
              className="w-56 rounded-full border border-black/15 bg-mist px-4 py-2 text-sm outline-none focus:border-turf focus:ring-2 focus:ring-turf/30"
            />
          </form>
          <CartButton />
          <MobileNav items={nav} />
        </div>
      </div>
    </header>
  );
}
