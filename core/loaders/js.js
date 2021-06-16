import Utils, {getConfig, nullish, resolveModule} from "../utils.js";

export default function js() {
    return Utils.argv.release || nullish(Utils.argv.production, getConfig("build.production"))
        ? {
            loader: resolveModule("babel-loader"),
            options: {
                presets: [
                    ["@babel/typescript", {esModuleInterop: true}]
                ],
                plugins: [
                    "@babel/plugin-transform-react-jsx",
                    "@babel/plugin-proposal-class-properties",
                    ["minify-dead-code-elimination"]
                ]
            }
        }
        : {
            loader: resolveModule("@sucrase/webpack-loader"),
            options: {
                production: true,
                transforms: ["jsx", "typescript"]
            }
        };
}