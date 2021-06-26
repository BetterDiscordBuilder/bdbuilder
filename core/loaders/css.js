import {getAddonConfig, nullish, resolveModule} from "../utils";

export default function css() {
    return {
        loader: resolveModule("css-loader"),
        options: {
            importLoaders: true,
            modules: {
                localIdentName: nullish(getAddonConfig("info.name"), "").replace(/ /g, "") + "-[name]-[local]"
            }
        }
    };
};