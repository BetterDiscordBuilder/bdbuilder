import Utils, {getAddonConfig, nullish} from "./utils.js";
import path from "path";

export default function resolve() {
    const pluginAliases = nullish(getAddonConfig("build.aliases"), {});

    const ret = {
        extensions: [
            ".js",
            ".mjs",
            ".jsx",
            ".ts",
            ".tsx",
            ".coffee",
            ".css",
            ".scss",
            ".sass",
            ".less",
            ".styl",
            ".html",
            ".json"
        ],
        alias: Object.keys(pluginAliases).reduce((aliases, alias) => {
            aliases[alias] = path.resolve(Utils.getPath(), pluginAliases[alias]);
            return aliases;
        }, {
            common: path.resolve(__dirname, "..", "common")
        })
    };

    return ret;
};