import { getServiceMetadata, ServicePage } from "../_shared/service-page";

export const metadata = getServiceMetadata("repair-work");

export default function RepairWorkPage() {
  return <ServicePage id="repair-work" />;
}
