"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.inject = exports.lazyInject = exports.instantInject = exports.NotInjected = exports.Unregistered = exports.Container = void 0;
var container_1 = require("./container/container");
Object.defineProperty(exports, "Container", { enumerable: true, get: function () { return container_1.Container; } });
var container_like_1 = require("./container/container-like");
Object.defineProperty(exports, "Unregistered", { enumerable: true, get: function () { return container_like_1.Unregistered; } });
var setter_injection_like_1 = require("./injectors/setter-injection-like");
Object.defineProperty(exports, "NotInjected", { enumerable: true, get: function () { return setter_injection_like_1.NotInjected; } });
const instant_setter_injector_1 = require("./injectors/instant-setter-injector");
exports.instantInject = instant_setter_injector_1.instantSetterInjector.decorator;
const lazy_setter_injection_1 = require("./injectors/lazy-setter-injection");
exports.lazyInject = lazy_setter_injection_1.lazySetterInjector.decorator;
const constructor_injector_1 = require("./injectors/constructor-injector");
exports.inject = constructor_injector_1.constructorInjector.decorator;
//# sourceMappingURL=index.js.map