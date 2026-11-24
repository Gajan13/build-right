"use client";

import { usePathname } from "next/navigation";
import { useId, useState } from "react";
import type { Link } from "@/content/types";
import { Chevron } from "./chevron";
import { NavLink } from "./nav-link";

type Props = Link & { items: Link[]; onNavigate: () => void };

export function MobileSubmenu({ label, href, items, onNavigate }: Props) {
  const pathname = usePathname();
  const isWithin = pathname === href || pathname.startsWith(`${href}/`);
  // Starts open within the section, so visitors see where they are.
  const [isOpen, setIsOpen] = useState(isWithin);
  const listId = useId();

  return (
    <>
      <div className="flex items-center gap-1">
        <NavLink
          href={href}
          onClick={onNavigate}
          className={`block flex-1 rounded px-3 py-3 underline-offset-8 hover:bg-white/10 ${isWithin ? "underline" : ""}`}
        >
          {label}
        </NavLink>
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          aria-expanded={isOpen}
          aria-controls={listId}
          aria-label={`${label} submenu`}
          className="grid size-12 shrink-0 cursor-pointer place-items-center rounded hover:bg-white/10"
        >
          <Chevron className={`size-5 transition-transform ${isOpen ? "rotate-180" : ""}`} />
        </button>
      </div>
      <ul id={listId} hidden={!isOpen} className="pop mb-2 ml-3 border-l border-white/25 pl-2">
        {items.map((item) => (
          <li key={item.href}>
            <NavLink
              href={item.href}
              onClick={onNavigate}
              className="block rounded px-3 py-3 text-sand underline-offset-8 hover:bg-white/10 aria-[current=page]:text-amber aria-[current=page]:underline"
            >
              {item.label}
            </NavLink>
          </li>
        ))}
      </ul>
    </>
  );
}
