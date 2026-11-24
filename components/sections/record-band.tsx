import Image from "next/image";
import { ButtonLink } from "@/components/ui/button-link";
import { StatValue } from "@/components/ui/stat-value";
import type { Link, Photo, Stat } from "@/content/types";

type Props = { title: string; text: string; link: Link; stats: Stat[]; photo: Photo };

export function RecordBand({ title, text, link, stats, photo }: Props) {
  return (
    <section aria-labelledby="record-title" className="shell">
      <div className="relative isolate overflow-hidden rounded bg-night text-white">
        <Image src={photo.src} alt={photo.alt} fill sizes="(min-width: 768px) 100vw, 200vw" className="-z-20 object-cover" />
        <div className="absolute inset-0 -z-10 bg-linear-to-r from-night/90 to-night/55" />
        <div className="grid items-end gap-10 px-6 py-14 md:px-12 md:py-20 xl:grid-cols-2">
          <div className="reveal flex flex-col items-start gap-5">
            <h2 id="record-title" className="title max-w-xl">
              {title}
            </h2>
            <p className="max-w-lg text-lg text-sand">{text}</p>
            <ButtonLink {...link} tone="white" />
          </div>
          <dl className="reveal-each grid gap-6 sm:grid-cols-3">
            {stats.map((stat) => (
              <div key={stat.label} className="flex flex-col-reverse justify-end border-l border-white/40 pl-5">
                <dt className="text-sm text-sand">{stat.label}</dt>
                <dd className="font-display text-4xl font-bold whitespace-nowrap text-amber">
                  <StatValue {...stat} />
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
