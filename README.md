<!-- Start table of contents -->

## Table of Contents

1. [About The Project](#appointment-system)
2. [Built With](#built-with)
3. [Getting Started](#getting-started)
   - [Prerequisites](#prerequisites)
   - [Project installation](#project-installation)
   - [Build and start the service](#build-and-start-service)
     - [Vite localhost](#vite-localhost)
     - [Vite build and preview](#vite-build-and-preview)
   - [Commit recommendations](#commit-recomendations)
4. [Testing and formatting](#testing)
   - [Formatting the code](#formatting-code)
   - [Testing the project](#testing-project)
5. [Folder Structure](#folder-structure)
<!-- End table of contents -->

# <span id="appointment-system">📃Appointment System</span>

<font size="4">**Welcome to Appointment System 👋.**</font>

This is a project designed to manage appointments in a simple and efficient way and with many functionalities.

## <span id="built-with">🏗️Built with</span>

**Below is the framework used for the project and the libraries used in the project.**

> - [Vue 3][vue]
> - [Pinia][pinia]
> - [Typescrypt][typescript]
> - [VeeValidate][vee-validate]
> - [VueUse][vue-use]
> - [Fontawesome]
> - [Sass][sass]
> - [Prettier][prettier]
> - [Eslint][eslint]
> - [Stylelint][stylelint]
> - [Cypress][cypress]
> - [Jest][jest]
> - [Faker][faker]

![project-technologies]

**[Back to top](#table-of-contents)**

## <span id="getting-started">⚙️Getting Started</span>

The following details everything you need to have installed in order to install the project and also the steps to follow for the installation

### <span id="prerequisites">🚩Prerequisites</span>

> - **Recomends**: Is recommended use [Vs Code Text Editor] and [Vue Language Features (Volar) extension]
> - **WSL 2** _(Only Windows)_ : Is necessary have a [WSL 2] installed and configured
>   - Run as Administrator in Powershell the command `wsl --install`, if WSL is installed this will show a message indicating that is installed.
>   - Download in VS Code the extension [WSL Extension].
>   - Install a Ubuntu version for windows, for example [Ubuntu 22.04.02 LTS]
> - **Node.js**: Have installed [Node JS] and [NPM] (Normally NPM is included with Node JS)
>   - To install Node.js it is highly recommended to use NVM, with NVM it will be easier to manage the different versions of Node.
>   - To install NVM in Linux (WSL) open the link [install NVM Linux]
>   - **The Node version required to this project is** `18.15`
> - **Git**: Have installed [Git] control version
>   - To install Git here is the official documentation [download git].
>   - Another option to install git is to run the command `npm install -g git` (must be installed npm).
> - **Type Support For `.vue` Imports in TS**: Since TypeScript cannot handle type information for `.vue` imports, they are shimmed to be a generic Vue component type by default. In most cases this is fine if you don't really care about component prop types outside of templates. However, if you wish to get actual prop types in `.vue` imports (for example to get props validation when using manual `h(...)` calls), you can enable Volar's Take Over mode by following these steps:
>   - Run `Extensions: Show Built-in Extensions` from VS Code's command palette, look for `TypeScript and JavaScript Language Features`, then right click and select `Disable (Workspace)`. By default, Take Over mode will enable itself if the default TypeScript extension is disabled.
>   - Reload the VS Code window by running `Developer: Reload Window` from the command palette.

### <span id="project-installation">🖥️Project installation</span>

**Before starting the installation make sure that the terminal is in the folder where you want to have your projects.**

1. Clone the repository
   ```sh
   git clone https://github.com/ProjectPGA/Appoinment-System-Frontend-v3.git
   ```
2. Open the folder generated, if you are using the terminal could be:
   ```sh
   cd Appointment-System-Frontend-v3
   ```
3. When you are in the folder of the project (<path>/Appointment-System-Frontend-v3/) run the command
   ```sh
   pnpm install
   ```
4. Now you need to prepare husky with the correct permissions, run the command
   ```sh
   pnpm kusky:prepare
   ```

### <span id="build-and-start-service">🚀Build and Start the service</span>

#### <span id="vite-localhost">💻Vite localhost</span>

Start Vite dev server in the current directory.

1.  Builds and starts containers for the service
    ```sh
    pnpm dev
    ```
2.  Check that the service is running
    ```sh
     http://localhost:5173/
    ```

#### <span id="vite-build-and-preview">🧱Vite build and preview</span>

1. Build for environments
   ```sh
   pnpm build
   pnpm build:development
   pnpm build:production
   ```
2. Locally preview environment build.
   ```sh
   pnpm preview
   ```

### <span id="commit-recomendations">🔔Recommendations before open PR or upload a commit</span>

> **When a new PR is opened or a commit is uploaded to an open PR, a pipeline will be run to check for changes, this pipeline includes formatting, stylelint and lint checks.
> If the result of the check is an error, the pipeline will return an error and the code will need to be revised. To avoid this, it is recommended to execute the commands to format the code and > correct it.
> The commands are explained in the following section** -> **[Formatting the code](#formatting-code)**

**[Back to top](#table-of-contents)**

## <span id="testing">🧪Testing and formatting</span>

Testing is an important part of our project, so we have prepared simple testing and formatting commands to make our project more coherent.

### <span id="formatting-code">🖊️Formatting the code</span>

**Below is the differents commands to check and format the code**

1. **Run the lint**

   - Check lint
     ```sh
     pnpm lint:check
     ```
   - Check and fix lint
     ```sh
     pnpm lint
     ```

2. **Run the stylelint**

   - Check stylelint
     ```sh
     pnpm stylelint:check
     ```
   - Check and fix stylelint
     ```sh
     pnpm stylelint
     ```

3. **Run the format**

   - Check format
     ```sh
     pnpm format:check
     ```
   - Check and fix format
     ```sh
     pnpm format
     ```

4. **Run all**

   - Check all (Lint, stylelint and format)

   ```sh
   pnpm check:all
   ```

   - Check and fix all (Lint, stylelint and format)

   ```sh
   pnpm fix:all
   ```

### <span id="testing-project">🔬Testing the project</span>

1. Unit Test

   Commands:

   ```sh
   pnpm test:unit
   pnpm test:coverage
   ```

2. Unit e2e

   **¡Important!** Before running e2e test it is necessary to add a valid user email and password in the `.env.local` file. The values where you must add the email and password are:

   ```sh
   CYPRESS_USER_TEST_EMAIL=<email>
   CYPRESS_USER_TEST_PASSWORD=<password>
   ```

   Commands:

   ```sh
   pnpm test:e2e-cy
   pnpm test:e2e-cy-cli
   ```

   **¡Important! with Cypress** If you use Linux you will need install any dependencies:

   ```sh
   sudo apt update

   sudo apt upgrade

   sudo apt-get install libgtk2.0-0 libgtk-3-0 libgbm-dev libnotify-dev libgconf-2-4 libnss3 libxss1 libasound2 libxtst6 xauth xvfb

   sudo apt install wget

   wget https://dl.google.com/linux/direct/google-chrome-stable_current_amd64.deb

   sudo dpkg -i google-chrome-stable_current_amd64.deb

   sudo apt-get install -f
   ```

**[Back to top](#table-of-contents)**
## <span id="library-components">🎨Library Components</span>

[This document][library-components] serves as a guide and reference for the Component Library used in the "Appointment System". This library is built on Vue 3, leveraging the modern capabilities of this framework, and integrates with Storybook for interactive visualization and testing of components. We use SASS for more powerful and flexible style management, and TypeScript for adding static typing, thus improving code quality and maintainability.

**[Back to top](#table-of-contents)**

## <span id="folder-structure">📂Folder structure</span>

```
.Appointment-System-Frontend-v3
├── cypress                  // Cypress test files
│   ├── component               // Test files for components
│   ├── e2e                  // E2e test files
│   │   └── utilities              // E2e utilities (i.e: Constants with selectors)
│   │       ├── login              // E2e login functions and constants
│   │       ├── models             // E2e models
│   │       └── utils              // E2e common utils
│   ├── fixtures             // Cypress fixtures
│   ├── support              // Cypress examples
│   └── videos               // Cypress test videos
├── dist                     // Compiled files (only when the project has been compiled)
├── docs                     // Documentation files
│   └── img                     // README.md images
├── public                   // Content of application public data
└── src                      // Content of application code
    ├── assets                  // All assets used by the application
    │   ├── fonts                   // Font files (woff2, ttf...)
    │   └── img                     // Project images
    ├── components              // Reusable Components
    ├── library                 // Library components
    ├── localization            // Contain translations and translations config
    │   └── locales                 // Locales functionality and translations
    │       ├── en                     // All translations from English
    │       └── es                     // All translations from Spanish
    ├── models                  // Common models to code structure
    │   ├── appointment             // Appointment models
    │   ├── auth                    // Auth models
    │   ├── formUtils               // Form models
    │   ├── icons                   // Icons models
    │   │   └── fontawesome             // Fontawesome models
    │   ├── user                    // User models
    │   └── utils                   // Common models
    ├── routes                  // All routes
    ├── stores                  // Common data
    ├── styles                  // All global directories from the styles
    │   ├── animations              // All global animations
    │   ├── mixins                  // All global mixins
    │   ├── modifiers               // All global modifiers
    │   ├── modules                 // All global modules
    │   ├── transitions             // All global transitions
    │   └── variables               // All global variables
    ├── utils                       // General utils to developments
    │   ├── functionUtils           // Function utils to developments
    │   └── mocks                   // Diferents mocks
    │       └── user                // Diferents user models mocks (User, LoginRequest..)
    ├── views                   // Components with the views
    └── webservices             // Api connections files
        └── models                  // Models to api connections
            └── auth                    // Api auth connection models
```

![project-structure]

**[Back to top](#table-of-contents)**

<!-- Start Markdown images -->

[project-technologies]: docs/img/ProjectTechnologies.jpg
[project-structure]: docs/img/ProjectStructure.jpg

<!-- End Markdown images -->

<!-- Start Markdown links -->
[Git]: https://git-scm.com
[faker]: https://fakerjs.dev/
[sass]: https://sass-lang.com/
[vue-use]: https://vueuse.org/
[prettier]: https://prettier.io/
[stylelint]: https://stylelint.io/
[jest]: https://jestjs.io/docs/api
[cypress]: https://docs.cypress.io/
[fontawesome]: https://fontawesome.com/
[Node JS]: https://nodejs.org/es/about
[library-components]: src/library/README.md
[download git]: https://git-scm.com/downloads
[typescript]: https://www.typescriptlang.org/
[vue]: https://vuejs.org/guide/quick-start.html
[pinia]: https://pinia.vuejs.org/introduction.html
[Vs Code Text Editor]: https://code.visualstudio.com/
[vee-validate]: https://vee-validate.logaretm.com/v4/
[NPM]: https://www.bambu-mobile.com/que-es-npm-de-node-js/
[WSL 2]: https://learn.microsoft.com/es-es/windows/wsl/about
[eslint]: https://eslint.org/docs/latest/user-guide/getting-started
[WSL Extension]: https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-wsl
[Vue Language Features (Volar) extension]: https://marketplace.visualstudio.com/items?itemName=Vue.volar
[install NVM Linux]: https://learn.microsoft.com/es-es/windows/dev-environment/javascript/nodejs-on-wsl#install-nvm-nodejs-and-npm
[Ubuntu 22.04.02 LTS]: https://apps.microsoft.com/store/detail/ubuntu-22042-lts/9PN20MSR04DW?hl=en-us&gl=us&activetab=pivot%3Aoverviewtab

<!-- End Markdown links -->
