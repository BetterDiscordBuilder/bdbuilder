import {getAddonConfig, nullish} from "../utils";

export default function css() {
    return {
        loader: "css-loader",
        options: {
            importLoaders: true,
            modules: {
                localIdentName: nullish(getAddonConfig("info.name"), "").replace(/ /g, "") + "-[name]-[local]"
            }
        }
    };
};