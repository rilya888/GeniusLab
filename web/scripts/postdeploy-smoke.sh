#!/usr/bin/env bash
# Smoke test for post-deploy. Usage: ./scripts/postdeploy-smoke.sh [BASE_URL]
set -euo pipefail

BASE_URL="${1:-http://localhost:5173}"
BASE_URL="${BASE_URL%/}"

check_200() {
  local url="$1"
  local code
  code=$(curl -sS -o /dev/null -w '%{http_code}' "$url")
  if [[ "$code" != "200" ]]; then
    echo "FAIL $url -> $code" >&2
    exit 1
  fi
  echo "OK   $url -> 200"
}

check_contains() {
  local url="$1"
  local pattern="$2"
  if ! curl -sS "$url" | grep -q "$pattern"; then
    echo "FAIL $url missing pattern: $pattern" >&2
    exit 1
  fi
  echo "OK   $url contains pattern"
}

echo "Smoke testing $BASE_URL ..."

check_200 "$BASE_URL/"
check_200 "$BASE_URL/servizi"
check_200 "$BASE_URL/contatti"
check_200 "$BASE_URL/chi-siamo"
check_200 "$BASE_URL/recensioni"
check_200 "$BASE_URL/privacy-policy"
check_200 "$BASE_URL/cookie-policy"
check_200 "$BASE_URL/servizi/macbook"
check_200 "$BASE_URL/servizi/recupero-dati"
check_200 "$BASE_URL/healthz"
check_200 "$BASE_URL/robots.txt"
check_200 "$BASE_URL/sitemap.xml"

check_contains "$BASE_URL/robots.txt" "Sitemap:"
check_contains "$BASE_URL/healthz" "ok"
check_contains "$BASE_URL/sitemap.xml" "urlset"
check_contains "$BASE_URL/" "Genius Lab"

echo "postdeploy smoke passed"
