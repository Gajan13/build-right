import { getServiceMetadata, ServicePage } from "../_shared/service-page";

export const metadata = getServiceMetadata("new-house");

export default function NewHousePage() {
  return <ServicePage id="new-house" />;
}
