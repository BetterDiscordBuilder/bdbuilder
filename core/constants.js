import path from "path";

export const ROOT_DIR = path.resolve(__dirname, "..", "..");
export const TEMPLATES_DIR = path.resolve(__dirname, "templates");
export const BUILDS_PATH = path.resolve(__dirname, "..", "builds");
export const TEMP_PATH = path.resolve(__dirname, "..", "temp");
export const RELEASE_DIR = path.resolve(__dirname, "..", "releases");

const CONSTANTS = {TEMPLATES_DIR, BUILDS_PATH, TEMP_PATH, ROOT_DIR, RELEASE_DIR};

export default CONSTANTS;