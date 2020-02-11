#! /bin/bash
# exit script when any command ran here returns with non-zero exit code
set -e

apt-get update && apt-get -y install gettext-base

curl -LO https://storage.googleapis.com/kubernetes-release/release/$(curl -s https://storage.googleapis.com/kubernetes-release/release/stable.txt)/bin/linux/amd64/kubectl

chmod u+x ./kubectl

COMMIT_SHA1=$CIRCLE_SHA1

# We must export it so it's available for envsubst
export COMMIT_SHA1=$COMMIT_SHA1

echo "Running envsubst"

# since the only way for envsubst to work on files is using input/output redirection,
#  it's not possible to do in-place substitution, so we need to save the output to another file
#  and overwrite the original with that one.
envsubst <./manifests/deployment.yaml >./manifests/deployment.yaml.out
mv ./manifests/deployment.yaml.out ./manifests/deployment.yaml

echo $KUBERNETES_CLUSTER_CERTIFICATE
echo $KUBERNETES_SERVER
echo $KUBERNETES_TOKEN

echo "$KUBERNETES_CLUSTER_CERTIFICATE" | base64 --decode > cert.crt

./kubectl \
  --kubeconfig=/dev/null \
  --server=$KUBERNETES_SERVER \
  --certificate-authority=cert.crt \
  --token=$KUBERNETES_TOKEN \
  apply -f ./manifests/