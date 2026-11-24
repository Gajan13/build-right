import type { Metadata } from "next";
import { Invitation } from "@/components/sections/invitation";
import { PageHero } from "@/components/sections/page-hero";
import { ServiceDetails } from "@/components/sections/service-details";
import { ServiceIndex } from "@/components/sections/service-index";
import * as content from "@/content/services";

export const metadata: Metadata = content.metadata;

export default function ServicesPage() {
  return (
    <>
      <PageHero {...content.banner} current={content.metadata.title} />
      <ServiceIndex {...content.overview} services={content.services} />
      <ServiceDetails services={content.services} />
      <Invitation {...content.invitation} />
    </>
  );
}
