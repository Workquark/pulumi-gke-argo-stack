# Pulumi GKE + ARGO workflow

## Project setup

    .
    ├── argo
    │   └── argo-events.ts
    ├── argocd.ts
    ├── argo-manifests
    │   ├── argo-events
    │   │   ├── demo
    │   │   │   ├── demo-eventsource.yaml
    │   │   │   └── demo-sensor.yaml
    │   │   ├── github
    │   │   │   ├── docker-secret.yaml
    │   │   │   ├── event-sources.yaml
    │   │   │   ├── github-sensor.yaml
    │   │   │   ├── github-token.yaml
    │   │   │   ├── github-workflow-sensor.yaml
    │   │   │   └── service-account.yaml
    │   │   └── ReadME.md
    │   └── workflow
    │       └── templates
    │           ├── ci.workflow.yaml
    │           ├── everything.workflow.yaml
    │           ├── hello.workflow.yaml
    │           └── templates.yaml
    ├── argo-workflow.ts
    ├── gke.ts
    ├── index.ts
    ├── ingress-nginx.ts
    ├── ingress-nginx-values.yaml
    ├── package.json
    ├── package-lock.json
    ├── Pulumi.dev.yaml
    ├── Pulumi.yaml
    ├── ReadME.md
    ├── sealed-secret.ts
    └── tsconfig.json

## Deploy Argo workflow -

    argo submit -n argo --watch workflows/ci.workflow.yaml

## Create service account on GCP and configure -

    export GOOGLE_CREDENTIALS=$(cat poc-argocd-16750b5819b0.json)

## Install packages -

    npm install

## Login to backend -

    pulumi login gs://pulumi-backend

## Run the pulumi command -

    pulumi up -s dev # where dev is the stack name.
