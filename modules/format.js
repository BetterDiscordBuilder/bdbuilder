module.exports = function format(string, options, open = "[", close = "]") {
    for (const key in options) {
        string = string.replace(new RegExp(`\\${open}${key}\\${close}`, "g"), options[key]);
    }

    return string;
};