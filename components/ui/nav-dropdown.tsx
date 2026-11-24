"use client";

import { usePathname } from "next/navigation";
import { useEffect, useId, useRef, useState, type FocusEvent, type PointerEvent } from "react";
import type { Link } from "@/content/types";
import { Chevron } from "./chevron";
import { NavLink } from "./nav-link";

type Opened = { path: string; by: "hover" | "press" };

/**
 * A link with a disclosure beside it. Hover opens it for a mouse. The button opens it for keyboard and touch,
 * which is why this isn't an ARIA menu: these are ordinary links, reached with Tab.
 */
export function NavDropdown({ label, href, items }: Link & { items: Link[] }) {
  const pathname = usePathname();
  const [opened, setOpened] = useState<Opened | null>(null);
  const root = useRef<HTMLDivElement>(null);
  const toggle = useRef<HTMLButtonElement>(null);
  const panelId = useId();

  // Tied to the path, so going back or forward closes it without an effect.
  const isOpen = opened?.path === pathname;
  const isWithin = pathname === href || pathname.startsWith(`${href}/`);
  const close = () => setOpened(null);

  useEffect(() => {
    if (!isOpen) return;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      if (root.current?.contains(document.activeElement)) toggle.current?.focus();
      setOpened(null);
    };
    const closeOutside = (event: globalThis.PointerEvent) => {
      if (event.target instanceof Node && !root.current?.contains(event.target)) setOpened(null);
    };
    document.addEventListener("keydown", closeOnEscape);
    document.addEventListener("pointerdown", closeOutside);
    return () => {
      document.removeEventListener("keydown", closeOnEscape);
      document.removeEventListener("pointerdown", closeOutside);
    };
  }, [isOpen]);

  const handleEnter = (event: PointerEvent) => {
    if (event.pointerType === "mouse" && !isOpen) setOpened({ path: pathname, by: "hover" });
  };

  const handleLeave = () => {
    // Don't hide a panel that holds keyboard focus.
    if (opened?.by === "hover" && !root.current?.querySelector("ul")?.contains(document.activeElement)) close();
  };

  // A click on a panel that hover opened keeps it open, rather than closing it under the pointer.
  const handleToggle = () => (isOpen && opened?.by === "press" ? close() : setOpened({ path: pathname, by: "press" }));

  const handleBlur = (event: FocusEvent) => {
    // Safari gives no relatedTarget when a link is clicked. The outside-press listener covers that case.
    if (event.relatedTarget && !event.currentTarget.contains(event.relatedTarget)) close();
  };

  return (
    <div ref={root} onPointerEnter={handleEnter} onPointerLeave={handleLeave} onBlur={handleBlur} className="relative flex items-center">
      <NavLink
        href={href}
        onClick={close}
        className={`block py-2 decoration-2 underline-offset-8 hover:underline ${isWithin ? "underline" : ""}`}
      >
        {label}
      </NavLink>
      <button
        ref={toggle}
        type="button"
        onClick={handleToggle}
        aria-expanded={isOpen}
        aria-controls={panelId}
        aria-label={`${label} submenu`}
        className="-my-1 grid h-11 w-7 cursor-pointer place-items-center"
      >
        <Chevron className={`size-4 transition-transform ${isOpen ? "rotate-180" : ""}`} />
      </button>
      {/* The padding bridges the gap, so the pointer can travel to the panel without closing it. */}
      <div id={panelId} hidden={!isOpen} className="pop absolute top-full -left-4 w-76 pt-3">
        <ul className="max-h-[calc(100svh-7rem)] overflow-y-auto overscroll-contain rounded bg-night p-2 text-white shadow-lg shadow-night/30">
          {items.map((item) => (
            <li key={item.href}>
              <NavLink
                href={item.href}
                onClick={close}
                className="block rounded px-4 py-3 underline-offset-8 hover:bg-white/10 aria-[current=page]:bg-white/10 aria-[current=page]:text-amber aria-[current=page]:underline"
              >
                {item.label}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
