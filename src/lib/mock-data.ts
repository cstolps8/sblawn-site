// MOCK DATA — product names, prices and copy come from sblawnsystems.com
// (Oct 2026). Mower model list and fitment are SAMPLE data shaped like the
// planned `mower_models` / `fitment` tables; replace with S&B's real list.

import type { Category, FitmentRow, MowerModel, Product } from "./types";

const WP = "https://www.sblawnsystems.com/wp-content/uploads";

export const categories: Category[] = [
  {
    slug: "striping-systems",
    name: "Striping Systems",
    tagline: "Mow and stripe in one pass",
    description:
      "Lawn Stryper® systems attach to most residential walk-behind mowers in about 15 minutes. Pick the system that matches your mower and how much you stripe.",
    image: `${WP}/2024/03/Generation3_Updated_Slider_March.jpg`,
  },
  {
    slug: "lawn-stryper-replacement-parts",
    name: "Replacement Parts",
    tagline: "Keep your Stryper running",
    description:
      "Genuine Lawn Stryper® replacement clamps, rollers, tube assemblies and hardware. Free shipping on every part.",
    image: `${WP}/2024/05/Gen3_ClampSet_Inserts_Hardware_1-400x275.jpg`,
  },
  {
    slug: "apparel",
    name: "Apparel",
    tagline: "Every lawn deserves stripes",
    description: "Hoodies and tees for people who take their stripes seriously.",
    image: `${WP}/2024/03/EVERY-LAWN-HOODIE-400x400.png`,
  },
];

const compatibleBrands =
  "Toro, Honda, EGO, Ryobi, Ariens, Black+Decker, Bolens, Brute, Craftsman, Cub Cadet, DeWalt, Echo, Greenworks, Hart, Husqvarna, John Deere, Kobalt, Kress, Lawn Boy, Makita, Masport, Milwaukee Tool, Murray, Poulan Pro, PowerSmart, Scag, Snapper, Stihl, Troy-Bilt, Yard Force, Yard Machines and more";

const mowerTypeOption = { name: "Mower type", values: ["Gas", "Battery"] };
const sizes = { name: "Size", values: ["S", "M", "L", "XL", "2XL"] };

export const products: Product[] = [
  // ---------------- Striping systems ----------------
  {
    id: 1,
    slug: "lawn-stryper-generation-3",
    sku: "LS-GEN3",
    name: "Lawn Stryper® Generation 3",
    shortName: "Generation 3",
    category: "striping-systems",
    priceCents: 17995,
    featured: true,
    badges: ["Best seller", "Gas & battery"],
    images: [
      `${WP}/2023/06/Gen3_Web_Slider_April2024.jpg`,
      `${WP}/2023/06/SB-BeforeAfter.jpg`,
      `${WP}/2023/06/Lawn_Stryper-6030.jpg`,
      `${WP}/2023/06/Lawn_Stryper-0220.jpg`,
      `${WP}/2023/06/lawn-patterning-zone.jpg`,
    ],
    summary:
      "Attaches to most 20\"–22\" gas and battery residential walk-behind mowers. Mow and stripe in one pass.",
    description: [
      "The Generation 3 is our most popular striping system. Mounting brackets for over 40 mower brands come in the box, so most homeowners are striping the same afternoon it arrives.",
      "Gen 3 adds a new grooved roller for more consistent stripes, a larger and stronger clamp, new vertical bars for more setup options, and an insert system that fits most gas and battery mowers.",
    ],
    features: [
      "Assembles in 15 minutes or less with a Phillips or flat-head screwdriver",
      "Works with or without most bagging systems",
      "Bracketing adjusts in height, width and angle",
      "Turns with the mower and won't jack-knife in reverse",
      "No extension arm needed; fits large and small wheels",
      "Roller and cover come off in seconds while brackets stay mounted",
    ],
    included: [
      "Gen 3 roller and cover",
      "Gen 3 attachment brackets with inserts",
      "Gen 3 bracketing frame",
      "Tow hook",
      "Instruction manual, hardware and patterning guide",
    ],
    specs: {
      "Mower size": "20\"–22\" residential walk-behind",
      "Mower type": "Gas or battery",
      "Roller fill": "12–16 lbs dry sand (not included)",
      Assembly: "~15 minutes",
      Warranty: "30-day manufacturer defect",
      "Compatible brands": compatibleBrands,
      "Not compatible": "Skil, Worx, Stihl RM 655 and RM 756",
    },
    options: [mowerTypeOption],
  },
  {
    id: 2,
    slug: "lawn-stryper-gc-pro-series-21",
    sku: "LS-GCPRO21",
    name: "Lawn Stryper® GC Pro Series 21",
    shortName: "GC Pro 21",
    category: "striping-systems",
    priceCents: 29495,
    featured: true,
    badges: ["Full steel", "Made in Milwaukee"],
    images: [
      `${WP}/2024/05/GCPro21_1.jpg`,
      `${WP}/2024/05/GCPro21_2.jpg`,
      `${WP}/2024/05/GCPro21_4.jpg`,
      `${WP}/2024/05/GCPro21_6.jpg`,
      `${WP}/2024/05/GCPro21_wBagger.jpg`,
    ],
    summary:
      "Premium full-steel striping system for 20\"–22\" gas and battery walk-behind mowers, built for pro-grade homeowners.",
    description: [
      "The GC Pro 21 is our premium system for pro-grade consumers and lawn enthusiasts. It pairs the Generation 3 grooved roller with a full steel frame, a steel ball-joint hitch and an adjustable brush.",
      "Assembled in Milwaukee, WI, using American steel.",
    ],
    features: [
      "Grooved roller with integrated bearings and axles",
      "Adjustable brush: low, high or float",
      "Full steel frame and steel ball joint with quick-release pin",
      "Insert system fits most 20\"–22\" gas and battery mowers",
      "Grab-and-go open-face handle",
      "Works with or without most bagging systems",
    ],
    included: [
      "GC Pro 21 system with Generation 3 grooved roller",
      "Adjustable brush",
      "GC Pro 21 steel frame and attachment brackets",
      "Master clamp inserts",
      "Ball joint with quick-release pin",
      "Instruction manual, hardware and patterning guide",
    ],
    specs: {
      "Mower size": "20\"–22\" residential walk-behind",
      "Mower type": "Gas or battery",
      "Roller fill": "12–16 lbs dry sand (not included)",
      Assembly: "~15 minutes",
      Warranty: "30-day manufacturer defect",
      "Built in": "Milwaukee, WI — American steel",
      "Not compatible": "Skil, Worx, Stihl RM 655 and RM 756",
    },
    options: [mowerTypeOption],
  },
  {
    id: 3,
    slug: "lawn-stryper-gc-pro-series-30",
    sku: "LS-GCPRO30",
    name: "Lawn Stryper® GC Pro Series 30",
    shortName: "GC Pro 30",
    category: "striping-systems",
    priceCents: 36995,
    featured: true,
    badges: ["30\" mowers", "Commercial grade"],
    images: [`${WP}/2024/05/GCProStryper30_567_MtSilver-2.png`],
    summary:
      "Full-steel striping system for 30\" walk-behind mowers — for commercial operators and serious enthusiasts.",
    description: [
      "The GC Pro 30 takes striping to the next level for wide-deck walk-behinds. Same full steel shell, Generation 3 grooved roller, adjustable brush and ball-joint hitch as the GC Pro 21, sized for 30\" decks.",
    ],
    features: [
      "Full steel shell",
      "Generation 3 grooved roller",
      "Adjustable brush",
      "Ball-joint hitch system for easy on and off",
    ],
    included: [
      "GC Pro 30 system with grooved roller",
      "Adjustable brush",
      "Steel frame, brackets and ball-joint hitch",
      "Instruction manual and hardware",
    ],
    specs: {
      "Mower size": "30\" walk-behind",
      "Mower type": "Gas or battery",
      "Known fits":
        "Toro TimeMaster 30\", Toro eTimeMaster 30\", Toro TurfMaster 30\", Exmark 30\", Ryobi 30\", Cub Cadet 30\", DR Power 30\"",
      Warranty: "30-day manufacturer defect",
    },
    options: [mowerTypeOption],
  },
  {
    id: 4,
    slug: "lawn-stryper-classic",
    sku: "LS-CLASSIC",
    name: "Lawn Stryper® Classic",
    shortName: "Classic",
    category: "striping-systems",
    priceCents: 13995,
    badges: ["Gas only"],
    images: [`${WP}/2023/06/slider3_sb_hm.jpg`],
    summary:
      "The original Lawn Stryper for 20\"–22\" gas walk-behind mowers. Not for Honda or battery mowers.",
    description: [
      "The Classic works with most Toro, Ariens, Bolens, Brute, Craftsman, Cub Cadet, Husqvarna, Lawn Boy, Murray, Remington, Troy-Bilt, Yard Force and Yard Machines 20\"–22\" residential gas walk-behind mowers.",
      "Have a Honda or a battery mower? Choose the Generation 3 instead.",
    ],
    features: [
      "Assembles in 15 minutes or less",
      "Easily attaches to most gas walk-behind mowers",
      "Roller removes in seconds",
    ],
    included: ["Classic roller and cover", "Classic clamp set", "Tow hook", "Instruction manual and hardware"],
    specs: {
      "Mower size": "20\"–22\" residential walk-behind",
      "Mower type": "Gas only",
      "Not compatible": "Honda mowers, battery mowers",
      Warranty: "30-day manufacturer defect",
    },
    options: [],
  },

  // ---------------- Replacement parts ----------------
  ...(
    [
      [5, "lawn-stryper-generation-3-replacement-clamp-set-with-inserts-and-hardware", "Gen 3 Replacement Clamp Set with Inserts and Hardware", 7950, "2024/05/Gen3_ClampSet_Inserts_Hardware_1-400x275.jpg", ["Generation 3"]],
      [6, "lawn-stryper-generation-3-replacement-hardware", "Gen 3 Replacement Hardware", 1750, "2024/05/Gen3_RollerPlugs_withHardware_1-400x267.jpg", ["Generation 3"]],
      [7, "lawn-stryper-generation-3-and-classic-replacement-hook-washer-and-locknut", "Gen 3 & Classic Replacement Hook, Washer and Locknut", 2450, "2024/03/Lawn-Stryper-Generation-3-and-Classic-Replacement-Hook-Washer-and-Locknut-400x268.jpg", ["Generation 3", "Classic"]],
      [8, "lawn-stryper-generation-3-and-classic-replacement-tube-assembly", "Gen 3 & Classic Replacement Tube Assembly", 7950, "2024/03/Lawn-Stryper-Generation-3-and-Classic-Replacement-Tube-Assembly-400x266.jpg", ["Generation 3", "Classic"]],
      [9, "lawn-stryper-generation-3-replacement-cover-roller-and-plug", "Gen 3 Replacement Cover, Roller and Plug", 9850, "2024/03/Lawn-Stryper-Generation-3-Replacement-Cover-Roller-and-Plug-400x266.jpg", ["Generation 3"]],
      [10, "lawn-stryper-classic-replacement-clamp-set-with-hardware", "Classic Replacement Clamp Set with Hardware", 4950, "2024/03/Lawn-Stryper-Classic-Replacement-Clamp-Set-with-Hardware-400x264.jpg", ["Classic"]],
      [11, "lawn-stryper-classic-replacement-cover-roller-and-plug", "Classic Replacement Cover, Roller and Plug", 7950, "2024/03/Lawn-Stryper-Classic-Replacement-Cover-Roller-and-Plug-400x268.jpg", ["Classic"]],
      [12, "lawn-stryper-classic-replacement-hardware", "Classic Replacement Hardware", 1750, "2024/03/Lawn-Stryper-Classic-Replacement-Hardware-400x268.jpg", ["Classic"]],
    ] as const
  ).map(([id, slug, name, price, img, systems]): Product => ({
    id,
    slug,
    sku: `LS-P${String(id).padStart(3, "0")}`,
    name: `Lawn Stryper® ${name}`,
    shortName: name,
    category: "lawn-stryper-replacement-parts",
    priceCents: price,
    images: [`${WP}/${img}`],
    summary: `Genuine replacement part for the Lawn Stryper® ${systems.join(" and ")}. Ships free.`,
    description: [
      `Genuine Lawn Stryper® part for the ${systems.join(" and ")} system. Not sure which part you need? Check your manual or contact support with a photo of your setup.`,
    ],
    features: [],
    included: [],
    specs: { Fits: systems.join(", "), Shipping: "Free (UPS Ground)" },
    options: [],
    servicesSystems: [...systems],
    freeShipping: true,
    badges: ["Free shipping"],
  })),

  // ---------------- Apparel ----------------
  ...(
    [
      [13, "every-lawn-deserves-stripes-hoodie-emerald-green", "Every Lawn Deserves Stripes Hoodie – Emerald Green", 4450, "EVERY-LAWN-HOODIE-400x400.png"],
      [14, "every-lawn-deserves-stripes-t-shirt-emerald-green-t-shirt", "Every Lawn Deserves Stripes T-Shirt – Emerald Green", 2750, "EVERY-LAWN-GREEN-FRONT-400x400.png"],
      [15, "every-lawn-deserves-stripes-t-shirt-charcoal-gray", "Every Lawn Deserves Stripes T-Shirt – Charcoal Gray", 2750, "EVERY-LAWN-GRAY-FRONT-400x400.png"],
      [16, "pursuit-of-the-perfect-stripe-t-shirt-rustic-tan", "Pursuit of the Perfect Stripe T-Shirt – Rustic Tan", 2750, "PURSUIT-TAN-FRONT-400x400.png"],
    ] as const
  ).map(([id, slug, name, price, img]): Product => ({
    id,
    slug,
    sku: `LS-A${String(id).padStart(3, "0")}`,
    name,
    category: "apparel",
    priceCents: price,
    images: [`${WP}/2024/03/${img}`],
    summary: "Soft, durable, and made for people who mow in straight lines.",
    description: ["Official Lawn Stryper® apparel."],
    features: [],
    included: [],
    specs: {},
    options: [sizes],
  })),
];

// ---------------- Mower models (SAMPLE) ----------------
const m = (brand: string, model: string, deckInches: number, power: "Gas" | "Battery"): MowerModel => ({
  id: `${brand}-${model}`
    .toLowerCase()
    .replace(/["″]/g, "in")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, ""),
  brand,
  model,
  deckInches,
  power,
});

export const mowerModels: MowerModel[] = [
  m("Toro", "Recycler 22\"", 22, "Gas"),
  m("Toro", "Super Recycler 21\"", 21, "Gas"),
  m("Toro", "60V Flex-Force 21\"", 21, "Battery"),
  m("Toro", "TimeMaster 30\"", 30, "Gas"),
  m("Toro", "eTimeMaster 30\"", 30, "Battery"),
  m("Toro", "TurfMaster 30\"", 30, "Gas"),
  m("Honda", "HRN216 21\"", 21, "Gas"),
  m("Honda", "HRX217 21\"", 21, "Gas"),
  m("EGO", "Power+ 21\"", 21, "Battery"),
  m("EGO", "Power+ 22\" Aluminum Deck", 22, "Battery"),
  m("EGO", "Power+ 22\" Composite Deck", 22, "Battery"),
  m("Ryobi", "40V HP 21\"", 21, "Battery"),
  m("Ryobi", "80V HP 30\"", 30, "Battery"),
  m("Craftsman", "M220 21\"", 21, "Gas"),
  m("Husqvarna", "LC221A 21\"", 21, "Gas"),
  m("Cub Cadet", "SC300 21\"", 21, "Gas"),
  m("Cub Cadet", "30\" Walk-Behind", 30, "Gas"),
  m("Greenworks", "80V 21\"", 21, "Battery"),
  m("DeWalt", "20V MAX 21\"", 21, "Battery"),
  m("Milwaukee Tool", "M18 FUEL 21\"", 21, "Battery"),
  m("Troy-Bilt", "TB130 21\"", 21, "Gas"),
  m("Kobalt", "80V 21\"", 21, "Battery"),
  m("John Deere", "JS61 22\"", 22, "Gas"),
  m("Exmark", "Commercial 30\"", 30, "Gas"),
  m("DR Power", "30\" Walk-Behind", 30, "Gas"),
  m("Worx", "40V 20\"", 20, "Battery"),
  m("Skil", "PWRCORE40 20\"", 20, "Battery"),
  m("Stihl", "RM 655", 21, "Gas"),
];

// Derive sample fitment from the published compatibility rules.
const notCompatible = new Set(["Worx", "Skil"]);
const stihlExcluded = /RM 655|RM 756/;

export const fitment: FitmentRow[] = mowerModels.flatMap((mm) => {
  const rows: FitmentRow[] = [];
  const blocked = notCompatible.has(mm.brand) || (mm.brand === "Stihl" && stihlExcluded.test(mm.model));
  if (blocked) return rows;
  if (mm.deckInches >= 20 && mm.deckInches <= 22) {
    rows.push({ productSlug: "lawn-stryper-generation-3", mowerModelId: mm.id });
    rows.push({ productSlug: "lawn-stryper-gc-pro-series-21", mowerModelId: mm.id });
    if (mm.power === "Gas" && mm.brand !== "Honda") {
      rows.push({ productSlug: "lawn-stryper-classic", mowerModelId: mm.id });
    }
  }
  if (mm.deckInches === 30) {
    rows.push({ productSlug: "lawn-stryper-gc-pro-series-30", mowerModelId: mm.id });
  }
  return rows;
});

export const faqs: { q: string; a: string }[] = [
  {
    q: "Will a Lawn Stryper fit my mower?",
    a: "Generation 3 and GC Pro 21 fit most 20\"–22\" gas and battery residential walk-behind mowers. The Classic fits gas mowers only (not Honda). The GC Pro 30 fits 30\" walk-behinds. Use Find My Fit to check your model, or contact us if it isn't listed.",
  },
  {
    q: "How long does assembly take?",
    a: "About 15 minutes with a Phillips or flat-head screwdriver. Everything else is in the box.",
  },
  {
    q: "What do I fill the roller with?",
    a: "12–16 lbs of dry sand. Sand isn't included — any bag of dry play or paver sand works.",
  },
  {
    q: "Can I keep using my bagger?",
    a: "Yes. Lawn Stryper works with or without most bagging systems.",
  },
  {
    q: "How fast do you ship?",
    a: "Orders are processed in 1–2 business days and ship UPS Ground with tracking. We ship to the lower 48, Canada, Australia and select European countries. For Alaska, Hawaii and other international orders, contact us.",
  },
  {
    q: "What's the warranty?",
    a: "Every striping system has a 30-day manufacturer defect warranty. See the warranty page for details.",
  },
];

export const contact = {
  phone: "(262) 439-9261",
  email: "stefan@patternyourlawn.com",
  city: "Milwaukee, WI",
  social: {
    facebook: "https://www.facebook.com/Lawn.Stryper/",
    instagram: "https://www.instagram.com/lawn.stryper/",
    youtube: "https://www.youtube.com/watch?v=MjoHx_CscIg",
  },
};

export const media = {
  logo: `${WP}/2023/02/logo.png`,
  hero: `${WP}/2023/02/Top_Drone_Boettcher_2.jpg`,
  heroAlt: `${WP}/2024/03/Generation3_Updated_Slider_March.jpg`,
  step1: `${WP}/2023/02/lawn-stryper_1.jpg`,
  step2: `${WP}/2023/02/lawn-stryper_2.jpg`,
  step3: `${WP}/2023/02/step-3-crop.jpg`,
  beforeAfter: `${WP}/2023/06/SB-BeforeAfter.jpg`,
};
