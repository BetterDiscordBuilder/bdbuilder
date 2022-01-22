#!/usr/bin/env node

const webpack = require("webpack");
const Config = require("./modules/config");
const Args = require("./modules/args");
const path = require("path");
const format = require("./modules/format");
const DiscordImports = require("./data/discord.json");
const InjectorPlugin = require("./plugins/injector");
const Templates = require("./templates");
const omit = require("./modules/omit");
const BDMeta = require("./modules/bdmeta");
const TerserPlugin = require("terser-webpack-plugin");
const StyleLoader = require("./loaders/styleloader");
const DiscordLoader = require("./loaders/discord");

const LOCAL_IDENT_NAME = Config.getManifest("name", "UnknownPlugin").replaceAll(" ", "") + "-[name]-[local]";

const config = {
    target: "node",
    entry: path.resolve(process.cwd(), Args.get("plugin"), "index"),
    output: {
        filename: format(Config.get("filename", "[name].plugin.js"), Config._manifest),
        path: path.resolve(process.cwd(), Config.get("output", "dist")),
        libraryTarget: "umd"
    },
    resolve: {
        extensions: [".d.ts", ".ts", ".tsx", ".js", ".cjs", ".mjs", ".jsx", ".scss", ".sass", ".css"]
    },
    module: {
        rules: [
            // CSS
            {
                test: /\.css$/,
                use: [
                    require.resolve("./loaders/stylesheet.js"),
                    {
                        loader: require.resolve("css-loader"),
                        options: {importLoaders: true, modules: {localIdentName: LOCAL_IDENT_NAME}}
                    }
                ]
            },
            {
                test: /\.s[ac]ss$/i,
                use: [
                    require.resolve("./loaders/stylesheet.js"),
                    {
                        loader: require.resolve("css-loader"),
                        options: {importLoaders: true, modules: {localIdentName: LOCAL_IDENT_NAME}}
                    },
                    require.resolve("sass-loader")
                ]
            },
            // JS, CommonJS, ModuleJS, JSX.
            {
                test: /\.(m|c)?js(x)?$/i,
                use: [
                    {
                        loader: require.resolve("swc-loader"),
                        options: {
                            jsc: {
                                parser: {
                                    syntax: "ecmascript",
                                    jsx: true,
                                    dynamicImport: false,
                                    privateMethod: false,
                                    functionBind: false,
                                    exportDefaultFrom: false,
                                    exportNamespaceFrom: false,
                                    decorators: false,
                                    decoratorsBeforeExport: false,
                                    topLevelAwait: false,
                                    importMeta: false
                                },
                                transform: null,
                                target: "es2021",
                                loose: false,
                                externalHelpers: false,
                                keepClassNames: false
                            }
                        }
                    }
                ]
            },
            // TS, TSX, DTS.
            {
                test: /\.(d\.)?ts(x)?$/i,
                use: [
                    {
                        loader: require.resolve("swc-loader"),
                        options: {
                            jsc: {
                                parser: {
                                    syntax: "typescript",
                                    tsx: true,
                                    dynamicImport: false,
                                    privateMethod: false,
                                    functionBind: false,
                                    exportDefaultFrom: false,
                                    exportNamespaceFrom: false,
                                    decorators: false,
                                    decoratorsBeforeExport: false,
                                    topLevelAwait: false,
                                    importMeta: false
                                },
                                transform: null,
                                target: "es2021",
                                loose: false,
                                externalHelpers: false,
                                keepClassNames: false
                            }
                        }
                    }
                ]
            },
            {
                test: /\.htm(l)?$/i,
                exclude: /node_modules/i,
                use: require.resolve("raw-loader")
            },
            // {
            //     test: /\.coffee?$/i,
            //     use: []
            // }
        ]
    },
    plugins: [
        new InjectorPlugin(format(Config.getManifest("library", false)
            ? Templates.ZeresPluginLibrary
            : Templates.Vanilla, {
            meta: new BDMeta().toString(),
            manifest: JSON.stringify(Config.getManifest("."), null, "\t"),
            pluginConfig: JSON.stringify(Object.fromEntries([
                ["info", {
                    ...omit(Config.getManifest("."), ["changelog", "author"]),
                    authors: [
                        Object.fromEntries([
                            Config.get("author.discord_id") && ["discord_id", Config.get("author.discordId")],
                            ["name", Config.getManifest("author")],
                            Config.get("author.github_name") && ["github_name", Config.get("author.github_name")]
                        ].filter(Boolean))
                    ]
                }],
                Config.getManifest("changelog") && ["changelog", Config.getManifest("changelog")]
            ].filter(Boolean)), null, "\t"),
            loaders: [DiscordLoader, StyleLoader].join("\n\n"),
        }, "{{", "}}")),
        new webpack.ProvidePlugin({
            React: ["react"],
            ReactDOM: ["react-dom"]
        })
    ],
    optimization: {
        minimize: false,
        minimizer: [
            new TerserPlugin({
                terserOptions: {
                    module: true,
                    compress: {
                        defaults: false,
                    },
                    mangle: false,
                    parse: {},
                    rename: {},
                    format: {
                        comments: false,
                        max_line_len: false,
                        semicolons: true,
                        beautify: true
                    }
                }
            })
        ]
    },
    externals: [
        Object.fromEntries([
            ["react", "var BdApi.React"],
            ["react-dom", "var BdApi.ReactDOM"],
            ...(() => {
                return Config.getManifest("library", false)
                ? [
                    ["@zlibrary", "var PluginApi"],
                    ["@zlibrary/plugin", "var BasePlugin"],
                    ["@zlibrary/modules", ["var PluginApi", "DiscordModules"]]
                ]
                : null
            })(),
            ["https", `var require("https")`],
            ["lodash", ["var window", "_"]],
            ["betterdiscord/api", `var require("betterdiscord/bdapi")`],
            ["styles", "var StyleLoader"],
            ...Reflect.ownKeys(DiscordImports).map(module => ["var Modules", module])
        ].filter(Boolean))
    ]
};

webpack(config, (err, stats) => {
    if (err) throw err;
    if (stats.hasErrors()) return console.error(...stats.toJson().errors.map(e => e.message));

    console.log("Compilation done.");
});