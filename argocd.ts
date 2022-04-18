import * as k8s from "@pulumi/kubernetes";
import * as pulumi from "@pulumi/pulumi";
import { clusterProvider, cluster } from "./gke"


const argocd_namespace_name = "argocd";

let opts = {
  provider: clusterProvider,
  dependsOn: [clusterProvider]
};

// create argocd namespace for argocd

export const argocd_namepsace = new k8s.core.v1.Namespace("argocd", {
  metadata: { name: argocd_namespace_name },
}, opts);

// Create resources from standard Kubernetes guestbook YAML example.

export const argocd_deployment = new k8s.yaml.ConfigFile("argocd", {
  file: "https://raw.githubusercontent.com/argoproj/argo-cd/stable/manifests/install.yaml",
  transformations: [(obj: any, opts: pulumi.CustomResourceOptions) => { obj.metadata.namespace = argocd_namespace_name; }]
}, opts);






