"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MultitionFactoryInsideProducer = void 0;
const instant_setter_injector_1 = require("../injectors/instant-setter-injector");
const lazy_setter_injection_1 = require("../injectors/lazy-setter-injection");
class MultitionFactoryInsideProducer {
    constructor(factory, container) {
        this.factory = factory;
        this.container = container;
    }
    getInstance() {
        const instance = this.getInstanceWithoutSetterInjection();
        return this.setterInject(instance);
    }
    getInstanceWithoutSetterInjection() {
        return this.factory();
    }
    setterInject(instance) {
        if (!isHost(instance))
            return instance;
        instant_setter_injector_1.instantSetterInjector.inject(instance, this.container);
        lazy_setter_injection_1.lazySetterInjector.inject(instance, this.container);
        return instance;
    }
}
exports.MultitionFactoryInsideProducer = MultitionFactoryInsideProducer;
function isHost(x) {
    return typeof x === 'object' && x !== null;
}
//# sourceMappingURL=multition-factory-inside-producer.js.map