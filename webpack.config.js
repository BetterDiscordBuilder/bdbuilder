const path = require("path");
const pkg = require("./package.json");
const {BannerPlugin} = require("webpack");

module.exports = env => ({
    mode: env.release ? "production" : "development",
    target: "node",
    entry: {
        "bdbuilder": "./core/index.js",
        "stylesheet": "./core/loaders/stylesheet.js",
        "kss": "./core/loaders/kss.js"
    },
    output: {
        filename: "[name].min.js",
        path: path.resolve(__dirname, "dist"),
        libraryTarget: "commonjs2"
    },
    resolve: {
        extensions: [
            ".js",
            ".json"
        ]
    },
    plugins: [
        new BannerPlugin({banner: "#!/usr/bin/env node", raw: true})
    ],
    externals: [
        Object.keys(pkg.dependencies).reduce((items, item) => (items[item] = "commonjs " + item, items), {}),
        {
            "yargs/yargs": "commonjs yargs/yargs",
            "yargs/helpers": "commonjs yargs/helpers",
            "terser-webpack-plugin": "commonjs terser-webpack-plugin"
        }
    ],
    optimization: {
        minimize: true
    }
});