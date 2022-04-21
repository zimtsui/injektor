"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.inject = exports.lazyInject = exports.instantInject = exports.Container = void 0;
var container_1 = require("./container/container");
Object.defineProperty(exports, "Container", { enumerable: true, get: function () { return container_1.Container; } });
__exportStar(require("./exceptions"), exports);
const instant_setter_injector_1 = require("./injectors/instant-setter-injector");
exports.instantInject = instant_setter_injector_1.instantSetterInjector.decorator;
const lazy_setter_injection_1 = require("./injectors/lazy-setter-injection");
exports.lazyInject = lazy_setter_injection_1.lazySetterInjector.decorator;
const constructor_injector_1 = require("./injectors/constructor-injector");
exports.inject = constructor_injector_1.constructorInjector.decorator;
//# sourceMappingURL=index.js.map