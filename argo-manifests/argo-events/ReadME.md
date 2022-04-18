# Argo stack configuration

## Create the namesapce

    kubectl create namespace argo-events

## Deploy Argo Events, SA, ClusterRoles, Sensor Controller, EventBus Controller and EventSource Controller

    kubectl apply -f https://raw.githubusercontent.com/argoproj/argo-events/stable/manifests/install.yaml
    # Install with a validating admission controller
    kubectl apply -f https://raw.githubusercontent.com/argoproj/argo-events/stable/manifests/install-validating-webhook.yaml

## Deploy eventbus

    kubectl apply -n argo-events -f https://raw.githubusercontent.com/argoproj/argo-events/stable/examples/eventbus/native.yaml

## Create secret pat token

    # This secret is for accessing the github repo ( TODO: migrate it to sealed secret )
    kubectl create secret generic github-access --from-literal=token=<github PAT token> 

## Install bitnami sealed secrets controller and kubeseal which can create sealed secrets

    helm repo add sealed-secrets https://bitnami-labs.github.io/sealed-secrets

## Create kaniko sealed secret

    # This secret is for pushing image using kaniko to registry. It can be ECR/ACR or docker registry or any registry. This is currently dry run only.
    
    kubectl create secret docker-registry regcred --docker-server=registry.hub.docker.com --docker-username=<username> --docker-password=<password> --docker-email=joydeepbeyondsky86@gmail.com --dry-run=client --output json

    # Create the kubeseal yaml 

    kubectl create secret docker-registry regcred --docker-server=registry.hub.docker.com --docker-username=joydeep1985 --docker-password=Joydeep@1985 --docker-email=joydeepbeyondsky86@gmail.com --dry-run=client --output json | kubeseal | tee docker-secret.yaml

## Create the event source and ingress -

    apiVersion: argoproj.io/v1alpha1
    kind: EventSource
    metadata:
    name: github
    spec:
    service:
        ports:
        - port: 13000 # This is the port to which it would listen
            targetPort: 13000 # This is the target port for container.
    github:
        github-app:
        owner: Workquark
        repository: argocd-dotnet-kafka-subscriber-deploy
        webhook:
            endpoint: /argocd-kafka-subscriber
            port: "13000" # This is the port to which it would listen from ingress
            method: POST
            url: http://joydeep.tk
        events:
            - "*"
        apiToken:
            name: github-access
            key: token
        insecure: true
        active: true
        contentType: json

### Also create the ingress component

    apiVersion: networking.k8s.io/v1
    kind: Ingress
    metadata:
    name: github
    annotations:
        # kubernetes.io/ingress.class: "nginx"
        ingress.kubernetes.io/ssl-redirect: "false"
        nginx.ingress.kubernetes.io/ssl-redirect: "false"
    spec:
    ingressClassName: nginx
    rules:
        - http:
            paths:
            - path: /
                pathType: Prefix
                backend:
                service:
                    name: github-eventsource-svc
                    port:
                    number: 13000
        host: joydeep.tk

> Note: Each service listens to a different port. You cannot have two webhooks mapped at same port.

## Create a demo sensor which listens to the event and triggers -

    apiVersion: argoproj.io/v1alpha1
    kind: Sensor
    metadata:
    name: github-webhook
    spec:
    template:
        serviceAccountName: argo-events-sa
    dependencies:
        - name: github-trigger
        eventSourceName: github
        eventName: github-app
    triggers:
        - template:
            name: github-app-trigger
            k8s:
            group: ""
            version: v1
            resource: pods
            operation: create
            source:
                resource:
                apiVersion: v1
                kind: Pod
                metadata:
                    generateName: github-trigger-
                    labels:
                    app: github-webhook-trigger
                spec:
                    containers:
                    - name: hello
                        image: alpine
                        command: ["echo"]
                        args: ["This is the message you sent me:\n", ""]
                    restartPolicy: Never
            parameters:
                - src:
                    dependencyName: github-trigger
                    dataKey: body.commits.0.message
                dest: spec.containers.0.args.1

# Installing Argo workflow -

> Argo workfow will be deployed as part of pulumi up command. File <argo-workflow.ts>

## To see the argo workflow ui -

    kubectl port-forward -n argo deployment/argo-server 2746:2746  
