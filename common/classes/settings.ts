import { PluginUtilities } from "@zlibrary";
import { Store } from "@discord/flux";
import { Dispatcher } from "@discord/modules";

/// <reference path="../../typings/discord.d.ts"/>

export default class SettingsManager extends Store {
    settings: any;
    pluginName: string;
    constructor(pluginName) {
        super(Dispatcher, {});
        this.pluginName = pluginName;
        this.settings = PluginUtilities.loadSettings(pluginName, {});
    }

    get = <T>(key: string, defaultValue?: T): T => {
        return this.settings[key] ?? defaultValue;
    }

    set = <T>(key: string, value: T): T => {
        this.settings[key] = value;
        PluginUtilities.saveSettings(this.pluginName, this.settings);
        this.emitChange();

        return value;
    }
}