"use client";

// Client-side cart (localStorage). Phase 4 moves this to a server cart keyed
// by a cookie so it follows signed-in customers and feeds Stripe Checkout.

import Link from "next/link";
import { createContext, useCallback, useContext, useMemo, useSyncExternalStore } from "react";

export interface CartLine {
  key: string; // slug + options
  slug: string;
  name: string;
  image: string;
  priceCents: number;
  options: Record<string, string>;
  qty: number;
}

interface CartCtx {
  lines: CartLine[];
  count: number;
  subtotalCents: number;
  add: (line: Omit<CartLine, "key" | "qty">, qty?: number) => void;
  setQty: (key: string, qty: number) => void;
  remove: (key: string) => void;
  ready: boolean;
}

const Ctx = createContext<CartCtx | null>(null);
const STORAGE_KEY = "sb-cart-v1";

// Tiny external store over localStorage so React reads it via useSyncExternalStore.
let cache: CartLine[] | null = null;
const listeners = new Set<() => void>();
const EMPTY: CartLine[] = [];

function read(): CartLine[] {
  if (cache) return cache;
  try {
    cache = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "[]");
  } catch {
    cache = [];
  }
  return cache!;
}

function write(next: CartLine[]) {
  cache = next;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  } catch {}
  listeners.forEach((l) => l());
}

function subscribe(cb: () => void) {
  listeners.add(cb);
  const onStorage = (e: StorageEvent) => {
    if (e.key === STORAGE_KEY) {
      cache = null;
      cb();
    }
  };
  window.addEventListener("storage", onStorage);
  return () => {
    listeners.delete(cb);
    window.removeEventListener("storage", onStorage);
  };
}

const setLines = (fn: (prev: CartLine[]) => CartLine[]) => write(fn(read()));

export function CartProvider({ children }: { children: React.ReactNode }) {
  const lines = useSyncExternalStore(subscribe, read, () => EMPTY);
  const ready = useSyncExternalStore(subscribe, () => true, () => false);

  const add = useCallback<CartCtx["add"]>((line, qty = 1) => {
    const key = `${line.slug}|${Object.entries(line.options).map(([k, v]) => `${k}=${v}`).join("|")}`;
    setLines((prev) => {
      const existing = prev.find((l) => l.key === key);
      if (existing) return prev.map((l) => (l.key === key ? { ...l, qty: l.qty + qty } : l));
      return [...prev, { ...line, key, qty }];
    });
  }, []);

  const setQty = useCallback((key: string, qty: number) => {
    setLines((prev) => prev.map((l) => (l.key === key ? { ...l, qty: Math.max(1, Math.min(99, qty)) } : l)));
  }, []);

  const remove = useCallback((key: string) => setLines((prev) => prev.filter((l) => l.key !== key)), []);

  const value = useMemo<CartCtx>(
    () => ({
      lines,
      ready,
      count: lines.reduce((n, l) => n + l.qty, 0),
      subtotalCents: lines.reduce((n, l) => n + l.qty * l.priceCents, 0),
      add,
      setQty,
      remove,
    }),
    [lines, ready, add, setQty, remove],
  );

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useCart() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useCart must be used inside CartProvider");
  return ctx;
}

export function CartButton() {
  const { count } = useCart();
  return (
    <Link
      href="/cart/"
      className="relative inline-flex items-center gap-2 rounded-full bg-charcoal px-4 py-2 text-sm font-semibold text-white hover:bg-charcoal-900"
      aria-label={`Cart, ${count} item${count === 1 ? "" : "s"}`}
    >
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
        <path d="M6 6h15l-1.5 9h-12z" />
        <path d="M6 6 5 3H2" />
        <circle cx="9" cy="20" r="1.5" />
        <circle cx="18" cy="20" r="1.5" />
      </svg>
      Cart
      {count > 0 && (
        <span className="ml-1 rounded-full bg-turf px-2 py-0.5 text-xs font-bold leading-none">{count}</span>
      )}
    </Link>
  );
}
