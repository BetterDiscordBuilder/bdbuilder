const DiscordImports = require("../data/discord.json");

module.exports = `
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
        modules.push(`\tget "${module}"() {return ___createMemoize___(this, "${module}", ${isModule ? `() => {\n${DiscordImports[module].slice("module".length + 1)}\n\t}` : `() => ${DiscordImports[module]}`})}`);
    } else {
        modules.push(`\t"${module}": {\n${Object.keys(DiscordImports[module]).map(e => {
            e = e.trim();
            const isModule = DiscordImports[module][e].startsWith("module");
            return `\t\tget "${e}"() {return ___createMemoize___(this, "${e}", ${isModule ? `() => {${DiscordImports[module][e].slice("module".length + 1)}}` : `() => ${DiscordImports[module][e]}`})}`;
        }).join(",\n")}\n\t}`);
    }
    return modules;
}, []).join(",\n")}
};\n`;