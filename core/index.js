import {config} from "dotenv";
import sass from "sass";
import fs from "fs-extra";
import path from "path";
import webpack from "webpack";
import {js as beautify} from "js-beautify";
import optimization from "./optimization.js";
import Utils, {getConfig, nullish} from "./utils.js";
import externals from "./externals.js";
import {hideBin} from "yargs/helpers";
import yargs from "yargs/yargs";
import CONSTANTS from "./constants.js";
import plugins from "./plugins.js";
import rules from "./rules.js";
import resolve from "./resolve.js";
import {Meta, Readme} from "./classes";

console.log("Starting Compilation.");

const {argv} = yargs(hideBin(process.argv));
Utils.init(argv.plugin || argv.theme, argv);
config();

/* Ensure Directories */
fs.ensureDirSync(path.join(__dirname, "..", "releases"));
fs.ensureDirSync(path.join(__dirname, "..", "plugins"));
fs.ensureDirSync(path.join(__dirname, "..", "builds"));
fs.ensureDirSync(path.join(__dirname, "..", "temp"));


const pluginConfig = Utils.getConfig();

if (~Object.keys(argv).indexOf("plugin")) {
    const buildConfig = {
        mode: argv.release || nullish(Utils.getConfig("build.production"), false) 
            ? "production" 
            : "development",
        target: "node",
        entry: Utils.getPath(),
        output: {
            library: "LibraryPluginHack",
            libraryTarget: "commonjs2",
            filename: Utils.getConfig("main") || "index.js",
            path: CONSTANTS.TEMP_PATH,
        },
        watch: Utils.shouldWatch(),
        watchOptions: {
            followSymlinks: true,
        },
        plugins: plugins,
        externals: externals(),
        module: {
            rules: rules(),
        },
        resolve: resolve(),
        optimization: optimization
    };
    
    webpack(buildConfig, (err, stats) => {
        // console.clear();
        const {build, ...config} = Utils.getConfig();

        if (err) {
            console.error((err.stack || err) + "\n");
            if (err.details) console.error(err.details + "\n");
            return;
        }
        if (stats.hasErrors()) {
            const info = stats.toJson();
            for (const error of info.errors) console.log(error.message + "\n");
        }
        if (stats.hasWarnings()) {
            const info = stats.toJson();
            for (const warning of info.warnings) console.log(warning.message + "\n");
        }
    
        if (err || stats.hasErrors()) return console.log(`Failed to build after ${Math.round((Utils.nanoseconds() - Utils.startTime) / 1000).toLocaleString()}ms.`);
    
        fs.ensureDirSync(CONSTANTS.TEMP_PATH);
        const meta = new Meta(config);
        const templatePlugin = fs.readFileSync(path.join(CONSTANTS.TEMPLATES_DIR, "plugin.template.js"), "utf8");
        const bdFilename = `${config.info.name.replace(/ /g, "")}.plugin.js`;
        const tempFile = path.join(CONSTANTS.TEMP_PATH, config.main || "index.js");
    
        const outputPath = path.join(CONSTANTS.BUILDS_PATH, bdFilename);
    
        try {
            fs.unlinkSync(outputPath);
        } catch (error) {
            console.log("Failed to remove old file:\n", error);
        }
        fs.ensureFileSync(tempFile);
        let builtCode = fs.readFileSync(tempFile, "utf-8").replace(
            '"use strict";',
            `"use strict";
            let __plugin_styles__ = "";
            let __style_element__ = null;\n`
        );
    
        if (pluginConfig.build.zlibrary) {
            builtCode = `${meta}\n${Utils.format(templatePlugin, {pluginConfig: JSON.stringify(pluginConfig, null, "\t"), builtCode})}`;
        } else {
            builtCode = builtCode.replace(
                "module.exports.LibraryPluginHack = __webpack_exports__",
                "module.exports = __webpack_exports__.default ?? __webpack_exports__"
            );
    
            builtCode = `${meta}\n${builtCode}`;
        }
    
        builtCode = beautify(builtCode, {indent_with_tabs: true}).replace(/\n{2,}/g, "\n");
    
        fs.writeFileSync(outputPath, builtCode);
    
        console.log(`Built in ${Math.round((Utils.nanoseconds() - Utils.startTime) / 1000).toLocaleString()}ms.`);
        if (argv.release) {
            try {
                const config = getConfig("build.release");
                const info = getConfig("info");
                if (typeof config !== "object") throw new Error("Invalid release configuration");
    
                const releaseDir = nullish(config.public ? path.join(process.env.RELEASE_FOLDER, info.name) : void 0, path.join(CONSTANTS.RELEASE_DIR, info.name));
                if (fs.existsSync(releaseDir)) fs.emptyDirSync(releaseDir);
                else fs.mkdirSync(releaseDir);
    
                if (nullish(config.readme, true)) {
                    fs.writeFileSync(path.join(releaseDir, "README.md"), new Readme(pluginConfig).toString(), "utf8");
                }
    
                if (nullish(config.source, true)) {
                    fs.copy(Utils.getPath(), path.join(releaseDir, "src"), {recursive: true, filter: src => src.indexOf("node_modules") < 0});
                }
                
                fs.writeFileSync(path.join(releaseDir, bdFilename), builtCode);
            } catch(error) {
                console.error(`Release build failed!\n`, error);
            }
        } else if (pluginConfig.build.copy) {
            fs.ensureDirSync(process.env.BDFOLDER);
            fs.writeFileSync(
                path.resolve(path.join(process.env.BDFOLDER, bdFilename)),
                builtCode
            );
        }
        if (!pluginConfig.build.production) return;
        try {
            fs.emptyDirSync(CONSTANTS.TEMP_PATH);
            fs.rmdirSync(CONSTANTS.TEMP_PATH, {recursive: true});
        } catch (error) {
            console.error("Failed to remove tmp path:", error);
        }
    });
} else {
    throw new Error("Themes loader is not implemented yet.");
    // try {
    //     sass.render({
    //         data
    //     })
    // } catch (error) {

    // }
}