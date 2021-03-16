#!/usr/bin/env node

const yargs = require("yargs/yargs");
const { hideBin } = require("yargs/helpers");
const argv = yargs(hideBin(process.argv)).argv;

const fs = require("fs-extra");
const path = require("path");
const webpack = require("webpack");
const TerserPlugin = require("terser-webpack-plugin");
const beautify = require("js-beautify").js;

function getModule(mod) {
	return path.resolve(path.join(__dirname, "node_modules", mod));
}
function nanoseconds() {
	const hrTime = process.hrtime();
	return hrTime[0] * 1000000000 + hrTime[1];
}

const stylesheetLoader = path.resolve(
	path.join(__dirname, "stylesheetLoader.js")
);

const jsBuilder = argv.production
	? {
			loader: getModule("babel-loader"),
			options: {
				presets: [
					[
						"@babel/env",
						{
							targets: {
								electron: "9",
							},
						},
					],
					"@babel/react",
					["@babel/typescript", { esModuleInterop: true }],
				],
				plugins: [
					"@babel/plugin-proposal-class-properties",
					"minify-dead-code-elimination",
				],
			},
	  }
	: {
			loader: getModule("@sucrase/webpack-loader"),
			options: {
				production: true,
				transforms: ["jsx", "typescript", "imports"],
			},
	  };

const pluginPath = path.resolve(argv.plugin);
const tempPath = path.resolve(path.join(".", "temp"));
const builtPath = path.resolve(path.join(".", "builds"));
fs.ensureDirSync(tempPath);
fs.ensureDirSync(builtPath);

let startTime = nanoseconds();

fs.ensureFileSync(path.join(tempPath, "index.js"));
fs.ensureFileSync(path.join(tempPath, "manifest.json"));

webpack(
	{
		mode: "production",
		target: "node",
		entry: pluginPath,
		output: {
			library: "LibraryPluginHack",
			libraryTarget: "commonjs2",
			filename: "index.js",
			path: tempPath,
		},
		watch: argv.watch ?? false,
		watchOptions: {
			followSymlinks: true,
		},
		plugins: [
			// new webpack.ProgressPlugin((percentage, message, ...args) => {
			// 	if (percentage === 0) {
			// 		startTime = nanoseconds();
			// 		error = null;
			// 	}
			// 	// console.clear();
			// 	console.log(
			// 		`${Math.round(percentage * 100)}%${message ? ` - ${message}` : ""}`
			// 	);
			// 	if (percentage === 1) {
			// 		// console.clear();
			// 		// fs.rmdir(tempPath, { recursive: true });
			// 		if (error) {
			// 			errored = true;
			// 			if (error.err) {
			// 				console.error((error.err.stack || error.err) + "\n");
			// 				if (err.details) {
			// 					console.error(error.err.details + "\n");
			// 				}
			// 				return;
			// 			}
			// 			const info = error.stats.toJson();
			// 			if (error.stats.hasErrors()) {
			// 				for (const error of info.errors)
			// 					console.error(error.message + "\n");
			// 			}
			// 			if (error.stats.hasWarnings()) {
			// 				for (const warning of info.warnings)
			// 					console.error(warning.message + "\n");
			// 			}
			// 			console.log(
			// 				`Failed to build after ${Math.round(
			// 					(nanoseconds() - startTime) / 1000
			// 				).toLocaleString()}ms.`
			// 			);
			// 			return;
			// 		}
			// 		console.log(
			// 			`Built in ${Math.round(
			// 				(nanoseconds() - startTime) / 1000
			// 			).toLocaleString()}ms.`
			// 		);
			// 		if (!argv.watch) {
			// 			process.exit();
			// 		}
			// 	}
			// }),
		],
		externals: [
			function ({ context, request }, callback) {
				if (context === __dirname) {
					startTime = nanoseconds();
					return callback();
				}
				const fullPath = path.join(context, request);
				try {
					if (fs.lstatSync(fullPath).isDirectory()) {
						// It's a folder. Check for index.SOMETHING.
						const files = fs.readdirSync(fullPath);
						if (files.some((file) => file.startsWith("index."))) {
							// Continue without externalizing the import
							return callback();
						}
					}
				} catch {}
				try {
					// Test if the file exists, ignore extension.
					const files = fs.readdirSync(path.join(fullPath, ".."));
					if (
						files.some((file) =>
							file.startsWith(path.basename(fullPath))
						)
					) {
						// Continue without externalizing the import
						return callback();
					}
				} catch {}

				// Externalize to a commonjs module using the request path
				callback(null, "commonjs2 " + request);
			},
		],
		resolve: {
			extensions: [
				".js",
				".jsx",
				".ts",
				".tsx",
				".coffee",
				".css",
				".scss",
				".sass",
				".less",
				".styl",
			],
		},
		optimization: {
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
							beautify: true,
						},
					},
				}),
			],
		},
		module: {
			rules: [
				{
					test: /\.css$/i,
					use: [stylesheetLoader, "css-loader"],
				},
				{
					test: /\.s[ac]ss$/i,
					use: [
						stylesheetLoader,
						{
							loader: "css-loader",
							options: {
								modules: true,
							},
						},
						"sass-loader",
					],
				},
				{
					test: /\.styl$/i,
					use: [
						stylesheetLoader,
						{
							loader: "css-loader",
							options: {
								modules: true,
							},
						},
						"stylus-loader",
					],
				},
				{
					test: /\.less$/i,
					use: [
						stylesheetLoader,
						{
							loader: "css-loader",
							options: {
								modules: true,
							},
						},
						"less-loader",
					],
				},
				{
					test: /\.m?(j|t)sx?$/i,
					exclude: /node_modules/,
					use: jsBuilder,
				},
				{
					test: /\.coffee?$/i,
					exclude: /node_modules/,
					use: {
						loader: "coffee-loader",
					}, // cool not gonna test it have fun square
				},
			],
		},
	},
	(err, stats) => {
		console.clear();
		if (err) {
			console.error((err.stack || err) + "\n");
			if (details) {
				console.error(err.details + "\n");
			}
			return;
		}
		if (stats.hasErrors()) {
			const info = stats.toJson();
			for (const error of info.errors)
				console.error(error.message + "\n");
		}
		if (stats.hasWarnings()) {
			const info = stats.toJson();
			for (const warning of info.warnings)
				console.error(warning.message + "\n");
		}

		if (err || stats.hasErrors())
			return console.log(
				`Failed to build after ${Math.round(
					(nanoseconds() - startTime) / 1000
				).toLocaleString()}ms.`
			);

		fs.ensureDirSync(tempPath);

		const bdFileName = `${fs
			.readJSONSync(path.join(argv.plugin, "manifest.json"))
			.name.replace(/ /g, "")}.plugin.js`;

		const outputPath = path.resolve(path.join(builtPath, bdFileName));
		try {
			fs.unlinkSync(outputPath);
		} catch {}

		let builtCode = fs.readFileSync(
			path.join(tempPath, "index.js"),
			"utf-8"
		);

		builtCode = builtCode.replace(
			"module.exports.LibraryPluginHack = __webpack_exports__",
			"module.exports = __webpack_exports__.default ?? __webpack_exports__"
		);

		builtCode = `${generateMeta()}\n${builtCode}`;

		builtCode = beautify(builtCode, {
			indent_with_tabs: true,
		});

		// Get rid of ugly blank lines.
		builtCode = builtCode.replace(/\n{2,}/g, "\n");

		fs.writeFileSync(outputPath, builtCode);

		console.log(
			`Built in ${Math.round(
				(nanoseconds() - startTime) / 1000
			).toLocaleString()}ms.`
		);

		if (argv.copy) {
			fs.copySync(
				outputPath,
				path.resolve(path.join(argv.copy, bdFileName))
			);
		}

		fs.rmdirSync(tempPath, { recursive: true });
	}
);

function generateMeta() {
	const manifest = fs.readJSONSync(path.join(pluginPath, "manifest.json"));
	let meta = "/**";
	for (const key in manifest) {
		switch (key) {
			case "name":
				meta += `\n * @${key} ${manifest[key].replace(/ /g, "")}`;
				break;
			case "authors":
				meta += `\n * @${"author"} ${manifest[key]
					.map((author) => {
						return author.name;
					})
					.join(", ")}`;
				break;
			default:
				meta += `\n * @${key} ${manifest[key]}`;
				break;
		}
	}
	return (meta += "\n */");
}
