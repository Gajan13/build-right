import { Logo } from "@/components/ui/logo";
import { MobileMenu } from "@/components/ui/mobile-menu";
import { NavDropdown } from "@/components/ui/nav-dropdown";
import { NavLink } from "@/components/ui/nav-link";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import type { NavItem } from "@/content/types";

export function SiteHeader({ name, links }: { name: string; links: NavItem[] }) {
  return (
    <header className="fixed inset-x-0 top-0 z-20">
      <a href="#main" className="sr-only rounded bg-night p-3 text-white focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-10">
        Skip to content
      </a>
      <div className="shell pt-3 md:pt-6">
        <div className="drop relative flex items-center justify-between gap-3 rounded border border-night/25 bg-sand p-2 pl-3 text-night shadow-lg shadow-night/15">
          <Logo name={name} />
          <nav aria-label="Main" className="hidden xl:block">
            <ul className="flex items-center gap-6 text-sm font-semibold 2xl:gap-8">
              {links.map((link) => (
                <li key={link.href}>
                  {link.children ? (
                    <NavDropdown label={link.label} href={link.href} items={link.children} />
                  ) : (
                    <NavLink
                      href={link.href}
                      isSection
                      className="block py-2 underline decoration-transparent decoration-2 underline-offset-8 transition-[text-decoration-color] duration-200 hover:decoration-current aria-[current=page]:decoration-current aria-[current=true]:decoration-current"
                    >
                      {link.label}
                    </NavLink>
                  )}
                </li>
              ))}
            </ul>
          </nav>
          <div className="flex items-center gap-1 sm:gap-2">
            <ThemeToggle />
            <NavLink href="/contact" className="hidden min-h-11 items-center rounded bg-amber px-5 text-sm font-semibold sm:flex">
              Start your home
            </NavLink>
            <MobileMenu links={links} />
          </div>
        </div>
      </div>
    </header>
  );
}
