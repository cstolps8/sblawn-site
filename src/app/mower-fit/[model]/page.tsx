import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ProductCard } from "@/components/product-card";
import { Breadcrumbs, ButtonLink, Container } from "@/components/ui";
import { getFitForMower, getMowerModel, getMowerModels } from "@/lib/catalog";

export async function generateStaticParams() {
  return (await getMowerModels()).map((m) => ({ model: m.id }));
}

export async function generateMetadata({ params }: PageProps<"/mower-fit/[model]">): Promise<Metadata> {
  const m = await getMowerModel((await params).model);
  return m
    ? {
        title: `Lawn Striping Kit for ${m.brand} ${m.model}`,
        description: `Lawn Stryper® striping systems and replacement parts that fit the ${m.brand} ${m.model} ${m.power.toLowerCase()} mower.`,
      }
    : {};
}

export default async function MowerFitPage({ params }: PageProps<"/mower-fit/[model]">) {
  const { model } = await params;
  const mower = await getMowerModel(model);
  if (!mower) notFound();
  const { systems, parts } = await getFitForMower(model);

  return (
    <>
      <section className="stripes-dark text-white">
        <Container className="py-10 sm:py-14">
          <Breadcrumbs
            items={[{ label: "Find My Fit", href: "/mower-fit/" }, { label: `${mower.brand} ${mower.model}` }]}
          />
          <h1 className="mt-3 font-display text-4xl font-bold uppercase sm:text-6xl">
            {mower.brand} {mower.model}
          </h1>
          <p className="mt-2 text-white/80">
            {mower.deckInches}&quot; deck · {mower.power}
          </p>
          <p
            className={`mt-5 inline-flex rounded-full px-4 py-2 text-sm font-bold ${
              systems.length ? "bg-turf text-white" : "bg-white text-charcoal"
            }`}
          >
            {systems.length
              ? `✓ ${systems.length} Lawn Stryper system${systems.length > 1 ? "s" : ""} fit this mower`
              : "No confirmed fit for this mower"}
          </p>
        </Container>
      </section>

      <Container className="py-12">
        {systems.length > 0 ? (
          <>
            <h2 className="font-display text-3xl font-bold uppercase">Striping systems that fit</h2>
            <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {systems.map((p, i) => (
                <ProductCard key={p.slug} product={p} priority={i === 0} />
              ))}
            </div>
            {parts.length > 0 && (
              <>
                <h2 className="mt-14 font-display text-3xl font-bold uppercase">Replacement parts</h2>
                <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
                  {parts.map((p) => (
                    <ProductCard key={p.slug} product={p} />
                  ))}
                </div>
              </>
            )}
          </>
        ) : (
          <div className="max-w-xl">
            <p className="text-lg">
              We haven&apos;t confirmed a Lawn Stryper fit for the {mower.brand} {mower.model}. Some decks and handle
              designs don&apos;t work with our clamps.
            </p>
            <p className="mt-3 text-charcoal/70">
              Send us a photo of your mower&apos;s rear wheels and deck and we&apos;ll tell you what will work.
            </p>
            <div className="mt-6 flex gap-3">
              <ButtonLink href="/contact/">Contact us</ButtonLink>
              <Link href="/mower-fit/" className="self-center font-semibold text-turf-800 underline">
                Try another mower
              </Link>
            </div>
          </div>
        )}
      </Container>
    </>
  );
}
