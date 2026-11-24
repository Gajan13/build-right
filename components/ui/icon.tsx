import type { IconName } from "@/content/types";

const paths: Record<IconName, string> = {
  plan: "M4 3h11l5 5v13H4zM15 3v5h5M8 17v-5h4v5m-4 0h8v-3h-4",
  family: "M3 11l9-8 9 8M5 9.5V21h14V9.5M9 21v-4a3 3 0 0 1 6 0v4M12 12a1.75 1.75 0 1 0 0-3.5 1.75 1.75 0 0 0 0 3.5",
  level: "M2 8h20v8H2zM8 8v8m8-8v8m-4-3a1 1 0 1 0 0-2 1 1 0 0 0 0 2M5 12h.01M19 12h.01",
  talk: "M3 4h13v10H9l-4 3v-3H3zM19 9h2v10h-2v3l-4-3h-4v-2",
  house: "M3 11l9-8 9 8M5 9.5V21h5v-6h4v6h5V9.5",
  roof: "M2 12 12 4l10 8M6 12v8h12v-8M9 9.5h6M16 4h3v3.5",
  trowel: "M3 21l3-9 6 6zM9 15l5-5h-2V8l4-5 5 5-5 4",
  tiles: "M3 3h8v8H3zM13 3h8v8h-8zM3 13h8v8H3zM13 13h8v8h-8z",
  drop: "M12 3s7 7.5 7 12a7 7 0 0 1-14 0c0-4.5 7-12 7-12",
  bolt: "M13 2 4 14h7l-1 8 10-13h-7z",
  sun: "M12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8M12 2v2m0 16v2M2 12h2m16 0h2M5 5l1.5 1.5m11 11L19 19M5 19l1.5-1.5m11-11L19 5",
};

export function Icon({ name, className }: { name: IconName; className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d={paths[name]} />
    </svg>
  );
}
