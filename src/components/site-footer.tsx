import Link from "next/link";
import { contact } from "@/lib/mock-data";

const cols = [
  {
    title: "Shop",
    links: [
      ["Striping Systems", "/product-category/striping-systems/"],
      ["Replacement Parts", "/product-category/lawn-stryper-replacement-parts/"],
      ["Apparel", "/product-category/apparel/"],
      ["Compare Systems", "/product-overview/"],
      ["Find My Fit", "/mower-fit/"],
    ],
  },
  {
    title: "Support",
    links: [
      ["Support & FAQ", "/support/"],
      ["Warranty", "/warranty/"],
      ["Contact", "/contact/"],
      ["Refund Policy", "/refund-policy/"],
    ],
  },
  {
    title: "Company",
    links: [
      ["S&B History", "/about-lawn-stryper/"],
      ["Blog", "/blog/"],
      ["Media", "/media/"],
      ["Testimonials", "/testimonials/"],
    ],
  },
];

export function SiteFooter() {
  return (
    <footer className="mt-auto bg-charcoal text-white">
      <div className="stripe-rule" />
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-5">
        <div className="md:col-span-2">
          <p className="font-display text-3xl font-semibold uppercase">Stripe on!</p>
          <p className="mt-3 max-w-sm text-sm text-white/70">
            S&amp;B Lawn Systems makes Lawn Stryper® striping systems in {contact.city}. Transform your lawn with crisp,
            professional stripes.
          </p>
          <div className="mt-5 space-y-1 text-sm">
            <p>
              <a className="hover:text-turf" href={`tel:${contact.phone.replace(/\D/g, "")}`}>
                {contact.phone}
              </a>
            </p>
            <p>
              <a className="hover:text-turf" href={`mailto:${contact.email}`}>
                {contact.email}
              </a>
            </p>
          </div>
          <div className="mt-5 flex gap-4 text-sm font-semibold">
            <a className="hover:text-turf" href={contact.social.facebook} rel="noopener" target="_blank">
              Facebook
            </a>
            <a className="hover:text-turf" href={contact.social.instagram} rel="noopener" target="_blank">
              Instagram
            </a>
            <a className="hover:text-turf" href={contact.social.youtube} rel="noopener" target="_blank">
              YouTube
            </a>
          </div>
        </div>
        {cols.map((c) => (
          <nav key={c.title} aria-label={c.title}>
            <p className="font-display text-lg font-semibold uppercase tracking-wide text-turf">{c.title}</p>
            <ul className="mt-3 space-y-2 text-sm text-white/80">
              {c.links.map(([label, href]) => (
                <li key={href}>
                  <Link className="hover:text-white" href={href}>
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        ))}
      </div>
      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-wrap justify-between gap-3 px-4 py-5 text-xs text-white/50 sm:px-6">
          <p>© S&amp;B Lawn Systems, Inc. Lawn Stryper® is a registered trademark.</p>
          <p className="flex gap-4">
            <Link href="/terms-and-conditions/">Terms</Link>
            <Link href="/privacy-policy/">Privacy</Link>
            <Link href="/cookie-policy/">Cookies</Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
