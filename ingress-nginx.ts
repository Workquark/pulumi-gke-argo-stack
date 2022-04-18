import * as pulumi from "@pulumi/pulumi";
import * as k8s from "@pulumi/kubernetes";
import { FileAsset } from "@pulumi/pulumi/asset";
import { clusterProvider, cluster } from "./gke"

let opts = {
  provider: clusterProvider,
  dependsOn: [clusterProvider]
};

export const ingress_nginx_release = new k8s.helm.v3.Release("ingress-nginx", {
  name: "nginx",
  chart: "ingress-nginx",
  repositoryOpts: {
    repo: "https://kubernetes.github.io/ingress-nginx",
  },
  createNamespace: true,
  namespace: "ingress-nginx",
  valueYamlFiles: [new FileAsset("ingress-nginx-values.yaml")]
}, opts);




