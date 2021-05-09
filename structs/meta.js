module.exports = class PluginMeta {
    constructor(config) {
        if (!config || !config.hasOwnProperty("info")) throw new SyntaxError("In invalid config object was provided.");

        this.config = new Map();
        this.rawConfig = config;

        for (const entry in config.info) {
            this.config.set(entry, config.info[entry]);
        }
    }

    toString() {
        let meta = "/**";
        for (const [entry, value] of this.config) {
            switch(entry) {
                case "name":
                    meta += `\n * @name ${value.replace(/ /g, "")}`;
                    break;
                case "authors":
                    meta += `\n * @author ${value.map(author => author.name).join(", ")}`;
                    break;
                case "github_raw":
                    meta += `\n * @updateUrl ${value}`;
                    break;
                case "github":
                    meta += `\n * @source ${value}`;
                    break;
                default:
                    meta += `\n * @${entry} ${value}`;
            }
        }

        return meta + "\n */";
    }

    [Symbol.iterator]() {
        let depth = -1;
        const raw = Array.from(this.config);
        return {
            next: () => {
                depth++;
                return {
                    value: raw[depth],
                    done: depth >= raw.length
                };
            },
            [Symbol.toStringTag]: "Meta Iterator"
        }
    }
}