import Utils, {getConfig, nullish, resolveModule} from "../utils.js";

export default function js() {
    return Utils.argv.release || nullish(getConfig("build.production"), Utils.argv.production)
        ? {
            loader: resolveModule("babel-loader"),
            options: {
                presets: [
                    [
                        "@babel/env",
                        {
                            targets: {electron: "9"}
                        }
                    ],
                    "@babel/react",
                    ["@babel/typescript", {esModuleInterop: true}]
                ],
                plugins: [
                    "@babel/plugin-proposal-class-properties",
                    ["minify-dead-code-elimination"]
                ]
            }
        }
        : {
            loader: resolveModule("@sucrase/webpack-loader"),
            options: {
                production: false,
                transforms: ["jsx", "typescript"]
            }
        };
}