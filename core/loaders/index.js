import path from "path";

export const stylesheet = path.resolve(__dirname, __filename.endsWith(".min.js") ? "stylesheet.min" : "stylesheet");
export const kss = path.resolve(__dirname, __filename.endsWith(".min.js") ? "kss.min" : "kss");
export {default as css} from "./css";
export {default as js} from "./js";