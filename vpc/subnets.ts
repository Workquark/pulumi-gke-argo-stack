import gcp from "@pulumi/gcp"
import { poc_vpc } from "./vpc";

export const vpc_subnet = new gcp.compute.Subnetwork("network-with-private-secondary-ip-ranges", {
  ipCidrRange: "10.5.0.0/23", // 512 ips
  region: "us-central1",
  network: poc_vpc.id,
  secondaryIpRanges: [{
    rangeName: "gke-pod-range",
    ipCidrRange: "10.6.0.0/15",
  },
  {
    rangeName: "gke-service-range",
    ipCidrRange: "10.4.0.0/23",
  },
    // {
    //   rangeName: "gke-service-range",
    //   ipCidrRange: "10.4.0.0/20",
    // }
  ],
});
