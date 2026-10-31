import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { AddToCart } from "@/components/add-to-cart";
import { ProductGallery } from "@/components/product-gallery";
import { ProductCard } from "@/components/product-card";
import { Breadcrumbs, Container } from "@/components/ui";
import {
  formatPrice,
  getCategory,
  getMowersForProduct,
  getPartsForSystem,
  getProduct,
  getProducts,
} from "@/lib/catalog";

export async function generateStaticParams() {
  return (await getProducts()).map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/product/[slug]">): Promise<Metadata> {
  const product = await getProduct((await params).slug);
  if (!product) return {};
  return {
    title: product.name,
    description: product.summary,
    alternates: { canonical: `/product/${product.slug}/` },
    openGraph: { images: product.images.slice(0, 1) },
  };
}

export default async function ProductPage({ params }: PageProps<"/product/[slug]">) {
  const { slug } = await params;
  const product = await getProduct(slug);
  if (!product) notFound();

  const [category, parts, mowers] = await Promise.all([
    getCategory(product.category),
    product.category === "striping-systems" ? getPartsForSystem(product) : Promise.resolve([]),
    getMowersForProduct(product.slug),
  ]);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    sku: product.sku,
    image: product.images,
    description: product.summary,
    brand: { "@type": "Brand", name: "Lawn Stryper" },
    offers: {
      "@type": "Offer",
      priceCurrency: "USD",
      price: (product.priceCents / 100).toFixed(2),
      availability: "https://schema.org/InStock",
      url: `https://www.sblawnsystems.com/product/${product.slug}/`,
    },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Container className="py-6">
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: category?.name ?? "Shop", href: `/product-category/${product.category}/` },
            { label: product.shortName ?? product.name },
          ]}
        />
      </Container>

      <Container className="grid gap-10 pb-16 lg:grid-cols-[1.15fr_1fr]">
        <ProductGallery images={product.images} alt={product.name} contain={product.category !== "striping-systems"} />

        <div>
          <div className="flex flex-wrap gap-2">
            {product.badges?.map((b) => (
              <span key={b} className="rounded-full bg-turf-50 px-3 py-1 text-xs font-bold uppercase tracking-wide text-turf-800">
                {b}
              </span>
            ))}
          </div>
          <h1 className="mt-3 font-display text-4xl font-bold uppercase leading-tight sm:text-5xl">{product.name}</h1>
          <p className="mt-2 text-sm text-charcoal/60">SKU {product.sku}</p>
          <p className="mt-4 text-3xl font-bold">{formatPrice(product.priceCents)}</p>
          <p className="mt-4 text-lg text-charcoal/80">{product.summary}</p>

          <div className="mt-8">
            <AddToCart
              slug={product.slug}
              name={product.name}
              image={product.images[0]}
              priceCents={product.priceCents}
              options={product.options}
            />
          </div>

          <ul className="mt-8 grid gap-3 border-t border-black/10 pt-6 text-sm sm:grid-cols-2">
            <li>🚚 {product.freeShipping ? "Free UPS Ground shipping" : "Ships UPS Ground with tracking"}</li>
            <li>📦 Processed in 1–2 business days</li>
            <li>🛡️ 30-day manufacturer defect warranty</li>
            <li>
              📞{" "}
              <Link href="/contact/" className="underline">
                Questions? Talk to us
              </Link>
            </li>
          </ul>

          {product.category === "striping-systems" && (
            <div className="mt-6 rounded-xl border border-turf/40 bg-turf-50 p-4 text-sm">
              <strong>Not sure it fits?</strong>{" "}
              <Link href="/mower-fit/" className="font-semibold text-turf-800 underline">
                Check your mower model
              </Link>{" "}
              before you buy.
            </div>
          )}
        </div>
      </Container>

      <section className="border-t border-black/10 bg-mist py-14">
        <Container className="grid gap-12 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <h2 className="font-display text-3xl font-bold uppercase">Overview</h2>
            <div className="prose-sb mt-4 text-charcoal/85">
              {product.description.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
            {product.features.length > 0 && (
              <>
                <h3 className="mt-8 font-display text-2xl font-bold uppercase">Features</h3>
                <ul className="mt-3 grid gap-2 sm:grid-cols-2">
                  {product.features.map((f) => (
                    <li key={f} className="flex gap-2">
                      <span className="text-turf">✓</span>
                      {f}
                    </li>
                  ))}
                </ul>
              </>
            )}
            {product.included.length > 0 && (
              <>
                <h3 className="mt-8 font-display text-2xl font-bold uppercase">What&apos;s in the box</h3>
                <ul className="mt-3 list-inside list-disc space-y-1 text-charcoal/85">
                  {product.included.map((f) => (
                    <li key={f}>{f}</li>
                  ))}
                </ul>
              </>
            )}
          </div>
          {Object.keys(product.specs).length > 0 && (
            <div>
              <h2 className="font-display text-3xl font-bold uppercase">Specs</h2>
              <dl className="mt-4 divide-y divide-black/10 rounded-xl bg-white text-sm">
                {Object.entries(product.specs).map(([k, v]) => (
                  <div key={k} className="grid grid-cols-[8rem_1fr] gap-3 px-4 py-3">
                    <dt className="font-semibold">{k}</dt>
                    <dd className="text-charcoal/80">{v}</dd>
                  </div>
                ))}
              </dl>
            </div>
          )}
        </Container>
      </section>

      {mowers.length > 0 && (
        <section className="py-14">
          <Container>
            <h2 className="font-display text-3xl font-bold uppercase">Confirmed mower fits</h2>
            <p className="mt-1 text-charcoal/70">A sample of models this system fits. Don&apos;t see yours? Ask us.</p>
            <ul className="mt-5 flex flex-wrap gap-2">
              {mowers.map((m) => (
                <li key={m.id}>
                  <Link
                    href={`/mower-fit/${m.id}/`}
                    className="inline-block rounded-full border border-black/15 px-3 py-1.5 text-sm hover:border-turf hover:bg-turf-50"
                  >
                    {m.brand} {m.model}
                  </Link>
                </li>
              ))}
            </ul>
          </Container>
        </section>
      )}

      {parts.length > 0 && (
        <section className="border-t border-black/10 py-14">
          <Container>
            <h2 className="font-display text-3xl font-bold uppercase">Replacement parts for this system</h2>
            <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {parts.map((p) => (
                <ProductCard key={p.slug} product={p} />
              ))}
            </div>
          </Container>
        </section>
      )}
    </>
  );
}
