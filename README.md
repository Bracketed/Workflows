@Workflows
==========

* * *

Utilities by Bracketed Softworks
--------------------------------

  

Bracketed/Workflows
-------------------

  

Reusable workflows and actions for use by Bracketed Softworks to Build, publish, create, lint, document and more across our various products, projects and services we provide, as well as fast, reusable workflows for anyone who'd like to use them! ⚡🎉  
We permit usage of these by users outside of the Bracketed Softworks Organisation, these are free to use, copy and edit!

  

A few of the actions or workflows used in this repository are forks of `sapphiredev\`'s reusables.

* * *
### Glossary:

#### Workflows:

*   [Node Package Publish](https://github.com/Bracketed/Workflows.git/blob/main/.github/workflows/Package-Publish.yml)
*   [README.md Updater](https://github.com/Bracketed/Workflows.git/blob/main/.github/workflows/Repository-Update.yml)
*   [Package.json Version Check](https://github.com/Bracketed/Workflows.git/blob/main/.github/workflows/Version-Check.yml)
*   [Cancel Workflow](https://github.com/Bracketed/Workflows.git/blob/main/.github/workflows/Workflow-Cancel.yml)

#### Actions:

*   [Install dependencies with Yarn](https://github.com/Bracketed/Workflows.git/blob/main/actions/add-yarn-dependencies/action.yml)
*   [Configure Git CLI](https://github.com/Bracketed/Workflows.git/blob/main/actions/git-configure/action.yml)
*   [Install dependencies with NPM](https://github.com/Bracketed/Workflows.git/blob/main/actions/install-npm-dependencies/action.yml)
*   [Set Memory Swap Space](https://github.com/Bracketed/Workflows.git/blob/main/actions/set-swap-space/action.yml)
## Workflows:
#### [Node Package Publish](https://github.com/Bracketed/Workflows.git/blob/main/.github/workflows/Package-Publish.yml)

\- Publish a node package to the NPM registry

**Inputs:**

*   **project-name**: The name of the project
    *   Required:
    *   Default:
    *   Type: string
*   **repository-owner**: The repository owner (default \`bracketed\`, can be customised)
    *   Required:
    *   Default: bracketed
    *   Type: string
*   **node-version**: The version of Node.js to use (default \`23\`)
    *   Required:
    *   Default: 23
    *   Type: number
*   **operating-system**: The operating system to use (default \`ubuntu-latest\`)
    *   Required:
    *   Default: ubuntu-latest
    *   Type: string
*   **with-submodules**: Whether to include submodules when checking out the repository (default \`false\`)
    *   Required:
    *   Default: true
    *   Type: string
*   **working-directory**: The working directory to run the commands in
    *   Required:
    *   Default: .
    *   Type: string
*   **skip-automatic-bump**: Whether to skip the automatic bumping of the package version
    *   Required:
    *   Default:
    *   Type: boolean
*   **build**: Whether to run \`yarn build\` before publishing
    *   Required:
    *   Default:
    *   Type: boolean
*   **checkout-depth**: The depth of \`actions/checkout\` to fetch from (default \`0\`)
    *   Required:
    *   Default: 0
    *   Type: number
*   **checkout-ref**: The branch reference \`actions/checkout\` will use to pull from (default \`main\`)
    *   Required:
    *   Default: main
    *   Type: string
#### [README.md Updater](https://github.com/Bracketed/Workflows.git/blob/main/.github/workflows/Repository-Update.yml)

\- Automatically updates the README.md file of this repository, this is NOT a reusable workflow

**Inputs:**
#### [Package.json Version Check](https://github.com/Bracketed/Workflows.git/blob/main/.github/workflows/Version-Check.yml)

\- Check the package.json version for a new version or same version

**Inputs:**

*   **cancel-on-same**: Cancel the running workflow and stop the whole workflow from running if the versions are the same
    *   Required:
    *   Default:
    *   Type: boolean
*   **project-name**: The name of the project (default is the repo owner + the repo name)
    *   Required:
    *   Default: @${{ github.repository }}
    *   Type: string
*   **repository-owner**: The repository owner (default \`bracketed\`, can be customised)
    *   Required:
    *   Default: bracketed
    *   Type: string
*   **operating-system**: Base OS to use (default \`ubuntu-latest\`)
    *   Required:
    *   Default: ubuntu-latest
    *   Type: string
*   **with-submodules**: Whether to include submodules when checking out the repository (default \`true\`)
    *   Required:
    *   Default:
    *   Type: boolean
*   **working-directory**: The working directory to run the commands in
    *   Required:
    *   Default: .
    *   Type: string
*   **checkout-depth**: The depth of \`actions/checkout\` to fetch from (default \`0\`)
    *   Required:
    *   Default: 0
    *   Type: number
*   **checkout-ref**: The branch reference \`actions/checkout\` will use to pull from (default is the same branch the workflow is running on)
    *   Required:
    *   Default: ${{ github.ref }}
    *   Type: string
#### [Cancel Workflow](https://github.com/Bracketed/Workflows.git/blob/main/.github/workflows/Workflow-Cancel.yml)

\- Cancel a Github Actions Workflow with the gh CLI

**Inputs:**

*   **repository-owner**: The repository owner (default \`bracketed\`, can be customised)
    *   Required:
    *   Default: bracketed
    *   Type: string
*   **operating-system**: Base OS to use (default \`ubuntu-latest\`)
    *   Required:
    *   Default: ubuntu-latest
    *   Type: string



## Actions:
#### [Install dependencies with Yarn](https://github.com/Bracketed/Workflows.git/blob/main/actions/add-yarn-dependencies/action.yml)

\- Setup Node and install dependencies using Yarn.

**Inputs:**

*   **immutable**: Use the \`--immutable\` flag when installing yarn dependencies
    *   Required:
    *   Default: false
    *   Type: string
*   **flags**: Extra flags to be added onto the \`npm install\` command
    *   Required:
    *   Default:
    *   Type: string
*   **node-version**: The version of Node.js to use
    *   Required:
    *   Default: 23
    *   Type: string
#### [Configure Git CLI](https://github.com/Bracketed/Workflows.git/blob/main/actions/git-configure/action.yml)

\- Configure the Git CLI with the correct values and objects for usage in a command line environment

**Inputs:**

*   **GITHUB\_TOKEN**: The Github Token to utilise when running this action
    *   Required:
    *   Default:
    *   Type: string
#### [Install dependencies with NPM](https://github.com/Bracketed/Workflows.git/blob/main/actions/install-npm-dependencies/action.yml)

\- Setup Node and install dependencies using NPM.

**Inputs:**

*   **frozen**: Use the \`--frozen-lockfile\` flag when installing npm dependencies
    *   Required:
    *   Default: false
    *   Type: string
*   **flags**: Extra flags to be added onto the \`npm install\` command
    *   Required:
    *   Default:
    *   Type: string
*   **node-version**: The version of Node.js to use
    *   Required:
    *   Default: 23
    *   Type: string
#### [Set Memory Swap Space](https://github.com/Bracketed/Workflows.git/blob/main/actions/set-swap-space/action.yml)

\- Add more swap space for memory in Gigabytes - By \`pierotofy/set-swap-space\`

**Inputs:**

*   **swap-size**: Swap space to create, in Gigabytes.
    *   Required:
    *   Default: 10
    *   Type: string
* * *

_Last Edited by ninjaninja140 at 24/03/2025 in **[8c9af94](Bracketed/Workflows.git/commit/8c9af94e23d7f81b47b838b70973d509ef6d3a91)**_
* * *

Contribution & Help
===================

Feel free to contribute to this project, join our [discord](https://discord.com/invite/JZ4949cvMT) and help us with future developments of Project Bracketed & Packages by Bracketed Softworks. Please also notify us of errors within our projects as we may not be aware of them at the time.  

Thanks for using our content!
-----------------------------

![Bracketed logo](https://github.com/Bracketed/Branding/blob/main/Banners/LogoBannerTextMini.png?raw=true)Bracketed Softworks - [Website](https://bracketed.co.uk) | [Discord](https://discord.com/invite/JZ4939cvMT) | [Github](https://github.com/Bracketed) | [Twitter](https://x.com/teambracketed) |  
  
![Discord Banner](https://discordapp.com/api/guilds/1041758035355369542/widget.png?style=banner2)