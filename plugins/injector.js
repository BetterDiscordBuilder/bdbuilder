const {ConcatSource} = require("webpack-sources");

const PROCESS_ASSETS_STAGE_ADDITIONS = -200;

module.exports = class InjectorPlugin {
    constructor(options) {
        this.code = options;
    }

    apply(compiler) {
        compiler.hooks.compilation.tap("InjectorPlugin", compilation => {
            compilation.hooks.processAssets.tap({
                name: "InjectorPlugin",
                stage: PROCESS_ASSETS_STAGE_ADDITIONS
            }, () => {
                $chunks: for (const chunk of compilation.chunks) {
                    if (!chunk.canBeInitial()) continue;

                    for (const file of chunk.files) {
                        const [part1, part2] = this.code.split("{{bundled}}");

                        compilation.updateAsset(file, old => new ConcatSource(part1, old, part2));
                        break $chunks;
                    }
                }
            });
        });
    }
}