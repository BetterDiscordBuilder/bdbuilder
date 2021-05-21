declare namespace React {
    export interface ReactElement {}
    export interface ComponentClass {}
    export type DispatchWithoutAction = () => void;
}

interface ReactComponent {
    component: any;
    selector: string | null;
    filter: (m) => boolean;
    forceUpdateAll: () => void;
}

type PatcherCallback = (thisObject: any, methodArguments: any[], returnValue: any) => any;

declare module "@zlibrary/discord" {
    export const APIModule: {get: (url, options) => Promise<any>};

    export const MessageStore: {getMessage: (channelId: string, messageId: string) => any};
    export const DiscordConstants: {
        Endpoints: {MESSAGES: (channelId: string) => string;};
    };
    export const Dispatcher: {
        dirtyDispatch: (options: {type: string}) => void
    }
    export const ModalActions: {
        openModal: (props: {onClose: () => void, transitionState: "1" | "2" | "3"}) => any;
    }
}

declare module "@zlibrary" {
    export const Logger: {
        log: (...message: any) => void,
        warn: (...message: any) => void,
        error: (...message: any) => void,
        stacktrace: (...message: any) => void,
        info: (...message: any) => void,
        debug: (...messsage: any) => void,
        err: (...message: any) => void
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

    export const Patcher: {
        unpatchAll: () => void,
        after: (module: any, method: string, callback: PatcherCallback) => () => void,
        before: (module: any, method: string, callback: PatcherCallback) => () => void,
        instead: (module: any, method: string, callback: PatcherCallback) => () => void,
    }

    export const Components: {
        ErrorBoundary: any;
    }

    export * as DiscordModules from "@zlibrary/discord";

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

    type MenuItem = {label: string, action: (event: any) => void};
    export class DCM {
        static buildMenuChildren(setup: Array<MenuItem>): any;
        static buildMenuItem(options: MenuItem): any; 
    }

    export class DiscordContextMenu extends DCM {}

    type ToastOptions = {
        type: "info" | "error" | "warning" | "success";
        timeout: number;
    };
    export class Toasts {
        static show(content: string, options: ToastOptions): void;
        static success(content: string, options: ToastOptions): void;
        static warning(content: string, options: ToastOptions): void;
        static error(content: string, options: ToastOptions): void;
        static info(content: string, options: ToastOptions): void;
    }

    type ConfirmModalOptions = {
        cancelText: string;
        confirmText: string;
        onConfirm: () => void;
        onCancel: () => void;
        danger: boolean;
    };
    export class Modals {
        static showConfirmationModal(title: string, content: string, options?: ConfirmModalOptions): void
    }
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