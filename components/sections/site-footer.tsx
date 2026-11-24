import { Logo } from "@/components/ui/logo";
import { NavLink } from "@/components/ui/nav-link";
import type { Link } from "@/content/types";

type Props = {
  site: { name: string; descriptor: string; location: string; imageNotice: string };
  links: Link[];
};

export function SiteFooter({ site, links }: Props) {
  return (
    <footer className="relative isolate overflow-hidden bg-night text-white">
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-[repeating-linear-gradient(90deg,rgb(255_255_255/0.06)_0,transparent_7%)]"
      />
      <div className="reveal shell flex flex-col justify-between gap-12 pt-20 pb-14 lg:flex-row">
        <div className="max-w-sm">
          <Logo name={site.name} />
          <p className="mt-5 text-sand">
            {site.descriptor}, building places for families to put down roots.
          </p>
        </div>
        <div className="grid gap-10 sm:grid-cols-2 sm:gap-20">
          <nav aria-label="Footer">
            <h2 className="font-display font-semibold text-amber">Explore</h2>
            <ul className="mt-4 grid grid-cols-2 gap-x-8">
              {links.map((link) => (
                <li key={link.href}>
                  <NavLink href={link.href} className="block py-2 text-sand hover:text-white aria-[current=page]:underline">
                    {link.label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>
          <div>
            <h2 className="font-display font-semibold text-amber">Find us</h2>
            <p className="mt-6 text-sand">{site.location}</p>
          </div>
        </div>
      </div>
      <div className="shell">
        <div className="flex flex-col justify-between gap-2 border-t border-white/20 py-6 text-sm text-sand md:flex-row">
          <p>© {site.name}. All rights reserved.</p>
          <p>{site.imageNotice}</p>
        </div>
      </div>
    </footer>
  );
}
