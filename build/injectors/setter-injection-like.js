"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotInjected = void 0;
class NotInjected extends Error {
    constructor(name) {
        if (typeof name === 'symbol')
            super(`Symbol property ${name.description} hasn't been injected.`);
        else
            super(`Property ${name} hasn't been injected.`);
    }
}
exports.NotInjected = NotInjected;
//# sourceMappingURL=setter-injection-like.js.map