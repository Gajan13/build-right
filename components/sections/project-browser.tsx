"use client";

import Image from "next/image";
import { useState } from "react";
import { Arrow } from "@/components/ui/arrow";
import { NavLink } from "@/components/ui/nav-link";
import type { Project } from "@/content/types";
import { getProjectHref } from "@/lib/routes";

type Labels = {
  example: string;
  filters: { service: string; area: string; homeType: string; all: string };
  clear: string;
  empty: string;
  facts: { homeType: string; size: string; onSite: string; completed: string };
  link: string;
};

type Props = {
  projects: Project[];
  /** Readable names for each service id. */
  serviceNames: Record<string, string>;
  isExample: boolean;
  labels: Labels;
  countLabel: { of: string; projects: string };
};

type Key = "service" | "area" | "homeType";
type Selected = Partial<Record<Key, string>>;

const unique = (values: string[]) => [...new Set(values)];

export function ProjectBrowser({ projects, serviceNames, isExample, labels, countLabel }: Props) {
  const [selected, setSelected] = useState<Selected>({});

  const groups: { key: Key; label: string; options: { value: string; label: string }[] }[] = [
    {
      key: "service",
      label: labels.filters.service,
      options: unique(projects.map((project) => project.service)).map((value) => ({ value, label: serviceNames[value] ?? value })),
    },
    { key: "area", label: labels.filters.area, options: unique(projects.map((project) => project.area)).map((value) => ({ value, label: value })) },
    {
      key: "homeType",
      label: labels.filters.homeType,
      options: unique(projects.map((project) => project.homeType)).map((value) => ({ value, label: value })),
    },
  ];

  const shown = projects.filter((project) => (Object.keys(selected) as Key[]).every((key) => !selected[key] || project[key] === selected[key]));
  const hasFilters = Object.values(selected).some(Boolean);

  const choose = (key: Key, value?: string) => setSelected((current) => ({ ...current, [key]: value }));

  return (
    <section aria-label="Project list" className="shell pt-10 pb-20 md:pt-14 md:pb-28">
      <div className="reveal divide-y divide-line border-b border-line">
        {groups.map((group) => (
          <fieldset key={group.key} className="grid gap-3 py-4 md:grid-cols-[9rem_minmax(0,1fr)] md:items-center md:gap-6">
            <legend className="float-left text-sm font-semibold text-muted md:contents">
              <span className="md:self-center">{group.label}</span>
            </legend>
            <div className="flex flex-wrap gap-2">
              {[{ value: undefined, label: labels.filters.all }, ...group.options].map((option) => {
                const isOn = selected[group.key] === option.value;
                return (
                  <button
                    key={option.label}
                    type="button"
                    aria-pressed={isOn}
                    onClick={() => choose(group.key, option.value)}
                    className="min-h-10 cursor-pointer rounded-full border px-4 text-sm font-semibold transition-colors aria-pressed:border-ink aria-pressed:bg-ink aria-pressed:text-paper not-aria-pressed:border-line not-aria-pressed:hover:border-ink"
                  >
                    {option.label}
                  </button>
                );
              })}
            </div>
          </fieldset>
        ))}
      </div>

      <div className="flex min-h-16 items-center justify-between gap-4 border-b border-line">
        <p aria-live="polite" className="text-sm text-muted">
          {shown.length} {countLabel.of} {projects.length} {countLabel.projects}
        </p>
        <button
          type="button"
          onClick={() => setSelected({})}
          disabled={!hasFilters}
          className="min-h-10 cursor-pointer rounded-lg border border-line px-4 text-sm font-semibold hover:border-ink disabled:cursor-default disabled:text-muted disabled:hover:border-line"
        >
          {labels.clear}
        </button>
      </div>

      {shown.length === 0 && <p className="py-16 text-center text-lg text-muted">{labels.empty}</p>}

      <ol className="reveal-each divide-y divide-line">
        {shown.map((project) => {
          const number = String(projects.indexOf(project) + 1).padStart(2, "0");
          const facts = [
            [labels.facts.homeType, project.homeType],
            [labels.facts.size, project.size],
            [labels.facts.onSite, project.onSite],
            [labels.facts.completed, project.completed],
          ];
          return (
            <li key={project.id} className="group grid gap-8 py-10 md:py-12 lg:grid-cols-2 lg:gap-14">
              <div className="relative aspect-3/2 overflow-hidden rounded-xl">
                <Image src={project.photo.src} alt={project.photo.alt} fill sizes="(min-width: 1600px) 720px, (min-width: 1024px) 46vw, 100vw" className="zoom object-cover" />
                <span className="absolute top-4 left-4 inline-flex items-center gap-2 rounded-md bg-paper px-3 py-1.5 text-sm font-semibold text-ink shadow-sm">
                  <span aria-hidden="true" className="size-1.5 rounded-full bg-accent" />
                  {project.area}
                </span>
              </div>
              <div className="flex min-w-0 flex-col">
                <p className="text-sm text-muted">
                  {isExample ? `${labels.example} ${number}` : number} · {serviceNames[project.service] ?? project.service}
                </p>
                <h2 className="mt-2 font-display text-[clamp(1.625rem,2.6vw,2.25rem)] leading-tight font-bold text-balance">{project.title}</h2>
                <p className="mt-4 max-w-xl text-pretty text-muted">{project.summary}</p>
                <dl className="mt-7 grid grid-cols-2 border-t border-line">
                  {facts.map(([label, value]) => (
                    <div key={label} className="border-b border-line py-3.5 odd:border-r odd:pr-4 even:pl-4">
                      <dt className="text-xs text-muted">{label}</dt>
                      <dd className="mt-1 font-semibold">{value}</dd>
                    </div>
                  ))}
                </dl>
                <NavLink
                  href={getProjectHref(project.id)}
                  className="group mt-6 inline-flex min-h-11 items-center gap-2.5 self-start font-semibold underline decoration-line underline-offset-8 hover:decoration-ink"
                >
                  {labels.link}
                  <span className="sr-only">: {project.title}</span>
                  <Arrow className="size-4 transition-transform motion-safe:group-hover:translate-x-1" />
                </NavLink>
              </div>
            </li>
          );
        })}
      </ol>
    </section>
  );
}
