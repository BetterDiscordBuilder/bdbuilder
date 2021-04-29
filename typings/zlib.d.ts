interface ReactComponent {
    component: any;
    selector: string | null;
    filter: (m) => boolean;
    forceUpdateAll: () => void;
}

type PatcherCallback = (thisObject: any, methodArguments: any[], returnValue: any) => any;

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
    }

    export class ReactComponents {
        static getComponentByName(name: string, selector: string): ReactComponent;
    }

    export const Patcher = {
        unpatchAll: () => void 0,
        after: (module: any, method: string, callback: PatcherCallback) => () => void 0,
        before: (module: any, method: string, callback: PatcherCallback) => () => void 0,
        instead: (module: any, method: string, callback: PatcherCallback) => () => void 0,
    }

    export class WebpackModules {
        static getByProps(...props: string[]): void | any;
        static getByDisplayName(displayName: string): void | any;
        static getModule(filter: (m: any) => Boolean, first?: true): void | any;
        static find(filter: (m: any) => Boolean): void | any;
        static findAll(filter: (m: any) => Boolean): void | any[];
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