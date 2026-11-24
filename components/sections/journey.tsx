import Image from "next/image";
import { Eyebrow } from "@/components/ui/eyebrow";
import { StatValue } from "@/components/ui/stat-value";
import type { Heading, Photo, Stat } from "@/content/types";

type Props = Heading & { stats: Stat[]; photo: Photo };

export function Journey({ eyebrow, title, text, stats, photo }: Props) {
  return (
    <section aria-labelledby="journey-title" className="shell grid gap-4 py-20 md:py-28 lg:grid-cols-[2fr_3fr]">
      <div className="reveal relative aspect-square overflow-hidden rounded lg:aspect-auto lg:min-h-136">
        <Image src={photo.src} alt={photo.alt} fill sizes="(min-width: 1024px) 45vw, 100vw" className="object-cover object-[60%_65%]" />
      </div>
      <div className="relative isolate flex flex-col justify-center overflow-hidden rounded bg-night px-6 py-14 text-white md:px-14">
        <div
          aria-hidden="true"
          className="absolute inset-0 -z-10 bg-[repeating-linear-gradient(90deg,rgb(255_255_255/0.05)_0,transparent_10%)]"
        />
        <div className="reveal flex flex-col items-start gap-6">
          <Eyebrow tone="dark">{eyebrow}</Eyebrow>
          <h2 id="journey-title" className="title max-w-2xl">
            {title}
          </h2>
          <p className="max-w-xl text-lg text-pretty text-sand">{text}</p>
          <dl className="mt-4 flex flex-wrap gap-x-12 gap-y-6">
            {stats.map((stat) => (
              <div key={stat.label} className="flex flex-col-reverse border-l border-white/40 pl-5">
                <dt className="text-sm text-sand">{stat.label}</dt>
                <dd className="font-display text-5xl font-bold whitespace-nowrap md:text-6xl">
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
