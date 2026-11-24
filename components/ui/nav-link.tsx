"use client";

import NextLink from "next/link";
import { usePathname } from "next/navigation";
import type { ComponentProps, MouseEvent } from "react";

type Props = Omit<ComponentProps<typeof NextLink>, "href"> & {
  href: string;
  /** Also mark the link on pages below it, for example /projects on /projects/a-house. */
  isSection?: boolean;
};

/** Use for every internal link. It marks the current page, and scrolls when the URL would not change. */
export function NavLink({ href, onClick, isSection = false, ...props }: Props) {
  const pathname = usePathname();
  const isCurrent = href === pathname;
  // "true" rather than "page": the link is the section the visitor is in, not this exact page.
  const isWithin = isSection && !isCurrent && pathname.startsWith(`${href}/`);

  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    onClick?.(event);
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    const target = event.currentTarget;
    if (target.href !== window.location.href) return;

    // Next.js doesn't scroll for an unchanged URL, and replays a repeated #hash on the next page instead.
    event.preventDefault();
    const section = target.hash ? document.getElementById(target.hash.slice(1)) : null;
    if (section) section.scrollIntoView();
    else window.scrollTo({ top: 0 });
  };

  return <NextLink href={href} aria-current={isCurrent ? "page" : isWithin ? "true" : undefined} onClick={handleClick} {...props} />;
}
