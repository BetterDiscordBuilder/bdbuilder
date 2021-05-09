module.exports = function (code) {
	return code.replace(
		"export default ___CSS_LOADER_EXPORT___;",
		`let element;
	export default {add: () => {
		element = document.createElement("style");
		element.textContent = ___CSS_LOADER_EXPORT___;
		document.head.appendChild(element);
	}, remove: () => {
		if (!element) return;
		element.remove();
		element = null;
	}}`
	);
};
