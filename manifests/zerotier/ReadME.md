# Zerotier Kubernetes bridge -

## Clone the github link -

    https://github.com/leunamnauj/kubernetes-zerotier-bridge

## Login to GCP using service account file

    gcloud auth activate-service-account --key-file=<credentials file>

## Create the token -

    gcloud auth print-access-token \                                                                        
      --impersonate-service-account  <service account> | docker login \
      -u oauth2accesstoken \
      --password-stdin https://<location>-docker.pkg.dev

## 