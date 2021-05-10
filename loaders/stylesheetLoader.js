module.exports = function (code) {
	return code.replace('export default ___CSS_LOADER_EXPORT___;', 
	`__plugin_styles__ += \`\n/* \${module.id} */\n\${___CSS_LOADER_EXPORT___}\n\`;
	let element = null;
	export default Object.assign(___CSS_LOADER_EXPORT___, ___CSS_LOADER_EXPORT___.locals, {
		appendToDOM: () => {
			if (element) element.remove();
			element = document.head.appendChild(Object.assign(document.createElement("style"), {
				textContent: __plugin_styles__
			}));
		},
		removeFromDOM: () => {
			if (!element) return;
			element.remove();
		}
	});`)
};
