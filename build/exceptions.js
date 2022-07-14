"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CircularConstructorInjection = exports.NotRegistered = exports.NotContructorInjected = exports.NotSetterInjected = void 0;
class NotSetterInjected extends Error {
    constructor(ctorName, propName) {
        super(`${ctorName}'s prop #${propName}`);
    }
}
exports.NotSetterInjected = NotSetterInjected;
class NotContructorInjected extends Error {
    constructor(ctorName, paramIndex) {
        super(`${ctorName}'s parameter #${paramIndex}`);
    }
}
exports.NotContructorInjected = NotContructorInjected;
class NotRegistered extends Error {
    constructor(idName) {
        super(`Id ${idName}`);
    }
}
exports.NotRegistered = NotRegistered;
class CircularConstructorInjection extends Error {
}
exports.CircularConstructorInjection = CircularConstructorInjection;
//# sourceMappingURL=exceptions.js.map