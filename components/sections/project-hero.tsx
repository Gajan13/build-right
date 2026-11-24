import { CountUp } from "@/components/ui/count-up";
import Image from "next/image";
import { Arrow } from "@/components/ui/arrow";
import { NavLink } from "@/components/ui/nav-link";
import type { Link, Photo } from "@/content/types";

type Props = {
  breadcrumb: Link[];
  title: string;
  /** Short line above the headline, such as the service. */
  label: string;
  /** Top-right tag, such as the project number and area. */
  badge: string;
  text: string;
  photo: Photo;
  /** CSS object-position for the photo. */
  focus?: string;
  actions: { primary: Link; secondary: Link };
  facts: { label: string; value: string }[];
};

const action = "lift group inline-flex min-h-13 max-w-full items-center gap-3 rounded-lg px-5 font-semibold transition-colors";

export function ProjectHero({ breadcrumb, title, label, badge, text, photo, focus, actions, facts }: Props) {
  return (
    // Named by text, not id: visited project pages share the DOM.
    <section aria-label={title} className="px-2 pt-21 md:px-3 md:pt-28">
      <div className="relative isolate mx-auto flex max-w-480 flex-col overflow-hidden rounded-2xl bg-night text-white md:rounded-3xl lg:min-h-[clamp(30rem,calc(100svh-9rem),46rem)]">
        <Image src={photo.src} alt={photo.alt} fill preload sizes="(max-width: 767px) 240vw, 100vw" style={{ objectPosition: focus }} data-parallax className="drift -z-20 object-cover" />
        {/* An even tint, then darker edges where the words are, leaving the middle of the photo clear. */}
        <div className="absolute inset-0 -z-10 bg-night/30 lg:bg-night/20" />
        <div className="absolute inset-x-0 top-0 -z-10 h-40 bg-linear-to-b from-night/85 via-night/65 via-45% to-transparent" />
        <div className="absolute inset-x-0 bottom-0 -z-10 h-full bg-linear-to-t from-night/95 via-night/82 via-72% to-transparent lg:h-[86%] lg:via-night/76 lg:via-62%" />

        <div className="flex items-start justify-between gap-6 px-5 pt-5 md:px-10 md:pt-8 xl:px-12">
          <nav aria-label="Breadcrumb" className="min-w-0">
            <ol className="flex flex-wrap items-center gap-x-2.5 text-sm font-semibold">
              {breadcrumb.map((link) => (
                <li key={link.href} className="flex items-center gap-2.5">
                  <NavLink href={link.href} className="inline-flex min-h-11 min-w-6 items-center text-sand underline-offset-4 hover:underline">
                    {link.label}
                  </NavLink>
                  <span aria-hidden="true" className="text-white/85">
                    /
                  </span>
                </li>
              ))}
              <li>
                <span aria-current="page" className="inline-flex items-center sm:min-h-11">
                  {title}
                </span>
              </li>
            </ol>
          </nav>
          <p className="hidden shrink-0 items-center gap-2.5 rounded-lg border border-white/20 bg-night/75 px-3.5 py-2.5 text-sm font-semibold backdrop-blur-sm sm:flex">
            <span aria-hidden="true" className="size-1.5 rounded-full bg-amber" />
            {badge}
          </p>
        </div>

        <div className="rise mt-auto grid items-end gap-7 px-5 pt-40 pb-8 md:px-10 md:pt-40 md:pb-10 lg:grid-cols-[minmax(0,1fr)_23rem] lg:gap-16 lg:pt-16 xl:grid-cols-[minmax(0,1fr)_27rem] xl:px-12">
          <h1 className="min-w-0">
            <span className="block font-sans text-[0.9375rem] font-extrabold text-amber">
              {label}
              <span className="sr-only">: </span>
            </span>
            <span className="mt-3 block max-w-3xl font-display text-[clamp(2.125rem,4.3vw,4.25rem)] leading-[1.04] font-semibold tracking-tight text-balance">
              {title}
            </span>
          </h1>
          <div className="min-w-0">
            <p className="max-w-md text-pretty text-sand md:text-lg">{text}</p>
            <div className="mt-6 flex flex-wrap gap-2.5">
              <NavLink href={actions.primary.href} className={`${action} bg-amber text-night`}>
                {actions.primary.label}
                <Arrow className="size-5 transition-transform motion-safe:group-hover:translate-x-1" />
              </NavLink>
              <NavLink href={actions.secondary.href} className={`${action} border border-white/30 bg-night/60 backdrop-blur-sm hover:bg-night/85`}>
                {actions.secondary.label}
              </NavLink>
            </div>
          </div>
        </div>

        <dl className="grid grid-cols-2 border-t border-white/15 bg-night/75 backdrop-blur-sm lg:grid-cols-4">
          {facts.map((fact) => (
            <div
              key={fact.label}
              className="min-w-0 border-white/15 px-5 py-4 not-first:border-l max-lg:odd:border-l-0 max-lg:nth-[n+3]:border-t md:px-10 md:py-5 lg:px-6 lg:first:pl-10 xl:first:pl-12"
            >
              <dt className="text-xs font-semibold text-sand/80">{fact.label}</dt>
              <dd className="mt-1 font-semibold text-balance md:text-lg"><CountUp text={fact.value} /></dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
