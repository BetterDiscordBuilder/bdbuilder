export default function stylesheet(code) {
	return code.replace('export default ___CSS_LOADER_EXPORT___;',
		`StyleLoader.append(module.id, ___CSS_LOADER_EXPORT___.toString())\n;
	export default Object.assign(___CSS_LOADER_EXPORT___, ___CSS_LOADER_EXPORT___.locals);`)
};