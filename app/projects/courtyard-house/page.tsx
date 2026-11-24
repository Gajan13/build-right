import { getProjectMetadata, ProjectPage } from "../_shared/project-page";

export const metadata = getProjectMetadata("courtyard-house");

export default function CourtyardHousePage() {
  return <ProjectPage id="courtyard-house" />;
}
