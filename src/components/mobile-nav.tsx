"use client";

import Link from "next/link";
import { useState } from "react";

export function MobileNav({ items }: { items: { href: string; label: string }[] }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="lg:hidden">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-controls="mobile-menu"
        className="rounded-md border border-black/15 p-2"
      >
        <span className="sr-only">Menu</span>
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
          {open ? <path d="M6 6l12 12M18 6 6 18" /> : <path d="M3 6h18M3 12h18M3 18h18" />}
        </svg>
      </button>
      {open && (
        <div id="mobile-menu" className="absolute inset-x-0 top-full border-b border-black/10 bg-white shadow-lg">
          <form action="/search/" className="px-4 pt-4" role="search">
            <input
              name="q"
              aria-label="Search"
              placeholder="Search parts or your mower…"
              className="w-full rounded-full border border-black/15 bg-mist px-4 py-2.5 text-sm"
            />
          </form>
          <ul className="p-2 font-display text-xl font-semibold uppercase">
            {items.map((n) => (
              <li key={n.href}>
                <Link href={n.href} onClick={() => setOpen(false)} className="block rounded px-3 py-3 hover:bg-turf-50">
                  {n.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
