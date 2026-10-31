import type { Metadata } from "next";
import Link from "next/link";
import { Container, PageHeader } from "@/components/ui";

export const metadata: Metadata = { title: "Warranty", description: "Lawn Stryper® 30-day manufacturer defect warranty." };

export default function WarrantyPage() {
  return (
    <>
      <PageHeader eyebrow="Support" title="Warranty" />
      <Container className="prose-sb max-w-3xl py-12 text-lg">
        <p>
          Every Lawn Stryper® striping system is covered by a <strong>30-day manufacturer defect warranty</strong>{" "}
          from the date of delivery.
        </p>
        <p className="rounded-xl border border-dashed border-charcoal/30 bg-mist p-5 text-base text-charcoal/70">
          Placeholder — the full warranty terms will be migrated from the current WordPress page in Phase 5.
        </p>
        <p>
          To start a claim, <Link href="/contact/" className="font-semibold text-turf-800 underline">contact us</Link>{" "}
          with your order number and a photo of the issue.
        </p>
      </Container>
    </>
  );
}
