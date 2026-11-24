import type { Metadata } from "next";
import { Invitation } from "@/components/sections/invitation";
import { ServiceGuide } from "@/components/sections/service-guide";
import { ServiceHero } from "@/components/sections/service-hero";
import { ServiceSidebar } from "@/components/sections/service-sidebar";
import { heroFacts, invitation, servicePage, services } from "@/content/services";
import { site } from "@/content/site";
import type { ServiceId } from "@/content/types";

// Each service has its own folder instead of sharing a [slug] route. With Cache Components a [slug] route
// renders and caches unknown addresses, and on a case-insensitive disk /services/Plumbing then broke /services/plumbing.
function findService(id: ServiceId) {
  const index = services.findIndex((service) => service.id === id);
  if (index < 0) throw new Error(`content/services.ts has no service "${id}"`);
  return { index, service: services[index] };
}

export function getServiceMetadata(id: ServiceId): Metadata {
  const { service } = findService(id);
  return { title: service.title, description: `${service.text} ${site.name}, ${site.location}.` };
}

/** The common template for every service page. */
export function ServicePage({ id }: { id: ServiceId }) {
  const { index, service } = findService(id);

  return (
    <>
      <ServiceHero service={service} number={index + 1} facts={heroFacts} labels={servicePage} />
      <div className="shell grid gap-16 py-20 md:py-28 lg:grid-cols-[minmax(0,1fr)_20rem] lg:gap-16 xl:grid-cols-[minmax(0,1fr)_24rem] xl:gap-28">
        <ServiceGuide service={service} previous={services[index - 1]} next={services[index + 1]} labels={servicePage} />
        <ServiceSidebar services={services} labels={servicePage} />
      </div>
      <Invitation {...invitation} />
    </>
  );
}
