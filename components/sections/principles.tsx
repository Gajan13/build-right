import { Icon } from "@/components/ui/icon";
import { SectionHeading } from "@/components/ui/section-heading";
import type { Heading, Principle } from "@/content/types";

export function Principles({ values, ...heading }: Heading & { values: Principle[] }) {
  return (
    <section aria-labelledby="principles-title" className="bg-surface py-20 md:py-28">
      <div className="shell">
        <SectionHeading id="principles-title" {...heading} />
        <ul className="mt-14 grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
          {values.map(({ icon, title, text }) => (
            <li key={title} className="reveal">
              <span className="grid size-14 place-items-center rounded bg-paper text-accent">
                <Icon name={icon} className="size-7" />
              </span>
              <h3 className="mt-6 font-display text-2xl font-bold">{title}</h3>
              <p className="mt-2 max-w-xs text-muted">{text}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
