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

RUN apt-get update -y && \
    apt-get upgrade -y && \
    apt-get install -y openssl git

FROM base AS builder
COPY --chown=node:node tsconfig.json .
COPY --chown=node:node env.d.ts .

RUN corepack enable
RUN yarn set version stable
RUN yarn install
RUN yarn generate
RUN yarn compile

FROM base AS runner
COPY --chown=node:node --from=builder /usr/src/app/schemas/types schemas/types
COPY --chown=node:node --from=builder /usr/src/app/dist dist
COPY --chown=node:node --from=builder /usr/src/app/yarn.lock .

RUN yarn set version stable
RUN yarn install --immutable
RUN yarn workspaces focus --all --production
RUN chown node:node /usr/src/app

USER node
CMD ["yarn", "node", "./dist/index.js"]
