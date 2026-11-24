import Image from "next/image";
import { SectionHeading } from "@/components/ui/section-heading";
import type { Heading, Item, Photo } from "@/content/types";

type Props = Heading & { photo: Photo; questions: Item[] };

export function PlanningGuide({ photo, questions, ...heading }: Props) {
  return (
    <section id="guide" aria-labelledby="guide-title" className="shell py-20 md:py-28">
      <div className="grid gap-12 lg:grid-cols-[2fr_3fr] lg:gap-20">
        <div>
          <SectionHeading id="guide-title" align="start" {...heading} />
          <div className="reveal relative mt-8 hidden aspect-5/4 overflow-hidden rounded lg:block">
            <Image src={photo.src} alt={photo.alt} fill sizes="40vw" className="object-cover object-[50%_70%]" />
          </div>
        </div>
        <div className="reveal-each self-center">
          {questions.map((question, index) => (
            <details key={question.title} name="guide" open={index === 0} className="group border-b border-line">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-6 [&::-webkit-details-marker]:hidden">
                <h3 className="font-display text-xl font-semibold md:text-2xl">{question.title}</h3>
                <span aria-hidden="true" className="grid size-9 shrink-0 place-items-center rounded border border-ink/60 text-2xl text-ink">
                  <span className="transition-transform group-open:rotate-45">+</span>
                </span>
              </summary>
              <p className="max-w-2xl pb-6 text-muted">{question.text}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
