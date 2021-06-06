import {matchAll} from "../../common/util/regex";
import DiscordClasses from "../data/DiscordClasses.json";

export const REGEX = /\:kss\((.+?)\)/g;
export const SPACE_REGEX = / /g;

export default function kss(code) {
    const callback = this.async();

    for (const match of matchAll(REGEX, code, true)) {
        const [parent, props] = match;
        const keys = props.split(" ");
        const module = DiscordClasses.find(e => keys.every(s => e[s]));

        if (!module) {
            return console.warn(`Module with props [${keys.join(", ")}] was not found!`);
        }
        code = code.replace(parent, `:global(.${module[keys[0]].replace(SPACE_REGEX, ".")})`);
    }
    
    callback(null, code);
}