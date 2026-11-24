import type { Metadata } from "next";
import { Invitation } from "@/components/sections/invitation";
import { Journey } from "@/components/sections/journey";
import { PageHero } from "@/components/sections/page-hero";
import { Principles } from "@/components/sections/principles";
import { Story } from "@/components/sections/story";
import { Trades } from "@/components/sections/trades";
import * as about from "@/content/about";

export const metadata: Metadata = about.metadata;

export default function AboutPage() {
  return (
    <>
      <PageHero {...about.banner} current={about.metadata.title} />
      <Story {...about.story} />
      <Principles {...about.principles} />
      <Journey {...about.journey} />
      <Trades {...about.trades} />
      <Invitation {...about.invitation} />
    </>
  );
}
