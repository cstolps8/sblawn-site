import type { Metadata } from "next";
import { Suspense } from "react";
import { Container } from "@/components/ui";
import { SearchResults } from "@/components/search-results";

export const metadata: Metadata = {
  title: "Search",
  robots: { index: false },
};

export default function SearchPage() {
  return (
    <Container className="py-10">
      <Suspense fallback={<p>Loading search…</p>}>
        <SearchResults />
      </Suspense>
    </Container>
  );
}
