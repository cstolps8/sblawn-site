"use client";

import Link from "next/link";
import { useState } from "react";
import type { ProductOption } from "@/lib/types";
import { useCart } from "./cart";

interface Props {
  slug: string;
  name: string;
  image: string;
  priceCents: number;
  options: ProductOption[];
}

export function AddToCart({ slug, name, image, priceCents, options }: Props) {
  const { add } = useCart();
  const [selected, setSelected] = useState<Record<string, string>>({});
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);
  const missing = options.filter((o) => !selected[o.name]);

  return (
    <form
      className="space-y-5"
      onSubmit={(e) => {
        e.preventDefault();
        if (missing.length) return;
        add({ slug, name, image, priceCents, options: selected }, qty);
        setAdded(true);
      }}
    >
      {options.map((o) => (
        <fieldset key={o.name}>
          <legend className="mb-2 text-sm font-semibold uppercase tracking-wide">{o.name}</legend>
          <div className="flex flex-wrap gap-2">
            {o.values.map((v) => {
              const active = selected[o.name] === v;
              return (
                <button
                  type="button"
                  key={v}
                  aria-pressed={active}
                  onClick={() => {
                    setSelected((s) => ({ ...s, [o.name]: v }));
                    setAdded(false);
                  }}
                  className={`min-w-14 rounded-lg border px-4 py-2 text-sm font-semibold transition ${
                    active ? "border-turf-800 bg-turf-800 text-white" : "border-black/15 hover:border-turf"
                  }`}
                >
                  {v}
                </button>
              );
            })}
          </div>
        </fieldset>
      ))}

      <div className="flex items-stretch gap-3">
        <label className="sr-only" htmlFor="qty">
          Quantity
        </label>
        <input
          id="qty"
          type="number"
          min={1}
          max={99}
          value={qty}
          onChange={(e) => setQty(Math.max(1, Number(e.target.value) || 1))}
          className="w-20 rounded-lg border border-black/15 px-3 text-center font-semibold"
        />
        <button
          type="submit"
          disabled={missing.length > 0}
          className="flex-1 rounded-lg bg-turf px-6 py-3.5 font-display text-xl font-bold uppercase tracking-wide text-white transition hover:bg-turf-800 disabled:cursor-not-allowed disabled:bg-charcoal/30"
        >
          {missing.length ? `Choose ${missing[0].name.toLowerCase()}` : "Add to cart"}
        </button>
      </div>

      {added && (
        <p role="status" className="flex items-center justify-between rounded-lg bg-turf-50 px-4 py-3 text-sm">
          <span>Added to your cart.</span>
          <Link href="/cart/" className="font-semibold text-turf-800 underline">
            View cart
          </Link>
        </p>
      )}
    </form>
  );
}
