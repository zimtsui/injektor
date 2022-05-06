"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.inject = exports.lazyInject = exports.instantInject = void 0;
const instant_setter_injector_1 = require("./injectors/instant-setter-injector");
exports.instantInject = instant_setter_injector_1.instantSetterInjector.decorator;
const lazy_setter_injection_1 = require("./injectors/lazy-setter-injection");
exports.lazyInject = lazy_setter_injection_1.lazySetterInjector.decorator;
const constructor_injector_1 = require("./injectors/constructor-injector");
exports.inject = constructor_injector_1.constructorInjector.decorator;
//# sourceMappingURL=decorators.js.map