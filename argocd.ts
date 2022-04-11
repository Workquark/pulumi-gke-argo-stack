import * as k8s from "@pulumi/kubernetes";
import * as pulumi from "@pulumi/pulumi";
import { clusterProvider, cluster } from "./gke"


const argocd_namespace_name = "argocd"
const argo_namespace_name = "argo"

let opts = {
  provider: clusterProvider,
  dependsOn: [clusterProvider]
};

// create argocd namespace for argocd

const argocd_namepsace = new k8s.core.v1.Namespace("argocd", {
  metadata: { name: argocd_namespace_name },
}, opts);

// Create resources from standard Kubernetes guestbook YAML example.

const argocd = new k8s.yaml.ConfigFile("argocd", {
  file: "https://raw.githubusercontent.com/argoproj/argo-cd/stable/manifests/install.yaml",
  transformations: [(obj: any, opts: pulumi.CustomResourceOptions) => { obj.metadata.namespace = argocd_namespace_name; }]
}, opts);

// create argo namespace for argo workflow

const argo_namepsace = new k8s.core.v1.Namespace("argo", {
  metadata: { name: argo_namespace_name },
}, opts);

// Apply argo quick-start-postgres.yaml for argo workflow

const argo = new k8s.yaml.ConfigFile("argo", {
  file: "https://raw.githubusercontent.com/argoproj/argo-workflows/master/manifests/quick-start-postgres.yaml",
  transformations: [(obj: any, opts: pulumi.CustomResourceOptions) => {
    obj.metadata.namespace = argo_namespace_name;
  }]
}, opts);



export const argo_manifests = {
  namespace: argocd_namepsace,
  argocd: argocd
}



