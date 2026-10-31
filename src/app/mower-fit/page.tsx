import type { Metadata } from "next";
import Link from "next/link";
import { MowerPicker } from "@/components/mower-picker";
import { Container, PageHeader } from "@/components/ui";
import { getMowerModels } from "@/lib/catalog";

export const metadata: Metadata = {
  title: "Find My Fit — Lawn Stryper® Mower Compatibility",
  description: "Pick your mower brand and model to see which Lawn Stryper striping systems and parts fit.",
};

export default async function MowerFitIndex() {
  const mowers = await getMowerModels();
  const byBrand = Object.groupBy(mowers, (m) => m.brand);
  return (
    <>
      <PageHeader eyebrow="Find my fit" title="Will it fit my mower?">
        Choose your mower and we&apos;ll show the systems and replacement parts that fit it.
      </PageHeader>
      <Container className="py-10">
        <div className="rounded-2xl border border-black/10 p-6 shadow-sm">
          <MowerPicker mowers={mowers} />
        </div>
        <h2 className="mt-12 font-display text-3xl font-bold uppercase">All mower models</h2>
        <div className="mt-6 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {Object.entries(byBrand).map(([brand, list]) => (
            <div key={brand}>
              <h3 className="font-display text-xl font-bold uppercase text-turf-800">{brand}</h3>
              <ul className="mt-2 space-y-1 text-sm">
                {list?.map((m) => (
                  <li key={m.id}>
                    <Link href={`/mower-fit/${m.id}/`} className="hover:text-turf-800 hover:underline">
                      {m.model} <span className="text-charcoal/50">· {m.power}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <p className="mt-12 rounded-xl bg-mist p-5 text-sm">
          Don&apos;t see your mower? Most 20&quot;–22&quot; residential walk-behinds work with Generation 3.{" "}
          <Link href="/contact/" className="font-semibold text-turf-800 underline">
            Send us your model
          </Link>{" "}
          and we&apos;ll confirm.
        </p>
      </Container>
    </>
  );
}
