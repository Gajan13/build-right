"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

const targets = ".reveal, .reveal-each > *";

/**
 * Scroll animation for every page and browser. Marks .reveal elements as they come into view, and shares the
 * scroll position so [data-parallax] photos can move a little slower than the page. Renders nothing; does nothing with reduced motion.
 */
export function ScrollMotion() {
  // Runs again after each navigation, because Next.js adds the new page's elements without a reload.
  const pathname = usePathname();

  useEffect(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const root = document.documentElement;

    const observer = new IntersectionObserver(
      (entries) => {
        let order = 0;
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          const element = entry.target as HTMLElement;
          // Items that arrive together, such as a row of cards, follow one another.
          element.style.setProperty("--reveal-delay", `${Math.min(order++, 5) * 80}ms`);
          element.classList.add("is-visible");
          observer.unobserve(element);
        }
      },
      { rootMargin: "0px 0px -8% 0px" },
    );

    for (const element of document.querySelectorAll<HTMLElement>(targets)) {
      if (element.classList.contains("is-visible")) continue;
      const box = element.getBoundingClientRect();
      // Already on screen at the first load: show at once, so nothing flashes.
      if (!root.dataset.motion && element.checkVisibility() && box.top < innerHeight && box.bottom > 0) element.classList.add("is-visible");
      else observer.observe(element);
    }
    root.dataset.motion = "";

    // Parallax reads this from CSS. Writing to the photos directly would clash with React while a page loads.
    let frame = 0;
    const move = () => {
      frame = 0;
      root.style.setProperty("--scroll-y", String(Math.round(Math.min(scrollY, 2000))));
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(move);
    };
    move();
    addEventListener("scroll", onScroll, { passive: true });

    return () => {
      observer.disconnect();
      removeEventListener("scroll", onScroll);
      cancelAnimationFrame(frame);
    };
  }, [pathname]);

  return null;
}
