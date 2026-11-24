import Image from "next/image";
import { Carousel } from "@/components/ui/carousel";
import { SectionHeading } from "@/components/ui/section-heading";
import type { Heading, Item, Photo } from "@/content/types";

type Props = Heading & { stages: (Item & { photo: Photo })[] };

export function BuildStages({ stages, ...heading }: Props) {
  return (
    <section id="build" aria-labelledby="build-title" className="overflow-hidden py-16 md:py-24">
      <div className="shell">
        <SectionHeading id="build-title" {...heading} />
        <div className="reveal mt-12">
          <Carousel label="Stages of building a home">
            {stages.map(({ title, text, photo }) => (
              <li key={title} className="group w-[84%] shrink-0 snap-start sm:w-[56%] lg:w-[38%]">
                <div className="relative aspect-4/3 overflow-hidden rounded">
                  <Image src={photo.src} alt={photo.alt} fill sizes="(min-width: 1024px) 38vw, (min-width: 640px) 56vw, 84vw" className="zoom object-cover" />
                </div>
                <h3 className="mt-3 font-display text-2xl font-bold">{title}</h3>
                <p className="mt-1 text-muted">{text}</p>
              </li>
            ))}
          </Carousel>
        </div>
      </div>
    </section>
  );
}
