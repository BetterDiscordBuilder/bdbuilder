const LOADER_EXPORT_STRING = "export default ___CSS_LOADER_EXPORT___;";

const STYLE_LOADER_STRING = `
StyleLoader.append(module.id, ___CSS_LOADER_EXPORT___.toString());
export default Object.assign(___CSS_LOADER_EXPORT___, ___CSS_LOADER_EXPORT___.locals);
`.trim();

module.exports = function loader(code) {
    return code.replace(
        LOADER_EXPORT_STRING,
        STYLE_LOADER_STRING
    );
}