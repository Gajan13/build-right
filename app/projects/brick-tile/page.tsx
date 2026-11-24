import { getProjectMetadata, ProjectPage } from "../_shared/project-page";

export const metadata = getProjectMetadata("brick-tile");

export default function BrickTilePage() {
  return <ProjectPage id="brick-tile" />;
}
