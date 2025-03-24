#!/bin/bash
set -e
node --version

yarn node ./dist/index.mjs

git config --global user.email "41898282+github-actions[bot]@users.noreply.github.com"
git config --global user.name "github-actions[bot]"
git add -A
git commit -a -m "Update README.md from Publish Container - $(git log -1 --pretty=format:"%an") $(date "+%d/%m/%Y")"
git push https://x-access-token:$GH_TOKEN@github.com/$(git remote get-url origin | sed -E 's/.*github\.com[:\/]([^\/]+)\/([^\/]+).*/\1\/\2/') $(git rev-parse --abbrev-ref HEAD)

exit 0