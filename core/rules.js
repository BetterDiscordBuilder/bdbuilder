import {stylesheet, css, js, json, kss} from "./loaders";
import {resolveModule} from "./utils";

const exclude = /node_modules\/(?!(?:[^\/]+?\/)?bdbuilder\/common)/;

export default function rules() {
    const cssLoader = css;

    return [
        {
            test: /\.css$/i,
            use: [stylesheet, cssLoader, kss]
        },
        {
            test: /\.s[ac]ss$/i,
            use: [stylesheet, cssLoader, kss, resolveModule("sass-loader")]
        },
        {
            test: /\.styl$/i,
            use: [stylesheet, cssLoader, kss, resolveModule("stylus-loader")]
        },
        {
            test: /\.less$/i,
            use: [stylesheet, cssLoader, kss, resolveModule("less-loader")]
        },
        {
            test: /\.m?(j|t)sx?$/i,
            exclude,
            use: js(),
        },
        {
            test: /\.html$/i,
            exclude,
            use: [resolveModule("raw-loader")]
        },
        {
            test: /\.coffee?$/i,
            exclude,
            use: [
                js(),
                resolveModule("coffee-loader")
            ]// cool not gonna test it have fun square
        },
        // {
        //     test: /\.json$/i,
        //     exclude,
        //     type: "javascript/auto",
        //     use: json
        // } // Thanks square for your help!
    ];
};
