// import * as pulumi from "@pulumi/pulumi";
// import * as k8s from "@pulumi/kubernetes";
// import { FileAsset } from "@pulumi/pulumi/asset";
import * as gke from "../../gke"
import * as nginx from "@pulumi/kubernetes-ingress-nginx";


let opts = {
  provider: gke.clusterProvider,
  dependsOn: [gke.clusterProvider]
};

// export const ingress_nginx_release = new k8s.helm.v3.Release("ingress-nginx", {
//   name: "nginx",
//   chart: "ingress-nginx",
//   repositoryOpts: {
//     repo: "https://kubernetes.github.io/ingress-nginx",
//   },
//   createNamespace: true,
//   namespace: "ingress-nginx",
//   valueYamlFiles: [new FileAsset("./k8s/ingress-nginx/ingress-nginx-values.yaml")]
// }, opts);




// export const ingress_nginx_release = new nginx.IngressController("ingress-nginx-controller", {
//   controller: {
//     service: {
//       type: "LoadBalancer",
//       loadBalancerIPs: gke.ipAddress.address
//     },
//     publishService: {
//       enabled: true,
//     },
//   },
// }, opts);
