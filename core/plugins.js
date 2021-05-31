import {ProvidePlugin, ProgressPlugin} from "webpack";
import BitBarWebpackProgressPlugin from "bitbar-webpack-progress-plugin";

export default [
    new ProvidePlugin({
        React: ["react"],
        ReactDOM: ["react-dom"]
    }),
    // new BitBarWebpackProgressPlugin(), // Removed due to deprecation warning
    new ProgressPlugin({
        activeModules: false,
        entries: true,
        modules: true,
        modulesCount: 5000,
        profile: false,
        dependencies: true,
        dependenciesCount: 10000,
        percentBy: null
    })
];