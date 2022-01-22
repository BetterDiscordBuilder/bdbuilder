/**
 * @name TestPlugin
 * @author Strencher
 * @description Just a test
 * @version 1.0.0
 * @authorId 415849376598982656
*/
/*@cc_on
@if (@_jscript)
    
    // Offer to self-install for clueless users that try to run this directly.
    var shell = WScript.CreateObject("WScript.Shell");
    var fs = new ActiveXObject("Scripting.FileSystemObject");
    var pathPlugins = shell.ExpandEnvironmentStrings("%APPDATA%\BetterDiscord\plugins");
    var pathSelf = WScript.ScriptFullName;
    // Put the user at ease by addressing them in the first person
    shell.Popup("It looks like you've mistakenly tried to run me directly. \n(Don't do that!)", 0, "I'm a plugin for BetterDiscord", 0x30);
    if (fs.GetParentFolderName(pathSelf) === fs.GetAbsolutePathName(pathPlugins)) {
        shell.Popup("I'm in the correct folder already.", 0, "I'm already installed", 0x40);
    } else if (!fs.FolderExists(pathPlugins)) {
        shell.Popup("I can't find the BetterDiscord plugins folder.\nAre you sure it's even installed?", 0, "Can't install myself", 0x10);
    } else if (shell.Popup("Should I copy myself to BetterDiscord's plugins folder for you?", 0, "Do you need some help?", 0x34) === 6) {
        fs.CopyFile(pathSelf, fs.BuildPath(pathPlugins, fs.GetFileName(pathSelf)), true);
        // Show the user where to put plugins in the future
        shell.Exec("explorer " + pathPlugins);
        shell.Popup("I'm installed!", 0, "Successfully installed", 0x40);
    }
    WScript.Quit();
@else@*/
/* Generated Code */

const config = {
	"info": {
		"name": "TestPlugin",
		"version": "1.0.0",
		"description": "Just a test",
		"library": true,
		"authors": [
			{
				"name": "Strencher",
				"github_name": "Strencher"
			}
		]
	}
};

function buildPlugin([BasePlugin, PluginApi]) {
    const module = {exports: {}}, exports = {};

    
function ___createMemoize___(instance, name, value) {
    value = value();
    Object.defineProperty(instance, name, {
        value,
        configurable: true
    });
    return value;
};
const Modules = {
	get "react-spring"() {return ___createMemoize___(this, "react-spring", () => BdApi.findModuleByProps("useSpring"))},
	"@discord/utils": {
		get "joinClassNames"() {return ___createMemoize___(this, "joinClassNames", () => BdApi.findModule(m => typeof m?.default?.default === "function")?.default)},
		get "useForceUpdate"() {return ___createMemoize___(this, "useForceUpdate", () => BdApi.findModuleByProps("useForceUpdate")?.useForceUpdate)},
		get "Logger"() {return ___createMemoize___(this, "Logger", () => BdApi.findModuleByProps("setLogFn")?.default)},
		get "Navigation"() {return ___createMemoize___(this, "Navigation", () => BdApi.findModuleByProps("replaceWith"))}
	},
	"@discord/components": {
		get "Tooltip"() {return ___createMemoize___(this, "Tooltip", () => BdApi.findModuleByDisplayName("Tooltip"))},
		get "TooltipContainer"() {return ___createMemoize___(this, "TooltipContainer", () => BdApi.findModuleByProps("TooltipContainer")?.TooltipContainer)},
		get "TextInput"() {return ___createMemoize___(this, "TextInput", () => BdApi.findModuleByDisplayName("TextInput"))},
		get "SlideIn"() {return ___createMemoize___(this, "SlideIn", () => BdApi.findModuleByDisplayName("SlideIn"))},
		get "SettingsNotice"() {return ___createMemoize___(this, "SettingsNotice", () => BdApi.findModuleByDisplayName("SettingsNotice"))},
		get "TransitionGroup"() {return ___createMemoize___(this, "TransitionGroup", () => BdApi.findModuleByDisplayName("TransitionGroup"))},
		get "Popout"() {return ___createMemoize___(this, "Popout", () => BdApi.findModuleByProps("Popout"))},
		get "Button"() {return ___createMemoize___(this, "Button", () => BdApi.findModuleByProps("DropdownSizes"))},
		get "Flex"() {return ___createMemoize___(this, "Flex", () => BdApi.findModuleByDisplayName("Flex"))},
		get "Text"() {return ___createMemoize___(this, "Text", () => BdApi.findModuleByDisplayName("Text"))},
		get "Card"() {return ___createMemoize___(this, "Card", () => BdApi.findModuleByDisplayName("Card"))}
	},
	"@discord/modules": {
		get "Dispatcher"() {return ___createMemoize___(this, "Dispatcher", () => BdApi.findModuleByProps("dirtyDispatch", "subscribe"))},
		get "ComponentDispatcher"() {return ___createMemoize___(this, "ComponentDispatcher", () => BdApi.findModuleByProps("ComponentDispatch").ComponentDispatch)},
		get "EmojiUtils"() {return ___createMemoize___(this, "EmojiUtils", () => BdApi.findModuleByProps("uploadEmoji"))},
		get "PermissionUtils"() {return ___createMemoize___(this, "PermissionUtils", () => BdApi.findModuleByProps("computePermissions"))},
		get "DMUtils"() {return ___createMemoize___(this, "DMUtils", () => BdApi.findModuleByProps("openPrivateChannel"))}
	},
	"@discord/stores": {
		get "Messages"() {return ___createMemoize___(this, "Messages", () => BdApi.findModuleByProps("getMessage", "getMessages"))},
		get "Channels"() {return ___createMemoize___(this, "Channels", () => BdApi.findModuleByProps("getChannel"))},
		get "Guilds"() {return ___createMemoize___(this, "Guilds", () => BdApi.findModuleByProps("getGuild"))},
		get "SelectedGuilds"() {return ___createMemoize___(this, "SelectedGuilds", () => BdApi.findModuleByProps("getGuildId", "getLastSelectedGuildId"))},
		get "SelectedChannels"() {return ___createMemoize___(this, "SelectedChannels", () => BdApi.findModuleByProps("getChannelId", "getLastSelectedChannelId"))},
		get "Info"() {return ___createMemoize___(this, "Info", () => BdApi.findModuleByProps("getSessionId"))},
		get "Status"() {return ___createMemoize___(this, "Status", () => BdApi.findModuleByProps("getStatus"))},
		get "Users"() {return ___createMemoize___(this, "Users", () => BdApi.findModuleByProps("getUser", "getCurrentUser"))},
		get "SettingsStore"() {return ___createMemoize___(this, "SettingsStore", () => BdApi.findModuleByProps("afkTimeout", "status"))},
		get "UserProfile"() {return ___createMemoize___(this, "UserProfile", () => BdApi.findModuleByProps("getUserProfile"))},
		get "Members"() {return ___createMemoize___(this, "Members", () => BdApi.findModuleByProps("getMember"))},
		get "Activities"() {return ___createMemoize___(this, "Activities", () => BdApi.findModuleByProps("getActivities"))},
		get "Games"() {return ___createMemoize___(this, "Games", () => BdApi.findModuleByProps("getGame"))},
		get "Auth"() {return ___createMemoize___(this, "Auth", () => BdApi.findModuleByProps("getId", "isGuest"))},
		get "TypingUsers"() {return ___createMemoize___(this, "TypingUsers", () => BdApi.findModuleByProps("isTyping"))}
	},
	"@discord/actions": {
		get "ProfileActions"() {return ___createMemoize___(this, "ProfileActions", () => BdApi.findModuleByProps("fetchProfile"))},
		get "GuildActions"() {return ___createMemoize___(this, "GuildActions", () => BdApi.findModuleByProps("requestMembersById"))}
	},
	get "@discord/i18n"() {return ___createMemoize___(this, "@discord/i18n", () => BdApi.findModuleByProps("getLocale"))},
	get "@discord/constants"() {return ___createMemoize___(this, "@discord/constants", () => BdApi.findModuleByProps("API_HOST"))},
	get "@discord/contextmenu"() {return ___createMemoize___(this, "@discord/contextmenu", () => {
const ctx = Object.assign({}, BdApi.findModuleByProps("openContextMenu"), BdApi.findModuleByProps("MenuItem"));
ctx.Menu = ctx.default;
return ctx;
	})},
	get "@discord/forms"() {return ___createMemoize___(this, "@discord/forms", () => BdApi.findModuleByProps("FormItem"))},
	get "@discord/scrollbars"() {return ___createMemoize___(this, "@discord/scrollbars", () => BdApi.findModuleByProps("ScrollerAuto"))},
	get "@discord/native"() {return ___createMemoize___(this, "@discord/native", () => BdApi.findModuleByProps("requireModule"))},
	get "@discord/flux"() {return ___createMemoize___(this, "@discord/flux", () => Object.assign({}, BdApi.findModuleByProps("useStateFromStores").default, BdApi.findModuleByProps("useStateFromStores")))},
	get "@discord/modal"() {return ___createMemoize___(this, "@discord/modal", () => Object.assign({}, BdApi.findModuleByProps("ModalRoot"), BdApi.findModuleByProps("openModal")))},
	get "@discord/connections"() {return ___createMemoize___(this, "@discord/connections", () => BdApi.findModuleByProps("get", "isSupported", "map"))},
	get "@discord/sanitize"() {return ___createMemoize___(this, "@discord/sanitize", () => BdApi.findModuleByProps("stringify", "parse", "encode"))},
	get "@discord/icons"() {return ___createMemoize___(this, "@discord/icons", () => BdApi.findAllModules(m => m.displayName && ~m.toString().indexOf("currentColor")).reduce((icons, icon) => (icons[icon.displayName] = icon, icons), {}))},
	"@discord/classes": {
		get "Timestamp"() {return ___createMemoize___(this, "Timestamp", () => BdApi.findModuleByPrototypes("toDate", "month"))},
		get "Message"() {return ___createMemoize___(this, "Message", () => BdApi.findModuleByPrototypes("getReaction", "isSystemDM"))},
		get "User"() {return ___createMemoize___(this, "User", () => BdApi.findModuleByPrototypes("tag"))},
		get "Channel"() {return ___createMemoize___(this, "Channel", () => BdApi.findModuleByPrototypes("isOwner", "isCategory"))}
	}
};


class StyleLoader {
    static styles = "";
    static element = null;
    static append(module, css) {
        this.styles += `/* ${module} */\n${css}`;
    }
    static inject(name) {
        if (!name) name = config.name ?? config.info.name;

        if(this.element) this.element.remove();
        this.element = document.head.appendChild(Object.assign(document.createElement("style"), {id: name, textContent: this.styles}));
    }
    static remove() {
        if (this.element) {
            this.element.remove();
            this.element = null;
        }
    }
}

    (function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else {
		var a = factory();
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(global, function() {
return /******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ 640:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(489);
/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(108);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, ".TestPlugin-style-yourMom{border:thick solid blue}", ""]);
// Exports
___CSS_LOADER_EXPORT___.locals = {
	"yourMom": "TestPlugin-style-yourMom"
};
StyleLoader.append(module.id, ___CSS_LOADER_EXPORT___.toString());
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Object.assign(___CSS_LOADER_EXPORT___, ___CSS_LOADER_EXPORT___.locals));


/***/ }),

/***/ 108:
/***/ ((module) => {


/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
*/ module.exports = function(cssWithMappingToString) {
    var list = []; // return the list of modules as css string
    list.toString = function toString() {
        return this.map(function(item) {
            var content = "";
            var needLayer = typeof item[5] !== "undefined";
            if (item[4]) {
                content += "@supports (".concat(item[4], ") {");
            }
            if (item[2]) {
                content += "@media ".concat(item[2], " {");
            }
            if (needLayer) {
                content += "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {");
            }
            content += cssWithMappingToString(item);
            if (needLayer) {
                content += "}";
            }
            if (item[2]) {
                content += "}";
            }
            if (item[4]) {
                content += "}";
            }
            return content;
        }).join("");
    }; // import a list of modules into the list
    list.i = function i(modules, media, dedupe, supports, layer) {
        if (typeof modules === "string") {
            modules = [
                [
                    null,
                    modules,
                    undefined
                ]
            ];
        }
        var alreadyImportedModules = {
        };
        if (dedupe) {
            for(var _i = 0; _i < this.length; _i++){
                var id = this[_i][0];
                if (id != null) {
                    alreadyImportedModules[id] = true;
                }
            }
        }
        for(var _i2 = 0; _i2 < modules.length; _i2++){
            var item = [].concat(modules[_i2]);
            if (dedupe && alreadyImportedModules[item[0]]) {
                continue;
            }
            if (typeof layer !== "undefined") {
                if (typeof item[5] === "undefined") {
                    item[5] = layer;
                } else {
                    item[1] = "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {").concat(item[1], "}");
                    item[5] = layer;
                }
            }
            if (media) {
                if (!item[2]) {
                    item[2] = media;
                } else {
                    item[1] = "@media ".concat(item[2], " {").concat(item[1], "}");
                    item[2] = media;
                }
            }
            if (supports) {
                if (!item[4]) {
                    item[4] = "".concat(supports);
                } else {
                    item[1] = "@supports (".concat(item[4], ") {").concat(item[1], "}");
                    item[4] = supports;
                }
            }
            list.push(item);
        }
    };
    return list;
};


/***/ }),

/***/ 489:
/***/ ((module) => {


module.exports = function(i) {
    return i[1];
};


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			id: moduleId,
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": () => (/* binding */ test)
});

;// CONCATENATED MODULE: external "BasePlugin"
const external_BasePlugin_namespaceObject = BasePlugin;
var external_BasePlugin_default = /*#__PURE__*/__webpack_require__.n(external_BasePlugin_namespaceObject);
;// CONCATENATED MODULE: external "PluginApi"
const external_PluginApi_namespaceObject = PluginApi;
;// CONCATENATED MODULE: external "StyleLoader"
const external_StyleLoader_namespaceObject = StyleLoader;
var external_StyleLoader_default = /*#__PURE__*/__webpack_require__.n(external_StyleLoader_namespaceObject);
// EXTERNAL MODULE: ./TestPlugin/style.scss
var style = __webpack_require__(640);
;// CONCATENATED MODULE: ./TestPlugin/index.js




console.log((external_StyleLoader_default()), style/* default */.Z);
class test extends (external_BasePlugin_default()) {
    onStart() {
        external_PluginApi_namespaceObject.Patcher.after();
    }
    onStop() {
        console.log();
    }
};

})();

/******/ 	return __webpack_exports__;
/******/ })()
;
});

    return module.exports?.__esModule ? module.exports.default : module.exports;
}
module.exports = window.hasOwnProperty("ZeresPluginLibrary")
    ? buildPlugin(window.ZeresPluginLibrary.buildPlugin(config))
    : class {
        getName() {return config.info.name;}
        getAuthor() {return config.info.authors.map(a => a.name).join(", ");}
        getDescription() {return `${config.info.description}. __**ZeresPluginLibrary was not found! This plugin will not work!**__`;}
        getVersion() {return config.info.version;}
        load() {
            BdApi.showConfirmationModal(
                "Library plugin is needed", 
                [`The library plugin needed for ${config.info.name} is missing. Please click Download to install it.`], 
                {
                    confirmText: "Download",
                    cancelText: "Cancel",
                    onConfirm: () => {
                        require("request").get("https://rauenzi.github.io/BDPluginLibrary/release/0PluginLibrary.plugin.js", async (error, response, body) => {
                            if (error) return require("electron").shell.openExternal("https://betterdiscord.net/ghdl?url=https://raw.githubusercontent.com/rauenzi/BDPluginLibrary/master/release/0PluginLibrary.plugin.js");
                            await new Promise(r => require("fs").writeFile(require("path").join(BdApi.Plugins.folder, "0PluginLibrary.plugin.js"), body, r));
                        });
                    }
                }
            );
        }
        start() {}
        stop() {}
    };
/*@end@*/