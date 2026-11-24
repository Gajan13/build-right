import Image from "next/image";
import { ButtonLink } from "@/components/ui/button-link";
import { Eyebrow } from "@/components/ui/eyebrow";
import type { Heading, Link, Photo } from "@/content/types";

type Props = Heading & { facts: string[]; link: Link; photo: Photo };

export function Story({ eyebrow, title, text, facts, link, photo }: Props) {
  return (
    <section aria-labelledby="story-title" className="shell py-20 md:py-28">
      <div className="grid-lines">
        <div className="reveal flex flex-col items-start gap-6">
          <Eyebrow>{eyebrow}</Eyebrow>
          <h2 id="story-title" className="max-w-6xl font-display text-[clamp(1.6rem,3.2vw,2.9rem)] leading-tight font-bold text-pretty">
            {title}
          </h2>
        </div>
        <div className="mt-12 grid gap-10 md:mt-16 lg:grid-cols-2 lg:gap-16">
          <div className="reveal relative aspect-4/3 overflow-hidden rounded">
            <Image src={photo.src} alt={photo.alt} fill sizes="(min-width: 1024px) 60vw, 120vw" className="object-cover" />
          </div>
          <div className="reveal flex flex-col items-start justify-between gap-8">
            {/* Ruled rows rather than pills, so the facts don't look like buttons. */}
            <ul className="grid w-full gap-x-8 sm:grid-cols-2">
              {facts.map((fact) => (
                <li key={fact} className="border-b border-line py-4 font-semibold">
                  {fact}
                </li>
              ))}
            </ul>
            <p className="max-w-xl text-lg text-pretty text-muted md:text-xl">{text}</p>
            <ButtonLink {...link} tone="ink" />
          </div>
        </div>
      </div>
    </section>
  );
}
