import fs from "fs-extra";
import path from "path";
import CONSTANTS from "./constants";
import {getBuilderConfig} from "./utils";

const Logger = new class Logger {
    constructor() {
        const config = getBuilderConfig();
        fs.ensureDirSync(CONSTANTS.DEBUG_LOGS);
        if (config.debug) this.stream = fs.createWriteStream(path.join(CONSTANTS.DEBUG_LOGS, `${new Date().toLocaleDateString().replace(/\//, "g")}.log`), "utf8");
    }

    _log(type = "MESSAGE:", ...message) {
        const args = [new Date().toLocaleTimeString(), type, ...message];
        console.log.apply(null, args);
        if (this.stream) {
            this.stream.write(args.join(" "));
        }
    }

    log(...message) {
        return this._log("MESSAGE:", ...message);
    }

    warn(...message) {
        return this._log("WARN:", ...message);
    }

    error(...message) {
        return this._log("ERROR:", ...message);
    }
};

export default Logger;