"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InjectionConflict = exports.NotInjected = void 0;
class NotInjected extends Error {
    constructor(name) {
        if (typeof name === 'symbol')
            super(`Symbol property ${name.description} hasn't been injected.`);
        else
            super(`Property ${name} hasn't been injected.`);
    }
}
exports.NotInjected = NotInjected;
class InjectionConflict extends Error {
    constructor() {
        super('Injection may conflict with other injection.');
    }
}
exports.InjectionConflict = InjectionConflict;
//# sourceMappingURL=interfaces.js.map