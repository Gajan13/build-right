import Image from "next/image";
import { SectionHeading } from "@/components/ui/section-heading";
import type { Heading, Item, Photo } from "@/content/types";

type Props = Heading & { photo: Photo; steps: Item[] };

export function Process({ photo, steps, ...heading }: Props) {
  return (
    <section id="process" aria-labelledby="process-title" className="shell pb-20 md:pb-28">
      <div className="grid-lines">
        <SectionHeading id="process-title" align="start" {...heading} />
        <div className="mt-12 grid gap-10 xl:grid-cols-[22rem_1fr] xl:items-end">
          <div className="reveal relative aspect-video overflow-hidden rounded xl:aspect-6/5">
            <Image src={photo.src} alt={photo.alt} fill sizes="(min-width: 1280px) 440px, 100vw" className="object-cover" />
          </div>
          <ol className="relative grid gap-9 md:grid-cols-3">
            <li aria-hidden="true" className="absolute top-6 hidden w-2/3 border-t-2 border-dashed border-accent md:block" />
            {steps.map((step, index) => (
              <li key={step.title} className="reveal relative">
                <span aria-hidden="true" className="grid size-12 place-items-center rounded bg-surface font-display text-lg font-semibold">
                  0{index + 1}.
                </span>
                <h3 className="mt-6 font-display text-2xl font-bold">{step.title}</h3>
                <p className="mt-1 max-w-sm text-muted">{step.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
