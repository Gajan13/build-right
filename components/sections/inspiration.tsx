import Image from "next/image";
import { SectionHeading } from "@/components/ui/section-heading";
import type { Heading, Item, Photo } from "@/content/types";

type Props = Heading & { notice: string; ideas: (Item & { photo: Photo })[] };

export function Inspiration({ notice, ideas, ...heading }: Props) {
  return (
    <section id="inspiration" aria-labelledby="inspiration-title" className="shell py-20 md:py-28">
      <SectionHeading id="inspiration-title" {...heading} />
      <ul className="mt-12 grid gap-6 md:grid-cols-3">
        {ideas.map(({ title, text, photo }) => (
          <li key={title} className="reveal group">
            <div className="relative aspect-4/3 overflow-hidden rounded md:aspect-4/5">
              <Image
                src={photo.src}
                alt={photo.alt}
                fill
                sizes="(min-width: 768px) 45vw, 100vw"
                className="object-cover transition-transform duration-700 motion-safe:group-hover:scale-105"
              />
            </div>
            <h3 className="mt-3 font-display text-2xl font-bold">{title}</h3>
            <p className="text-muted">{text}</p>
          </li>
        ))}
      </ul>
      <p className="mt-8 text-center text-sm text-muted">{notice}</p>
    </section>
  );
}
