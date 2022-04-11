## Create the namesapce

    kubectl create namespace argo-events

## Deploy Argo Events, SA, ClusterRoles, Sensor Controller, EventBus Controller and EventSource Controller

    kubectl apply -f https://raw.githubusercontent.com/argoproj/argo-events/stable/manifests/install.yaml
    # Install with a validating admission controller
    kubectl apply -f https://raw.githubusercontent.com/argoproj/argo-events/stable/manifests/install-validating-webhook.yaml

## Deploy eventbus

    kubectl apply -n argo-events -f https://raw.githubusercontent.com/argoproj/argo-events/stable/examples/eventbus/native.yaml

## Create secret pat token

    # This secret is for accessing the github repo
    kubectl create secret generic github-access --from-literal=token=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 

## Create kaniko secret

    # This secret is for pushing image using kaniko to registry. It can be ECR/ACR or docker registry or any registry.
    kubectl create secret docker-registry regcred --docker-server=<your-registry-server> --docker-username=<your-name> --docker-password=<your-pword> --docker-email=<your-email>

## Install bitnami sealed secrets controller and kubeseal which can create sealed secrets

    helm repo add sealed-secrets https://bitnami-labs.github.io/sealed-secrets
