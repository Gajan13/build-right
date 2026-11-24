"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import type { NavItem } from "@/content/types";
import { MobileSubmenu } from "./mobile-submenu";
import { NavLink } from "./nav-link";

export function MobileMenu({ links }: { links: NavItem[] }) {
  // The header outlives each page, so a new path gets a new, closed menu.
  return <Menu key={usePathname()} links={links} />;
}

function Menu({ links }: { links: NavItem[] }) {
  const [isOpen, setIsOpen] = useState(false);
  const button = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!isOpen) return;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      setIsOpen(false);
      button.current?.focus();
    };
    document.addEventListener("keydown", closeOnEscape);
    return () => document.removeEventListener("keydown", closeOnEscape);
  }, [isOpen]);

  return (
    <div className="xl:hidden">
      <button
        ref={button}
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-controls="mobile-menu"
        aria-label="Menu"
        className="relative grid size-11 cursor-pointer place-items-center rounded bg-night text-white"
      >
        <span className={`absolute h-0.5 w-5 bg-current transition-transform ${isOpen ? "rotate-45" : "-translate-y-1"}`} />
        <span className={`absolute h-0.5 w-5 bg-current transition-transform ${isOpen ? "-rotate-45" : "translate-y-1"}`} />
      </button>
      <nav
        id="mobile-menu"
        aria-label="Mobile"
        hidden={!isOpen}
        className="pop absolute inset-x-0 top-full mt-2 max-h-[calc(100svh-6.5rem)] overflow-y-auto overscroll-contain rounded bg-night p-4 text-white"
      >
        <ul>
          {links.map((link) => (
            <li key={link.href}>
              {link.children ? (
                <MobileSubmenu label={link.label} href={link.href} items={link.children} onNavigate={() => setIsOpen(false)} />
              ) : (
                <NavLink
                  href={link.href}
                  isSection
                  onClick={() => setIsOpen(false)}
                  className="block rounded px-3 py-3 underline-offset-8 hover:bg-white/10 aria-[current=page]:underline aria-[current=true]:underline"
                >
                  {link.label}
                </NavLink>
              )}
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}
