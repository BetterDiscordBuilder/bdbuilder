// import path from 'path';
import sveltePreprocess from 'svelte-preprocess';
import autoprefixer from 'autoprefixer';
import {mdsvex} from "mdsvex";
import remark from "remark-gfm";

// const __dirname = path.resolve();

/** @type {import('@sveltejs/kit').Config} */
const config = {
    extensions: [
        '.svelte',
        '.svx'
    ],
    kit: {
		// hydrate the <div id="svelte"> element in src/app.html
		target: 'body'
	},
    preprocess: [
        mdsvex({
            remarkPlugins: [remark]
        }),
        sveltePreprocess({
            defaults: {
                style: 'scss'
            },
            postcss: {
                plugins: [
                    autoprefixer()
                ]
            }
        })
    ]
};

export default config;