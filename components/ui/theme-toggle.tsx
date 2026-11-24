"use client";

import { toggleTheme } from "@/lib/theme";

export function ThemeToggle() {
  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label="Switch between light and dark theme"
      className="grid size-11 shrink-0 cursor-pointer place-items-center"
    >
      <span className="flex h-5 w-9.5 rounded-full bg-night p-0.75">
        <span className="size-3.5 rounded-full bg-white transition-transform dark:translate-x-4.5" />
      </span>
    </button>
  );
}
