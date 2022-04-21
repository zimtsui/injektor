"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CircularConstructorInjection = exports.Unregistered = exports.NotInjected = void 0;
class NotInjected extends Error {
    constructor(name) {
        if (typeof name === 'symbol')
            super(`Symbol property ${name.description} hasn't been injected.`);
        else
            super(`Property ${name} hasn't been injected.`);
    }
}
exports.NotInjected = NotInjected;
class Unregistered extends Error {
    constructor() {
        super('Interface identifier is not registered.');
    }
}
exports.Unregistered = Unregistered;
class CircularConstructorInjection extends Error {
    constructor() {
        super('Circular constructor injection.');
    }
}
exports.CircularConstructorInjection = CircularConstructorInjection;
//# sourceMappingURL=exceptions.js.map