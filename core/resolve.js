import Utils, {getConfig, nullish} from "./utils.js";

export default function resolve() {
    const pluginAliases = nullish(getConfig("build.aliases"), {});

    return {
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
        }, {})
    };
};