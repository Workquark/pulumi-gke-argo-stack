
import * as k8s from "@pulumi/kubernetes";
import * as pulumi from "@pulumi/pulumi";
import { clusterProvider, cluster } from "../../gke/gke";
import * as k8s_namespaces from "../namespaces";

let opts = {
  provider: clusterProvider,
  dependsOn: [clusterProvider]
};

export const argo_deployment = new k8s.yaml.ConfigFile("argo", {
  file: "https://github.com/argoproj/argo-workflows/releases/download/v3.3.2/install.yaml",
  transformations: [(obj: any, opts: pulumi.CustomResourceOptions) => {
    obj.metadata.namespace = k8s_namespaces.argo_namepsace;
  }]
}, opts);
