"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CircularConstructorInjection = exports.NotRegistered = exports.NotContructorInjected = exports.NotSetterInjected = void 0;
class NotSetterInjected extends Error {
}
exports.NotSetterInjected = NotSetterInjected;
class NotContructorInjected extends Error {
}
exports.NotContructorInjected = NotContructorInjected;
class NotRegistered extends Error {
}
exports.NotRegistered = NotRegistered;
class CircularConstructorInjection extends Error {
}
exports.CircularConstructorInjection = CircularConstructorInjection;
//# sourceMappingURL=exceptions.js.map