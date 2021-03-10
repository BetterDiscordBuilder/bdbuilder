/**
 * @name TestPlugin
 * @version 1.0.0
 * @author Kyza
 */
(() => {
	var __webpack_modules__ = {
		663: module => {
			const {
				React
			} = BdApi;
			module.exports = class {
				start() {
					console.log("Hey.", React.createElement("div", null));
				}
				stop() {
					console.log("Bye.");
				}
			};
		}
	};
	var __webpack_module_cache__ = {};
	function __webpack_require__(moduleId) {
		if (__webpack_module_cache__[moduleId]) return __webpack_module_cache__[moduleId].exports;
		var module = __webpack_module_cache__[moduleId] = {
			exports: {}
		};
		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
		return module.exports;
	}
	var __webpack_exports__ = __webpack_require__(663);
	module.exports.default = __webpack_exports__;
})();