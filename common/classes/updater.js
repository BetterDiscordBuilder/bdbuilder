export default class Updater {
    constructor() {
        const updates = this.events = Array.from(arguments).flat(10);

        for (const event of updates) {
            if (~["on", "off", "subscribe", "unsubscribe", "events"].indexOf(event)) continue;

            const eventFunction = this[event] = listener => eventFunction.on(listener);

            Object.assign(eventFunction, {
                listeners: new Set(),
                subscribe(listener) {
                    if (typeof listener !== "function") throw new Error("Argument 'Listener' must be a function. Received " + typeof listener);
                    return this.listeners.add(listener), () => this.listeners.delete(listener);
                },
                unsubscribe(listener) {return this.listeners.delete(listener);},
                emit(...args) {return this.listeners.forEach(listener => listener(...args));},
                get on() {return this.subscribe;},
                get off() {return this.unsubscribe;}
            });
        }
    }

    unsubscribe(event, listener) {
        if (!this[event] || typeof listener !== "function") throw new Error("Invalid arguments.");
        
        return this[event].unsubscribe(listener);
    }

    subscribe(event, listener) {
        if (!this[event] || typeof listener !== "function") throw new Error("Invalid arguments.");

        return this[event].subscribe(listener);
    }

    emit(event, ...args) {
        if (!this[event]) throw new Error("Invalid arguments.");

        return this[event].emit(...args);
    }

    emitAll(...args) {
        for (const event of this.events) {
            this[event].emit(...args);
        }
    }

    get on() {return this.subscribe;}
    get off() {return this.unsubscribe;}
}