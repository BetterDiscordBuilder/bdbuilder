import Utils from "../utils.js";

export const string = `
# {{name}}

> {{description}}
<hr/>
{{contributors}}
<br/>
<span>Made with <img src="https://discord.com/assets/0483f2b648dcc986d01385062052ae1c.svg" width="15" /> by <a href="https://github.com/Kyza/bdbuilder">BDBuilder</a></span>
`.trim(); 

export const contributor = `
<td align="center">
    <img src="{{github}}.png" width="25" /><br/>
    <a href="{{github}}"><strong>{{name}}</strong></a>
</td>
`;

export const contributorsTable = `
# Contributors
<table>
<tr>
    {{contributors}}
</tr>
</table>
`;

export default class Readme {
    constructor(config) {
        this.config = config;
    } 

    get contributors() {
        const contributors = this.config.build.release.contributors;
        if (!Array.isArray(contributors)) return "";
        
        return Utils.format(contributorsTable, {
            contributors: contributors.map(e => {
                console.log(e);
                return Utils.format(contributor, e);
            }).join("\n")
        });
    }

    toString() {
        let output = string;

        output = Utils.format(output, this.config.info);

        output = Utils.format(output, {
            contributors: this.contributors
        });

        return output;
    }
}