const string = `
# {{name}}

> {{description}}
<hr/>
{{contributors}}
<br/>
Made with <img src="https://discord.com/assets/0483f2b648dcc986d01385062052ae1c.svg" width="15" /> by <a href="https://github.com/Kyza/bdbuilder">BDBuilder</a>
`.trim(); 

const contributor = `
<td align="center">
    <img src="{{github}}.png" width="25" /><br/>
    <a href="{{github}}"><strong>{{name}}</strong></a>
</td>
`;

const contributorsTable = `
# Contributors
<table>
<tr>
    {{contributors}}
</tr>
</table>
`;

module.exports = class Readme {
    constructor(config) {
        this.config = config;
    }

    format(string, options, open = "{{", close = "}}") {
        for (const option in options) {
            string = string.replace(new RegExp(`${open}${option}${close}`, "g"), options[option]);
        }
    
        return string;
    }

    get contributors() {
        const contributors = this.config.build.release.contributors;
        if (!Array.isArray(contributors)) return "";

        return this.format(contributorsTable, {
            contributors: contributors.map(e => this.format(contributor, e)).join("\n")
        });
    }

    toString() {
        let output = string;

        output = this.format(output, this.config.info);

        output = this.format(output, {
            contributors: this.contributors
        });

        return output;
    }
}