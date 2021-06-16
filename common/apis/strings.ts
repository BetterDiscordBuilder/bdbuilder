import Strings from "@discord/i18n";
import { SettingsStore } from '@discord/stores';

const loadedStrings = {};

// @ts-ignore
SettingsStore.addChangeListener(injectStrings);

function injectStrings() {
    Object.assign(Strings._proxyContext.messages, loadedStrings[Strings.getLocale()] ?? {});
    if (loadedStrings["en-US"]) Object.assign(Strings._proxyContext.defaultMessages, loadedStrings["en-US"]);
};

export function addStrings(locale: string, strings: any) {
    if (!loadedStrings[locale]) loadedStrings[locale] = {};
    Object.assign(loadedStrings[locale], strings);

    injectStrings();
};

export function removeStrings(locale: string, strings: any) {
    if (!loadedStrings[locale]) return;
    for (let str in strings) {
        delete loadedStrings[locale][str];
    }

    injectStrings();
};

export function addStringsObject(strings: any) {
    for (let locale in strings) {
        addStrings(locale, strings[locale]);
    }
};

export function removeStringsObject(strings: any) {
    for (let locale in strings) {
        removeStrings(locale, strings[locale]);
    }
}

const LocaleManager = { addStringsObject, addStrings, removeStringsObject, removeStrings };

export default LocaleManager;