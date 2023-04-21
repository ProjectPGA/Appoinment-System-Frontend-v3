# 📃Appointment System (Frontend)

### **Welcome to Appointment System 👋.**

This is a project designed to manage appointments in a simple and efficient way and with many functionalities.

# ⚙️Getting Started
The following details everything you need to have installed in order to install the project and also the steps to follow for the installation
## 🚩Prerequisites
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

## 🖥️Project instalation

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
## 🚀Build and Start the service

### 💻Vite localhost
1.  Builds and starts containers for the service
    ```sh
    yarn dev
    ```
2. Check that the service is running
    ```sh
     http://localhost:5173/
    ```

<!-- Markdown links -->
[Git]: https://git-scm.com
[Node JS]: https://nodejs.org/es/about
[download git]: https://git-scm.com/downloads
[Vs Code Text Editor]: https://code.visualstudio.com/
[NPM]: https://www.bambu-mobile.com/que-es-npm-de-node-js/
[WSL 2]: https://learn.microsoft.com/es-es/windows/wsl/about
[WSL Extension]: https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-wsl
[Vue Language Features (Volar) extension]: https://marketplace.visualstudio.com/items?itemName=Vue.volar
[install NVM Linux]: https://learn.microsoft.com/es-es/windows/dev-environment/javascript/nodejs-on-wsl#install-nvm-nodejs-and-npm
[Ubuntu 22.04.02 LTS]: https://apps.microsoft.com/store/detail/ubuntu-22042-lts/9PN20MSR04DW?hl=en-us&gl=us&activetab=pivot%3Aoverviewtab