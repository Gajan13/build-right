import { getServiceMetadata, ServicePage } from "../_shared/service-page";

export const metadata = getServiceMetadata("tile-work");

export default function TileWorkPage() {
  return <ServicePage id="tile-work" />;
}
