import { Arrow } from "@/components/ui/arrow";
import { NavLink } from "@/components/ui/nav-link";
import { SectionHeading } from "@/components/ui/section-heading";
import type { Heading, Service } from "@/content/types";

export function ServiceIndex({ services, ...heading }: Heading & { services: Service[] }) {
  return (
    <section aria-labelledby="services-title" className="bg-surface py-20 md:py-28">
      <div className="shell grid gap-12 lg:grid-cols-[2fr_3fr] lg:gap-20">
        <SectionHeading id="services-title" align="start" {...heading} />
        {/* A ruled list rather than tiles, so solid colour stays with the main buttons. */}
        <ol className="reveal-each border-t border-ink/25">
          {services.map(({ id, title }, index) => (
            <li key={id} className="border-b border-ink/25">
              <NavLink href={`#${id}`} className="group flex items-center gap-4 py-4 md:py-5">
                <span aria-hidden="true" className="w-9 shrink-0 font-display text-lg text-accent">
                  0{index + 1}.
                </span>
                <span className="min-w-0 flex-1 font-display text-xl font-bold underline-offset-8 group-hover:underline md:text-3xl">
                  {title}
                </span>
                <Arrow className="size-5 shrink-0 rotate-90 text-accent transition-transform motion-safe:group-hover:translate-y-1" />
              </NavLink>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
