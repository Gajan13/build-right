"use client";

import Image from "next/image";
import { useEffect, useRef, useState, type PointerEvent, type ReactNode } from "react";
import type { Photo } from "@/content/types";
import { createTileReveal, type TileRevealEngine } from "@/lib/tile-reveal";

type Props = {
  base: Photo;
  /** Must share the base's aspect ratio, so the two line up. */
  reveal: Photo;
  focus: { x: number; y: number };
  labels: { show: string; hide: string };
  children: ReactNode;
};

const sizes = "(max-aspect-ratio: 3/2) 152vh, 100vw";

export function TileReveal({ base, reveal, focus, labels, children }: Props) {
  const canvas = useRef<HTMLCanvasElement>(null);
  const photo = useRef<HTMLImageElement>(null);
  const engine = useRef<TileRevealEngine>(null);
  const [isRevealed, setIsRevealed] = useState(false);

  const aspect = reveal.src.width / reveal.src.height;
  const { x, y } = focus;

  useEffect(() => {
    if (!canvas.current || !photo.current) return;
    const created = createTileReveal(canvas.current, photo.current, { aspect, focus: { x, y } });
    engine.current = created;
    return () => {
      created?.destroy();
      engine.current = null;
      // This also runs when Next.js hides the page, and the next engine starts unpinned.
      setIsRevealed(false);
    };
  }, [aspect, x, y]);

  const handleMove = (event: PointerEvent) => engine.current?.move(event.clientX, event.clientY);

  const handleDown = (event: PointerEvent) => {
    // A press on a link or button is not a request to play with the picture.
    if (event.target instanceof Element && event.target.closest("a, button")) return;
    engine.current?.burst(event.clientX, event.clientY);
  };

  const handleToggle = () => {
    engine.current?.setPinned(!isRevealed);
    setIsRevealed(!isRevealed);
  };

  const objectPosition = `${x * 100}% ${y * 100}%`;

  return (
    // pan-y and pinch-zoom leave scrolling and zooming to the browser. Sideways drags paint tiles.
    <div
      onPointerMove={handleMove}
      onPointerDown={handleDown}
      onPointerLeave={() => engine.current?.release()}
      className="relative isolate flex min-h-svh w-full touch-pan-y touch-pinch-zoom items-center"
    >
      <Image src={base.src} alt={base.alt} fill preload sizes={sizes} style={{ objectPosition }} className="-z-30 object-cover" />
      {/* Only a source for the canvas, which draws it tile by tile. */}
      <Image ref={photo} src={reveal.src} alt="" fill loading="eager" sizes={sizes} className="invisible -z-30 object-cover" />
      <canvas ref={canvas} aria-hidden="true" className="pointer-events-none absolute inset-0 -z-20 size-full" />
      <div className="pointer-events-none absolute inset-0 -z-10 bg-linear-to-r from-blueprint/55 via-blueprint/48 to-blueprint/40 lg:from-blueprint/55 lg:via-blueprint/45 lg:via-42% lg:to-transparent" />

      {children}

      <button
        type="button"
        onClick={handleToggle}
        className="absolute right-4 bottom-4 inline-flex min-h-11 cursor-pointer items-center gap-2.5 rounded border border-white/35 bg-blueprint/85 px-4 text-sm font-semibold text-white md:right-8 md:bottom-8"
      >
        <span aria-hidden="true" className="grid grid-cols-2 gap-0.5">
          <span className="size-1.5 bg-white" />
          <span className="size-1.5 bg-white/40" />
          <span className="size-1.5 bg-white/40" />
          <span className="size-1.5 bg-white" />
        </span>
        {isRevealed ? labels.hide : labels.show}
      </button>
    </div>
  );
}
