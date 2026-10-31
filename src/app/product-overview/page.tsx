import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Container, PageHeader } from "@/components/ui";
import { formatPrice, getProducts } from "@/lib/catalog";

export const metadata: Metadata = {
  title: "Compare Lawn Stryper® Striping Systems",
  description: "Generation 3, GC Pro 21, GC Pro 30 and Classic side by side: mower size, gas or battery, build and price.",
};

const rows: { label: string; key: string }[] = [
  { label: "Mower size", key: "Mower size" },
  { label: "Gas / battery", key: "Mower type" },
  { label: "Roller fill", key: "Roller fill" },
  { label: "Warranty", key: "Warranty" },
];

export default async function ProductOverview() {
  const systems = await getProducts("striping-systems");
  return (
    <>
      <PageHeader eyebrow="Product overview" title="Which Stryper is right for you?">
        Every Lawn Stryper mows and stripes in one pass. The difference is your mower size, power type and how hard
        you&apos;ll work it.
      </PageHeader>
      <Container className="py-12">
        <div className="-mx-4 overflow-x-auto px-4">
          <table className="w-full min-w-[760px] border-separate border-spacing-0 text-left">
            <thead>
              <tr>
                <th className="w-40" />
                {systems.map((s) => (
                  <th key={s.slug} className="px-3 pb-4 align-bottom">
                    <Link href={`/product/${s.slug}/`} className="group block">
                      <div className="relative aspect-[4/3] overflow-hidden rounded-lg bg-mist">
                        <Image src={s.images[0]} alt="" fill sizes="220px" className="object-cover" />
                      </div>
                      <p className="mt-3 font-display text-2xl font-bold uppercase group-hover:text-turf-800">
                        {s.shortName}
                      </p>
                      <p className="text-lg font-bold">{formatPrice(s.priceCents)}</p>
                    </Link>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="text-sm">
              {rows.map((r) => (
                <tr key={r.key} className="odd:bg-mist">
                  <th scope="row" className="rounded-l-lg px-3 py-3 font-semibold">
                    {r.label}
                  </th>
                  {systems.map((s) => (
                    <td key={s.slug} className="px-3 py-3 last:rounded-r-lg">
                      {s.specs[r.key] ?? "—"}
                    </td>
                  ))}
                </tr>
              ))}
              <tr>
                <th scope="row" className="px-3 py-3 font-semibold">
                  Best for
                </th>
                {systems.map((s) => (
                  <td key={s.slug} className="px-3 py-3 text-charcoal/80">
                    {s.summary}
                  </td>
                ))}
              </tr>
              <tr>
                <td />
                {systems.map((s) => (
                  <td key={s.slug} className="px-3 pt-4">
                    <Link
                      href={`/product/${s.slug}/`}
                      className="inline-block rounded-lg bg-turf px-4 py-2 font-display font-bold uppercase text-white hover:bg-turf-800"
                    >
                      View {s.shortName}
                    </Link>
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      </Container>
    </>
  );
}
