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
COPY --chown=node:node entrypoint.sh .

COPY --chown=node:node .yarn/ .yarn/
COPY --chown=node:node src/ src/
COPY --chown=node:node actions/ actions/
COPY --chown=node:node .git/ .git/
COPY --chown=node:node .github/ .github/

RUN apt-get update -y && \
    apt-get upgrade -y && \
    apt-get install -y openssl git curl

RUN mkdir schemas
RUN chown node:node schemas
RUN curl https://json.schemastore.org/github-action.json -o schemas/actions.json
RUN curl https://json.schemastore.org/github-workflow.json -o schemas/workflows.json
RUN chmod +x ./entrypoint.sh

FROM base AS builder
COPY --chown=node:node tsconfig.json .
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
COPY --chown=node:node --from=builder /usr/src/app/tsconfig.json .
COPY --chown=node:node --from=builder /usr/src/app/tsup.config.ts .

RUN yarn set version stable
RUN yarn install --immutable
RUN yarn workspaces focus --all --production
RUN chown node:node /usr/src/app

USER node
STOPSIGNAL SIGINT
ENTRYPOINT ["./entrypoint.sh"]