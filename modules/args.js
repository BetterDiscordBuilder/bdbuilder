const entries = [
    {key: "watch",  optional: true,  default: false},
    {key: "plugin", optional: false, default: null},
    {key: "dev",    optional: true,  default: false},
    {key: "prod",   optional: true,  default: true}
];

class Args {
    static _args = {};

    static initialize() {
        for (const arg of process.argv) {
            if (!arg.trim().startsWith("--")) continue;

            const [key, value] = arg.slice(2).split("=");
            this._args[key] = value;
        }

        for (const entry of entries) {
            if (!this.get(entry.key) && !entry.optional) throw new Error(`Missing parameter: ${entry.key}`);

            this._args[entry.key] = this.get(entry.key, entry.default);
        }
    }

    static get(key, def) {
        return this._args[key] ?? def;
    }
};

// Immediately initialize the args module
Args.initialize();

module.exports = Args;