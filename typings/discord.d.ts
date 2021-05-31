type ReactElement = React.ReactElement | JSX.Element;

declare namespace DiscordNative {
    export const fileManager: {
        saveWithDialog: (options: {title: string, properties: "openDirectory"}) => Promise<{filePaths: string[]}>;
    };
}

interface UserObject {
    id: string;
    avatarUrl: string;
    getAvatarURL: (type: "gif" | "webp" | "png") => string;
    createdAt: Date;
}

interface GuildObject {
    id: string;
    icon: string;
    name: string;
    description: string;
    getIconURL: (type: "gif" | "webp" | "png") => string;
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
    export default class Logger {
        constructor(module: string)

        log(...message): void;
        error(...message): void;
        info(...message): void;
        verbose(...message): void;
        trace(...message): void;
        warn(...message): void;
    }
}

declare module "@discord/components" {
    export type TooltipOptions = {text: string, position?: "top", spacing?: "8"};
    export function Tooltip(props: TooltipOptions): React.ReactElement;
    export function Tooltip(props: TooltipOptions): React.ReactElement;
    export function TextInput(props: {value: string, onChange: (value: string) => void, placeholder: string}): React.ReactElement;
    export function SlideIn(): React.ReactElement;
    export function TransitionGroup(): React.ReactElement;
    export function SettingsNotice({onSave, onReset}): React.ReactElement;

    /* Button */
    const ButtonSizes: {ICON: string, LARGE: string, MAX: string, MEDIUM: string, MIN: string, NONE: string, SMALL: string, TINY: string, XLARGE: string};

    const ButtonLooks: {BLANK: string, FILLED: string, INVERTED: string, LINK: string, OUTLINED: string};

    const DropdownSizes: {LARGE: "LARGE", MEDIUM: "MEDIUM", SMALL: "SMALL"};

    const ButtonColors: {BLACK: string; BRAND: string; GREEN: string; GREY: string; LINK: string; PRIMARY: string; RED: string; TRANSPARENT: string; WHITE: string; YELLOW: string;}

    export function Button(props: {children: any, looks: string, size: string, dropdownSize: string, color: string}): ReactElement;

    Button.Sizes = ButtonSizes;
    Button.Looks = ButtonLooks;
    Button.Colors = ButtonColors;
    Button.DropdownSizes = DropdownSizes;

    /* Flex */
    const FlexAlign: {START: string, END: string, CENTER: string, STRETCH: string, BASELINE: string};

    const FlexDirection: {VERTICAL: string, HORIZONTAL: string, HORIZONTAL_REVERSE: string};

    const FlexJustify: {START: string, END: string, CENTER: string, BETWEEN: string, AROUND: string};

    const FlexWrap: {NO_WRAP: string, WRAP: string, WRAP_REVERSE: string};

    function Child(props: FlexProps): ReactElement;

    type FlexProps = {
        align: string,
        direction: string,
        justify: string,
        wrap: string,
        grow: number,
        shrink: number,
    };
    export function Flex(props: FlexProps): ReactElement;
    Flex.Child = Child;

    Flex.Align = FlexAlign;
    Flex.Direction = FlexDirection;
    Flex.Justify = FlexJustify;
    Flex.Wrap = FlexWrap;

    const Sizes: {SIZE_10: string; SIZE_12: string; SIZE_14: string; SIZE_16: string; SIZE_20: string; SIZE_24: string; SIZE_32: string;}

    const Colors: {BRAND: string; CUSTOM: string; ERROR: string; HEADER_PRIMARY: string; HEADER_SECONDARY: string; INTERACTIVE_ACTIVE: string; INTERACTIVE_NORMAL: string; LINK: string; MUTED: string; STANDARD: string; STATUS_GREEN: string; STATUS_RED: string; STATUS_YELLOW: string;}

    type TextProps = {
        size: string;
        color: string;
    };

    export function Text(props: TextProps): ReactElement;

    Text.Colors = Colors;
    Text.Sizes = Size;
}

declare module "@discord/modules" {
    export const Dispatcher: {
        dispatch: ({type: string}) => void;
        subscribe: (event: string, listener: ({type: string}) => void) => void;
        unsubscribe: (event: string, listener: ({type: string}) => void) => void;
        dirtyDispatch: ({type: string}) => void;
    };
    export const EmojiUtils: {
        uploadEmoji: (guildId: string, emojiDataURI: string, name: string) => Promise<void>;
    };
    export const PermissionUtils: {
        can: (permission: bigint, user: UserObject, guild: GuildObject) => boolean;
    }
}

declare module "@discord/constants" {
    export const API_HOST: string;
    export const Permissions: object;
}

declare module "@discord/i18n" {
    type locale = {name: string, englishName: string, code: string, postgresLang: string, enabled: boolean};
    export const languages: locale[];
    export const Messags: object;
    export const choosenLocale: string;
    export function getDefaultLocale(): string;
    export function getLocaleInfo(): locale;
    export function getLanguages(): locale[];
    export function getLocale(): string;
    export const loadPromise: Promise<void>;
    export function setLocale(locale: string): void;
    export const translationSiteURL: string;
}

declare module "@discord/stores" {
    export const Users: {
        getUser: (id: string) => UserObject;
        getUsers: () => UserObject[];
    };

    export const SettingsStore: {
        get status(): "dnd" | "idle" | "online" | "offline";
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
        getCurrentUser(): UserObject;
    };
    export const Status: {
        getStatus(userId: string): void | "online" | "dnd" | "idle";
        getState(): {clientStatuses: any};
    }
}

declare module "@discord/contextmenu" {
    export function openContextMenu(event: MouseEvent, menu: () => React.ReactElement, options?: object): void;
    export function closeContextMenu(): void;
    export function MenuItem({label, action, id}: {label: string, action: () => any, id: string}): React.ReactElement;
    export function MenuGroup({children}: {children: any}): React.ReactElement;
    export default function ContextMenu({children, navId, onClose}: {children: any, navId: string, onClose: Function}): React.ReactElement;
}

declare module "@discord/forms" {
    export function FormDivider(): any;
    export function FormItem(): any;
    export function FormNotice(): any;
    export const FormNoticeTypes: {PRIMARY: string, DANGER: string, WARNING: string, SUCCESS: string, BRAND: string, CUSTOM: string};
    export const FormNoticeImagePositions: {LEFT: string, RIGHT: string};
    export function FormSection(): any;
    export function FormText(): any;
    export const FormTextTypes: {DEFAULT: string, INPUT_PLACEHOLDER: string, DESCRIPTION: string, LABEL_BOLD: string, LABEL_SELECTED: string, LABEL_DESCRIPTOR: string};
    export function FormTitle(): any;
    export const FormTitleTags: {H1: string, H2: string, H3: string, H4: string, H5: string, LABEL: string}
}

declare module "@discord/scrollbars" {
    export function ScrollerAuto(options: {className: string, children: any}): any;
    export function ScrollerThin(options: {className: string, children: any}): any;
    export default function Scroller(options: {className: string, children: any}): any;
}

declare module "@discord/native" {
    export function copy(text: string): void;
}

declare module "@discord/flux" {
    export class Store {
        emitChanges(): void;
        addChangeListener(): void;
        removeChangeListener(): boolean;
    }

    export function useStateFromStores(stores: Array<Flux>, collector: () => any): any;
}

declare module "@discord/modal" {
    export const ModalSize: {SMALL: "small", MEDIUM: "medium", LARGE: "large", DYNAMIC: "dynamic"};
    
    type ModalProps = {transitionState: 2 | 3, onClose: () => void};
    export function openModal(component: (props: ModalProps) => React.ReactElement | JSX.Element): string;
    
    interface ModalRootProps extends ModalProps {
        children: ReactElement
    }
    export function ModalRoot(props: ModalRootProps): ReactElement;
    
    type ModalFooterProps = {children: ReactElement, className?: string}
    export function ModalFooter(props: ModalFooterProps): ReactElement;

    type ModalHeaderProps = {children: ReactElement, className?: string};
    export function ModalHeader(props: ModalHeaderProps): ReactElement;

    type ModalCloseButtonProps = {focusProps: any, onClick: (event: React.MouseEvent) => void, className?: string, hideOnFullscreen?: boolean};
    export function ModalCloseButton(props: ModalCloseButtonProps): ReactElement;

    type ModalContentProps = {children: ReactElement, className?: string, scrollerRef: (element: Element) => void};
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
        toDate(): Date;
        month: number;
    }

    const Classes = {Message, User, Channel, Timestamp};

    export default Classes;
}