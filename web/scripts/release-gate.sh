#!/usr/bin/env bash
# Release gate checks for SEO and security headers.
# Usage: ./scripts/release-gate.sh [BASE_URL]
set -euo pipefail

BASE_URL="${1:-http://localhost:5173}"
BASE_URL="${BASE_URL%/}"

echo "Running release gate for $BASE_URL ..."

bash scripts/check-seo.sh "$BASE_URL"
bash scripts/check-headers.sh "$BASE_URL"
bash scripts/postdeploy-smoke.sh "$BASE_URL"

echo "Release gate passed"

