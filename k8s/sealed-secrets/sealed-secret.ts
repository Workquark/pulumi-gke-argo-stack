
import * as k8s from "@pulumi/kubernetes";
import * as pulumi from "@pulumi/pulumi";
import { clusterProvider, cluster } from "../../gke/gke"



export const sealed_secret_namespace_name = "sealed-secret";

let opts = {
  provider: clusterProvider,
  dependsOn: [clusterProvider]
};

// create argo namespace for argo workflow

export const sealed_secret_namespace = new k8s.core.v1.Namespace("sealed-secret", {
  metadata: { name: sealed_secret_namespace_name },
}, opts);

// Apply argo quick-start-postgres.yaml for argo workflow

export const sealed_secret = new k8s.yaml.ConfigFile("sealed_secret", {
  file: "https://github.com/bitnami-labs/sealed-secrets/releases/download/v0.17.5/controller.yaml",
  // transformations: [(obj: any, opts: pulumi.CustomResourceOptions) => {
  //   obj.metadata.namespace = "kube-system";
  // }]
}, opts);


// export const helm_chart_sealed_secret = new k8s.helm.v3.Release("helm-chart-sealed-secret", {
//   name: "sealed-secret",
//   chart: "sealed-secrets",
//   repositoryOpts: {
//     repo: "https://bitnami-labs.github.io/sealed-secrets",
//   },
//   createNamespace: true,
//   namespace: sealed_secret_namespace_name,
//   // valueYamlFiles: [new FileAsset("ingress-nginx-values.yaml")]
// }, opts);
