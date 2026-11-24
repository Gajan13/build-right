import { NavLink } from "@/components/ui/nav-link";
import type { Service } from "@/content/types";
import { getServiceHref } from "@/lib/routes";

type Labels = { intro: string; steps: string; questions: string; note: string; previous: string; next: string };
type Props = { service: Service; previous?: Service; next?: Service; labels: Labels };

const heading = "font-display text-[clamp(1.625rem,2.8vw,2.5rem)] leading-tight font-bold text-balance uppercase";

export function ServiceGuide({ service: { id, intro, steps, advice, points, questions }, previous, next, labels }: Props) {
  return (
    <div className="min-w-0">
      <h2 className={heading}>{labels.intro}</h2>
      <p className="mt-5 max-w-3xl text-lg text-pretty text-muted md:text-xl">{intro}</p>

      {/* Prefixed, because visited service pages share the DOM. */}
      <h2 id={`${id}-steps`} className={`${heading} mt-16`}>
        {labels.steps}
      </h2>
      <ol className="reveal-each mt-8 grid gap-x-10 gap-y-8 sm:grid-cols-2">
        {steps.map((step, index) => (
          <li key={step.title}>
            <span aria-hidden="true" className="grid size-12 place-items-center rounded bg-surface font-display text-lg font-semibold">
              0{index + 1}.
            </span>
            <h3 className="mt-4 font-display text-xl font-bold md:text-2xl">{step.title}</h3>
            <p className="mt-1 max-w-sm text-muted">{step.text}</p>
          </li>
        ))}
      </ol>

      <div className="mt-16 rounded bg-surface p-6 md:p-9">
        <h2 className={heading}>{advice}</h2>
        <ul className="mt-4">
          {points.map((point) => (
            <li key={point} className="flex gap-3 py-2">
              <span aria-hidden="true" className="mt-2.25 size-1.5 shrink-0 bg-accent" />
              <span>{point}</span>
            </li>
          ))}
        </ul>
      </div>

      <h2 className={`${heading} mt-16`}>{labels.questions}</h2>
      <div className="reveal-each mt-4">
        {questions.map((question) => (
          <div key={question.title} className="border-b border-line py-6">
            <h3 className="font-display text-xl font-semibold md:text-2xl">{question.title}</h3>
            <p className="mt-2 max-w-3xl text-muted">{question.text}</p>
          </div>
        ))}
      </div>
      <p className="mt-6 text-sm text-muted">{labels.note}</p>

      <nav aria-label={`${labels.previous}, ${labels.next}`} className="mt-12 flex flex-wrap justify-between gap-x-8 gap-y-5">
        {previous && <PagerLink service={previous} label={labels.previous} />}
        {next && <PagerLink service={next} label={labels.next} className="ml-auto text-right" />}
      </nav>
    </div>
  );
}

function PagerLink({ service, label, className = "" }: { service: Service; label: string; className?: string }) {
  return (
    <NavLink href={getServiceHref(service.id)} className={`group block py-1 ${className}`}>
      <span className="block text-sm text-muted">{label}</span>
      <span className="font-display text-lg font-bold underline-offset-8 group-hover:underline md:text-xl">{service.title}</span>
    </NavLink>
  );
}
