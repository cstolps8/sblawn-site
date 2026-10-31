import type { Metadata } from "next";
import { CartView } from "@/components/cart-view";
import { Container } from "@/components/ui";

export const metadata: Metadata = { title: "Cart", robots: { index: false } };

export default function CartPage() {
  return (
    <Container className="py-10">
      <h1 className="font-display text-5xl font-bold uppercase">Your cart</h1>
      <CartView />
    </Container>
  );
}
