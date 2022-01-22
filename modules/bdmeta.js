const Config = require("./config");

class BDMeta {
    static entries = {
        manifest: {
            name: "name",
            author: "author",
            description: "description",
            updateUrl: "updateUrl",
            version: "version",
            source: "source"
        },
        config: {
            authorId: "author.discord_id",
            patreon: "donate.patreon",
            donate: "donate.donate",
            authorLink: "author.website",
            website: "author.website",
            invite: "invite"
        }
    }

    createFields(type, getValue) {
        let fields = [];

        for (const key in BDMeta.entries[type]) {
            const value = getValue(BDMeta.entries[type][key]);
            if (!value) continue;

            fields.push(` * @${key.replaceAll(" ", "")} ${value}`);
        }

        return fields;
    }

    toString() {
        const entries = [
            this.createFields("manifest", k => Config.getManifest(k)),
            this.createFields("config", k => Config.get(k))
        ].flat(10);

        return `/**\n${entries.join("\n")}\n*/`;
    }
};

module.exports = BDMeta;