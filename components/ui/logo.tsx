import { NavLink } from "./nav-link";

export function Logo({ name }: { name: string }) {
  return (
    <NavLink href="/" className="flex shrink-0 items-center gap-2.5" aria-label={`${name}, home`}>
      <svg viewBox="8 11 48 42" aria-hidden="true" className="h-7 w-8" fill="currentColor">
        <path d="M8 30 32 11l24 19h-8L32 18 16 30Z" />
        <path d="M16 35h14v18H16zm18 0h14v7H34zm0 11h14v7H34z" />
      </svg>
      <span className="font-display text-lg font-extrabold tracking-tight whitespace-nowrap uppercase min-[400px]:text-2xl">{name}</span>
    </NavLink>
  );
}
