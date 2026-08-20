"use client";

import Image from "next/image";
import { useState } from "react";

function hashHue(seed: string): number {
  let hash = 0;
  for (let i = 0; i < seed.length; i++) {
    hash = (hash << 5) - hash + seed.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash) % 360;
}

export default function ArticleImage({
  src,
  alt,
  category,
  sizes,
  priority,
}: {
  src: string;
  alt: string;
  category: string;
  sizes?: string;
  priority?: boolean;
}) {
  const [failed, setFailed] = useState(false);

  if (!src || failed) {
    const hue = hashHue(alt || category);
    return (
      <div
        className="absolute inset-0 flex items-end p-3"
        style={{
          background: `linear-gradient(135deg, hsl(${hue} 35% 22%), hsl(${
            (hue + 40) % 360
          } 45% 12%))`,
        }}
      >
        <span className="text-[11px] font-semibold uppercase tracking-wider text-white/70">
          {category}
        </span>
      </div>
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      fill
      priority={priority}
      sizes={sizes ?? "(max-width: 768px) 100vw, 33vw"}
      className="object-cover"
      onError={() => setFailed(true)}
    />
  );
}
