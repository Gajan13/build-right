import type { Metadata } from "next";
import { Invitation } from "@/components/sections/invitation";
import { ProjectHero } from "@/components/sections/project-hero";
import { NavLink } from "@/components/ui/nav-link";
import { images } from "@/content/images";
import { intro, isExample, labels, projects } from "@/content/projects";
import { services } from "@/content/services";
import { site } from "@/content/site";
import type { Project, ProjectId } from "@/content/types";
import { getProjectHref } from "@/lib/routes";

// One folder per project, like app/services: with Cache Components a [slug] route caches unknown addresses,
// and on a case-insensitive disk a wrong-case address could then break a real page.
function findProject(id: ProjectId) {
  const index = projects.findIndex((project) => project.id === id);
  if (index < 0) throw new Error(`content/projects.ts has no project "${id}"`);
  return { index, project: projects[index] };
}

const serviceName = (project: Project) =>
  services.find(({ id }) => id === project.service)?.title ?? project.service;
const numberOf = (index: number) =>
  `${isExample ? `${labels.example} ` : ""}${String(index + 1).padStart(2, "0")}`;

export function getProjectMetadata(id: ProjectId): Metadata {
  const { project } = findProject(id);
  return {
    title: project.title,
    description: `${project.summary} ${site.name}, ${project.area}.`,
    // Example projects must not appear in search results as if they were real.
    ...(isExample && { robots: { index: false, follow: true } }),
  };
}

/** The common template for every project page. */
export function ProjectPage({ id }: { id: ProjectId }) {
  const { index, project } = findProject(id);
  const page = labels.page;
  const briefId = `${project.id}-brief`;
  const sheet = [
    [page.sheetRows.project, numberOf(index)],
    [page.sheetRows.area, project.area],
    [page.sheetRows.home, `${project.homeType}, ${project.size}`],
    [page.sheetRows.rooms, project.rooms],
    [page.sheetRows.service, serviceName(project)],
    [page.sheetRows.started, project.started],
    [page.sheetRows.completed, project.completed],
  ];
  const neighbours = [
    { project: projects[index - 1], label: page.previous },
    { project: projects[index + 1], label: page.next },
  ];

  return (
    <>
      <ProjectHero
        breadcrumb={[
          ...intro.breadcrumb,
          { label: page.projects, href: "/projects" },
        ]}
        title={project.title}
        label={serviceName(project)}
        badge={`${numberOf(index)} · ${project.area}`}
        text={project.summary}
        photo={project.photo}
        focus={project.focus}
        actions={{
          primary: page.contact,
          secondary: { label: page.more, href: `#${briefId}` },
        }}
        facts={[
          { label: labels.facts.homeType, value: project.homeType },
          { label: labels.facts.size, value: project.size },
          { label: labels.facts.onSite, value: project.onSite },
          { label: labels.facts.completed, value: project.completed },
        ]}
      />

      <section aria-labelledby={briefId} className="shell py-20 md:py-28">
        {isExample && (
          <div
            role="note"
            className="mb-12 flex gap-4 rounded-lg border border-accent/40 bg-surface p-5 md:mb-16 md:p-6"
          >
            <span
              aria-hidden="true"
              className="mt-1.5 size-2.5 shrink-0 rounded-full bg-accent"
            />
            <div>
              <p className="font-display text-lg font-bold">
                {intro.notice.title}
              </p>
              <p className="mt-1 text-muted">{intro.notice.text}</p>
            </div>
          </div>
        )}
        <div className="grid gap-10 lg:grid-cols-[12rem_minmax(0,1fr)_22rem] lg:gap-14 xl:grid-cols-[15rem_minmax(0,1fr)_24rem] xl:gap-20">
          <h2
            id={briefId}
            className="text-[0.9375rem] font-extrabold tracking-[0.08em] text-accent uppercase"
          >
            {page.brief}
          </h2>
          <div className="reveal max-w-2xl">
            <p className="text-lg text-pretty md:text-xl">{project.brief[0]}</p>
            <p className="mt-6 text-lg text-pretty text-muted">
              {project.brief[1]}
            </p>
          </div>
          <aside
            aria-label={page.sheet}
            className="reveal self-start rounded-xl border border-line bg-surface p-6"
          >
            <h2 className="text-xs font-extrabold tracking-[0.08em] text-muted uppercase">
              {page.sheet}
            </h2>
            <dl className="mt-3">
              {sheet.map(([label, value]) => (
                <div
                  key={label}
                  className="flex justify-between gap-6 border-t border-line py-3 text-sm"
                >
                  <dt className="text-muted">{label}</dt>
                  <dd className="text-right font-semibold">{value}</dd>
                </div>
              ))}
            </dl>
          </aside>
        </div>

        <nav
          aria-label={`${page.previous}, ${page.next}`}
          className="mt-16 flex flex-wrap justify-between gap-x-8 gap-y-5 border-t border-line pt-8"
        >
          {neighbours.map(({ project: other, label }, side) =>
            other ? (
              <NavLink
                key={label}
                href={getProjectHref(other.id)}
                className={`group block py-1 ${side ? "ml-auto text-right" : ""}`}
              >
                <span className="block text-sm text-muted">{label}</span>
                <span className="font-display text-lg font-bold underline-offset-8 group-hover:underline md:text-xl">
                  {other.title}
                </span>
              </NavLink>
            ) : null,
          )}
        </nav>
      </section>

      <Invitation
        title="Planning a home of your own?"
        text="Bring your land, a drawing or just an idea. Every project here started with a conversation."
        link={page.contact}
        photo={images.fort}
      />
    </>
  );
}
