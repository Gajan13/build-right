import { getServiceMetadata, ServicePage } from "../_shared/service-page";

export const metadata = getServiceMetadata("plumbing");

export default function PlumbingPage() {
  return <ServicePage id="plumbing" />;
}
