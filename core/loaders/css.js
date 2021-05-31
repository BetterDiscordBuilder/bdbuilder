import {getConfig, nullish} from "../utils";

export default function css() {
    return {
        loader: "css-loader",
        options: {
            importLoaders: true,
            modules: {
                localIdentName: nullish(getConfig("info.name"), "").replace(/ /g, "") + "-[name]-[local]"
            }
        }
    };
};