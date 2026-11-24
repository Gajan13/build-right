import { getProjectMetadata, ProjectPage } from "../_shared/project-page";

export const metadata = getProjectMetadata("timber-stone");

export default function TimberStonePage() {
  return <ProjectPage id="timber-stone" />;
}
