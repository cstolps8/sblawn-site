import Image from "next/image";
import Link from "next/link";
import { MowerPicker } from "@/components/mower-picker";
import { ProductCard } from "@/components/product-card";
import { ButtonLink, Container, Eyebrow } from "@/components/ui";
import { getCategories, getFeaturedProducts, getMowerModels, getProducts } from "@/lib/catalog";
import { media } from "@/lib/mock-data";

const steps = [
  { n: "01", title: "Attach", body: "Clamp it to your walk-behind in about 15 minutes. Brackets for 40+ brands are in the box.", img: media.step1 },
  { n: "02", title: "Design", body: "Pick a pattern — straight stripes, checkerboard, diamonds. The patterning guide shows you how.", img: media.step2 },
  { n: "03", title: "Mow", body: "Mow like normal. The sand-filled roller bends the grass for crisp, pro-level stripes.", img: media.step3 },
];

export default async function Home() {
  const [featured, categories, mowers, systems] = await Promise.all([
    getFeaturedProducts(),
    getCategories(),
    getMowerModels(),
    getProducts("striping-systems"),
  ]);
  const fromPrice = Math.min(...systems.map((s) => s.priceCents)) / 100;

  return (
    <>
      {/* Hero */}
      <section className="relative isolate overflow-hidden bg-charcoal text-white">
        <Image
          src={media.hero}
          alt="Aerial view of a freshly striped lawn"
          fill
          priority
          sizes="100vw"
          className="-z-10 object-cover opacity-60"
        />
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-charcoal via-charcoal/70 to-transparent" />
        <Container className="py-20 sm:py-28 lg:py-36">
          <div className="max-w-2xl">
            <Eyebrow>Pattern your lawn like the pros</Eyebrow>
            <h1 className="mt-3 font-display text-5xl font-extrabold uppercase leading-[0.95] sm:text-7xl">
              Crisp, professional stripes. Every mow.
            </h1>
            <p className="mt-5 max-w-xl text-lg text-white/85">
              Lawn Stryper® attaches to most walk-behind mowers in 15 minutes so you can mow and stripe in one pass.
              Systems from ${fromPrice.toFixed(2)}.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <ButtonLink href="/product-category/striping-systems/">Shop striping systems</ButtonLink>
              <ButtonLink href="/product-overview/" variant="outline">
                Compare systems
              </ButtonLink>
            </div>
          </div>
        </Container>
      </section>

      {/* Fit finder */}
      <section className="stripes">
        <Container className="py-8">
          <div className="rounded-2xl bg-white p-6 shadow-xl sm:p-8">
            <div className="mb-5 flex flex-wrap items-end justify-between gap-2">
              <div>
                <h2 className="font-display text-3xl font-bold uppercase">Will it fit my mower?</h2>
                <p className="text-charcoal/70">Pick your mower to see the systems and parts that fit.</p>
              </div>
              <Link href="/mower-fit/" className="text-sm font-semibold text-turf-800 underline">
                Browse all mowers
              </Link>
            </div>
            <MowerPicker mowers={mowers} />
          </div>
        </Container>
      </section>

      {/* Featured systems */}
      <section className="py-16 sm:py-20">
        <Container>
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <Eyebrow>Shop the newest generation</Eyebrow>
              <h2 className="mt-2 font-display text-4xl font-bold uppercase sm:text-5xl">The complete system</h2>
            </div>
            <Link href="/product-category/striping-systems/" className="font-semibold text-turf-800 underline">
              View all systems
            </Link>
          </div>
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {featured.map((p, i) => (
              <ProductCard key={p.slug} product={p} priority={i === 0} />
            ))}
          </div>
        </Container>
      </section>

      {/* How it works */}
      <section className="bg-mist py-16 sm:py-20">
        <Container>
          <Eyebrow>How it works</Eyebrow>
          <h2 className="mt-2 font-display text-4xl font-bold uppercase sm:text-5xl">Attach. Design. Mow.</h2>
          <div className="mt-10 grid gap-8 md:grid-cols-3">
            {steps.map((s) => (
              <div key={s.n} className="overflow-hidden rounded-xl bg-white shadow-sm">
                <div className="relative aspect-[16/10]">
                  <Image src={s.img} alt="" fill sizes="(min-width: 768px) 33vw, 100vw" className="object-cover" />
                </div>
                <div className="p-6">
                  <p className="font-display text-5xl font-extrabold text-turf">{s.n}</p>
                  <h3 className="mt-1 font-display text-2xl font-bold uppercase">{s.title}</h3>
                  <p className="mt-2 text-charcoal/75">{s.body}</p>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Categories */}
      <section className="py-16 sm:py-20">
        <Container>
          <h2 className="font-display text-4xl font-bold uppercase sm:text-5xl">Shop by category</h2>
          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {categories.map((c) => (
              <Link
                key={c.slug}
                href={`/product-category/${c.slug}/`}
                className="group relative flex aspect-[4/3] items-end overflow-hidden rounded-xl bg-charcoal text-white"
              >
                <Image
                  src={c.image}
                  alt=""
                  fill
                  sizes="(min-width: 768px) 33vw, 100vw"
                  className="object-cover opacity-70 transition duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal/90 to-transparent" />
                <div className="relative p-6">
                  <p className="text-sm font-semibold text-turf">{c.tagline}</p>
                  <h3 className="font-display text-3xl font-bold uppercase">{c.name}</h3>
                </div>
              </Link>
            ))}
          </div>
        </Container>
      </section>

      {/* Before/after CTA */}
      <section className="bg-charcoal text-white">
        <div className="grid lg:grid-cols-2">
          <div className="relative min-h-72">
            <Image src={media.beforeAfter} alt="A lawn before and after striping with Lawn Stryper" fill sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover" />
          </div>
          <div className="px-6 py-14 sm:px-12 lg:py-20">
            <Eyebrow>Why wait?</Eyebrow>
            <h2 className="mt-2 font-display text-4xl font-bold uppercase sm:text-5xl">Make this season your best yet</h2>
            <ul className="mt-6 space-y-3 text-white/85">
              <li>✓ Works with gas and battery mowers</li>
              <li>✓ Keep your bagger on — or take it off</li>
              <li>✓ Assembled in Milwaukee, WI</li>
              <li>✓ Ships UPS Ground in 1–2 business days</li>
            </ul>
            <div className="mt-8">
              <ButtonLink href="/product/lawn-stryper-generation-3/">Shop Generation 3</ButtonLink>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
