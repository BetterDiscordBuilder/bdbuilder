import path from "path";
import {getBuilderConfig} from "./utils";

export const ROOT_DIR = path.resolve(__dirname, getBuilderConfig().basePath);
export const TEMPLATES_DIR = path.resolve(__dirname, "templates");
export const BUILDS_PATH = path.resolve(__dirname, "..", "builds");
export const TEMP_PATH = path.resolve(__dirname, "..", "temp");
export const RELEASE_DIR = path.resolve(__dirname, "..", "releases");
export const DEBUG_LOGS = path.resolve(__dirname, "..", "logs");

const CONSTANTS = {TEMPLATES_DIR, BUILDS_PATH, TEMP_PATH, ROOT_DIR, RELEASE_DIR, DEBUG_LOGS};

export default CONSTANTS;