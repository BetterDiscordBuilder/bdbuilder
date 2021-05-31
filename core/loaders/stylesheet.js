export default function stylesheet(code) {
	return code.replace('export default ___CSS_LOADER_EXPORT___;', 
	`__plugin_styles__ += \`\n/* \${module.id} */\n\${___CSS_LOADER_EXPORT___}\n\`;
	export default Object.assign(___CSS_LOADER_EXPORT___, ___CSS_LOADER_EXPORT___.locals);`)
};