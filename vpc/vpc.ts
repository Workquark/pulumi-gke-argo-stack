import gcp from "@pulumi/gcp"

export const poc_vpc = new gcp.compute.Network("poc-vpc", {
  autoCreateSubnetworks: false
});


