<!-- TABLE OF CONTENTS -->
## Table of Contents

1. [About The Project](#appointment-system)
2. [Built With](#built-with)
3. [Getting Started](#getting-started)
    * [Prerequisites](#prerequisites)
    * [Project instalation](#project-instalation)
    * [Build and start the service](#build-and-start-service)
        * [Vite localhost](#vite-localhost)
        * [Vite localhost](#vite-build-and-preview)
4. [Testing](#testing)
    * [Formatting the code](#formatting-code)
    * [Testing the project](#testing-code)
# <span id="appointment-system">📃Appointment System</span>

<font size="4">**Welcome to Appointment System 👋.**</font>

This is a project designed to manage appointments in a simple and efficient way and with many functionalities.

## <span id="build-with">🏗️Built with</span>

**Below is the framework used for the project and the libraries used in the project.**

> * [Vue 3][vue]
> * [Pinia][pinia]
> * [Typescrypt][typescript]
> * [VeeValidate][vee-validate]
> * [VueUse][vue-use]
> * [Fontawesome]
> * [Sass][sass]
> * [Prettier][prettier]
> * [Eslint][eslint]
> * [Stylelint][stylelint]
> * [Cypress][cypress]
> * [Vitest][vitest]

![product-technologies]


**[Back to top](#table-of-contents)**

## <span id="getting-started">⚙️Getting Started</span>
The following details everything you need to have installed in order to install the project and also the steps to follow for the installation
### <span id="prerequisites">🚩Prerequisites</span>
>* **Recomends**: Is recommended use [Vs Code Text Editor] and [Vue Language Features (Volar) extension]
>* **WSL 2** *(Only Windows)* : Is necessary have a [WSL 2] installed and configured
>    * Run as Administrator in Powershell the command `wsl --install`, if WSL is installed this will show a message indicating that is installed.
>    * Download in VS Code the extension [WSL Extension].
>    * Install a Ubuntu version for windows, for example [Ubuntu 22.04.02 LTS]
>* **Node.js**: Have installed [Node JS] and [NPM] (Normally NPM is included with Node JS)
>   * To install Node.js it is highly recommended to use NVM, with NVM it will be easier to manage the different versions of Node.
>   * To install NVM in Linux (WSL) open the link [install NVM Linux]
>   * **The Node version required to this project is** `18.15`
>* **Git**: Have installed [Git] control version
>   * To install Git here is the official documentation [download git].
>   * Another option to install git is to run the command `npm install -g git` (must be installed npm).

### <span id="project-instalation">🖥️Project instalation</span>

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
    yarn install
    ```
4. Now you need to prepare husky with the correct permissions, run the command
    ```sh
    yarn kusky:prepare
    ```
### <span id="build-and-start-service">🚀Build and Start the service</span>

#### <span id="vite-localhost">💻Vite localhost</span>
Start Vite dev server in the current directory.
1.  Builds and starts containers for the service
    ```sh
    yarn dev
    ```
2. Check that the service is running
    ```sh
     http://localhost:5173/
    ```
#### <span id="vite-build-and-preview">🧱Vite build and preview</span>
1. Build for environments
    ```sh
    yarn build
    yarn build:development
    yarn build:production
    ```
2. Locally preview environment build.
    ```sh
    yarn preview
    ```

**[Back to top](#table-of-contents)**
## <span id="testing">🧪Testing and formatting</span>
Testing is an important part of our project, so we have prepared simple testing and formatting commands to make our project more coherent.
### <span id="formatting-code">🖊️Formatting the code</span>
**Below is the differents commands to check and format the code**
1. Run the lint
    * Check lint
        ```sh
        yarn lint:check
        ```
    * Check and fix lint
        ```sh
        yarn lint
        ```
2. Run the stylelint
    * Check stylelint
        ```sh
        yarn stylelint:check
        ```
    * Check and fix stylelint
        ```sh
        yarn stylelint
        ```
3. Run the format
    * Check format
        ```sh
        yarn format:check
        ```
    * Check and fix format
        ```sh
        yarn format
        ```
4. Run all
    * Check all (Lint, stylelint and format)
    ```sh
    yarn check:all
    ```
    * Check and fix all (Lint, stylelint and format)
    ```sh
    yarn fix:all
    ```
### <span id="testing-project">🔬Testing the project</span>
1. Unit Test
    ```sh
    yarn test:unit
    yarn test:coverage
    ```
2. Unit e2e
    ```sh
    yarn test:e2e-cy
    yarn test:e2e-cy-cli
    ```

**[Back to top](#table-of-contents)**


<!-- Start Markdown images -->
[product-technologies]: docs/img/ProjectTechnologies.png
<!-- End Markdown images -->

<!-- Start Markdown links -->
[Git]: https://git-scm.com
[sass]: https://sass-lang.com/
[vue-use]: https://vueuse.org/
[prettier]: https://prettier.io/
[stylelint]: https://stylelint.io/
[vitest]: https://vitest.dev/api/
[cypress]: https://docs.cypress.io/
[fontawesome]: https://fontawesome.com/
[Node JS]: https://nodejs.org/es/about
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