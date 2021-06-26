import {ProvidePlugin, ProgressPlugin, SourceMapDevToolPlugin} from "webpack";
import Utils from "./utils";

const Plugins = [
    new ProvidePlugin({
        React: ["react"],
        ReactDOM: ["react-dom"]
    }),
    Utils.isDevelopment && new ProgressPlugin({
        activeModules: false,
        entries: true,
        modules: true,
        modulesCount: 5000,
        profile: false,
        dependencies: true,
        dependenciesCount: 10000,
        percentBy: null
    })
].filter(Boolean);

export default Plugins;