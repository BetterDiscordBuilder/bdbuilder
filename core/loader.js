const sucrase = require("sucrase");
const Module = require("module");
const fs = require("fs");

Module._extensions[".js"] = function (module, filename) {
    const content = fs.readFileSync(filename, "utf8");
    if (/node_modules/.test(filename)) return module._compile(content, filename);

    const {code} = sucrase.transform(content, {
        transforms: ["imports"]
    });

    module._compile(code, filename);
};

require("./index.js");