#!/bin/bash
# Deploy Genius Lab to Railway: cd to project root, run railway up
set -e
cd "$(dirname "$0")"
echo "Deploying from $(pwd)..."
npx railway up --detach
echo "Deploy triggered. Check status: npx railway deployment list --service GeniusLab"
