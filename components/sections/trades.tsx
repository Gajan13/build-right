import Image from "next/image";
import { ButtonLink } from "@/components/ui/button-link";
import { SectionHeading } from "@/components/ui/section-heading";
import type { Heading, Item, Link, Photo } from "@/content/types";

type Props = Heading & { notice: string; items: (Item & { photo: Photo })[]; more: Link & { text: string } };

export function Trades({ notice, items, more, ...heading }: Props) {
  // On phones the link card takes a whole row, so an odd last trade does too.
  const oddLast = items.length % 2 ? items.length - 1 : -1;
  return (
    <section aria-labelledby="trades-title" className="shell pb-20 md:pb-28">
      <div className="grid-lines">
        <SectionHeading id="trades-title" align="start" {...heading} />
        {/* Said before the photos, because in this position they would otherwise read as a team. */}
        <p className="mt-4 text-sm text-muted">{notice}</p>
        <ul className="mt-10 grid grid-cols-2 gap-x-3 gap-y-8 md:gap-x-5 lg:grid-cols-4">
          {items.map(({ title, text, photo }, index) => (
            <li key={title} className={`group reveal min-w-0 ${index === oddLast ? "max-sm:col-span-2" : ""}`}>
              <div className={`relative overflow-hidden rounded aspect-3/4 ${index === oddLast ? "max-sm:aspect-4/3" : ""}`}>
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  fill
                  sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                  className="zoom object-cover object-[50%_30%]"
                />
              </div>
              <h3 className="mt-3 font-display text-lg font-bold wrap-break-word md:text-2xl">{title}</h3>
              <p className="text-sm text-muted md:text-base">{text}</p>
            </li>
          ))}
          <li className="reveal col-span-2 sm:col-span-1">
            <div className="flex h-full min-h-64 flex-col items-start justify-end gap-5 rounded bg-laterite p-5 text-white sm:aspect-3/4 sm:h-auto sm:min-h-0 md:p-7">
              <p className="font-display text-xl leading-tight font-bold text-pretty xl:text-3xl">{more.text}</p>
              <ButtonLink href={more.href} label={more.label} tone="white" />
            </div>
          </li>
        </ul>
      </div>
    </section>
  );
}
