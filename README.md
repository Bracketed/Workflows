@Workflows
==========

[![README.md Updater](https://github.com/Bracketed/Workflows/actions/workflows/Repository-Update.yml/badge.svg)](https://github.com/Bracketed/Workflows/actions/workflows/Repository-Update.yml)

* * *

Utilities by Bracketed Softworks
--------------------------------

  

Bracketed/Workflows
-------------------

  

Reusable workflows and actions for use by Bracketed Softworks to Build, publish, create, lint, document and more across our various products, projects and services we provide, as well as fast, reusable workflows for anyone who'd like to use them! ⚡🎉  
We permit usage of these by users outside of the Bracketed Softworks Organisation, these are free to use, copy and edit!

  

A few of the actions or workflows used in this repository are forks of `sapphiredev`'s reusables.

* * *
### Glossary:

#### Workflows:

*   [Node Package Publish](#node-package-publish)
*   [README.md Updater](#readme-md-updater)
*   [Build Rojo Project](#build-rojo-project)
*   [Package.json Version Check](#package-json-version-check)
*   [Cancel Workflow](#cancel-workflow)

#### Actions:

*   [Install dependencies with Yarn](#install-dependencies-with-yarn)
*   [Configure Git CLI](#configure-git-cli)
*   [Install Aftman](#install-aftman)
*   [Install dependencies with NPM](#install-dependencies-with-npm)
*   [Configure Git CLI](#configure-git-cli)
*   [Generate Self-hosted Runner Token](#generate-self-hosted-runner-token)
*   [Set Memory Swap Space](#set-memory-swap-space)
## Workflows:
#### [Node Package Publish](#node-package-publish)

*   Component link: `Bracketed/Workflows/.github/workflows/Package-Publish.yml@copilot/fix-anchor-links-readme-builder` [[Source]](https://github.com/Bracketed/Workflows/blob/copilot/fix-anchor-links-readme-builder/.github/workflows/Package-Publish.yml)
*   Description: Publish a node package to the NPM registry

**Inputs:**

*   **project-name**: The name of the project
    *   Required: `false`
    *   Default: `@${{ github.repository }}`
    *   Type: `string`
*   **repository-owner**: The repository owner (default `bracketed`, can be customised)
    *   Required: `false`
    *   Default: `bracketed`
    *   Type: `string`
*   **node-version**: The version of Node.js to use (default `23`)
    *   Required: `false`
    *   Default: `23`
    *   Type: `number`
*   **operating-system**: The operating system to use (default `ubuntu-latest`)
    *   Required: `false`
    *   Default: `ubuntu-latest`
    *   Type: `string`
*   **with-submodules**: Whether to include submodules when checking out the repository (default `false`)
    *   Required: `false`
    *   Default: `true`
    *   Type: `string`
*   **working-directory**: The working directory to run the commands in
    *   Required: `false`
    *   Default: `.`
    *   Type: `string`
*   **skip-automatic-bump**: Whether to skip the automatic bumping of the package version
    *   Required: `false`
    *   Default: `true`
    *   Type: `boolean`
*   **build**: Whether to run `yarn build` before publishing
    *   Required: `false`
    *   Default: `true`
    *   Type: `boolean`
*   **checkout-depth**: The depth of `actions/checkout` to fetch from (default `0`)
    *   Required: `false`
    *   Type: `number`
*   **checkout-ref**: The branch reference `actions/checkout` will use to pull from (default `main`)
    *   Required: `false`
    *   Default: `main`
    *   Type: `string`

**Example Usage:**

    name: Example Workflow
    on:
      push:
        branches: [main]
    
    jobs:
      example:
        uses: Bracketed/Workflows/.github/workflows/Package-Publish.yml@copilot/fix-anchor-links-readme-builder
        with:
          project-name: @${{ github.repository }}
          repository-owner: bracketed
          node-version: 23
#### [README.md Updater](#readme-md-updater)

*   Component link: `Bracketed/Workflows/.github/workflows/Repository-Update.yml@copilot/fix-anchor-links-readme-builder` [[Source]](https://github.com/Bracketed/Workflows/blob/copilot/fix-anchor-links-readme-builder/.github/workflows/Repository-Update.yml)
*   Description: Automatically updates the README.md file of this repository, this is NOT a reusable workflow

**Example Usage:**

    name: Example Workflow
    on:
      push:
        branches: [main]
    
    jobs:
      example:
        uses: Bracketed/Workflows/.github/workflows/Repository-Update.yml@copilot/fix-anchor-links-readme-builder
#### [Build Rojo Project](#build-rojo-project)

*   Component link: `Bracketed/Workflows/.github/workflows/Rojo-Build.yml@copilot/fix-anchor-links-readme-builder` [[Source]](https://github.com/Bracketed/Workflows/blob/copilot/fix-anchor-links-readme-builder/.github/workflows/Rojo-Build.yml)
*   Description: Build a Rojo Project with Aftman

**Inputs:**

*   **project-name**: The name of the project
    *   Required: `false`
    *   Default: `@${{ github.repository }}`
    *   Type: `string`
*   **project-context**: The working directory context of the Rojo build
    *   Required: `false`
    *   Default: `.`
    *   Type: `string`
*   **project-output**: The output file name of the Rojo build
    *   Required: `false`
    *   Default: `${{ github.repository_owner }}~${{ github.event.repository.name }}~${GITHUB_SHA:0:7}`
    *   Type: `string`
*   **artifact-label**: The label of the artifact published on a successful build
    *   Required: `false`
    *   Default: `${{ inputs.project-output }}`
    *   Type: `string`
*   **project-output-type**: The output file type of the Rojo build (Options: `rbxm` (default), `rbxmx`, `rbxl`, `rbxlx`)
    *   Required: `false`
    *   Default: `rbxm`
    *   Type: `string`
*   **project-file**: The project file for your Rojo project (default `default.project.json`)
    *   Required: `false`
    *   Default: `default.project.json`
    *   Type: `string`
*   **lua-version**: The Lua version to use when installing Lua to compile the project (default `5.1`)
    *   Required: `false`
    *   Default: `5.1`
    *   Type: `number`
*   **with-submodules**: Whether to include submodules when checking out the repository (default `false`)
    *   Required: `false`
    *   Default: `true`
    *   Type: `string`
*   **repository-owner**: The repository owner (default `bracketed`)
    *   Required: `false`
    *   Default: `bracketed`
    *   Type: `string`
*   **operating-system**: Base OS to use (default `ubuntu-latest`)
    *   Required: `false`
    *   Default: `ubuntu-latest`
    *   Type: `string`
*   **checkout-depth**: The depth of `actions/checkout` to fetch from (default `0`)
    *   Required: `false`
    *   Type: `number`
*   **checkout-ref**: The branch reference `actions/checkout` will use to pull from (default `main`)
    *   Required: `false`
    *   Default: `main`
    *   Type: `string`
*   **linters-enabled**: Allow code linting pre-build (default `false`)
    *   Required: `false`
    *   Type: `boolean`
*   **linter**: The linter to use in your project pre-build lint stage (default `selene`, options, `'selene'`, `'stylua'`)
    *   Required: `false`
    *   Default: `selene`
    *   Type: `string`
*   **linter-arguments**: Extra arguments to supply to the chosen project linter (default `none`)
    *   Required: `false`
    *   Type: `string`
*   **linter-version**: Set the version of your linter to install (default `latest`)
    *   Required: `false`
    *   Default: `latest`
    *   Type: `string`
*   **summary**: Display a build summary post-build (default `true`)
    *   Required: `false`
    *   Default: `true`
    *   Type: `boolean`

**Example Usage:**

    name: Example Workflow
    on:
      push:
        branches: [main]
    
    jobs:
      example:
        uses: Bracketed/Workflows/.github/workflows/Rojo-Build.yml@copilot/fix-anchor-links-readme-builder
        with:
          project-name: @${{ github.repository }}
          project-context: .
          project-output: ${{ github.repository_owner }}~${{ github.event.repository.name }}~${GITHUB_SHA:0:7}
#### [Package.json Version Check](#package-json-version-check)

*   Component link: `Bracketed/Workflows/.github/workflows/Version-Check.yml@copilot/fix-anchor-links-readme-builder` [[Source]](https://github.com/Bracketed/Workflows/blob/copilot/fix-anchor-links-readme-builder/.github/workflows/Version-Check.yml)
*   Description: Check the package.json version for a new version or same version

**Inputs:**

*   **cancel-on-same**: Cancel the running workflow and stop the whole workflow from running if the versions are the same
    *   Required: `false`
    *   Type: `boolean`
*   **project-name**: The name of the project (default is the repo owner + the repo name)
    *   Required: `false`
    *   Default: `@${{ github.repository }}`
    *   Type: `string`
*   **repository-owner**: The repository owner (default `bracketed`, can be customised)
    *   Required: `false`
    *   Default: `bracketed`
    *   Type: `string`
*   **operating-system**: Base OS to use (default `ubuntu-latest`)
    *   Required: `false`
    *   Default: `ubuntu-latest`
    *   Type: `string`
*   **with-submodules**: Whether to include submodules when checking out the repository (default `true`)
    *   Required: `false`
    *   Default: `true`
    *   Type: `boolean`
*   **working-directory**: The working directory to run the commands in
    *   Required: `false`
    *   Default: `.`
    *   Type: `string`
*   **checkout-depth**: The depth of `actions/checkout` to fetch from (default `0`)
    *   Required: `false`
    *   Type: `number`
*   **checkout-ref**: The branch reference `actions/checkout` will use to pull from (default is the same branch the workflow is running on)
    *   Required: `false`
    *   Default: `${{ github.ref }}`
    *   Type: `string`

**Example Usage:**

    name: Example Workflow
    on:
      push:
        branches: [main]
    
    jobs:
      example:
        uses: Bracketed/Workflows/.github/workflows/Version-Check.yml@copilot/fix-anchor-links-readme-builder
        with:
          cancel-on-same: false
          project-name: @${{ github.repository }}
          repository-owner: bracketed
#### [Cancel Workflow](#cancel-workflow)

*   Component link: `Bracketed/Workflows/.github/workflows/Workflow-Cancel.yml@copilot/fix-anchor-links-readme-builder` [[Source]](https://github.com/Bracketed/Workflows/blob/copilot/fix-anchor-links-readme-builder/.github/workflows/Workflow-Cancel.yml)
*   Description: Cancel a Github Actions Workflow with the gh CLI

**Inputs:**

*   **repository-owner**: The repository owner (default `bracketed`, can be customised)
    *   Required: `false`
    *   Default: `bracketed`
    *   Type: `string`
*   **operating-system**: Base OS to use (default `ubuntu-latest`)
    *   Required: `false`
    *   Default: `ubuntu-latest`
    *   Type: `string`

**Example Usage:**

    name: Example Workflow
    on:
      push:
        branches: [main]
    
    jobs:
      example:
        uses: Bracketed/Workflows/.github/workflows/Workflow-Cancel.yml@copilot/fix-anchor-links-readme-builder
        with:
          repository-owner: bracketed
          operating-system: ubuntu-latest
## Actions:
#### [Install dependencies with Yarn](#install-dependencies-with-yarn)

*   Component link: `Bracketed/Workflows/actions/add-yarn-dependencies@copilot/fix-anchor-links-readme-builder` [[Source]](https://github.com/Bracketed/Workflows/blob/copilot/fix-anchor-links-readme-builder/actions/add-yarn-dependencies/action.yml)
*   Description: Setup Node and install dependencies using Yarn.

**Inputs:**

*   **immutable**: Use the `--immutable` flag when installing yarn dependencies
    *   Required: `false`
    *   Default: `false`
    *   Type: `string`
*   **flags**: Extra flags to be added onto the `yarn install` command
    *   Required: `false`
    *   Type: `string`
*   **node-version**: The version of Node.js to use
    *   Required: `false`
    *   Default: `23`
    *   Type: `string`

**Example Usage:**

    steps:
      - name: Install dependencies with Yarn
        uses: Bracketed/Workflows/actions/add-yarn-dependencies@copilot/fix-anchor-links-readme-builder
        with:
          immutable: false
          flags: 
          node-version: 23
#### [Configure Git CLI](#configure-git-cli)

*   Component link: `Bracketed/Workflows/actions/git-configure@copilot/fix-anchor-links-readme-builder` [[Source]](https://github.com/Bracketed/Workflows/blob/copilot/fix-anchor-links-readme-builder/actions/git-configure/action.yml)
*   Description: Configure the Git CLI with the correct values and objects for usage in a command line environment

**Inputs:**

*   **GITHUB_TOKEN**: The Github Token to utilise when running this action
    *   Required: `true`
    *   Type: `string`

**Example Usage:**

    steps:
      - name: Configure Git CLI
        uses: Bracketed/Workflows/actions/git-configure@copilot/fix-anchor-links-readme-builder
        with:
          GITHUB_TOKEN: ${{ secrets.EXAMPLE_GITHUB_TOKEN }}
#### [Install Aftman](#install-aftman)

*   Component link: `Bracketed/Workflows/actions/install-aftman@copilot/fix-anchor-links-readme-builder` [[Source]](https://github.com/Bracketed/Workflows/blob/copilot/fix-anchor-links-readme-builder/actions/install-aftman/action.yml)
*   Description: Github action to install the Aftman toolchain manager - A fork of ok-nic/setup-aftman

**Inputs:**

*   **version**: Git Release Tag (usually in the form `vX.X.X`)
    *   Required: `false`
    *   Type: `string`
*   **context**: Path to the `aftman.toml` directory
    *   Required: `false`
    *   Default: `.`
    *   Type: `string`
*   **cache**: Enable caching (default `false`)
    *   Required: `false`
    *   Default: `false`
    *   Type: `string`
*   **token**: GitHub token via `github.token`
    *   Required: `false`
    *   Default: `${{ github.token }}`
    *   Type: `string`

**Example Usage:**

    steps:
      - name: Install Aftman
        uses: Bracketed/Workflows/actions/install-aftman@copilot/fix-anchor-links-readme-builder
        with:
          version: ${{ secrets.EXAMPLE_VERSION }}
          context: .
          cache: false
#### [Install dependencies with NPM](#install-dependencies-with-npm)

*   Component link: `Bracketed/Workflows/actions/install-npm-dependencies@copilot/fix-anchor-links-readme-builder` [[Source]](https://github.com/Bracketed/Workflows/blob/copilot/fix-anchor-links-readme-builder/actions/install-npm-dependencies/action.yml)
*   Description: Setup Node and install dependencies using NPM.

**Inputs:**

*   **frozen**: Use the `--frozen-lockfile` flag when installing npm dependencies
    *   Required: `false`
    *   Default: `false`
    *   Type: `string`
*   **flags**: Extra flags to be added onto the `npm install` command
    *   Required: `false`
    *   Type: `string`
*   **node-version**: The version of Node.js to use
    *   Required: `false`
    *   Default: `23`
    *   Type: `string`

**Example Usage:**

    steps:
      - name: Install dependencies with NPM
        uses: Bracketed/Workflows/actions/install-npm-dependencies@copilot/fix-anchor-links-readme-builder
        with:
          frozen: false
          flags: 
          node-version: 23
#### [Configure Git CLI](#configure-git-cli)

*   Component link: `Bracketed/Workflows/actions/install-rokit@copilot/fix-anchor-links-readme-builder` [[Source]](https://github.com/Bracketed/Workflows/blob/copilot/fix-anchor-links-readme-builder/actions/install-rokit/action.yml)
*   Description: Configure the Git CLI with the correct values and objects for usage in a command line environment

**Inputs:**

*   **toolchain-version**: The version of the rust toolchain to install (default `stable`)
    *   Required: `false`
    *   Default: `stable`
    *   Type: `string`
*   **rokit-version**: Rokit Version to install from Cargo (default `latest`)
    *   Required: `false`
    *   Default: `latest`
    *   Type: `string`
*   **self-install**: Run `rokit self-install` after installing Rokit (default `true`)
    *   Required: `false`
    *   Default: `true`
    *   Type: `string`
*   **install-context**: Context in directory of where Rokit will run `rokit self-install` post install (default `.`)
    *   Required: `false`
    *   Default: `.`
    *   Type: `string`

**Example Usage:**

    steps:
      - name: Configure Git CLI
        uses: Bracketed/Workflows/actions/install-rokit@copilot/fix-anchor-links-readme-builder
        with:
          toolchain-version: stable
          rokit-version: latest
          self-install: true
#### [Generate Self-hosted Runner Token](#generate-self-hosted-runner-token)

*   Component link: `Bracketed/Workflows/actions/make-runner@copilot/fix-anchor-links-readme-builder` [[Source]](https://github.com/Bracketed/Workflows/blob/copilot/fix-anchor-links-readme-builder/actions/make-runner/action.yml)
*   Description: Generate a token for a self-hosted GitHub Actions runner.

**Inputs:**

*   **token**: Authentication token for gh CLI, defaults to the workflow GITHUB_TOKEN.
    *   Required: `false`
    *   Default: `${{ github.token }}`
    *   Type: `string`
*   **org**: Optional override for the organization name. Defaults to the repository owner.
    *   Required: `false`
    *   Type: `string`

**Example Usage:**

    steps:
      - name: Generate Self-hosted Runner Token
        uses: Bracketed/Workflows/actions/make-runner@copilot/fix-anchor-links-readme-builder
        with:
          token: ${{ github.token }}
          org:
#### [Set Memory Swap Space](#set-memory-swap-space)

*   Component link: `Bracketed/Workflows/actions/set-swap-space@copilot/fix-anchor-links-readme-builder` [[Source]](https://github.com/Bracketed/Workflows/blob/copilot/fix-anchor-links-readme-builder/actions/set-swap-space/action.yml)
*   Description: Add more swap space for memory in Gigabytes - By `pierotofy/set-swap-space`

**Inputs:**

*   **swap-size**: Swap space to create, in Gigabytes.
    *   Required: `false`
    *   Default: `10`
    *   Type: `string`

**Example Usage:**

    steps:
      - name: Set Memory Swap Space
        uses: Bracketed/Workflows/actions/set-swap-space@copilot/fix-anchor-links-readme-builder
        with:
          swap-size: 10
* * *

_Last Edited by copilot-swe-agent[bot] at 21/11/2025 in **[024b626](Bracketed/Workflows/commit/024b62683472c13b65cf4a250a0c09ebbfa813e5)**_  

- This repo automatically generates its README.md file, feel free to take a look or use the code in this repo!
* * *

Contribution & Help
===================

Feel free to contribute to this project, join our [discord](https://discord.com/invite/JZ4949cvMT) and help us with future developments of Project Bracketed & Packages by Bracketed Softworks. Please also notify us of errors within our projects as we may not be aware of them at the time.  

Thanks for using our content!
-----------------------------

![Bracketed logo](https://github.com/Bracketed/Branding/blob/main/Banners/LogoBannerTextMini.png?raw=true)Bracketed Softworks - [Website](https://bracketed.co.uk) | [Discord](https://discord.com/invite/JZ4939cvMT) | [Github](https://github.com/Bracketed) | [Twitter](https://x.com/teambracketed) |  
  
![Discord Banner](https://discordapp.com/api/guilds/1041758035355369542/widget.png?style=banner2)