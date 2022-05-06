import * as gke from "./gke/gke";
import * as argocd from "./k8s/argo/argocd";
import * as ingress_nginx from "./k8s/ingress-nginx";
import * as argo_events from "./k8s/argo/argo-events";
import * as sealed_secrets from "./k8s/sealed-secrets/sealed-secret";
import * as argo_workflow from "./k8s/argo/argo-workflow";

const cluster_name = gke.clusterName;

// const argocd_namespace = argocd.argocd_namepsace;
// const argocd_deployment = argocd.argocd_deployment;

// const nginx_release = ingress_nginx.ingress_nginx_release;

// const ag_event_bus = argo_events.argo_event_bus;
// const ag_events = argo_events.argo_events;
// const ag_validating_webhook = argo_events.argo_events_validating_webhook;

// const sealed_secret_ns = sealed_secrets.sealed_secret_namespace;
// const sealed_secret = sealed_secrets.sealed_secret;


// const ag_workflow = argo_workflow.argo_namepsace;
// const argo_deployment = argo_workflow.argo_deployment;