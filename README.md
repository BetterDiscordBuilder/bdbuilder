# BDBuilder

Simpler version of [Ittai](https://github.com/BetterDiscordBuilder/ittai) only for BD.

## Installation

Release to the official NPM registry is pending. In the meanwhile install from the GH NPM registry:

#### 1. Tell `npm` that the `@betterdiscordbuilder` scope is located at GH and not NPM:

    ```sh
    echo '@betterdiscordbuilder:registry=https://npm.pkg.github.com' >> .npmrc
    ```

#### 2. Tell `npm` to use your GH account to access the `@betterdiscordbuilder` scope:

   [Create an access token](https://github.com/settings/tokens/new?description=GH%20NPM%20registry&scopes=repo%2Cread%3Apackages) for your GH account with the following permissions:

    - `repo`
    - `read:packages`

   Run the following command:
   
   ```sh
   npm login --scope=@betterdiscordbuilder --registry=https://npm.pkg.github.com
   ```
   
   When prompted provide your GH username (in lowercase) and use the generated token as the password.

#### 3. Install the BDBuilder package

   ```sh
   npm i -D @betterdiscordbuilder/bdbuilder@latest
   ```

## Building/Testing locally

```sh
git clone https://github.com/BetterDiscordBuilder/bdbuilder.git
cd bdbuilder
npm i
npm link
cd ./plugins/TestPlugin
npm i
cd ../..
bdbuilder --plugin="./plugins/TestPlugin" --copy="C:/Users/Username/AppData/Roaming/BetterDiscord/plugins" --watch --production
```
