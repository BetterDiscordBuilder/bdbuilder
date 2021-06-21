import DiscordImports from "../data/imports.json";

export default function createDiscordModules() {
    return `
        function ___createMemoize___(instance, name, value) {
            value = value();
            Object.defineProperty(instance, name, {
                value,
                configurable: true
            });

            return value;
        };
        const Modules = {
        ${Object.keys(DiscordImports).reduce((modules, module) => {
        if (typeof DiscordImports[module] === "string") {
            const isModule = DiscordImports[module].startsWith("module");
            modules.push(`get '${module}'() {return ___createMemoize___(this, '${module}', ${isModule ? `() => {${DiscordImports[module].slice("module".length + 1)}}` : `() => ${DiscordImports[module]}`})}`);
        } else {
            modules.push(`'${module}': {${Object.keys(DiscordImports[module]).map(e => {
                e = e.trim();
                const isModule = DiscordImports[module][e].startsWith("module");
                return `get '${e}'() {return ___createMemoize___(this, '${e}', ${isModule ? `() => {${DiscordImports[module][e].slice("module".length + 1)}}` : `() => ${DiscordImports[module][e]}`})}`;
            }).join(",\n")}}`);
        }

        return modules;
    }, []).join(",\n")}
    };\n`;
}