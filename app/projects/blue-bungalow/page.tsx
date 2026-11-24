import { getProjectMetadata, ProjectPage } from "../_shared/project-page";

export const metadata = getProjectMetadata("blue-bungalow");

export default function BlueBungalowPage() {
  return <ProjectPage id="blue-bungalow" />;
}
