import { CountUp } from "@/components/ui/count-up";
import Image from "next/image";
import { Arrow } from "@/components/ui/arrow";
import { Icon } from "@/components/ui/icon";
import { NavLink } from "@/components/ui/nav-link";
import type { Link, Service, Stat } from "@/content/types";

type Labels = { breadcrumb: Link[]; badge: string; contact: Link; more: string };
type Props = { service: Service; number: number; facts: Stat[]; labels: Labels };

const action = "lift group inline-flex min-h-14 max-w-full items-center gap-3.5 rounded-lg px-6 font-semibold transition-colors";

export function ServiceHero({ service: { id, title, text, icon, tagline, hero }, number, facts, labels }: Props) {
  return (
    // Named by text, not id: visited service pages share the DOM.
    <section aria-label={title} className="px-2 pt-21 md:px-3 md:pt-28">
      <div className="relative isolate mx-auto flex max-w-480 flex-col overflow-hidden rounded-2xl bg-night text-white md:rounded-3xl lg:min-h-[clamp(32rem,calc(100svh-7.75rem),52rem)]">
        <Image
          src={hero.photo.src}
          alt={hero.photo.alt}
          fill
          preload
          sizes="(max-width: 767px) 280vw, 100vw"
          style={{ objectPosition: hero.focus }}
          data-parallax
          className="drift -z-20 object-cover"
        />
        {/* An even tint, then darker edges where the words are, leaving the middle of the photo clear. */}
        <div className="absolute inset-0 -z-10 bg-night/30 lg:bg-night/20" />
        <div className="absolute inset-x-0 top-0 -z-10 h-40 bg-linear-to-b from-night/85 via-night/65 via-45% to-transparent" />
        <div className="absolute inset-x-0 bottom-0 -z-10 h-full bg-linear-to-t from-night/95 via-night/82 via-72% to-transparent lg:h-[86%] lg:via-night/76 lg:via-62%" />

        <div className="flex items-start justify-between gap-6 px-5 pt-5 md:px-10 md:pt-8 xl:px-12">
          <nav aria-label="Breadcrumb">
            <ol className="flex flex-wrap items-center gap-x-2.5 text-sm font-semibold">
              {labels.breadcrumb.map((link) => (
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
          <p className="hidden items-center gap-2.5 rounded-lg border border-white/20 bg-night/75 px-3.5 py-2.5 text-sm font-semibold backdrop-blur-sm sm:flex">
            <span aria-hidden="true" className="size-1.5 rounded-full bg-amber" />
            {labels.badge}
          </p>
        </div>

        <div className="rise mt-auto grid items-end gap-7 px-5 pt-40 pb-8 md:px-10 md:pt-40 md:pb-10 lg:grid-cols-[minmax(0,1fr)_23rem] lg:gap-16 lg:pt-16 xl:grid-cols-[minmax(0,1fr)_27rem] xl:px-12">
          <h1 className="min-w-0">
            <span className="flex items-center gap-2.5 font-sans text-[0.9375rem] font-extrabold text-amber">
              <Icon name={icon} className="size-5 shrink-0" />
              <span>
                <span aria-hidden="true">{String(number).padStart(2, "0")} · </span>
                {title}
                <span className="sr-only">: </span>
              </span>
            </span>
            <span className="mt-4 block font-display text-[clamp(2.125rem,4.3vw,4.25rem)] leading-[1.04] font-semibold tracking-tight">
              {tagline.map((line) => (
                <span key={line} className="block text-balance">
                  {line}{" "}
                </span>
              ))}
            </span>
          </h1>
          <div className="min-w-0">
            <p className="max-w-md text-pretty text-sand md:text-lg">{text}</p>
            <div className="mt-6 flex flex-wrap gap-2.5 lg:flex-col lg:items-start">
              <NavLink href={labels.contact.href} className={`${action} bg-amber text-night`}>
                {labels.contact.label}
                <Arrow className="size-5 transition-transform motion-safe:group-hover:translate-x-1" />
              </NavLink>
              <NavLink href={`#${id}-steps`} className={`${action} border border-white/30 bg-night/60 backdrop-blur-sm hover:bg-night/85`}>
                {labels.more}
                <Arrow className="size-5 transition-transform motion-safe:group-hover:translate-x-1" />
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
