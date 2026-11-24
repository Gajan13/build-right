import type { Metadata } from "next";
import { Invitation } from "@/components/sections/invitation";
import { ProjectBrowser } from "@/components/sections/project-browser";
import { PageHero } from "@/components/sections/page-hero";
import { images } from "@/content/images";
import * as content from "@/content/projects";
import { services } from "@/content/services";

export const metadata: Metadata = {
  ...content.metadata,
  // Example projects must not appear in search results as if they were real.
  ...(content.isExample && { robots: { index: false, follow: true } }),
};

const serviceNames = Object.fromEntries(services.map(({ id, title }) => [id, title]));

export default function ProjectsPage() {
  const { projects, intro, labels } = content;
  const stats = [
    { label: labels.stats.shown, value: String(projects.length) },
    { label: labels.stats.areas, value: String(new Set(projects.map((project) => project.area)).size) },
    { label: labels.stats.services, value: String(new Set(projects.map((project) => project.service)).size) },
    { label: labels.stats.latest, value: projects[0]?.completed ?? "" },
  ];

  return (
    <>
      <PageHero
        {...intro}
        current={content.metadata.title}
        stats={stats}
        notice={content.isExample ? intro.notice : undefined}
      />
      <ProjectBrowser
        projects={projects}
        serviceNames={serviceNames}
        isExample={content.isExample}
        labels={labels}
        countLabel={{ of: "of", projects: "projects" }}
      />
      <Invitation
        title="Planning a home of your own?"
        text="Bring your land, a drawing or just an idea. Every project here started with a conversation."
        link={intro.link}
        photo={images.fort}
      />
    </>
  );
}
