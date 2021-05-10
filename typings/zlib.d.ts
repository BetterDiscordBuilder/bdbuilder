interface ReactComponent {
    component: any;
    selector: string | null;
    filter: (m) => boolean;
    forceUpdateAll: () => void;
}

type PatcherCallback = (thisObject: any, methodArguments: any[], returnValue: any) => any;

declare module "__discordmodules" {
    export const APIModule: {get: (url, options) => Promise<any>};

    export const MessageStore: {getMessage: (channelId: string, messageId: string) => any};
    export const DiscordConstants: {
        Endpoints: {MESSAGES: (channelId: string) => string;};
    };
    export const Dispatcher: {
        dirtyDispatch: (options: {type: string}) => void
    }
}

declare module "@zlibrary" {
    export const Logger = {
        log: (...message) => void 0,
        warn: (...message) => void 0,
        error: (...message) => void 0,
        stacktrace: (...message) => void 0,
        info: (...message) => void 0,
        debug: (...messsage) => void 0,
        err: (...message) => void 0
    };

    export class Utilities {
        static getNestedProp(object: any, path: string): any;
        static findInTree(tree: any, filter: (item: any) => Boolean): any;
        static findInReactTree(tree: any, filter: (item: any) => Boolean): any;
        static formatString(string: string, options: object): string;
        static suppressErrors(func: Function, description: string): (...args) => any;
    }

    export class ReactComponents {
        static getComponentByName(name: string, selector: string): Promise<ReactComponent>;
    }

    export const Patcher = {
        unpatchAll: () => void 0,
        after: (module: any, method: string, callback: PatcherCallback) => () => void 0,
        before: (module: any, method: string, callback: PatcherCallback) => () => void 0,
        instead: (module: any, method: string, callback: PatcherCallback) => () => void 0,
    }

    export const Components: {
        ErrorBoundary: class;
    }

    export * as DiscordModules from "__discordmodules";

    export class WebpackModules {
        static getByProps(...props: string[]): void | any;
        static getByDisplayName(displayName: string): void | any;
        static getByPrototypes(...prototypes: string[]): void | any;
        static getModule(filter: (m: any) => Boolean, first?: true): void | any;
        static find(filter: (m: any) => Boolean): void | any;
        static findAll(filter: (m: any) => Boolean): void | any[];
        static findByUniqueProperties(props: string[], first?: false): any | any[];
    }

    export class ColorConverter {
        static hex2int(hex: string): number;
    }

    export class ReactTools {
        static getOwnerInstance(node: Element): any;
        static createWrappedElement(element: Element): React.ReactElement;
        static wrapElement(element: Element): React.ComponentClass;
    }

    export class DOMTools {
        static parseHTML(htmlString: string): Element | Element[];
    }

    export class PluginUtilities {
        static loadSettings(pluginName: string, defaultConfig: object): object;
        static saveSettings(pluginName: string, settings: object): void;
    }

    export class DCM {
        static buildMenuChildren(setup: Array<{label: string, action: (event: any) => void}>): any;
    }

    export class DiscordContextMenu extends DCM {};
}

declare module "@zlibrary/discord" {
    export * from "__discordmodules";
}

declare module "@zlibrary/plugin" {
    export default class BasePlugin {
        getName(): string;
        getAuthor(): string;
        getDescription(): string;
        getVersion(): string;
        onStart(): void;
        onStop(): void;
        onSwitch(): void;
        obsever(mutation: MutationEvent): void;
        buildSettingsPanel(): {
            getElement: () => Element,
            addListener: (callback: () => void) => void
        };
    }
}