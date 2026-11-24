import { CountUp } from "@/components/ui/count-up";
import Image from "next/image";
import { ButtonLink } from "@/components/ui/button-link";
import { Eyebrow } from "@/components/ui/eyebrow";
import { NavLink } from "@/components/ui/nav-link";
import type { Item, Link, Photo } from "@/content/types";

type Props = {
  breadcrumb: Link[];
  current: string;
  eyebrow: string;
  title: string;
  text: string;
  link: Link;
  /** Background behind the heading, like the About and Services banners. */
  photo: Photo;
  /** Optional figures strip under the photo. */
  stats?: { label: string; value: string }[];
  /** Shown while the projects are placeholders. */
  notice?: Item;
};

/** The photo hero shared by About, Services, Projects, Blog and Contact. */
export function PageHero({
  breadcrumb,
  current,
  eyebrow,
  title,
  text,
  link,
  photo,
  stats,
  notice,
}: Props) {
  return (
    <section aria-label={title}>
      <div className="relative isolate flex min-h-[min(100svh,54rem)] flex-col overflow-hidden bg-night text-white">
        <Image
          src={photo.src}
          alt={photo.alt}
          fill
          preload
          sizes="(max-aspect-ratio: 3/2) 150vh, 100vw"
          data-parallax
          className="drift -z-20 object-cover object-[45%_70%]"
        />
        {/* Darkest where the words sit, so the lit windows still show through. */}
        <div className="absolute inset-0 -z-10 bg-night/45 lg:bg-night/25" />
        <div className="absolute inset-x-0 top-0 -z-10 h-64 bg-linear-to-b from-night/95 via-night/75 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 -z-10 h-full bg-linear-to-t from-night/90 via-night/70 via-60% to-transparent lg:h-[88%] lg:via-night/70 lg:via-55%" />
        <div className="shell flex flex-1 flex-col pt-28 pb-14 md:pt-36 md:pb-20">
          <nav aria-label="Breadcrumb">
            <ol className="flex flex-wrap items-center gap-x-2.5 text-sm font-semibold">
              {breadcrumb.map((item) => (
                <li key={item.href} className="flex items-center gap-2.5">
                  <NavLink
                    href={item.href}
                    className="inline-flex min-h-11 items-center text-sand underline-offset-4 hover:underline"
                  >
                    {item.label}
                  </NavLink>
                  <span aria-hidden="true" className="text-white/80">
                    /
                  </span>
                </li>
              ))}
              <li>
                <span aria-current="page">{current}</span>
              </li>
            </ol>
          </nav>

          <div className="rise mt-auto grid gap-8 pt-24 lg:grid-cols-[minmax(0,1fr)_minmax(0,26rem)] lg:items-end lg:gap-20">
            <div className="flex flex-col items-start gap-5">
              <Eyebrow tone="dark">{eyebrow}</Eyebrow>
              <h1 className="max-w-3xl font-display text-[clamp(2.5rem,6vw,5rem)] leading-[1.02] font-semibold tracking-tight text-balance">
                {title}
              </h1>
            </div>
            <div className="flex flex-col items-start gap-6">
              <p className="text-lg text-pretty text-sand">{text}</p>
              <ButtonLink {...link} />
            </div>
          </div>
        </div>
      </div>

      {(stats?.length || notice) && (
        <div className="reveal shell">
          {stats?.length ? (
            <dl className="flex flex-wrap border-b border-line">
              {stats.map((stat) => (
                <div
                  key={stat.label}
                  className="flex items-baseline gap-3 py-4 pr-6 not-last:mr-6 md:not-last:border-r md:border-line"
                >
                  <dt className="text-sm text-muted">{stat.label}</dt>
                  <dd className="font-display text-lg font-semibold">
                    <CountUp text={stat.value} />
                  </dd>
                </div>
              ))}
            </dl>
          ) : null}

          {notice && (
            <div
              role="note"
              className="mt-8 flex gap-4 rounded-lg border border-accent/40 bg-surface p-5 md:p-6"
            >
              <span
                aria-hidden="true"
                className="mt-1.5 size-2.5 shrink-0 rounded-full bg-accent"
              />
              <div>
                <p className="font-display text-lg font-bold">{notice.title}</p>
                <p className="mt-1 text-muted">{notice.text}</p>
              </div>
            </div>
          )}
        </div>
      )}
    </section>
  );
}
