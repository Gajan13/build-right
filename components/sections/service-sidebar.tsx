import { Arrow } from "@/components/ui/arrow";
import { ButtonLink } from "@/components/ui/button-link";
import { NavLink } from "@/components/ui/nav-link";
import type { Item, Link, Service } from "@/content/types";
import { getServiceHref } from "@/lib/routes";

type Props = { services: Service[]; labels: { sidebar: string; help: Item; contact: Link } };

/** The same on every service page. NavLink marks the one being viewed. */
export function ServiceSidebar({ services, labels }: Props) {
  return (
    <aside aria-label={labels.sidebar} className="reveal">
      {/* Sticky only where the whole sidebar fits, or its end could never be reached. */}
      <div className="lg:[@media(min-height:53rem)]:sticky lg:[@media(min-height:53rem)]:top-28">
        <nav aria-label={labels.sidebar}>
          <h2 className="font-display text-xl font-bold">{labels.sidebar}</h2>
          <ul className="mt-4 border-t border-line">
            {services.map(({ id, title }) => (
              <li key={id} className="border-b border-line">
                <NavLink
                  href={getServiceHref(id)}
                  className="group flex min-h-12 items-center justify-between gap-3 px-3 py-2.5 font-semibold hover:bg-surface aria-[current=page]:bg-surface aria-[current=page]:text-accent"
                >
                  {title}
                  <Arrow className="size-4 shrink-0 opacity-0 group-hover:opacity-100 group-aria-[current=page]:opacity-100" />
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
        <div className="mt-6 flex flex-col items-start gap-3 rounded bg-night p-6 text-white">
          <h2 className="font-display text-xl font-bold">{labels.help.title}</h2>
          <p className="text-sand">{labels.help.text}</p>
          <ButtonLink {...labels.contact} tone="white" />
        </div>
      </div>
    </aside>
  );
}
