import Image from "next/image";
import { Arrow } from "@/components/ui/arrow";
import { NavLink } from "@/components/ui/nav-link";
import type { Service } from "@/content/types";
import { getServiceHref } from "@/lib/routes";

export function ServiceDetails({ services }: { services: Service[] }) {
  return (
    <div className="shell py-10 md:py-16">
      {services.map(({ id, title, text, advice, points, photo }, index) => (
        <section
          key={id}
          id={id}
          aria-labelledby={`${id}-title`}
          className="group grid items-center gap-8 border-line py-12 not-last:border-b md:grid-cols-2 md:gap-12 md:py-16 xl:gap-24"
        >
          <div className={`reveal relative aspect-4/3 overflow-hidden rounded ${index % 2 ? "md:order-last" : ""}`}>
            <Image src={photo.src} alt={photo.alt} fill sizes="(min-width: 1600px) 720px, (min-width: 768px) 50vw, 100vw" className="zoom object-cover" />
          </div>
          <div className="reveal min-w-0">
            <span aria-hidden="true" className="font-display text-lg text-accent">
              0{index + 1}.
            </span>
            <h2
              id={`${id}-title`}
              className="mt-2 font-display text-[clamp(1.75rem,3.4vw,3.25rem)] leading-[1.08] font-bold text-balance uppercase"
            >
              {title}
            </h2>
            <p className="mt-5 max-w-xl text-lg text-pretty text-muted">{text}</p>
            <h3 className="mt-8 font-display text-xl font-bold">{advice}</h3>
            <ul className="mt-2 max-w-xl">
              {points.map((point) => (
                <li key={point} className="flex gap-3 py-2">
                  <span aria-hidden="true" className="mt-2.25 size-1.5 shrink-0 bg-accent" />
                  <span>{point}</span>
                </li>
              ))}
            </ul>
            <NavLink
              href={getServiceHref(id)}
              className="mt-5 inline-flex min-h-11 items-center gap-2.5 font-semibold underline underline-offset-8"
            >
              More about {title.toLowerCase()}
              <Arrow className="size-4 shrink-0" />
            </NavLink>
          </div>
        </section>
      ))}
    </div>
  );
}
