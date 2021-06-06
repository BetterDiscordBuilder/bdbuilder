import {PluginUtilities} from "@zlibrary";
import {Store} from "@discord/flux";
import {Dispatcher} from "@discord/modules";

/// <reference path="../../typings/discord.d.ts"/>

export default class SettingsManager extends Store {
    constructor(pluginName) {
        super(Dispatcher, {});
        this.pluginName = pluginName;
        this.settings = PluginUtilities.loadSettings(pluginName, {});
    }

    get = (key, defaultValue) => {
        return this.settings[key] ?? defaultValue;
    }

    set = (key, value) => {
        this.settings[key] = value;
        PluginUtilities.saveSettings(this.pluginName, this.settings);
        this.emitChange();
    }
}