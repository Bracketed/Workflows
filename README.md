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

*   [Node Package Publish](#.github/workflows/Package-Publish.yml)
*   [README.md Updater](#.github/workflows/Repository-Update.yml)
*   [Package.json Version Check](#.github/workflows/Version-Check.yml)
*   [Cancel Workflow](#.github/workflows/Workflow-Cancel.yml)

#### Actions:

*   [Install dependencies with Yarn](#actions/add-yarn-dependencies/action.yml)
*   [Configure Git CLI](#actions/git-configure/action.yml)
*   [Install dependencies with NPM](#actions/install-npm-dependencies/action.yml)
*   [Set Memory Swap Space](#actions/set-swap-space/action.yml)
## Workflows:
#### [Node Package Publish](#.github/workflows/Package-Publish.yml)

*   Component link: `Bracketed/Workflows/.github/workflows/Package-Publish.yml@main` [[Source]](https://github.com/Bracketed/Workflows/blob/main/.github/workflows/Package-Publish.yml)
*   Description: Publish a node package to the NPM registry

**Inputs:**

*   **project-name**: The name of the project
    *   Required: `true`
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
#### [README.md Updater](#.github/workflows/Repository-Update.yml)

*   Component link: `Bracketed/Workflows/.github/workflows/Repository-Update.yml@main` [[Source]](https://github.com/Bracketed/Workflows/blob/main/.github/workflows/Repository-Update.yml)
*   Description: Automatically updates the README.md file of this repository, this is NOT a reusable workflow
#### [Package.json Version Check](#.github/workflows/Version-Check.yml)

*   Component link: `Bracketed/Workflows/.github/workflows/Version-Check.yml@main` [[Source]](https://github.com/Bracketed/Workflows/blob/main/.github/workflows/Version-Check.yml)
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
#### [Cancel Workflow](#.github/workflows/Workflow-Cancel.yml)

*   Component link: `Bracketed/Workflows/.github/workflows/Workflow-Cancel.yml@main` [[Source]](https://github.com/Bracketed/Workflows/blob/main/.github/workflows/Workflow-Cancel.yml)
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



## Actions:
#### [Install dependencies with Yarn](#actions/add-yarn-dependencies/action.yml)

*   Component link: `Bracketed/Workflows/actions/add-yarn-dependencies@main` [[Source]](https://github.com/Bracketed/Workflows/blob/main/actions/add-yarn-dependencies/action.yml)
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
#### [Configure Git CLI](#actions/git-configure/action.yml)

*   Component link: `Bracketed/Workflows/actions/git-configure@main` [[Source]](https://github.com/Bracketed/Workflows/blob/main/actions/git-configure/action.yml)
*   Description: Configure the Git CLI with the correct values and objects for usage in a command line environment

**Inputs:**

*   **GITHUB_TOKEN**: The Github Token to utilise when running this action
    *   Required: `true`
    *   Type: `string`
#### [Install dependencies with NPM](#actions/install-npm-dependencies/action.yml)

*   Component link: `Bracketed/Workflows/actions/install-npm-dependencies@main` [[Source]](https://github.com/Bracketed/Workflows/blob/main/actions/install-npm-dependencies/action.yml)
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
#### [Set Memory Swap Space](#actions/set-swap-space/action.yml)

*   Component link: `Bracketed/Workflows/actions/set-swap-space@main` [[Source]](https://github.com/Bracketed/Workflows/blob/main/actions/set-swap-space/action.yml)
*   Description: Add more swap space for memory in Gigabytes - By `pierotofy/set-swap-space`

**Inputs:**

*   **swap-size**: Swap space to create, in Gigabytes.
    *   Required: `false`
    *   Default: `10`
    *   Type: `string`
* * *

_Last Edited by ninjaninja140 at 24/03/2025 in **[d9d2693](Bracketed/Workflows.git/commit/d9d2693decd608c71e95b55b4e11e557863da96b)**_  

- This repo automatically generates its README.md file, feel free to take a look or use the code in this repo!
* * *

Contribution & Help
===================

Feel free to contribute to this project, join our [discord](https://discord.com/invite/JZ4949cvMT) and help us with future developments of Project Bracketed & Packages by Bracketed Softworks. Please also notify us of errors within our projects as we may not be aware of them at the time.  

Thanks for using our content!
-----------------------------

![Bracketed logo](https://github.com/Bracketed/Branding/blob/main/Banners/LogoBannerTextMini.png?raw=true)Bracketed Softworks - [Website](https://bracketed.co.uk) | [Discord](https://discord.com/invite/JZ4939cvMT) | [Github](https://github.com/Bracketed) | [Twitter](https://x.com/teambracketed) |  
  
![Discord Banner](https://discordapp.com/api/guilds/1041758035355369542/widget.png?style=banner2)