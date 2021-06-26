import DiscordImports from "./data/imports.json";
import fs from "fs-extra";
import Utils, {nullish} from "./utils.js";
import path from "path";
import CONSTANTS from "./constants";
import {builtinModules} from "module";

export default function externals() {
    const pluginPath = Utils.getPath();

    return [
        {
            "react": "var BdApi.React",
            "react-dom": "var BdApi.ReactDOM",
            "@zlibrary": "var PluginApi",
            "@zlibrary/discord": "var PluginApi.DiscordModules",
            "@zlibrary/plugin": "var BasePlugin",
            "https": 'var require("https")',
            "lodash": "var window._",
            "betterdiscord/api": "var require('betterdiscord/bdapi')",
            // "kss": fs.readFileSync(path.resolve(__dirname, "kss.js"), "utf8"),
            "styles": "var StyleLoader",
            ...Object.keys(DiscordImports).reduce((items, item) => {
                items[item] = ["var Modules", item];
                return items;
            }, {})
        },
        function ({context, request}, callback) {
            if (context === Utils.getPath()) {
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
                    console.log("Files:");
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