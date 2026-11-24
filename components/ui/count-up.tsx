"use client";

import { useEffect, useRef } from "react";

// One small number with words around it, such as "15", "Nearly 60" or "7 home services".
// Dates and larger figures ("Oct 2026", "3,400 sq ft") don't match, so they stay as they are.
const pattern = /^(\D*?)(\d{1,3})(\D*)$/;

/** Counts a number up from 0 when it scrolls into view. The page always contains the final value. */
export function CountUp({ text }: { text: string }) {
  const number = useRef<HTMLSpanElement>(null);
  const match = pattern.exec(text);
  const target = match ? Number(match[2]) : 0;

  useEffect(() => {
    const element = number.current;
    if (
      !element ||
      !target ||
      matchMedia("(prefers-reduced-motion: reduce)").matches
    )
      return;

    let frame = 0;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();
        const start = performance.now();
        const step = (now: number) => {
          const progress = Math.min((now - start) / 1400, 1);
          // Fast at first, easing into the final value.
          element.textContent = String(
            Math.round(target * (1 - (1 - progress) ** 3)),
          );
          if (progress < 1) frame = requestAnimationFrame(step);
        };
        element.textContent = "0";
        frame = requestAnimationFrame(step);
      },
      { threshold: 0.6 },
    );
    observer.observe(element);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
      element.textContent = String(target);
    };
  }, [target]);

  if (!match) return text;

  return (
    <>
      <span className="sr-only">{text}</span>
      <span aria-hidden="true">
        {match[1]}
        {/* Fixed width, so the text beside the number doesn't shift while it counts. */}
        <span
          ref={number}
          className="inline-block text-right tabular-nums"
          style={{ minWidth: `${match[2].length}ch` }}
        >
          {match[2]}
        </span>
        {match[3]}
      </span>
    </>
  );
}
