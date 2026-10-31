import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { ProductGrid } from "@/components/product-card";
import { Container } from "@/components/ui";
import { search } from "@/lib/catalog";

export const metadata: Metadata = {
  title: "Search",
  robots: { index: false },
};

export default function SearchPage({ searchParams }: PageProps<"/search">) {
  return (
    <Container className="py-10">
      <Suspense fallback={<SearchForm defaultValue="" />}>
        <Results searchParams={searchParams} />
      </Suspense>
    </Container>
  );
}

function SearchForm({ defaultValue }: { defaultValue: string }) {
  return (
    <form action="/search/" role="search" className="flex gap-2">
      <label htmlFor="search-q" className="sr-only">
        Search
      </label>
      <input
        id="search-q"
        name="q"
        defaultValue={defaultValue}
        placeholder="Part name, SKU, or mower (e.g. “ego 22”, “clamp”, “LS-P005”)"
        className="flex-1 rounded-lg border border-black/15 px-4 py-3 text-lg outline-none focus:border-turf focus:ring-2 focus:ring-turf/30"
      />
      <button className="rounded-lg bg-charcoal px-6 font-display text-lg font-bold uppercase text-white">Search</button>
    </form>
  );
}

async function Results({ searchParams }: { searchParams: PageProps<"/search">["searchParams"] }) {
  const raw = (await searchParams).q;
  const q = (Array.isArray(raw) ? raw[0] : raw)?.trim() ?? "";
  const results = q ? await search(q) : { products: [], mowers: [] };
  const total = results.products.length + results.mowers.length;

  return (
    <>
      <SearchForm defaultValue={q} />
      {q && (
        <h1 className="mt-8 font-display text-3xl font-bold uppercase">
          {total ? `${total} results for “${q}”` : `No results for “${q}”`}
        </h1>
      )}
      {results.mowers.length > 0 && (
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
      {results.products.length > 0 && (
        <section className="mt-8">
          <h2 className="mb-3 text-sm font-bold uppercase tracking-wide text-charcoal/60">Products</h2>
          <ProductGrid products={results.products} />
        </section>
      )}
      {q && total === 0 && (
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
