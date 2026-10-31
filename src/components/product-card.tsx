import Image from "next/image";
import Link from "next/link";
import { formatPrice } from "@/lib/catalog";
import type { Product } from "@/lib/types";

export function ProductCard({ product, priority = false }: { product: Product; priority?: boolean }) {
  const contain = product.category !== "striping-systems";
  return (
    <Link
      href={`/product/${product.slug}/`}
      prefetch={true}
      className="group flex flex-col overflow-hidden rounded-xl border border-black/10 bg-white transition hover:-translate-y-0.5 hover:shadow-lg"
    >
      <div className="relative aspect-[4/3] bg-mist">
        <Image
          src={product.images[0]}
          alt={product.name}
          fill
          priority={priority}
          sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
          className={contain ? "object-contain p-4" : "object-cover"}
        />
        {product.badges?.[0] && (
          <span className="absolute left-3 top-3 rounded-full bg-turf px-3 py-1 text-xs font-bold uppercase tracking-wide text-white">
            {product.badges[0]}
          </span>
        )}
      </div>
      <div className="flex flex-1 flex-col p-4">
        <h3 className="font-display text-xl font-semibold leading-tight group-hover:text-turf-800">
          {product.shortName ?? product.name}
        </h3>
        <p className="mt-1 line-clamp-2 text-sm text-charcoal/70">{product.summary}</p>
        <p className="mt-auto pt-3 text-lg font-bold">{formatPrice(product.priceCents)}</p>
      </div>
    </Link>
  );
}

export function ProductGrid({ products }: { products: Product[] }) {
  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
      {products.map((p, i) => (
        <ProductCard key={p.slug} product={p} priority={i < 4} />
      ))}
    </div>
  );
}
