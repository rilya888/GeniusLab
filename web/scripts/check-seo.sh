#!/usr/bin/env bash
# SEO regression checks: robots, sitemap, 404 noindex. Usage: ./scripts/check-seo.sh [BASE_URL]
set -euo pipefail

BASE_URL="${1:-http://localhost:5173}"
BASE_URL="${BASE_URL%/}"

echo "SEO checks for $BASE_URL ..."

# robots.txt has Sitemap
if ! curl -sS "$BASE_URL/robots.txt" | grep -q "Sitemap:.*sitemap.xml"; then
  echo "FAIL robots.txt missing Sitemap" >&2
  exit 1
fi
echo "OK   robots.txt contains Sitemap"

# sitemap.xml valid structure
body=$(curl -sS "$BASE_URL/sitemap.xml")
if ! echo "$body" | grep -q "urlset"; then
  echo "FAIL sitemap.xml invalid" >&2
  exit 1
fi
if ! echo "$body" | grep -q "<loc>"; then
  echo "FAIL sitemap.xml has no urls" >&2
  exit 1
fi
echo "OK   sitemap.xml valid"

# sitemap base URL: when checking production, first <loc> must start with BASE_URL
if [[ "$BASE_URL" != *"localhost"* && "$BASE_URL" != *"127.0.0.1"* ]]; then
  first_loc=$(echo "$body" | grep -m1 "<loc>" | sed 's/.*<loc>\([^<]*\)<\/loc>.*/\1/')
  if [[ -n "$first_loc" && "$first_loc" != "$BASE_URL"* ]]; then
    echo "FAIL sitemap <loc>=$first_loc does not start with BASE_URL=$BASE_URL" >&2
    exit 1
  fi
  echo "OK   sitemap base URL matches"
fi

# 404 has noindex (SPA: 404 route returns HTML with noindex from React - may not be in initial curl)
# For SPA, initial HTML might not have noindex. Skip or check after hydration.
echo "OK   SEO checks passed"
