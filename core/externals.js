import DiscordImports from "./data/imports.json";
import fs from "fs-extra";
import Utils, {nullish} from "./utils.js";
import path from "path";
import CONSTANTS from "./constants";
import {builtinModules} from "module";

export default function externals() {
    const pluginPath = Utils.getPath();
    const config = Utils.getConfig();

    return [
        {
            "react": ["window BdApi", "React"],
            "react-dom": ["window BdApi", "ReactDOM"],
            "@zlibrary": "assign PluginApi",
            "@zlibrary/discord": ["assign PluginApi.DiscordModules"],
            "@zlibrary/plugin": "assign BasePlugin",
            "https": 'assign require("https")',
            "lodash": "assign window._",
            "styles": `assign {
                    inject: (name = config.info.name) => {
                        if(__style_element__) __style_element__.remove();
                        __style_element__ = document.head.appendChild(Object.assign(document.createElement("style"), {id: name, textContent: __plugin_styles__}));
                    },
                    remove: () => {
                        if (__style_element__) {
                            __style_element__.remove();
                            __style_element__ = null;
                        }
                    }
                }`,
            ...Object.keys(DiscordImports).reduce((modules, module) => {
                if (typeof DiscordImports[module] === "string") {
                    modules[module] = `assign ${DiscordImports[module]}`;
                } else {
                    modules[module] = `assign {${Object.keys(DiscordImports[module]).map(e => {
                        e = e.trim();
                        return `get ${e}() {
                                const value = ${DiscordImports[module][e]}; 
                                Object.defineProperty(this, '${e}', {
                                    value,
                                    configurable: true
                                });
                                return value;
                            }`;
                    }).join(",\n")}}`;
                }
                return modules;
            }, {})
        },
        function ({context, request}, callback) {
            if (context === CONSTANTS.ROOT_DIR) {
                Utils.startTime = Utils.nanoseconds();
                return callback();
            }
    
            // Check if it's in node_modules.
            const config = Utils.getBuildConfig();
            const nodeModulesPath = path.resolve(pluginPath, "node_modules");
            if (fs.existsSync(nodeModulesPath)) {
                if (fs.existsSync(path.join(nodeModulesPath, request))) return callback();
            }
    
            const fullPath = path.join(context, request);
            try {
                if (fs.lstatSync(fullPath).isDirectory()) {
                    // It's a folder. Check for index.SOMETHING.
                    const files = fs.readdirSync(fullPath);
                    if (files.some((file) => file.startsWith("index."))) {
                        // Continue without externalizing the import
                        return callback();
                    }
                }
            } catch {}
            try {
                // Test if the file exists, ignore extension.
                const files = fs.readdirSync(path.join(fullPath, ".."));
                if (files.some((file) => file.startsWith(path.basename(fullPath)))) {
                    // Continue without externalizing the import
                    return callback();
                }
            } catch {}
    
            try {
                const match = Object.keys(nullish(config.build.resolve.alias, {})).some(e => request.startsWith(e));
                if (match) {
                    return callback();
                }
            } catch {}

            if (~builtinModules.indexOf(request)) {
                return callback(null, "commonjs2 " + request);
            }

            try {
                if (Object.keys(config.resolve.alias).some(k => k.charAt(k.length - 1) !== "$" && request.startsWith(k))) {
                    return callback();
                }
            } catch {}

            // // Externalize to a commonjs module using the request path
            // callback(null, "commonjs2 " + request);
            throw new Error("Could not resolve depenency: " + request);
        }
    ];
};