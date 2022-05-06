
import * as k8s from "@pulumi/kubernetes";
import { clusterProvider } from "../../gke/gke"

let opts = {
  provider: clusterProvider,
  dependsOn: [clusterProvider]
};

// create argo namespace for argo workflow
export const argo_namepsace = new k8s.core.v1.Namespace("argo", {
  metadata: { name: "argo" },
}, opts);
