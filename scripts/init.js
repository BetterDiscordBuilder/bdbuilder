const fs = require("fs-extra");
const path = require("path");
require("dotenv").config();
console.log(process.argv);
const [, , addonName, ...description] = process.argv;
const pluginsPath = path.join(__dirname, "..", "plugins");
const pluginPath = path.join(pluginsPath, addonName);

if (fs.existsSync(pluginPath)) throw new Error("A plugin with that name already exists!");

fs.mkdirSync(pluginPath);
fs.writeFileSync(path.join(pluginPath, "index.js"), `import BasePlugin from "@zlibrary/plugin";\n\nexport default class ${addonName} extends BasePlugin {\n\tonStart() {}\n\tonStop() {}\n}`, "utf8");
fs.writeFileSync(path.join(pluginPath, "package.json"), JSON.stringify({
    info: {
        name: addonName,
        version: "1.0.0",
        description: description.join(" "),
        authors: [
            {
                name: process.env.DISCORD_USERNAME,
                discord_id: process.env.DISCORD_ID,
                github_username: process.env.GITHUB_NAME
            }
        ],
        github: `https://github.com/${process.env.GITHUB_NAME}/${process.env.GITHUB_REPO}/tree/${process.env.GITHUB_BRANCH}/${addonName}`,
        github_raw: `https://raw.githubusercontent.com/${process.env.GITHUB_NAME}/${process.env.GITHUB_REPO}/master/${addonName}/${addonName}.plugin.js`
    },
    build: {
        zlibrary: true,
        copy: true,
        production: false,
        scssHash: false,
        alias: {
            components: "components/index.js"
        },
        release: {
            source: true,
            readme: true,
            contributors: [
                {
                    name: "Kyza",
                    github: "https://github.com/Kyza"
                }
            ]
        }
    }
}, null, "\t"), "utf8");