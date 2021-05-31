import {stylesheet, css, js} from "./loaders";

export default function rules() {
    const cssLoader = css();

    return [
        {
            test: /\.css$/i,
            use: [stylesheet, cssLoader]
        },
        {
            test: /\.s[ac]ss$/i,
            use: [stylesheet, cssLoader, "sass-loader"]
        },
        {
            test: /\.styl$/i,
            use: [stylesheet, cssLoader, "stylus-loader",]
        },
        {
            test: /\.less$/i,
            use: [stylesheet, cssLoader, "less-loader"]
        },
        {
            test: /\.m?(j|t)sx?$/i,
            exclude: /node_modules/,
            use: js(),
        },
        {
            test: /\.html$/i,
            exclude: /node_modules/,
            use: ["raw-loader"]
        },
        {
            test: /\.coffee?$/i,
            exclude: /node_modules/,
            use: {
                loader: "coffee-loader",
            } // cool not gonna test it have fun square
        }
    ];
};