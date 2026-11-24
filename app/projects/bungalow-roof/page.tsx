import { getProjectMetadata, ProjectPage } from "../_shared/project-page";

export const metadata = getProjectMetadata("bungalow-roof");

export default function BungalowRoofPage() {
  return <ProjectPage id="bungalow-roof" />;
}
