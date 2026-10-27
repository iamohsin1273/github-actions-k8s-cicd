#!/usr/bin/env bash
# Roll the deployment back to the previous revision.
# Usage: ./scripts/rollback.sh
set -euo pipefail

kubectl -n devops-demo rollout undo deployment/devops-demo
kubectl -n devops-demo rollout status deployment/devops-demo --timeout=120s
