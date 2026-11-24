import type { ReactNode } from "react";

// A label, so it has no fill or outline: solid amber is kept for main buttons.
// "page" follows the theme (rust or amber). "dark" is for photos and bands that are dark in both themes.
const tones = { page: "text-accent", dark: "text-amber" };

export function Eyebrow({ children, tone = "page" }: { children: ReactNode; tone?: keyof typeof tones }) {
  return <p className={`text-[0.9375rem] font-extrabold tracking-[0.08em] uppercase ${tones[tone]}`}>{children}</p>;
}
