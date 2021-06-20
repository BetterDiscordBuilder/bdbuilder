type ReactElement = any;

declare namespace DiscordNative {
    export const fileManager: {
        saveWithDialog: (options: { title: string, properties: "openDirectory" }) => Promise<{ filePaths: string[] }>;
    };
}

declare interface UserObject {
    id: string;
    banner: string | null;
    avatarUrl: string;
    getAvatarURL: (type: "gif" | "webp" | "png") => string;
    createdAt: Date;
}

declare interface GuildObject {
    id: string;
    icon: string;
    name: string;
    description: string;
    getIconURL: (type: "gif" | "webp" | "png") => string;
}

declare interface ChannelOject {
    id: string;
    icon: string;
    name: string;
    description: string;
}

declare module "@discord" {
    export * as utils from "@discord/utils";
    export * as components from "@discord/utils";
    export * as modules from "@discord/modules";
    export * as stores from "@discord/stores";
}

declare module "@discord/utils" {
    export function joinClassNames(...args: string[] | object[]): string;
    export function useForceUpdate(): React.DispatchWithoutAction;
    export class Logger {
        constructor(module: string)

        log(...message): void;
        error(...message): void;
        info(...message): void;
        verbose(...message): void;
        trace(...message): void;
        warn(...message): void;
    }

    export const Navigation: {
        replaceWith: (path: string) => void
    };
}

declare module "@discord/components" {
    export type TooltipOptions = { tooltipClassName?: string; text?: string, position?: "top", spacing?: "8", children?: any };
    export function Tooltip({ text, position, spacing, children }: TooltipOptions): ReactElement;
    export function TooltipContainer({ text, position, spacing }: TooltipOptions): ReactElement;
    export function TextInput(props: { value: string, onChange: (value: string) => void, placeholder: string }): ReactElement;
    export function SlideIn(): ReactElement;
    export function TransitionGroup(): ReactElement;
    export function SettingsNotice({ onSave, onReset }): ReactElement;

    /* Button */
    const ButtonSizes: { ICON: string, LARGE: string, MAX: string, MEDIUM: string, MIN: string, NONE: string, SMALL: string, TINY: string, XLARGE: string };

    const ButtonLooks: { BLANK: string, FILLED: string, INVERTED: string, LINK: string, OUTLINED: string };

    const DropdownSizes: { LARGE: "LARGE", MEDIUM: "MEDIUM", SMALL: "SMALL" };

    const ButtonColors: { BLACK: string; BRAND: string; GREEN: string; GREY: string; LINK: string; PRIMARY: string; RED: string; TRANSPARENT: string; WHITE: string; YELLOW: string; }

    export function Button(props: { children?: any, look?: string, size?: string, dropdownSize?: string, color?: string, onClick?: (event: React.MouseEvent) => any }): ReactElement;

    // @ts-ignore
    Button.Sizes = ButtonSizes;
    Button.Looks = ButtonLooks;
    Button.Colors = ButtonColors;
    Button.DropdownSizes = DropdownSizes;

    /* Flex */
    const FlexAlign: { START: string, END: string, CENTER: string, STRETCH: string, BASELINE: string };

    const FlexDirection: { VERTICAL: string, HORIZONTAL: string, HORIZONTAL_REVERSE: string };

    const FlexJustify: { START: string, END: string, CENTER: string, BETWEEN: string, AROUND: string };

    const FlexWrap: { NO_WRAP: string, WRAP: string, WRAP_REVERSE: string };

    function Child(props: FlexProps): ReactElement;

    type FlexProps = {
        align?: string,
        direction?: string,
        justify?: string,
        wrap?: string,
        grow?: number,
        shrink?: number,
        children: any;
        className?: string;
    };
    export function Flex(props: FlexProps): ReactElement;
    Flex.Child = Child;

    Flex.Align = FlexAlign;
    Flex.Direction = FlexDirection;
    Flex.Justify = FlexJustify;
    Flex.Wrap = FlexWrap;

    const TextSizes: { SIZE_10: string; SIZE_12: string; SIZE_14: string; SIZE_16: string; SIZE_20: string; SIZE_24: string; SIZE_32: string; }

    const TextColors: { BRAND: string; CUSTOM: string; ERROR: string; HEADER_PRIMARY: string; HEADER_SECONDARY: string; INTERACTIVE_ACTIVE: string; INTERACTIVE_NORMAL: string; LINK: string; MUTED: string; STANDARD: string; STATUS_GREEN: string; STATUS_RED: string; STATUS_YELLOW: string; }

    type TextProps = {
        size: string;
        color: string;
    };

    export function Text(props: TextProps): ReactElement;

    Text.Colors = TextColors;
    Text.Sizes = TextSizes;

    const Types: { BRAND: string, CUSTOM: string, DANGER: string, PRIMARY: string, SUCCESS: string, WARNING: string };

    type CardProps = {
        type: string;
        editable: boolean;
        className?: string;
        outline: boolean;
    };

    export function Card(props: CardProps): ReactElement;
}

declare module "@discord/modules" {
    export const Dispatcher: {
        dispatch: ({ type: string }) => void;
        subscribe<T>(event: string, listener: (data: T | { type: string }) => void): void;
        unsubscribe(event: string, listener: any): void;
        dirtyDispatch: ({ type: string }) => void;
    };
    export const EmojiUtils: {
        uploadEmoji: (guildId: string, emojiDataURI: string, name: string) => Promise<void>;
    };
    export const PermissionUtils: {
        can: (permission: bigint, user: UserObject, guild: GuildObject) => boolean;
    }
}

declare module "@discord/constants" {
    export function NOOP(): void;
    export function NOOP_NULL(): null;
    export const API_HOST: string;
    export const Permissions: object;
    export const ActionTypes: {
        PRESENCE_UPDATE: string;
        MESSAGE_CREATE: string;
        MESSAGE_UPDATE: string;
        MESSAGE_DELETE: string;
    };
    export const Endpoints: {
        SEARCH_GUILD: (guildId: string) => string;
        SEARCH_CHANNEL: (channelId: string) => string;
    };
    export const Colors: {
        PRIMARY_DARK_100: string; PRIMARY_DARK_130: string; PRIMARY_DARK_160: string; PRIMARY_DARK_200: string; PRIMARY_DARK_230: string; PRIMARY_DARK_260: string; PRIMARY_DARK_300: string; PRIMARY_DARK_330: string; PRIMARY_DARK_360: string; PRIMARY_DARK_400: string; PRIMARY_DARK_430: string; PRIMARY_DARK_460: string; PRIMARY_DARK_500: string; PRIMARY_DARK: string; PRIMARY_DARK_530: string; PRIMARY_DARK_560: string; PRIMARY_DARK_600: string; PRIMARY_DARK_630: string; PRIMARY_DARK_660: string; PRIMARY_DARK_700: string; PRIMARY_DARK_730: string; PRIMARY_DARK_760: string; PRIMARY_DARK_800: string; PRIMARY_DARK_830: string; PRIMARY_DARK_860: string; PRIMARY_DARK_900: string; PRIMARY_LIGHT_100: string; PRIMARY_LIGHT_130: string; PRIMARY_LIGHT_160: string; PRIMARY_LIGHT_200: string; PRIMARY_LIGHT_230: string; PRIMARY_LIGHT_260: string; PRIMARY_LIGHT_300: string; PRIMARY_LIGHT_330: string; PRIMARY_LIGHT_360: string; PRIMARY_LIGHT_400: string; PRIMARY_LIGHT_430: string; PRIMARY_LIGHT_460: string; PRIMARY_LIGHT_500: string; PRIMARY_LIGHT: string; PRIMARY_LIGHT_530: string; PRIMARY_LIGHT_560: string; PRIMARY_LIGHT_600: string; PRIMARY_LIGHT_630: string; PRIMARY_LIGHT_660: string; PRIMARY_LIGHT_700: string; PRIMARY_LIGHT_730: string; PRIMARY_LIGHT_760: string; PRIMARY_LIGHT_800: string; PRIMARY_LIGHT_830: string; PRIMARY_LIGHT_860: string; PRIMARY_LIGHT_900: string; BRAND_100: string; BRAND_130: string; BRAND_160: string; BRAND_200: string; BRAND_230: string; BRAND_260: string; BRAND_300: string; BRAND_330: string; BRAND_360: string; BRAND_400: string; BRAND_430: string; BRAND_460: string; BRAND_500: string; BRAND: string; BRAND_530: string; BRAND_560: string; BRAND_600: string; BRAND_630: string; BRAND_660: string; BRAND_700: string; BRAND_730: string; BRAND_760: string; BRAND_800: string; BRAND_830: string; BRAND_860: string; BRAND_900: string; BRAND_NEW_100: string; BRAND_NEW_130: string; BRAND_NEW_160: string; BRAND_NEW_200: string; BRAND_NEW_230: string; BRAND_NEW_260: string; BRAND_NEW_300: string; BRAND_NEW_330: string; BRAND_NEW_360: string; BRAND_NEW_400: string; BRAND_NEW_430: string; BRAND_NEW_460: string; BRAND_NEW_500: string; BRAND_NEW: string; BRAND_NEW_530: string; BRAND_NEW_560: string; BRAND_NEW_600: string; BRAND_NEW_630: string; BRAND_NEW_660: string; BRAND_NEW_700: string; BRAND_NEW_730: string; BRAND_NEW_760: string; BRAND_NEW_800: string; BRAND_NEW_830: string; BRAND_NEW_860: string; BRAND_NEW_900: string; STATUS_RED_100: string; STATUS_RED_130: string; STATUS_RED_160: string; STATUS_RED_200: string; STATUS_RED_230: string; STATUS_RED_260: string; STATUS_RED_300: string; STATUS_RED_330: string; STATUS_RED_360: string; STATUS_RED_400: string; STATUS_RED_430: string; STATUS_RED_460: string; STATUS_RED_500: string; STATUS_RED: string; STATUS_RED_530: string; STATUS_RED_560: string; STATUS_RED_600: string; STATUS_RED_630: string; STATUS_RED_660: string; STATUS_RED_700: string; STATUS_RED_730: string; STATUS_RED_760: string; STATUS_RED_800: string; STATUS_RED_830: string; STATUS_RED_860: string; STATUS_RED_900: string; STATUS_YELLOW_100: string; STATUS_YELLOW_130: string; STATUS_YELLOW_160: string; STATUS_YELLOW_200: string; STATUS_YELLOW_230: string; STATUS_YELLOW_260: string; STATUS_YELLOW_300: string; STATUS_YELLOW_330: string; STATUS_YELLOW_360: string; STATUS_YELLOW_400: string; STATUS_YELLOW_430: string; STATUS_YELLOW_460: string; STATUS_YELLOW_500: string; STATUS_YELLOW: string; STATUS_YELLOW_530: string; STATUS_YELLOW_560: string; STATUS_YELLOW_600: string; STATUS_YELLOW_630: string; STATUS_YELLOW_660: string; STATUS_YELLOW_700: string; STATUS_YELLOW_730: string; STATUS_YELLOW_760: string; STATUS_YELLOW_800: string; STATUS_YELLOW_830: string; STATUS_YELLOW_860: string; STATUS_YELLOW_900: string; STATUS_GREEN_100: string; STATUS_GREEN_130: string; STATUS_GREEN_160: string; STATUS_GREEN_200: string; STATUS_GREEN_230: string; STATUS_GREEN_260: string; STATUS_GREEN_300: string; STATUS_GREEN_330: string; STATUS_GREEN_360: string; STATUS_GREEN_400: string; STATUS_GREEN_430: string; STATUS_GREEN_460: string; STATUS_GREEN_500: string; STATUS_GREEN: string; STATUS_GREEN_530: string; STATUS_GREEN_560: string; STATUS_GREEN_600: string; STATUS_GREEN_630: string; STATUS_GREEN_660: string; STATUS_GREEN_700: string; STATUS_GREEN_730: string; STATUS_GREEN_760: string; STATUS_GREEN_800: string; STATUS_GREEN_830: string; STATUS_GREEN_860: string; STATUS_GREEN_900: string; STATUS_GREY_100: string; STATUS_GREY_130: string; STATUS_GREY_160: string; STATUS_GREY_200: string; STATUS_GREY_230: string; STATUS_GREY_260: string; STATUS_GREY_300: string; STATUS_GREY_330: string; STATUS_GREY_360: string; STATUS_GREY_400: string; STATUS_GREY_430: string; STATUS_GREY_460: string; STATUS_GREY_500: string; STATUS_GREY: string; STATUS_GREY_530: string; STATUS_GREY_560: string; STATUS_GREY_600: string; STATUS_GREY_630: string; STATUS_GREY_660: string; STATUS_GREY_700: string; STATUS_GREY_730: string; STATUS_GREY_760: string; STATUS_GREY_800: string; STATUS_GREY_830: string; STATUS_GREY_860: string; STATUS_GREY_900: string; STATUS_ORANGE_100: string; STATUS_ORANGE_130: string; STATUS_ORANGE_160: string; STATUS_ORANGE_200: string; STATUS_ORANGE_230: string; STATUS_ORANGE_260: string; STATUS_ORANGE_300: string; STATUS_ORANGE_330: string; STATUS_ORANGE_360: string; STATUS_ORANGE_400: string; STATUS_ORANGE_430: string; STATUS_ORANGE_460: string; STATUS_ORANGE_500: string; STATUS_ORANGE: string; STATUS_ORANGE_530: string; STATUS_ORANGE_560: string; STATUS_ORANGE_600: string; STATUS_ORANGE_630: string; STATUS_ORANGE_660: string; STATUS_ORANGE_700: string; STATUS_ORANGE_730: string; STATUS_ORANGE_760: string; STATUS_ORANGE_800: string; STATUS_ORANGE_830: string; STATUS_ORANGE_860: string; STATUS_ORANGE_900: string; FOCUS_PRIMARY_100: string; FOCUS_PRIMARY_130: string; FOCUS_PRIMARY_160: string; FOCUS_PRIMARY_200: string; FOCUS_PRIMARY_230: string; FOCUS_PRIMARY_260: string; FOCUS_PRIMARY_300: string; FOCUS_PRIMARY_330: string; FOCUS_PRIMARY_360: string; FOCUS_PRIMARY_400: string; FOCUS_PRIMARY_430: string; FOCUS_PRIMARY_460: string; FOCUS_PRIMARY_500: string; FOCUS_PRIMARY: string; FOCUS_PRIMARY_530: string; FOCUS_PRIMARY_560: string; FOCUS_PRIMARY_600: string; FOCUS_PRIMARY_630: string; FOCUS_PRIMARY_660: string; FOCUS_PRIMARY_700: string; FOCUS_PRIMARY_730: string; FOCUS_PRIMARY_760: string; FOCUS_PRIMARY_800: string; FOCUS_PRIMARY_830: string; FOCUS_PRIMARY_860: string; FOCUS_PRIMARY_900: string; LINK_100: string; LINK_130: string; LINK_160: string; LINK_200: string; LINK_230: string; LINK_260: string; LINK_300: string; LINK_330: string; LINK_360: string; LINK_400: string; LINK_430: string; LINK_460: string; LINK_500: string; LINK: string; LINK_530: string; LINK_560: string; LINK_600: string; LINK_630: string; LINK_660: string; LINK_700: string; LINK_730: string; LINK_760: string; LINK_800: string; LINK_830: string; LINK_860: string; LINK_900: string; LINK_LOW_SATURATION_100: string; LINK_LOW_SATURATION_130: string; LINK_LOW_SATURATION_160: string; LINK_LOW_SATURATION_200: string; LINK_LOW_SATURATION_230: string; LINK_LOW_SATURATION_260: string; LINK_LOW_SATURATION_300: string; LINK_LOW_SATURATION_330: string; LINK_LOW_SATURATION_360: string; LINK_LOW_SATURATION_400: string; LINK_LOW_SATURATION_430: string; LINK_LOW_SATURATION_460: string; LINK_LOW_SATURATION_500: string; LINK_LOW_SATURATION: string; LINK_LOW_SATURATION_530: string; LINK_LOW_SATURATION_560: string; LINK_LOW_SATURATION_600: string; LINK_LOW_SATURATION_630: string; LINK_LOW_SATURATION_660: string; LINK_LOW_SATURATION_700: string; LINK_LOW_SATURATION_730: string; LINK_LOW_SATURATION_760: string; LINK_LOW_SATURATION_800: string; LINK_LOW_SATURATION_830: string; LINK_LOW_SATURATION_860: string; LINK_LOW_SATURATION_900: string; LINK_LIGHT_100: string; LINK_LIGHT_130: string; LINK_LIGHT_160: string; LINK_LIGHT_200: string; LINK_LIGHT_230: string; LINK_LIGHT_260: string; LINK_LIGHT_300: string; LINK_LIGHT_330: string; LINK_LIGHT_360: string; LINK_LIGHT_400: string; LINK_LIGHT_430: string; LINK_LIGHT_460: string; LINK_LIGHT_500: string; LINK_LIGHT: string; LINK_LIGHT_530: string; LINK_LIGHT_560: string; LINK_LIGHT_600: string; LINK_LIGHT_630: string; LINK_LIGHT_660: string; LINK_LIGHT_700: string; LINK_LIGHT_730: string; LINK_LIGHT_760: string; LINK_LIGHT_800: string; LINK_LIGHT_830: string; LINK_LIGHT_860: string; LINK_LIGHT_900: string; WHITE_100: string; WHITE_130: string; WHITE_160: string; WHITE_200: string; WHITE_230: string; WHITE_260: string; WHITE_300: string; WHITE_330: string; WHITE_360: string; WHITE_400: string; WHITE_430: string; WHITE_460: string; WHITE_500: string; WHITE: string; WHITE_530: string; WHITE_560: string; WHITE_600: string; WHITE_630: string; WHITE_660: string; WHITE_700: string; WHITE_730: string; WHITE_760: string; WHITE_800: string; WHITE_830: string; WHITE_860: string; WHITE_900: string; BLACK_100: string; BLACK_130: string; BLACK_160: string; BLACK_200: string; BLACK_230: string; BLACK_260: string; BLACK_300: string; BLACK_330: string; BLACK_360: string; BLACK_400: string; BLACK_430: string; BLACK_460: string; BLACK_500: string; BLACK: string; BLACK_530: string; BLACK_560: string; BLACK_600: string; BLACK_630: string; BLACK_660: string; BLACK_700: string; BLACK_730: string; BLACK_760: string; BLACK_800: string; BLACK_830: string; BLACK_860: string; BLACK_900: string; PREMIUM_TIER_2_PURPLE_500: string; PREMIUM_TIER_2_PURPLE: string; PREMIUM_TIER_2_PINK_500: string; PREMIUM_TIER_2_PINK: string; PREMIUM_TIER_1_PURPLE_500: string; PREMIUM_TIER_1_PURPLE: string; PREMIUM_TIER_1_BLUE_500: string; PREMIUM_TIER_1_BLUE: string; PREMIUM_GUILD_PINK_500: string; PREMIUM_GUILD_PINK: string; PREMIUM_GUILD_PURPLE_500: string; PREMIUM_GUILD_PURPLE: string; PREMIUM_GUILD_BLUE_500: string; PREMIUM_GUILD_BLUE: string; HYPESQUAD_HOUSE_1_500: string; HYPESQUAD_HOUSE_1: string; HYPESQUAD_HOUSE_2_500: string; HYPESQUAD_HOUSE_2: string; HYPESQUAD_HOUSE_3_500: string; HYPESQUAD_HOUSE_3: string; GOLD_500: string; GOLD: string; PARTNER_500: string; PARTNER: string; SKYPE_500: string; SKYPE: string; BATTLENET_500: string; BATTLENET: string; STEAM_500: string; STEAM: string; LOL_500: string; LOL: string; TWITCH_500: string; TWITCH: string; YOUTUBE_500: string; YOUTUBE: string; TWITTER_500: string; TWITTER: string; REDDIT_500: string; REDDIT: string; SPOTIFY_500: string; SPOTIFY: string; FACEBOOK_500: string; FACEBOOK: string; SAMSUNG_500: string; SAMSUNG: string; XBOX_500: string; XBOX: string; GITHUB_500: string; GITHUB: string; TRANSPARENT: string;
    };
}

declare module "@discord/i18n" {
    type locale = { name: string, englishName: string, code: string, postgresLang: string, enabled: boolean };
    export const languages: locale[];
    export const Messages: any;
    export const choosenLocale: string;
    export function getDefaultLocale(): string;
    export function getLocaleInfo(): locale;
    export function getLanguages(): locale[];
    export function getLocale(): string;
    export const loadPromise: Promise<void>;
    export function setLocale(locale: string): void;
    export const translationSiteURL: string;
    export const _proxyContext: {
        messages: any;
        locale: string;
        defaultMessages: any;
    };

    const Strings: {
        languages,
        Messages,
        choosenLocale,
        getDefaultLocale,
        getLocaleInfo,
        getLanguages,
        getLocale,
        loadPromise
        setLocale
        translationSiteURL
        _proxyContext
    };

    export default Strings;
}

declare module "@discord/stores" {
    export const Users: {
        getUser: (id: string) => UserObject;
        getUsers: () => UserObject[];
        getCurrentUser: () => UserObject;
    };

    export const SettingsStore: {
        status: "dnd" | "idle" | "online" | "offline";
    }

    export const Messages: {
        getMessage: (channelId: string, messageId: string) => {
            id: string;
            channel_id: string;
            content: string;
            mentions: string[];
            author: UserObject
        } | null;
        getMessages: (channelId: string) => any;
    };
    export const Channels: {
        getChannel: () => {
            id: string;
            name: string;
            description: string;
            guild_id: string;
            icon: null | string;
        } | null;
    };
    export const Guilds: {
        getGuild: (guildId: string) => GuildObject | null;
        getGuilds: () => GuildObject[];
    };
    export const SelectedGuilds: {
        getGuildId: () => string;
    };
    export const SelectedChannels: {
        getChannelId: () => string;
    }
    export const Info: {
        getSessionId: () => string;
    };
    export const Status: {
        getStatus(userId: string): void | "online" | "dnd" | "idle";
        getState(): { clientStatuses: any };
    };
    export type UserProfileConnection = {
        type: string;
        id: string;
        name: string;
        verified: boolean;

    };
    export const UserProfile: {
        getUserProfile(): undefined | {
            connectedAccounts: UserProfileConnection[]
        };
        isFetching: (userId: string) => boolean;
    };

    export const Members: {
        getMember: (guildId: string, userId: string) => any;
    };

    export const Activities: {
        getActivities: (userId: string) => Array<any>;
    };

    export const Games: {
        getGame: (application_id: string) => null | {
            getIconURL: () => string;
            name: string;
            id: string;
        }
    };

    /**
     * Be careful
     */
    export const Auth: {
        getId: () => string;
    };

    export const TypingUsers: {
        isTyping: (channelId: string, userId: string) => boolean;
    };
}

declare module "@discord/connections" {
    export type Connection = {
        color: string;
        enabled: boolean;
        getPlatformUserUrl: (user: Connection) => void;
        icon: {
            color: string;
            grey: string;
            svg: string;
            white: string;
        };
        name: string;
        type: string;
    };

    export function get(type: string): Error | Connection;
    export function map<T>(callbackFn: (connection: Connection, currentIndex: number, target: Array<T>) => any);
    export function isSupported(type: string): boolean;
    export function filter<T>(callbackFn: (connection: Connection, currentIndex: number, target: Array<T>) => boolean);

    const Connections: {
        get,
        map,
        isSupported,
        filter
    };

    export default Connections;
}

declare module "@discord/actions" {
    export const ProfileActions: {
        fetchProfile: (userId: string) => Promise<any>;
    }
}

declare module "@discord/contextmenu" {
    export function openContextMenu(event: MouseEvent, menu: () => ReactElement, options?: object): void;
    export function closeContextMenu(): void;
    export function MenuItem({ label, action, id }: { label: string, action: () => any, id: string }): ReactElement;
    export function MenuGroup({ children }: { children: any }): ReactElement;
    export function Menu({ children, navId, onClose }: { children: any, navId: string, onClose: Function }): ReactElement;
}

declare module "@discord/forms" {
    export function FormDivider({ className }: { className?: string }): any;
    export function FormItem(): any;
    export function FormNotice(): any;
    export const FormNoticeTypes: { PRIMARY: string, DANGER: string, WARNING: string, SUCCESS: string, BRAND: string, CUSTOM: string };
    export const FormNoticeImagePositions: { LEFT: string, RIGHT: string };
    export function FormSection(): any;
    export function FormText(): any;
    export const FormTextTypes: { DEFAULT: string, INPUT_PLACEHOLDER: string, DESCRIPTION: string, LABEL_BOLD: string, LABEL_SELECTED: string, LABEL_DESCRIPTOR: string };
    export function FormTitle(props: any): any;
    export const FormTitleTags: { H1: string, H2: string, H3: string, H4: string, H5: string, LABEL: string }
}

declare module "@discord/scrollbars" {
    export function ScrollerAuto(options: { className: string, children: any }): any;
    export function ScrollerThin(options: { className: string, children: any }): any;
    export default function Scroller(options: { className: string, children: any }): any;
}

declare module "@discord/native" {
    export function copy(text: string): void;
}

declare module "@discord/flux" {
    export class Store {
        _initialized: boolean;
        constructor(dispatcher: any, events: any)

        emitChange(): void;
        addChangeListener(): void;
        removeChangeListener(): boolean;
        waitFor(...stores: Store[]): void;
    }

    export function useStateFromStores(stores: Array<Store> | any[], collector: () => any, idk?: null, isEqual?: (previousState: any, partialState: any) => boolean): any;
    export function connectStores(stores: Array<Store>, collector: (props: any) => any): (props: any) => ReactElement;
}

declare module "@discord/modal" {
    export const ModalSize: { SMALL: "small", MEDIUM: "medium", LARGE: "large", DYNAMIC: "dynamic" };

    type ModalProps = { transitionState: 2 | 3, onClose: () => void };
    export function openModal(component: (props: ModalProps) => ReactElement): string;

    interface ModalRootProps {
        children?: ReactElement
    }
    export function ModalRoot(props: ModalRootProps): ReactElement;

    type ModalFooterProps = { children?: ReactElement, className?: string }
    export function ModalFooter(props: ModalFooterProps): ReactElement;

    type ModalHeaderProps = { children: ReactElement, className?: string };
    export function ModalHeader(props?: ModalHeaderProps): ReactElement;

    type ModalCloseButtonProps = { children?: ReactElement; focusProps?: any, onClick: (event: React.MouseEvent) => void, className?: string, hideOnFullscreen?: boolean };
    export function ModalCloseButton(props: ModalCloseButtonProps): ReactElement;

    type ModalContentProps = { children?: ReactElement, className?: string, scrollerRef?: (element: Element) => void };
    export function ModalContent(props: ModalContentProps): ReactElement;
}

declare module "@discord/classes" {
    export class Message {
        author: UserObject;
        content: string;
        id: string;
        timestamp: Date;
    }

    export class User {
        get banner(): string | null;
        getAvatarURL(): string | null;
        id: string;
        avatar: string;
        username: string;
        discriminator: string;
    }

    export class Channel {
        permissions: BigInt;
        name: string;
        id: string;
        icon: string | null;
        description: string;
    }

    export class Timestamp {
        constructor(timestamp: any)

        toDate(): Date;
        month: number;
    }

    const Classes: { Message, User, Channel, Timestamp };

    export default Classes;
}

declare module "@discord/sanitize" {
    export function decode(e, t?: any, n?: any, o?: any): any;
    export function encode(e, t?: any, n?: any, s?: any): any;
    export function parse(e, t?: any, n?: any, o?: any): any;
    export function stringify(e, t?: any, n?: any, s?: any): any;
}

declare module "@discord/icons" {
    // const Directions: {};
    export function Caret(props: { direction: string }): ReactElement;
    // Caret.Directions = Directions;
}