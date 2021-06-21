import {ProvidePlugin, ProgressPlugin, SourceMapDevToolPlugin} from "webpack";


const Plugins = [
    new ProvidePlugin({
        React: ["react"],
        ReactDOM: ["react-dom"]
    }),
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

export default Plugins;