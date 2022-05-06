import * as k8s from "@pulumi/kubernetes";
import { clusterProvider } from "../../gke/gke"

let opts = {
  provider: clusterProvider,
  dependsOn: [clusterProvider]
};

export const workflows_namespace = new k8s.core.v1.Namespace("workflows", {
  metadata: { name: "workflows" },
}, opts);