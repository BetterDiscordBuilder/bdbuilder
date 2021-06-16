import createDiscordModules from "./discord";
import createStyleSheet from "./stylesheet";

export default [
    createStyleSheet(),
    createDiscordModules()
];