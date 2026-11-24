import { getServiceMetadata, ServicePage } from "../_shared/service-page";

export const metadata = getServiceMetadata("electrical");

export default function ElectricalPage() {
  return <ServicePage id="electrical" />;
}
