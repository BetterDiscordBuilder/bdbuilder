export type BotMessage = {
    state: "SENT" | "SENDING",
    author: {
        id: string;
        avatar: string;
        bot: boolean;
        discriminator: string;
        username: string;
    },
    content: string;
};

export const DefaultMessage: BotMessage = {
    state: "SENT",
    author: {
        avatar: "betterdiscord",
        id: "81388395867156480",
        bot: true,
        discriminator: "5000",
        username: "BetterDiscord"
    },
    content: "Hello <:zere_zoom:477825238172958730>"
};

const MessageCreators: {
    createBotMessage: (channelId: string, content: string) => BotMessage;
} = BdApi.findModuleByProps("createBotMessage");

const MessageActions: {
    receiveMessage: (channelId: string, message: BotMessage) => void;
} = BdApi.findModuleByProps("receiveMessage");

const AvatarDefaults = BdApi.findModuleByProps("BOT_AVATARS");

if (AvatarDefaults?.BOT_AVATARS && !AvatarDefaults.BOT_AVATARS.betterdiscord) {
    AvatarDefaults.BOT_AVATARS.betterdiscord = "https://github.com/BetterDiscord.png";
}

export function sendMessage(channelId: string, message: BotMessage): void {
    MessageActions.receiveMessage(channelId, Object.assign({}, MessageCreators.createBotMessage(channelId, message?.content), DefaultMessage, message));
};

const Clyde = { sendMessage, DefaultMessage };
export default Clyde;