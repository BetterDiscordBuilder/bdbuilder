const fs = require("fs");
const path = require("path");
const Args = require("./args");

class Config {
    static _path = path.resolve(process.cwd(), Args.get("config", "bdbuilder.json"));
    static _manifestPath = path.resolve(process.cwd(), Args.get("plugin"), "manifest.json");
    static _config = {};
    static _manifest = {};

    static initialize() {
        if (!fs.existsSync(this._path) || !fs.statSync(this._path).isFile()) throw new Error(`Config was not found at ${this._path}. Please make sure to setup a config before trying to build your plugin.`);
        if (!fs.existsSync(this._manifestPath) || !fs.statSync(this._manifestPath).isFile()) throw new Error(`Manifest file was not found at ${this._manifestPath}. Make sure to create one.`);

        this._config = JSON.parse(fs.readFileSync(this._path).toString());
        this._manifest = JSON.parse(fs.readFileSync(this._manifestPath).toString());
    }

    static get(key, def) {
        return this.getProps(this._config, key) ?? def;
    }

    static getManifest(key, def) {
        return this.getProps(this._manifest, key) ?? def;
    }

    static getProps(object, key) {
        if (key === ".") return object;
        return key.split(".").reduce((current, key) => current != null ? current[key] : null, object);
    }
}

// Immediately initialize the config
Config.initialize();

module.exports = Config;