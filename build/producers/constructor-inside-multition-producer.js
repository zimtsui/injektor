"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConstructorInsideMultitionProducer = void 0;
const factory_inside_multition_producer_1 = require("./factory-inside-multition-producer");
const constructor_injector_1 = require("../injectors/constructor-injector");
class ConstructorInsideMultitionProducer {
    constructor(ctor, container) {
        this.factoryProducer = new factory_inside_multition_producer_1.FactoryInsideMultitionProducer(() => constructor_injector_1.constructorInjector.inject(ctor, container), container);
    }
    getInstance() {
        return this.factoryProducer.getInstance();
    }
    getInstanceWithoutSetterInjection() {
        return this.factoryProducer.getInstanceWithoutSetterInjection();
    }
    setterInject(instance) {
        return this.factoryProducer.setterInject(instance);
    }
}
exports.ConstructorInsideMultitionProducer = ConstructorInsideMultitionProducer;
//# sourceMappingURL=constructor-inside-multition-producer.js.map