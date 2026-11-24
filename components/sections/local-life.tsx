import Image from "next/image";
import { SectionHeading } from "@/components/ui/section-heading";
import type { Heading, Item, Photo } from "@/content/types";

type Props = Heading & { photos: Photo[]; considerations: Item[] };

export function LocalLife({ photos, considerations, ...heading }: Props) {
  return (
    <section id="jaffna" aria-labelledby="jaffna-title" className="bg-band py-20 md:py-28">
      <div className="shell grid gap-12 lg:grid-cols-2 lg:gap-16">
        <div className="reveal-each grid grid-cols-2 content-center gap-4">
          {photos.map((photo, index) => (
            <div key={photo.src.src} className={`relative overflow-hidden rounded ${index === 0 ? "col-span-2 aspect-video" : "aspect-square"}`}>
              <Image src={photo.src} alt={photo.alt} fill sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover" />
            </div>
          ))}
        </div>
        <div className="order-first lg:order-none">
          <SectionHeading id="jaffna-title" align="start" {...heading} />
          <ul className="mt-10 grid gap-4 sm:grid-cols-2">
            {considerations.map((item) => (
              <li key={item.title} className="reveal rounded bg-paper p-6">
                <h3 className="font-display text-2xl font-bold">{item.title}</h3>
                <p className="mt-2 text-muted">{item.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
