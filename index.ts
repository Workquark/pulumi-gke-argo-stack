import { clusterName, kubeconfig } from "./gke";
import { argo_manifests } from "./argocd";
import * as helmcharts from "./helm-charts";

const cluster_name = clusterName;
const yamls = argo_manifests;
const nginx_release = helmcharts.ingress_nginx_release;
const bitnami_sealed_secrets = helmcharts.bitnami_sealed_secrets;