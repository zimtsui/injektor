"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.inject = exports.lazyInject = exports.instantInject = exports.Unregistered = exports.NotInjected = exports.Container = void 0;
var container_1 = require("./container/container");
Object.defineProperty(exports, "Container", { enumerable: true, get: function () { return container_1.Container; } });
var exceptions_1 = require("./exceptions");
Object.defineProperty(exports, "NotInjected", { enumerable: true, get: function () { return exceptions_1.NotInjected; } });
Object.defineProperty(exports, "Unregistered", { enumerable: true, get: function () { return exceptions_1.Unregistered; } });
const instant_setter_injector_1 = require("./injectors/instant-setter-injector");
exports.instantInject = instant_setter_injector_1.instantSetterInjector.decorator;
const lazy_setter_injection_1 = require("./injectors/lazy-setter-injection");
exports.lazyInject = lazy_setter_injection_1.lazySetterInjector.decorator;
const constructor_injector_1 = require("./injectors/constructor-injector");
exports.inject = constructor_injector_1.constructorInjector.decorator;
//# sourceMappingURL=index.js.map