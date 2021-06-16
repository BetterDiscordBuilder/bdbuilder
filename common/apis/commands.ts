export const DiscordCommands: {
    BUILT_IN_COMMANDS: Command[];
    BUILT_IN_SECTIONS: CommandSection[];
} = BdApi.findModuleByProps("BUILT_IN_COMMANDS");

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
        applicationId: "betterdiscord"
    });
    DiscordCommands.BUILT_IN_COMMANDS.push(cmd);

    return () => {
        const index = DiscordCommands.BUILT_IN_COMMANDS.findIndex(c => c === cmd);
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