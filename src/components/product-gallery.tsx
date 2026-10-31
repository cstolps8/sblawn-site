"use client";

import Image from "next/image";
import { useState } from "react";

export function ProductGallery({ images, alt, contain }: { images: string[]; alt: string; contain: boolean }) {
  const [active, setActive] = useState(0);
  return (
    <div>
      <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-mist">
        <Image
          src={images[active]}
          alt={alt}
          fill
          priority
          sizes="(min-width: 1024px) 55vw, 100vw"
          className={contain ? "object-contain p-6" : "object-cover"}
        />
      </div>
      {images.length > 1 && (
        <ul className="mt-3 grid grid-cols-5 gap-2">
          {images.map((src, i) => (
            <li key={src}>
              <button
                type="button"
                onClick={() => setActive(i)}
                aria-label={`Show image ${i + 1}`}
                aria-current={i === active}
                className={`relative block aspect-square w-full overflow-hidden rounded-lg border-2 ${
                  i === active ? "border-turf" : "border-transparent opacity-70 hover:opacity-100"
                }`}
              >
                <Image src={src} alt="" fill sizes="120px" className="object-cover" />
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
