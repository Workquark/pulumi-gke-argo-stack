import * as k8s from "@pulumi/kubernetes";
import { clusterProvider } from "../../gke/gke"

let opts = {
  provider: clusterProvider,
  dependsOn: [clusterProvider]
};

export const argo_events_namepsace = new k8s.core.v1.Namespace("argo-events", {
  metadata: { name: "argo-events" },
}, opts);