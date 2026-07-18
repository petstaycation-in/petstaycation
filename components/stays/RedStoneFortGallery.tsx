"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";

type GalleryImage = { src: string; alt: string; category: string; source: string };

function track(event: string, detail?: Record<string, unknown>) {
  window.dispatchEvent(new CustomEvent("petstaycation:analytics", { detail: { event, ...detail } }));
}

export default function RedStoneFortGallery({ images }: { images: readonly GalleryImage[] }) {
  const [active, setActive] = useState<number | null>(null);
  const closeButton = useRef<HTMLButtonElement>(null);

  const close = useCallback(() => setActive(null), []);
  const move = useCallback((direction: number) => {
    setActive((current) => current === null ? null : (current + direction + images.length) % images.length);
  }, [images.length]);

  useEffect(() => {
    if (active === null) return;
    closeButton.current?.focus();
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") close();
      if (event.key === "ArrowRight") move(1);
      if (event.key === "ArrowLeft") move(-1);
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [active, close, move]);

  return (
    <>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4 lg:grid-rows-2">
        {images.slice(0, 5).map((image, index) => (
          <button
            key={image.src}
            type="button"
            onClick={() => { setActive(index); track("gallery_open", { image: image.source }); }}
            className={`group relative min-h-56 overflow-hidden rounded-[1.5rem] text-left focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#b76b43] ${index === 0 ? "sm:col-span-2 lg:row-span-2 lg:min-h-[520px]" : "lg:min-h-0"}`}
            aria-label={`Open gallery: ${image.alt}`}
          >
            <Image src={image.src} alt={image.alt} fill sizes={index === 0 ? "(max-width:1024px) 100vw, 50vw" : "(max-width:1024px) 50vw, 25vw"} className="object-cover transition duration-700 group-hover:scale-105" priority={index === 0} />
            <span className="absolute inset-0 bg-gradient-to-t from-[#1c1511]/65 via-transparent to-transparent" />
            <span className="absolute bottom-4 left-4 rounded-full border border-white/25 bg-black/20 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[.18em] text-white backdrop-blur">{image.category}</span>
          </button>
        ))}
      </div>

      {active !== null && (
        <div role="dialog" aria-modal="true" aria-label="The Red Stone Fort photo gallery" className="fixed inset-0 z-[80] grid place-items-center bg-[#120e0b]/95 p-4 sm:p-8">
          <button ref={closeButton} type="button" onClick={close} className="absolute right-4 top-4 z-10 grid h-12 w-12 place-items-center rounded-full border border-white/20 bg-white/10 text-2xl text-white focus-visible:outline-2 focus-visible:outline-white" aria-label="Close gallery">×</button>
          <div className="relative h-[78vh] w-full max-w-6xl">
            <Image src={images[active].src} alt={images[active].alt} fill sizes="100vw" className="object-contain" priority />
          </div>
          <div className="absolute inset-x-4 bottom-4 flex items-center justify-between gap-4 text-white">
            <button type="button" onClick={() => move(-1)} className="rounded-full border border-white/25 bg-white/10 px-5 py-3 text-sm focus-visible:outline-2 focus-visible:outline-white" aria-label="Previous image">← Previous</button>
            <p className="hidden max-w-xl text-center text-sm text-white/75 sm:block">{images[active].alt}</p>
            <button type="button" onClick={() => move(1)} className="rounded-full border border-white/25 bg-white/10 px-5 py-3 text-sm focus-visible:outline-2 focus-visible:outline-white" aria-label="Next image">Next →</button>
          </div>
        </div>
      )}
    </>
  );
}
