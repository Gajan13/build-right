import Image from "next/image";
import { Eyebrow } from "@/components/ui/eyebrow";
import type { Heading, Photo } from "@/content/types";

export function CraftBand({ eyebrow, title, text, photo }: Heading & { photo: Photo }) {
  return (
    <section aria-labelledby="craft-title" className="relative isolate overflow-hidden bg-night text-white">
      <Image src={photo.src} alt={photo.alt} fill sizes="(min-width: 768px) 100vw, 180vw" className="-z-20 object-cover object-[50%_40%]" />
      <div className="absolute inset-0 -z-10 bg-night/80" />
      <div className="shell py-28 md:py-44">
        <div className="reveal mx-auto flex max-w-4xl flex-col items-center gap-6 text-center">
          <Eyebrow tone="dark">{eyebrow}</Eyebrow>
          <h2 id="craft-title" className="title">
            {title}
          </h2>
          <p className="max-w-xl text-lg text-sand">{text}</p>
        </div>
      </div>
    </section>
  );
}
