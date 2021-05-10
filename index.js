#!/usr/bin/env node

const yargs = require("yargs/yargs");
const {hideBin} = require("yargs/helpers");
const BitBarWebpackProgressPlugin = require("bitbar-webpack-progress-plugin");
const argv = yargs(hideBin(process.argv)).argv;
const fs = require("fs-extra");
const path = require("path");
const webpack = require("webpack");
const TerserPlugin = require("terser-webpack-plugin");
const beautify = require("js-beautify").js;
const PluginMeta = require("./structs/meta");

String.prototype.format = function (options, open = "{{", close = "}}") {
	let string = this;
	for (const option in options) {
		string = string.replace(new RegExp(`${open}${option}${close}`), options[option]);
	}

	return string;
}

function getModule(mod) {
	return path.resolve(path.join(__dirname, "node_modules", mod));
}
function nanoseconds() {
	const hrTime = process.hrtime();
	return hrTime[0] * 1000000000 + hrTime[1];
}

const stylesheetLoader = path.resolve(path.join(__dirname, "loaders", "stylesheetLoader.js"));

const jsBuilder = argv.production
	? {
		loader: getModule("babel-loader"),
		options: {
			presets: [
				[
					"@babel/env",
					{
						targets: {electron: "9"}
					}
				],
				"@babel/react",
				["@babel/typescript", {esModuleInterop: true}]
			],
			plugins: [
				"@babel/plugin-proposal-class-properties",
				"minify-dead-code-elimination"
			]
		}
	}
	: {
		loader: getModule("@sucrase/webpack-loader"),
		options: {
			production: true,
			transforms: ["jsx", "typescript", "imports"]
		}
	};

const pluginPath = path.resolve(argv.plugin);
const tempPath = path.resolve(path.join(".", "temp"));
const builtPath = path.resolve(path.join(".", "builds"));
const pluginConfig = fs.readJSONSync(path.join(argv.plugin, "package.json"));
fs.ensureDirSync(tempPath);
fs.ensureDirSync(builtPath);

let startTime = nanoseconds();

fs.ensureFileSync(path.join(tempPath, "package.json"));

const buildConfig = {
	mode: "production",
	target: "node",
	entry: pluginPath,
	output: {
		library: "LibraryPluginHack",
		libraryTarget: "commonjs2",
		filename: pluginConfig.main ?? "index.js",
		path: tempPath,
	},
	watch: argv.watch ?? false,
	watchOptions: {
		followSymlinks: true,
	},
	plugins: [
		new webpack.ProvidePlugin({
			React: ["react"],
			ReactDOM: ["react-dom"]
		}),
		new BitBarWebpackProgressPlugin()
	],
	externals: [
		{
			"react": ["global BdApi", "React"],
			"react-dom": ["global BdApi", "ReactDOM"],
			"@zlibrary": "assign PluginApi",
			"@zlibrary/discord": ["assign PluginApi.DiscordModules"],
			"@zlibrary/plugin": "assign BasePlugin",
			"https": 'assign require("https")'
		},
		function ({context, request}, callback) {
			if (context === __dirname) {
				startTime = nanoseconds();
				return callback();
			}

			// Check if it's in node_modules.
			const nodeModulesPath = path.resolve(pluginPath, "node_modules");
			if (fs.existsSync(nodeModulesPath)) {
				if (fs.existsSync(path.join(nodeModulesPath, request))) return callback();
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
				if (files.some((file) => file.startsWith(path.basename(fullPath)))) {
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
			".mjs",
			".jsx",
			".ts",
			".tsx",
			".coffee",
			".css",
			".scss",
			".sass",
			".less",
			".styl",
			".html",
			".json"
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
						beautify: true
					}
				}
			})
		]
	},
	module: {
		rules: [
			{
				test: /\.css$/i,
				use: [stylesheetLoader, "css-loader"]
			},
			{
				test: /\.s[ac]ss$/i,
				use: [
					stylesheetLoader, 
					{
						loader: "css-loader",
						options: {
							importLoaders: true,
							modules: {
								localIdentName: "[local]-[hash:base64:5]"
							}
						}
					}, 
					"sass-loader"
				]
			},
			{
				test: /\.styl$/i,
				use: [stylesheetLoader, "css-loader", "stylus-loader",]
			},
			{
				test: /\.less$/i,
				use: [stylesheetLoader, "css-loader", "less-loader"]
			},
			{
				test: /\.m?(j|t)sx?$/i,
				exclude: /node_modules/,
				use: jsBuilder,
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
		]
	}
};

webpack(buildConfig, (err, stats) => {
	// console.clear();
	if (err) {
		console.error((err.stack || err) + "\n");
		if (err.details) console.error(err.details + "\n");
		return;
	}
	if (stats.hasErrors()) {
		const info = stats.toJson();
		for (const error of info.errors) console.log(error.message + "\n");
	}
	if (stats.hasWarnings()) {
		const info = stats.toJson();
		for (const warning of info.warnings) console.log(warning.message + "\n");
	}

	if (err || stats.hasErrors()) return console.log(`Failed to build after ${Math.round((nanoseconds() - startTime) / 1000).toLocaleString()}ms.`);

	fs.ensureDirSync(tempPath);

	const meta = new PluginMeta(pluginConfig);
	const templatePlugin = fs.readFileSync(path.join(__dirname, "templates", "plugin.template.js"), "utf8");
	const bdFilename = `${pluginConfig.info.name.replace(/ /g, "")}.plugin.js`;
	const tempFile = path.join(tempPath, pluginConfig.main ?? "index.js");

	const outputPath = path.resolve(path.join(builtPath, bdFilename));

	try {
		fs.unlinkSync(outputPath);
	} catch (error) {
		console.log("Failed to remove old file:\n", error);
	}
	fs.ensureFileSync(tempFile);
	let builtCode = fs.readFileSync(tempFile, "utf-8").replace(
		'"use strict";',
		`"use strict";
		let __plugin_styles__ = "";\n`
	);

	if (pluginConfig.zlib) {
		delete pluginConfig.zlib;
		builtCode = `${meta}\n${templatePlugin.format({pluginConfig: JSON.stringify(pluginConfig, null, "\t"), builtCode})}`;
		pluginConfig.zlib = true;
	} else {
		builtCode = builtCode.replace(
			"module.exports.LibraryPluginHack = __webpack_exports__",
			"module.exports = __webpack_exports__.default ?? __webpack_exports__"
		);

		builtCode = `${meta}\n${builtCode}`;
	}

	builtCode = beautify(builtCode, {indent_with_tabs: true}).replace(/\n{2,}/g, "\n");

	fs.writeFileSync(outputPath, builtCode);

	console.log(`Built in ${Math.round((nanoseconds() - startTime) / 1000).toLocaleString()}ms.`);

	if (argv.copy) {
		fs.ensureDirSync(argv.copy);
		fs.writeFileSync(
			path.resolve(path.join(argv.copy, bdFilename)),
			builtCode
		);
	}

	fs.rmdirSync(tempPath, {recursive: true});
});