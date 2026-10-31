"use client";

import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import type { MowerModel } from "@/lib/types";

export function MowerPicker({ mowers, compact = false }: { mowers: MowerModel[]; compact?: boolean }) {
  const router = useRouter();
  const brands = useMemo(() => [...new Set(mowers.map((m) => m.brand))].sort(), [mowers]);
  const [brand, setBrand] = useState("");
  const [model, setModel] = useState("");
  const models = mowers.filter((m) => m.brand === brand);

  const select =
    "w-full appearance-none rounded-lg border border-black/15 bg-white px-4 py-3 text-base font-medium text-charcoal outline-none focus:border-turf focus:ring-2 focus:ring-turf/30 disabled:opacity-50";

  return (
    <form
      className={`grid gap-3 ${compact ? "sm:grid-cols-[1fr_1fr_auto]" : "md:grid-cols-[1fr_1fr_auto]"}`}
      onSubmit={(e) => {
        e.preventDefault();
        if (model) router.push(`/mower-fit/${model}/`);
      }}
    >
      <label className="block">
        <span className="sr-only">Mower brand</span>
        <select
          className={select}
          value={brand}
          onChange={(e) => {
            setBrand(e.target.value);
            setModel("");
          }}
        >
          <option value="">Mower brand</option>
          {brands.map((b) => (
            <option key={b}>{b}</option>
          ))}
        </select>
      </label>
      <label className="block">
        <span className="sr-only">Mower model</span>
        <select className={select} value={model} disabled={!brand} onChange={(e) => setModel(e.target.value)}>
          <option value="">Model</option>
          {models.map((m) => (
            <option key={m.id} value={m.id}>
              {m.model} · {m.power}
            </option>
          ))}
        </select>
      </label>
      <button
        type="submit"
        disabled={!model}
        className="rounded-lg bg-charcoal px-6 py-3 font-display text-lg font-bold uppercase tracking-wide text-white hover:bg-charcoal-900 disabled:opacity-40"
      >
        Check fit
      </button>
    </form>
  );
}
