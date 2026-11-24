"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { Arrow } from "./arrow";

export function Carousel({ label, children }: { label: string; children: ReactNode }) {
  const track = useRef<HTMLUListElement>(null);
  const [edge, setEdge] = useState({ start: true, end: false });

  useEffect(() => {
    const element = track.current;
    if (!element) return;
    const update = () =>
      setEdge({
        start: element.scrollLeft < 8,
        end: element.scrollLeft + element.clientWidth > element.scrollWidth - 8,
      });
    update();
    element.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      element.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  const move = (direction: 1 | -1) => {
    const element = track.current;
    const slide = element?.firstElementChild;
    if (!element || !slide) return;
    const gap = parseFloat(getComputedStyle(element).columnGap) || 0;
    // aria-disabled, unlike disabled, keeps keyboard focus on the button at either end.
    element.scrollBy({ left: direction * (slide.getBoundingClientRect().width + gap) });
  };

  const control =
    "grid size-11 cursor-pointer place-items-center rounded border border-ink text-ink transition-colors not-aria-disabled:hover:bg-ink not-aria-disabled:hover:text-paper aria-disabled:cursor-default aria-disabled:border-muted/50 aria-disabled:text-muted/65";

  return (
    <div role="region" aria-roledescription="carousel" aria-label={label}>
      <ul
        ref={track}
        tabIndex={0}
        aria-label={label}
        className="relative flex snap-x snap-mandatory gap-4 overflow-x-auto overscroll-x-contain [scrollbar-width:none] motion-safe:scroll-smooth"
      >
        {children}
      </ul>
      <div className="mt-6 flex justify-end gap-2.5">
        <button type="button" onClick={() => move(-1)} aria-disabled={edge.start} aria-label="Previous slide" className={control}>
          <Arrow className="size-5 rotate-180" />
        </button>
        <button type="button" onClick={() => move(1)} aria-disabled={edge.end} aria-label="Next slide" className={control}>
          <Arrow className="size-5" />
        </button>
      </div>
    </div>
  );
}
