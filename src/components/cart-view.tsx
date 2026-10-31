"use client";

import Image from "next/image";
import Link from "next/link";
import { formatPrice } from "@/lib/format";
import { useCart } from "./cart";

export function CartView() {
  const { lines, subtotalCents, setQty, remove, ready } = useCart();

  if (!ready) return <p className="mt-8 text-charcoal/60">Loading cart…</p>;

  if (lines.length === 0)
    return (
      <div className="mt-8 rounded-2xl bg-mist p-10 text-center">
        <p className="text-lg">Your cart is empty.</p>
        <Link
          href="/product-category/striping-systems/"
          className="mt-4 inline-block rounded-lg bg-turf px-6 py-3 font-display text-lg font-bold uppercase text-white"
        >
          Shop striping systems
        </Link>
      </div>
    );

  return (
    <div className="mt-8 grid gap-10 lg:grid-cols-[1fr_22rem]">
      <ul className="divide-y divide-black/10 border-y border-black/10">
        {lines.map((l) => (
          <li key={l.key} className="flex gap-4 py-5">
            <div className="relative size-24 shrink-0 overflow-hidden rounded-lg bg-mist">
              <Image src={l.image} alt="" fill sizes="96px" className="object-cover" />
            </div>
            <div className="flex flex-1 flex-col">
              <Link href={`/product/${l.slug}/`} className="font-semibold hover:text-turf-800">
                {l.name}
              </Link>
              {Object.entries(l.options).map(([k, v]) => (
                <p key={k} className="text-sm text-charcoal/60">
                  {k}: {v}
                </p>
              ))}
              <div className="mt-auto flex items-center gap-4 pt-2">
                <div className="flex items-center rounded-lg border border-black/15">
                  <button className="px-3 py-1" onClick={() => setQty(l.key, l.qty - 1)} aria-label="Decrease quantity">
                    −
                  </button>
                  <span className="w-8 text-center text-sm font-semibold" aria-live="polite">
                    {l.qty}
                  </span>
                  <button className="px-3 py-1" onClick={() => setQty(l.key, l.qty + 1)} aria-label="Increase quantity">
                    +
                  </button>
                </div>
                <button onClick={() => remove(l.key)} className="text-sm text-charcoal/60 underline hover:text-red-700">
                  Remove
                </button>
              </div>
            </div>
            <p className="font-bold">{formatPrice(l.priceCents * l.qty)}</p>
          </li>
        ))}
      </ul>

      <aside className="h-fit rounded-2xl bg-mist p-6">
        <h2 className="font-display text-2xl font-bold uppercase">Summary</h2>
        <dl className="mt-4 space-y-2 text-sm">
          <div className="flex justify-between">
            <dt>Subtotal</dt>
            <dd className="font-semibold">{formatPrice(subtotalCents)}</dd>
          </div>
          <div className="flex justify-between text-charcoal/60">
            <dt>Shipping (UPS)</dt>
            <dd>Calculated at checkout</dd>
          </div>
        </dl>
        <button
          disabled
          title="Stripe checkout is wired up in Phase 4"
          className="mt-6 w-full rounded-lg bg-turf py-3.5 font-display text-xl font-bold uppercase text-white disabled:opacity-60"
        >
          Checkout
        </button>
        <p className="mt-3 text-center text-xs text-charcoal/60">
          Secure checkout with Stripe &amp; Link — coming in Phase 4.
        </p>
      </aside>
    </div>
  );
}
