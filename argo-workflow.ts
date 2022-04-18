
import * as k8s from "@pulumi/kubernetes";
import * as pulumi from "@pulumi/pulumi";
import { clusterProvider, cluster } from "./gke"

const argo_namespace_name = "argo";

let opts = {
  provider: clusterProvider,
  dependsOn: [clusterProvider]
};

// create argo namespace for argo workflow

export const argo_namepsace = new k8s.core.v1.Namespace("argo", {
  metadata: { name: argo_namespace_name },
}, opts);

// Apply argo quick-start-postgres.yaml for argo workflow

export const argo_deployment = new k8s.yaml.ConfigFile("argo", {
  file: "https://raw.githubusercontent.com/argoproj/argo-workflows/master/manifests/quick-start-postgres.yaml",
  transformations: [(obj: any, opts: pulumi.CustomResourceOptions) => {
    obj.metadata.namespace = argo_namespace_name;
  }]
}, opts);
