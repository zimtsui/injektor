"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CircularConstructorInjection = exports.Unregistered = exports.NotContructorInjected = exports.NotSetterInjected = void 0;
class NotSetterInjected extends Error {
    constructor(name) {
        if (typeof name === 'symbol')
            super(`Symbol property ${name.description} hasn't been injected.`);
        else
            super(`Property ${name} hasn't been injected.`);
    }
}
exports.NotSetterInjected = NotSetterInjected;
class NotContructorInjected extends Error {
    constructor(index) {
        let s = index.toString();
        if (s.endsWith('1'))
            s += 'st';
        else if (s.endsWith('2'))
            s += 'nd';
        else if (s.endsWith('3'))
            s += 'rd';
        else
            s += 'th';
        super(`The ${s} argument is not injected.`);
    }
}
exports.NotContructorInjected = NotContructorInjected;
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