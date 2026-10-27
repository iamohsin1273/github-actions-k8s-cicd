#!/usr/bin/env bash
# Apply the Kubernetes manifests and wait for the rollout to finish.
# Usage: ./scripts/deploy.sh
set -euo pipefail

cd "$(dirname "$0")/.."

# The namespace must exist before the other resources can be created in it.
kubectl apply -f k8s/namespace.yaml
kubectl apply -f k8s/

kubectl -n devops-demo rollout status deployment/devops-demo --timeout=120s
kubectl -n devops-demo get pods,svc,ingress
