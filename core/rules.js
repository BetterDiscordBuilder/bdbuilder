import {stylesheet, css, js, json, kss} from "./loaders";

export default function rules() {
    const cssLoader = css();

    return [
        {
            test: /\.css$/i,
            use: [stylesheet, cssLoader, kss]
        },
        {
            test: /\.s[ac]ss$/i,
            use: [stylesheet, cssLoader, kss, "sass-loader"]
        },
        {
            test: /\.styl$/i,
            use: [stylesheet, cssLoader, kss, "stylus-loader",]
        },
        {
            test: /\.less$/i,
            use: [stylesheet, cssLoader, kss, "less-loader"]
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
            use: [
                js(),
                "coffee-loader"
            ]// cool not gonna test it have fun square
        },
        // {
        //     test: /\.json$/i,
        //     exclude: /node_modules/,
        //     type: "javascript/auto",
        //     use: json
        // } // Thanks square for your help!
    ];
};