// Data access layer. Pages call only these functions. Today they read mock
// data; in Phase 3 they become Postgres queries (full-text + pg_trgm) wrapped
// in `"use cache"` with cache tags that admin edits invalidate.

import { categories, fitment, mowerModels, products } from "./mock-data";
import type { Category, CategorySlug, MowerModel, Product } from "./types";

export async function getCategories(): Promise<Category[]> {
  return categories;
}

export async function getCategory(slug: string): Promise<Category | undefined> {
  return categories.find((c) => c.slug === slug);
}

export async function getProducts(category?: CategorySlug): Promise<Product[]> {
  return category ? products.filter((p) => p.category === category) : products;
}

export async function getFeaturedProducts(): Promise<Product[]> {
  return products.filter((p) => p.featured);
}

export async function getProduct(slug: string): Promise<Product | undefined> {
  return products.find((p) => p.slug === slug);
}

/** Replacement parts that service a given striping system. */
export async function getPartsForSystem(system: Product): Promise<Product[]> {
  const key = system.shortName ?? "";
  return products.filter((p) => p.servicesSystems?.includes(key));
}

export async function getMowerModels(): Promise<MowerModel[]> {
  return [...mowerModels].sort((a, b) => (a.brand + a.model).localeCompare(b.brand + b.model));
}

export async function getMowerModel(id: string): Promise<MowerModel | undefined> {
  return mowerModels.find((mm) => mm.id === id);
}

/** Systems that fit a mower model, plus the parts that service those systems. */
export async function getFitForMower(id: string): Promise<{ systems: Product[]; parts: Product[] }> {
  const slugs = new Set(fitment.filter((f) => f.mowerModelId === id).map((f) => f.productSlug));
  const systems = products.filter((p) => slugs.has(p.slug));
  const systemKeys = new Set(systems.map((s) => s.shortName));
  const parts = products.filter((p) => p.servicesSystems?.some((s) => systemKeys.has(s)));
  return { systems, parts };
}

export async function getMowersForProduct(slug: string): Promise<MowerModel[]> {
  const ids = new Set(fitment.filter((f) => f.productSlug === slug).map((f) => f.mowerModelId));
  return mowerModels.filter((mm) => ids.has(mm.id));
}

// ---------- Search (stand-in for Postgres full-text + pg_trgm) ----------

const norm = (s: string) =>
  s
    .toLowerCase()
    .replace(/[®™]/g, "")
    .replace(/["″]/g, " in ")
    .replace(/[^a-z0-9]+/g, " ")
    .trim();

function trigrams(s: string): Set<string> {
  const t = new Set<string>();
  const padded = `  ${s} `;
  for (let i = 0; i < padded.length - 2; i++) t.add(padded.slice(i, i + 3));
  return t;
}

function similarity(a: string, b: string): number {
  const ta = trigrams(a);
  const tb = trigrams(b);
  let shared = 0;
  ta.forEach((g) => tb.has(g) && shared++);
  return shared / (ta.size + tb.size - shared || 1);
}

/** Best per-word similarity: each query word against each haystack word. */
function score(query: string, haystack: string): number {
  const q = norm(query);
  const h = norm(haystack);
  if (!q) return 0;
  if (h.includes(q)) return 1;
  const hw = h.split(" ");
  const qw = q.split(" ");
  const per = qw.map((w) => Math.max(...hw.map((x) => (x.startsWith(w) ? 0.9 : similarity(w, x)))));
  return per.reduce((a, b) => a + b, 0) / per.length;
}

export interface SearchResults {
  products: Product[];
  mowers: MowerModel[];
}

export async function search(query: string): Promise<SearchResults> {
  const threshold = 0.45;
  const rankedProducts = products
    .map((p) => ({ p, s: score(query, `${p.name} ${p.sku} ${p.category} ${p.summary}`) }))
    .filter((r) => r.s >= threshold)
    .sort((a, b) => b.s - a.s)
    .map((r) => r.p);
  const rankedMowers = mowerModels
    .map((mm) => ({ mm, s: score(query, `${mm.brand} ${mm.model} ${mm.power}`) }))
    .filter((r) => r.s >= threshold)
    .sort((a, b) => b.s - a.s)
    .map((r) => r.mm);
  return { products: rankedProducts, mowers: rankedMowers };
}

export { formatPrice } from "./format";
