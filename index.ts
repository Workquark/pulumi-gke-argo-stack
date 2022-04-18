import { clusterName, kubeconfig } from "./gke";
import * as argocd from "./argocd";
import * as ingress_nginx from "./ingress-nginx";
import * as argo_events from "./argo/argo-events";
import * as sealed_secrets from "./sealed-secret";
import * as argo_workflow from "./argo-workflow";

const cluster_name = clusterName;

const argocd_namespace = argocd.argocd_namepsace;
const argocd_deployment = argocd.argocd_deployment;

const nginx_release = ingress_nginx.ingress_nginx_release;

const ag_event_bus = argo_events.argo_event_bus;
const ag_event_ns = argo_events.argo_events_namepsace;
const ag_events = argo_events.argo_events;
const ag_validating_webhook = argo_events.argo_events_validating_webhook;

const sealed_secret_ns = sealed_secrets.sealed_secret_namespace;
const sealed_secret = sealed_secrets.sealed_secret;


const ag_workflow = argo_workflow.argo_namepsace;
const argo_deployment = argo_workflow.argo_deployment;