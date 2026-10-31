import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ProductGrid } from "@/components/product-card";
import { Container, PageHeader } from "@/components/ui";
import { getCategories, getCategory, getProducts } from "@/lib/catalog";
import type { CategorySlug } from "@/lib/types";

export async function generateStaticParams() {
  return (await getCategories()).map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: PageProps<"/product-category/[slug]">): Promise<Metadata> {
  const c = await getCategory((await params).slug);
  return c ? { title: `Lawn Stryper® ${c.name}`, description: c.description } : {};
}

export default async function CategoryPage({ params }: PageProps<"/product-category/[slug]">) {
  const { slug } = await params;
  const category = await getCategory(slug);
  if (!category) notFound();
  const [products, categories] = await Promise.all([getProducts(slug as CategorySlug), getCategories()]);

  return (
    <>
      <PageHeader eyebrow={category.tagline} title={category.name}>
        {category.description}
      </PageHeader>
      <Container className="py-10">
        <nav aria-label="Categories" className="mb-8 flex flex-wrap gap-2">
          {categories.map((c) => (
            <Link
              key={c.slug}
              href={`/product-category/${c.slug}/`}
              aria-current={c.slug === slug ? "page" : undefined}
              className={`rounded-full px-4 py-2 text-sm font-semibold ${
                c.slug === slug ? "bg-charcoal text-white" : "bg-mist hover:bg-turf-50"
              }`}
            >
              {c.name}
            </Link>
          ))}
        </nav>
        <p className="mb-4 text-sm text-charcoal/60">{products.length} products</p>
        <ProductGrid products={products} />
      </Container>
    </>
  );
}
