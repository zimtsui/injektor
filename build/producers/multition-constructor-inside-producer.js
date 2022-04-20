"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MultitionConstructorInsideProducer = void 0;
const multition_factory_inside_producer_1 = require("./multition-factory-inside-producer");
const constructor_injector_1 = require("../injectors/constructor-injector");
class MultitionConstructorInsideProducer {
    constructor(ctor, container) {
        this.factoryProducer = new multition_factory_inside_producer_1.MultitionFactoryInsideProducer(() => constructor_injector_1.constructorInjector.inject(ctor, container), container);
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
exports.MultitionConstructorInsideProducer = MultitionConstructorInsideProducer;
//# sourceMappingURL=multition-constructor-inside-producer.js.map