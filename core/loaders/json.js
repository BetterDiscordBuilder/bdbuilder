export default function(code) {
    const callback = this.async();
    const value = JSON.parse(code);
    let str = `export default ${code};\n`;
    
    if (Array.isArray(value)) return callback(null, str);

    for (let i in value) str += `export var ${i} = ${JSON.stringify(value[i])};\n`;

    callback(null, str);
}