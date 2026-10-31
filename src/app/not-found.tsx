import { ButtonLink, Container } from "@/components/ui";

export default function NotFound() {
  return (
    <Container className="py-24 text-center">
      <p className="font-display text-8xl font-extrabold text-turf">404</p>
      <h1 className="mt-2 font-display text-4xl font-bold uppercase">This patch of lawn is empty</h1>
      <p className="mt-3 text-charcoal/70">The page you&apos;re looking for moved or doesn&apos;t exist.</p>
      <div className="mt-8 flex justify-center gap-3">
        <ButtonLink href="/">Home</ButtonLink>
        <ButtonLink href="/search/" variant="light">
          Search
        </ButtonLink>
      </div>
    </Container>
  );
}
