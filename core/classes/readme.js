import fs from "fs-extra";
import path from "path";
import Utils from "../utils.js";

export const string = `
# {{name}}

> {{description}}
<hr/>
{{contributors}}
{{previews}}
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

export const preview = `
## {{name}}
![image]({{src}})
`;

export const previewsPage = `
# Previews
{{previews}}
`;

export default class Readme {
    constructor(config) {
        this.config = config;
    } 

    get contributors() {
        const contributors = this.config.build.release.contributors;
        if (!Array.isArray(contributors) || !previews.length) return "";
        
        return Utils.format(contributorsTable, {
            contributors: contributors.map(e => Utils.format(contributor, e)).join("\n")
        }) + "<br/>";
    }

    get previews() {
        const previews = this.config.build.release.previews;

        if (!Array.isArray(previews) || !previews.length) return "";

        return Utils.format(previewsPage, {
            previews: previews.map(e => {
                return Utils.format(preview, {
                    name: e.name,
                    src: this.makeSrcLink(e)
                })
            }).join("<br/>\n")
        }) + "<br/>"
    }

    makeSrcLink(img) {
        if (this.config.build.release.public) {
            return Utils.resolveRawGithub(this.config.info.name, `src/${img.src}`);
        } else return `data:image/${path.extname(img.src).slice(1)};base64,${fs.readFileSync(path.resolve(Utils.getPath(), img.src)).toString("base64")}`;
    }

    toString() {
        let output = string;

        output = Utils.format(output, this.config.info);

        output = Utils.format(output, {
            contributors: this.contributors
        });

        output = Utils.format(output, {
            previews: this.previews
        });

        return output;
    }
}