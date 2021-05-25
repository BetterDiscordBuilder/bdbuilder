const fs = require("fs-extra");
const path = require("path");
require("dotenv").config();

const [,, pluginName, ...description] = process.argv;

const pluginsPath = path.join(__dirname, "..", "plugins");
const pluginPath = path.join(pluginsPath, pluginName);

if (fs.existsSync(pluginPath)) throw new Error("A plugin with that name already exists!");

fs.mkdirSync(pluginPath);
fs.writeFileSync(path.join(pluginPath, "index.js"), `import BasePlugin from "@zlibrary/plugin";\n\nexport default class ${pluginName} extends BasePlugin {\n\tonStart() {}\n\tonStop() {}\n}`, "utf8");
fs.writeFileSync(path.join(pluginPath, "package.json"), JSON.stringify({
    info: {
        name: pluginName,
        version: "1.0.0",
        description: description.join(" "),
        authors: [
            {
                name: process.env.USERNAME,
                discord_id: process.env.DISCORD_ID,
                github_username: process.env.GITHUB_NAME
            }
        ],
        github: `https://github.com/${process.env.GITHUB_NAME}/${process.env.GITHUB_REPO}/${pluginName}`,
        github_raw: `https://raw.githubusercontent.com/${process.env.GITHUB_NAME}/${process.env.GITHUB_REPO}/master/${pluginName}/${pluginName}.plugin.js`
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