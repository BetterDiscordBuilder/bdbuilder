module.exports = function omit(object, properties = []) {
    const final = {};

    for (const key in object) {
        if (properties.includes(key)) continue;

        final[key] = object[key];
    }

    return final;
}