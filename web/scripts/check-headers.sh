#!/usr/bin/env bash
# Verify security headers. Usage: ./scripts/check-headers.sh [BASE_URL]
set -euo pipefail

BASE_URL="${1:-http://localhost:5173}"
BASE_URL="${BASE_URL%/}"

headers="$(curl -sSI "$BASE_URL/")"

require_header() {
  local name="$1"
  if ! printf '%s\n' "$headers" | grep -qi "^${name}:"; then
    echo "FAIL missing header: $name" >&2
    exit 1
  fi
  echo "OK   header present: $name"
}

echo "Checking security headers for $BASE_URL ..."
require_header "x-frame-options"
require_header "x-content-type-options"
require_header "referrer-policy"
require_header "permissions-policy"
require_header "content-security-policy"
echo "header check passed"
