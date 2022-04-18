import * as k8s from "@pulumi/kubernetes";
import * as pulumi from "@pulumi/pulumi";
import { clusterProvider, cluster } from "../gke";

const argo_events_namespace_name = "argo-events";

let opts = {
  provider: clusterProvider,
  dependsOn: [clusterProvider]
};

export const argo_events_namepsace = new k8s.core.v1.Namespace("argo-events-namespace", {
  metadata: { name: argo_events_namespace_name },
}, opts);


export const argo_events = new k8s.yaml.ConfigFile("argo-events", {
  file: "https://raw.githubusercontent.com/argoproj/argo-events/stable/manifests/install.yaml",
  transformations: [(obj: any, opts: pulumi.CustomResourceOptions) => { obj.metadata.namespace = argo_events_namespace_name; }]
}, opts);


export const argo_events_validating_webhook = new k8s.yaml.ConfigFile("argo-install-validating-webhook", {
  file: "https://raw.githubusercontent.com/argoproj/argo-events/stable/manifests/install-validating-webhook.yaml",
  transformations: [(obj: any, opts: pulumi.CustomResourceOptions) => { obj.metadata.namespace = argo_events_namespace_name; }]
}, opts);


export const argo_event_bus = new k8s.yaml.ConfigFile("argo-eventbus", {
  file: "https://raw.githubusercontent.com/argoproj/argo-events/stable/examples/eventbus/native.yaml",
  transformations: [(obj: any, opts: pulumi.CustomResourceOptions) => { obj.metadata.namespace = argo_events_namespace_name; }]
}, opts);
