export const DiscordCommands: {
    BUILT_IN_COMMANDS: Command[];
    BUILT_IN_SECTIONS: CommandSection[];
} = BdApi.findModuleByProps("BUILT_IN_COMMANDS");

const DiscordCommandTypes: {
    ApplicationCommandOptionType: {
        BOOLEAN: 5;
        CHANNEL: 7;
        INTEGER: 4;
        MENTIONABLE: 9;
        ROLE: 8;
        STRING: 3;
        SUB_COMMAND: 1;
        SUB_COMMAND_GROUP: 2;
        USER: 6;
    };
    ApplicationCommandSectionType: {
        BUILT_IN: 0;
        DM: 2;
        GUILD: 1;
    };
    ApplicationCommandType: {
        BOT: 3;
        BUILT_IN: 0;
        BUILT_IN_INTEGRATION: 2;
        BUILT_IN_TEXT: 1
        PLACEHOLDER: 4;
    };
    ApplicationCommandPermissionType: {
        ROLE: 1;
        USER: 2;
    }
} = BdApi.findModuleByProps("ApplicationCommandType");

/* Aliases */
export const Types = DiscordCommandTypes.ApplicationCommandType;
export const OptionTypes = DiscordCommandTypes.ApplicationCommandOptionType;
export const PermissionTypes = DiscordCommandTypes.ApplicationCommandPermissionType;

export type CommandSection = {
    icon: string;
    id: string;
    name: string;
    type: 0 | 1 | 2 | 3 | 4;
};

export type Command = {
    description: string;
    id: string;
    name: string;
    options: {
        name: string;
        description: string;
        type: 3
    }[];
    type: 3;
    execute: (options: any, props: { channel: any, guild: any }) => void;
    predicate: (props: { channelId: string, guildId: string }) => boolean;
    __registerId?: string;
};

if (!DiscordCommands.BUILT_IN_SECTIONS.some(e => e.id === "betterdiscord")) {
    DiscordCommands.BUILT_IN_SECTIONS.push({
        icon: "https://github.com/BetterDiscord.png",
        id: "betterdiscord",
        name: "BetterDiscord",
        type: 0
    });
}

export function registerCommand(caller: string, options: Command) {
    const cmd = Object.assign({}, options, {
        __registerId: caller,
        applicationId: "betterdiscord",
        type: Types.BOT
    });
    DiscordCommands.BUILT_IN_COMMANDS.push(cmd);

    return () => {
        const index = DiscordCommands.BUILT_IN_COMMANDS.indexOf(cmd);
        if (index < 0) return false;
        DiscordCommands.BUILT_IN_COMMANDS.splice(index, 1);
    };
};

export function unregisterAllCommands(caller: string) {
    let index = DiscordCommands.BUILT_IN_COMMANDS.findIndex(cmd => cmd.__registerId === caller);

    while (index > -1) {
        DiscordCommands.BUILT_IN_COMMANDS.splice(index, 1);
        index = DiscordCommands.BUILT_IN_COMMANDS.findIndex(cmd => cmd.__registerId === caller);
    }
}

const Commands = { registerCommand, unregisterAllCommands };

export default Commands;