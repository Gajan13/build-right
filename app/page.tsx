import { About } from "@/components/sections/about";
import { BuildStages } from "@/components/sections/build-stages";
import { ClosingContact } from "@/components/sections/closing-contact";
import { CraftBand } from "@/components/sections/craft-band";
import { Hero } from "@/components/sections/hero";
import { Inspiration } from "@/components/sections/inspiration";
import { LocalLife } from "@/components/sections/local-life";
import { PlanningGuide } from "@/components/sections/planning-guide";
import { Process } from "@/components/sections/process";
import { RecordBand } from "@/components/sections/record-band";
import * as home from "@/content/home";
import { contact } from "@/content/site";

export default function Home() {
  return (
    <>
      <Hero {...home.hero} />
      <About {...home.about} />
      <BuildStages {...home.build} />
      <RecordBand {...home.record} />
      <Inspiration {...home.inspiration} />
      <Process {...home.process} />
      <CraftBand {...home.craft} />
      <LocalLife {...home.jaffna} />
      <PlanningGuide {...home.guide} />
      <ClosingContact {...home.closing} contact={contact} />
    </>
  );
}
