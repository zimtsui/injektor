"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FactoryInsideMultitionProducer = void 0;
const instant_setter_injector_1 = require("../injectors/instant-setter-injector");
const lazy_setter_injection_1 = require("../injectors/lazy-setter-injection");
class FactoryInsideMultitionProducer {
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
exports.FactoryInsideMultitionProducer = FactoryInsideMultitionProducer;
function isHost(x) {
    return typeof x === 'object' && x !== null;
}
//# sourceMappingURL=factory-inside-multition-producer.js.map