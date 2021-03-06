import * as k8s from "@pulumi/kubernetes";
import * as pulumi from "@pulumi/pulumi";
import * as gcp from "@pulumi/gcp";

const name = "poc-argocd";

// Create a GKE cluster
const engineVersion = gcp.container.getEngineVersions().then(v => v.latestMasterVersion);

export const cluster = new gcp.container.Cluster(name, {
  name: name,
  initialNodeCount: 2,
  minMasterVersion: engineVersion,
  nodeVersion: engineVersion,
  nodeConfig: {
    machineType: "n1-standard-1",
    oauthScopes: [
      "https://www.googleapis.com/auth/compute",
      "https://www.googleapis.com/auth/devstorage.read_only",
      "https://www.googleapis.com/auth/logging.write",
      "https://www.googleapis.com/auth/monitoring"
    ],
  },
  ipAllocationPolicy: {
    clusterIpv4CidrBlock: "10.0.0.0/16",
    servicesIpv4CidrBlock: "10.1.0.0/16",
  },
  masterAuthorizedNetworksConfig: {
    cidrBlocks: [{
      cidrBlock: "10.147.20.0/24", // Zerotier subnet ip.
      displayName: "Zerotier-Network"
    }]
  },
  privateClusterConfig: {
    masterIpv4CidrBlock: "172.16.0.0/28",
    enablePrivateEndpoint: true,
    enablePrivateNodes: true
  },
  enableIntranodeVisibility: true
});

// Export the Cluster name
export const clusterName = cluster.name;

// Manufacture a GKE-style kubeconfig. Note that this is slightly "different"
// because of the way GKE requires gcloud to be in the picture for cluster
// authentication (rather than using the client cert/key directly).
export const kubeconfig = pulumi.
  all([cluster.name, cluster.endpoint, cluster.masterAuth]).
  apply(([name, endpoint, masterAuth]) => {
    const context = `${gcp.config.project}_${gcp.config.zone}_${name}`;
    return `apiVersion: v1
clusters:
- cluster:
    certificate-authority-data: ${masterAuth.clusterCaCertificate}
    server: https://${endpoint}
  name: ${context}
contexts:
- context:
    cluster: ${context}
    user: ${context}
  name: ${context}
current-context: ${context}
kind: Config
preferences: {}
users:
- name: ${context}
  user:
    auth-provider:
      config:
        cmd-args: config config-helper --format=json
        cmd-path: gcloud
        expiry-key: '{.credential.token_expiry}'
        token-key: '{.credential.access_token}'
      name: gcp
`;
  });

// Create a Kubernetes provider instance that uses our cluster from above.
export const clusterProvider = new k8s.Provider(name, {
  kubeconfig: kubeconfig
});