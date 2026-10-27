#!/usr/bin/env bash
# Build the Docker image locally.
# Usage: ./scripts/build.sh [image-name[:tag]]
set -euo pipefail

cd "$(dirname "$0")/.."

IMAGE="${1:-devops-demo:local}"
docker build -t "$IMAGE" .
echo "Built $IMAGE"
