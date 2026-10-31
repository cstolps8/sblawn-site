import type { Metadata } from "next";
import Link from "next/link";
import { ButtonLink, Container, PageHeader } from "@/components/ui";
import { contact, faqs } from "@/lib/mock-data";

export const metadata: Metadata = {
  title: "Support & FAQ",
  description: "Lawn Stryper® setup help, FAQs, manuals, warranty and contact information.",
};

const tiles = [
  { title: "Find my fit", body: "Check which system fits your mower.", href: "/mower-fit/" },
  { title: "Manuals & guides", body: "Instruction manuals and patterning guides. (Coming in Phase 5.)", href: "/support/#manuals" },
  { title: "Replacement parts", body: "Clamps, rollers, tubes and hardware.", href: "/product-category/lawn-stryper-replacement-parts/" },
  { title: "Warranty", body: "30-day manufacturer defect warranty.", href: "/warranty/" },
];

export default function SupportPage() {
  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
  };
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />
      <PageHeader eyebrow="Support" title="How can we help?">
        Setup help, answers and parts for every Lawn Stryper®.
      </PageHeader>
      <Container className="py-12">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {tiles.map((t) => (
            <Link key={t.title} href={t.href} className="rounded-xl border border-black/10 p-5 hover:border-turf hover:bg-turf-50">
              <h2 className="font-display text-2xl font-bold uppercase">{t.title}</h2>
              <p className="mt-1 text-sm text-charcoal/70">{t.body}</p>
            </Link>
          ))}
        </div>

        <div className="mt-14 grid gap-12 lg:grid-cols-[1fr_20rem]">
          <section aria-labelledby="faq">
            <h2 id="faq" className="font-display text-4xl font-bold uppercase">
              Frequently asked questions
            </h2>
            <div className="mt-6 divide-y divide-black/10 border-y border-black/10">
              {faqs.map((f) => (
                <details key={f.q} className="group py-4">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-lg font-semibold">
                    {f.q}
                    <span className="text-2xl text-turf transition group-open:rotate-45">+</span>
                  </summary>
                  <p className="mt-3 text-charcoal/80">{f.a}</p>
                </details>
              ))}
            </div>
          </section>
          <aside className="h-fit rounded-2xl bg-charcoal p-6 text-white" id="manuals">
            <h2 className="font-display text-2xl font-bold uppercase">Still stuck?</h2>
            <p className="mt-2 text-sm text-white/75">Call or email and a real person in Milwaukee will help.</p>
            <p className="mt-4 font-semibold">{contact.phone}</p>
            <p className="text-sm text-white/75">{contact.email}</p>
            <div className="mt-5">
              <ButtonLink href="/contact/">Contact us</ButtonLink>
            </div>
          </aside>
        </div>
      </Container>
    </>
  );
}
