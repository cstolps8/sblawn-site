# sblawnsystems.com — storefront frontend

Next.js 16 (App Router, Cache Components) + Tailwind 4. Replaces the WordPress/WooCommerce site.
See the project plan (`claude/sblawnsystems-site-plan.md` in the SB-lawn project) for the full roadmap.

## Run it

```bash
npm install
npm run dev        # http://localhost:3000
npm run build && npm start
```

## What's here (Phase 1 frontend, mock data)

| Route | Notes |
|---|---|
| `/` | Hero, mower fit finder, featured systems, how it works, categories |
| `/product-category/[slug]/` | Same URLs as WooCommerce (`striping-systems`, `lawn-stryper-replacement-parts`, `apparel`) |
| `/product/[slug]/` | Same slugs as WooCommerce. Gallery, options, add to cart, specs, fits, matching parts, Product JSON-LD |
| `/product-overview/` | System comparison table |
| `/mower-fit/` and `/mower-fit/[model]/` | Brand → model picker; SEO page per mower model |
| `/search/?q=` | Products + mower models; typo-tolerant (trigram) — stand-in for Postgres FTS + `pg_trgm` |
| `/cart/` | Client cart (localStorage). Checkout button disabled until Stripe (Phase 4) |
| `/support/`, `/warranty/`, `/contact/` | FAQ (FAQPage JSON-LD), placeholders for manuals and form sending |

`trailingSlash: true` keeps URLs identical to WordPress so most existing links need no redirect.

## Code layout

- `src/lib/catalog.ts` — **the only data API pages use.** Swap its bodies for Postgres queries (with `"use cache"` + cache tags) in Phase 3.
- `src/lib/mock-data.ts` — products/prices/copy from the live site (Oct 2026). **Mower models and fitment are sample data** derived from the published compatibility rules — replace with S&B's real list.
- `src/lib/types.ts` — types shaped like the planned tables (`products`, `mower_models`, `fitment`).
- `src/components/` — header, footer, cards, cart, gallery, mower picker.

## Brand

Charcoal `#322E2F`, turf green `#5DB35C`, dark green `#2A6334`; Barlow Condensed (headings) + Work Sans (body), self-hosted via `@fontsource`. Tokens live in `src/app/globals.css`.

Images currently load from `www.sblawnsystems.com/wp-content/uploads` (allowed in `next.config.ts`); point that at the Azure CDN after media moves to Blob Storage.
