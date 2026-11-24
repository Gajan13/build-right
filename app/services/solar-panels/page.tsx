import { getServiceMetadata, ServicePage } from "../_shared/service-page";

export const metadata = getServiceMetadata("solar-panels");

export default function SolarPanelsPage() {
  return <ServicePage id="solar-panels" />;
}
