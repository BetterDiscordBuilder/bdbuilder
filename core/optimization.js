import TerserPlugin from "terser-webpack-plugin";

export default {
    minimize: true,
    minimizer: [
        new TerserPlugin({
            terserOptions: {
                module: true,
                compress: {
                    defaults: false,
                },
                mangle: false,
                parse: {},
                rename: {},
                format: {
                    comments: false,
                    max_line_len: false,
                    semicolons: true,
                    beautify: true
                }
            }
        })
    ]
};