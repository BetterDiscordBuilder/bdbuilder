import path from "path";
import fs from "fs-extra";
import defaultConfig from "./data/defaults.json";
import _ from "lodash";
import {hideBin} from "yargs/helpers";
import yargs from "yargs/yargs";

let addonPath = "";
let argv = yargs(hideBin(process.argv)).argv;
let builtConfig = {};
let hasProp = {}.hasOwnProperty;

export function nullish(what, def) {
    return isNil(what) ? def : what;
};

export function isNil(what) {
    return typeof what === "undefined" || Object.is(what, null);
}

export function resolveType(rawType, plural = true) {
    switch (rawType.toLowerCase()) {
        /* Themes */
        case (plural && "theme"): return "themes";
        case (plural && "themes"): return "themes";
        case (!plural && "theme"): return "theme";
        case (!plural && "themes"): return "theme";

        /* Plugins */
        case (plural && "plugin"): return "plugin";
        case (plural && "plugins"): return "plugins";
        case (!plural && "plugin"): return "plugin";
        case (!plural && "plugins"): return "plugin";

        default: throw new Error("Could not resolve " + rawType + " as addon type.");
    }
};

export function upperFirst(string) {
    return string[0].toUpperCase() + string.slice(1);
};

export function formatString(string, options, open = "{{", close = "}}") {
    for (const option in options) {
        string = string.replace(new RegExp(_.escape(`\\${open}${option}\\${close}`), "g"), options[option]);
    }

    return string;
};

formatString.bind = string => {
    string.format = Function.prototype.bind.call(formatString, string);
    return string;
};

export function resolveModule(mod) {
    return __non_webpack_require__.resolve(mod);
    return a;
};

export function resolveRawGithub(pluginName, path) {
    const {github} = getBuilderConfig();
    return `https://raw.githubusercontent.com/${github.username}/${github.repo}/${github.branch}/${pluginName}/${path}`;
};

export function nanoseconds() {
    const hrTime = process.hrtime();
    return hrTime[0] * 1000000000 + hrTime[1];
};

export function init(addon, argvObj) {
    const cfg = getBuilderConfig();
    addonPath = path.resolve(process.cwd(), formatString(cfg.build.entry, {name: addon}, "[", "]"));
    argv = argvObj;
};

export function setBuiltConfig(cfg) {
    builtConfig = cfg;
};

export function getBuildConfig() {
    return builtConfig;
};

export function getPath() {
    return addonPath;
};

export function getAddonConfig(propetyPath = "") {
    const config = fs.readJSONSync(path.resolve(addonPath, "package.json"));
    return propetyPath.split(".").reduce((cfg, item) => {
        if (isNil(item) || isNil(cfg)) return cfg;
        return item ? cfg[item] : cfg;
    }, config);
};

export function shouldWatch() {
    const watch = getAddonConfig("build.watch");

    return nullish(nullish(argv.watch, watch), false);
};

export function readBuildConfig() {
    const configPath = path.resolve(process.cwd(), argv.config ?? "bdbuilder.config.json");
    try {
        return fs.readJSONSync(configPath);
    } catch (error) {
        console.error(error);
        throw new Error("Could not resolve build config at " + configPath);
    }
};

export function getBuilderConfig() {
    let config = readBuildConfig();
    if (hasProp.call(config, "extends")) {
        if (Array.isArray(config.extends)) {
            for (const cfg of config.extends) {
                config = _.merge(fs.readJSONSync(path.resolve(process.cwd(), cfg)), config);
            }
        } else {
            throw new Error("config.extends must be an array. Received " + typeof config.extends);
        }
    }

    return _.merge(defaultConfig, config);
};

const Utils = {
    resolveType,
    upperFirst,
    nullish,
    formatString,
    format: formatString,
    resolveModule,
    nanoseconds,
    getAddonConfig,
    init,
    getPath,
    setBuiltConfig,
    getBuildConfig,
    getBuilderConfig: getBuilderConfig,
    resolveRawGithub,
    startTime: nanoseconds(),
    get argv() {return argv;},
    get isRelease() {
        return nullish(argv.release, getBuilderConfig().build.release);
    },
    get shouldWatch() {
        return nullish(argv.watch, getBuilderConfig().build.watch);
    },
    get isProduction() {
        return !this.isDevelopment;
    },
    get isDevelopment() {
        const config = getBuilderConfig();
        if (!config?.build) {
            console.warn("WARN: config.build wasn't found, assuming we are in dev env.");
            return true; // Automatically assume we are in dev env.
        }
        if (argv.dev || argv.development) return true;
        if (argv.prod || argv.production) return false;

        return config.build.production === false;
    }
};

export default Utils;
