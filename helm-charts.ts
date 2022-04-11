import * as pulumi from "@pulumi/pulumi";
import * as k8s from "@pulumi/kubernetes";
import { FileAsset } from "@pulumi/pulumi/asset";


export const ingress_nginx_release = new k8s.helm.v3.Release("ingress-nginx", {
  name: "nginx",
  chart: "ingress-nginx",
  repositoryOpts: {
    repo: "https://kubernetes.github.io/ingress-nginx",
  },
  createNamespace: true,
  namespace: "ingress-nginx",
  valueYamlFiles: [new FileAsset("ingress-nginx-values.yaml")]
});


export const bitnami_sealed_secrets = new k8s.helm.v3.Release("sealed-secret", {
  name: "sealed-secret",
  chart: "sealed-secrets",
  repositoryOpts: {
    repo: "https://bitnami-labs.github.io/sealed-secrets",
  },
  createNamespace: true,
  namespace: "sealed-secret",
  // valueYamlFiles: [new FileAsset("ingress-nginx-values.yaml")]
});
