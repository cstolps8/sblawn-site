// Types mirror the planned Postgres schema so the mock data layer can be
// swapped for real queries without touching pages.

export type CategorySlug = "striping-systems" | "lawn-stryper-replacement-parts" | "apparel";

export interface Category {
  slug: CategorySlug;
  name: string;
  tagline: string;
  description: string;
  image: string;
}

export interface ProductOption {
  name: string; // e.g. "Mower type", "Size"
  values: string[];
}

export interface Product {
  id: number;
  slug: string; // same as WooCommerce slug so /product/{slug}/ URLs carry over
  sku: string;
  name: string;
  shortName?: string;
  category: CategorySlug;
  priceCents: number;
  images: string[];
  summary: string;
  description: string[];
  features: string[];
  included: string[];
  specs: Record<string, string>;
  options: ProductOption[];
  badges?: string[];
  /** Parts: which striping systems this part services */
  servicesSystems?: string[];
  freeShipping?: boolean;
  featured?: boolean;
}

export type PowerType = "Gas" | "Battery";

export interface MowerModel {
  id: string; // url slug
  brand: string;
  model: string;
  deckInches: number;
  power: PowerType;
}

export interface FitmentRow {
  productSlug: string;
  mowerModelId: string;
  notes?: string;
}
