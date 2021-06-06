export function matchAll(regex, input, parent = false) {
    let matches, output = [];
    while(matches = regex.exec(input)) {
        if (parent) output.push(matches);
        else {
            const [, ...match] = matches;
            output.push(match);
        }
    }
    return output;
};