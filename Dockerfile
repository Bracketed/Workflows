FROM node:bullseye-slim AS base
WORKDIR /usr/src/app

ENV GH_TOKEN=

COPY --chown=node:node package.json .
COPY --chown=node:node .yarnrc.yml .
COPY --chown=node:node LICENSE .
COPY --chown=node:node renovate.json .
COPY --chown=node:node .gitignore .
COPY --chown=node:node .markdownlint.jsonc .
COPY --chown=node:node .prettierrc .
COPY --chown=node:node Dockerfile .
COPY --chown=node:node generate-types.ts .

COPY --chown=node:node .yarn/ .yarn/
COPY --chown=node:node src/ src/
COPY --chown=node:node schemas/ schemas/
COPY --chown=node:node actions/ actions/
COPY --chown=node:node .git/ .git/
COPY --chown=node:node .github/ .github/

COPY entrypoint.sh /entrypoint.sh

RUN apt-get update -y && \
    apt-get upgrade -y && \
    apt-get install -y openssl git locales

RUN locale-gen en_GB.UTF-8
RUN dpkg-reconfigure locales
RUN update-locale LC_ALL=en_GB.UTF-8 LANG=en_GB.UTF-8
RUN source /etc/default/locale
RUN locale
RUN timedatectl set-timezone Europe/London

FROM base AS builder
COPY --chown=node:node tsconfig.json .
COPY --chown=node:node env.d.ts .
COPY --chown=node:node tsup.config.ts .

RUN corepack enable
RUN yarn set version stable
RUN yarn install
RUN yarn generate
RUN yarn compile

FROM base AS runner
COPY --chown=node:node --from=base /usr/src/app/src/ src/
COPY --chown=node:node --from=builder /usr/src/app/dist dist
COPY --chown=node:node --from=builder /usr/src/app/yarn.lock .
COPY --chown=node:node --from=builder /usr/src/app/env.d.ts .
COPY --chown=node:node --from=builder /usr/src/app/tsconfig.json .
COPY --chown=node:node --from=builder /usr/src/app/tsup.config.ts .

RUN yarn set version stable
RUN yarn install --immutable
RUN yarn workspaces focus --all --production
RUN chown node:node /usr/src/app

USER node
STOPSIGNAL SIGINT
RUN yarn node ./dist/index.mjs

COPY entrypoint.sh entrypoint.sh

RUN git config --global user.email "41898282+github-actions[bot]@users.noreply.github.com"
RUN git config --global user.name "github-actions[bot]"
RUN git commit -a -m "Update README.md from Publish Container - $(git log -1 --pretty=format:"%an") $(date "+%d/+%m/+%Y")"
RUN git push https://x-access-token:${GH_TOKEN}@github.com/$(git remote get-url origin | sed -E 's/.*github\.com[:\/]([^\/]+)\/([^\/]+).*/\1\/\2/') $(git rev-parse --abbrev-ref HEAD)

USER root
RUN chmod +x /entrypoint.sh
ENTRYPOINT ["/entrypoint.sh"]