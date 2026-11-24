import Image from "next/image";
import { ButtonLink } from "@/components/ui/button-link";
import type { Link, Photo } from "@/content/types";

type Props = { title: string; text: string; link: Link; photo: Photo };

export function Invitation({ title, text, link, photo }: Props) {
  return (
    // Named by text, not id: several pages use this, and Next.js keeps visited pages in the DOM.
    <section aria-label={title} className="shell pb-20 md:pb-28">
      <div className="relative isolate flex min-h-96 items-end overflow-hidden rounded bg-night text-white md:min-h-128">
        <Image src={photo.src} alt="" fill sizes="(min-width: 768px) 100vw, 180vw" className="-z-20 object-cover object-[58%_58%]" />
        <div className="absolute inset-0 -z-10 bg-night/80 lg:bg-transparent lg:bg-linear-to-r lg:from-night/90 lg:via-night/70 lg:to-night/20" />
        <div className="flex w-full flex-col items-start justify-between gap-7 p-6 md:p-12 lg:flex-row lg:items-end">
          <div className="reveal max-w-2xl">
            <h2 className="title">
              {title}
            </h2>
            <p className="mt-5 max-w-lg text-lg text-sand">{text}</p>
          </div>
          <ButtonLink {...link} />
        </div>
      </div>
    </section>
  );
}
