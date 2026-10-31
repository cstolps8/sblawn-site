"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { ProductGrid } from "@/components/product-card";
import { search, type SearchResults as SearchResultsData } from "@/lib/catalog";

const searchPath = `${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}/search/`;

export function SearchResults() {
  const searchParams = useSearchParams();
  const q = (searchParams.get("q") ?? "").trim();
  const [result, setResult] = useState<{ query: string; data: SearchResultsData } | null>(null);

  useEffect(() => {
    if (!q) return;
    let active = true;
    void search(q).then((data) => {
      if (active) setResult({ query: q, data });
    });
    return () => {
      active = false;
    };
  }, [q]);

  const results = result?.query === q ? result.data : null;
  const total = results ? results.products.length + results.mowers.length : 0;

  return (
    <>
      <form action={searchPath} role="search" className="flex gap-2">
        <label htmlFor="search-q" className="sr-only">
          Search
        </label>
        <input
          id="search-q"
          name="q"
          defaultValue={q}
          placeholder="Part name, SKU, or mower (e.g. “ego 22”, “clamp”, “LS-P005”)"
          className="flex-1 rounded-lg border border-black/15 px-4 py-3 text-lg outline-none focus:border-turf focus:ring-2 focus:ring-turf/30"
        />
        <button className="rounded-lg bg-charcoal px-6 font-display text-lg font-bold uppercase text-white">Search</button>
      </form>
      {q && results && (
        <h1 className="mt-8 font-display text-3xl font-bold uppercase">
          {total ? `${total} results for “${q}”` : `No results for “${q}”`}
        </h1>
      )}
      {results && results.mowers.length > 0 && (
        <section className="mt-6">
          <h2 className="text-sm font-bold uppercase tracking-wide text-charcoal/60">Mower models</h2>
          <ul className="mt-2 flex flex-wrap gap-2">
            {results.mowers.map((m) => (
              <li key={m.id}>
                <Link
                  href={`/mower-fit/${m.id}/`}
                  className="inline-block rounded-full border border-turf/50 bg-turf-50 px-4 py-2 text-sm font-semibold hover:bg-turf hover:text-white"
                >
                  {m.brand} {m.model} → see what fits
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}
      {results && results.products.length > 0 && (
        <section className="mt-8">
          <h2 className="mb-3 text-sm font-bold uppercase tracking-wide text-charcoal/60">Products</h2>
          <ProductGrid products={results.products} />
        </section>
      )}
      {q && results && total === 0 && (
        <p className="mt-4 text-charcoal/70">
          Try a mower brand, a part like “roller” or “clamp”, or{" "}
          <Link href="/contact/" className="font-semibold text-turf-800 underline">
            ask us
          </Link>
          .
        </p>
      )}
    </>
  );
}
