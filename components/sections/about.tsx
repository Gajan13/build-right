import Image from "next/image";
import { ButtonLink } from "@/components/ui/button-link";
import { Eyebrow } from "@/components/ui/eyebrow";
import { NavLink } from "@/components/ui/nav-link";
import { StatValue } from "@/components/ui/stat-value";
import type { Item, Link, Photo, Stat } from "@/content/types";

type Props = { eyebrow: string; title: string; text: string; stats: Stat[]; link: Link; photo: Photo; principles: Item[] };

export function About({ eyebrow, title, text, stats, link, photo, principles }: Props) {
  return (
    <section id="about" aria-labelledby="about-title" className="shell py-20 md:py-28">
      <div className="grid-lines">
        <div className="reveal grid gap-10 lg:grid-cols-[2fr_1fr] lg:gap-20">
          <div className="flex flex-col items-start gap-6">
            <Eyebrow>{eyebrow}</Eyebrow>
            <h2 id="about-title" className="max-w-4xl font-display text-[clamp(1.6rem,3vw,2.6rem)] leading-tight font-bold text-pretty">
              {title}
            </h2>
            <div className="flex flex-wrap items-center gap-x-7 gap-y-3">
              <ButtonLink href="#process" label="How it works" tone="ink" />
              <NavLink href={link.href} className="py-2 font-semibold underline underline-offset-8">
                {link.label}
              </NavLink>
            </div>
          </div>
          <div className="flex flex-col justify-between gap-8">
            <p className="text-lg text-muted">{text}</p>
            <dl className="reveal-each grid grid-cols-2 gap-5">
              {stats.map((stat) => (
                <div key={stat.label} className="flex flex-col-reverse justify-end gap-1">
                  <dt className="text-sm text-muted">{stat.label}</dt>
                  <dd className="font-display text-5xl font-bold whitespace-nowrap md:text-6xl">
                    <StatValue {...stat} />
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
        <div className="reveal relative mt-12 aspect-4/3 overflow-hidden rounded sm:aspect-2/1 lg:aspect-3/1">
          <Image src={photo.src} alt={photo.alt} fill sizes="(min-width: 1600px) 1500px, 100vw" className="object-cover" />
        </div>
        <ol className="mt-8 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {principles.map((item, index) => (
            <li key={item.title} className="reveal flex gap-3">
              <span aria-hidden="true" className="font-display text-lg text-accent">
                0{index + 1}.
              </span>
              <div>
                <h3 className="font-display text-2xl font-bold">{item.title}</h3>
                <p className="mt-1 text-muted">{item.text}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
