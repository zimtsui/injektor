"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConstructorInsideProducer = void 0;
const factory_inside_producer_1 = require("./factory-inside-producer");
const constructor_injector_1 = require("../injectors/constructor-injector");
class ConstructorInsideProducer {
    constructor(ctor, container) {
        this.factoryProducer = new factory_inside_producer_1.FactoryInsideProducer(() => constructor_injector_1.constructorInjector.inject(ctor, container), container);
    }
    getInstance() {
        return this.factoryProducer.getInstance();
    }
}
exports.ConstructorInsideProducer = ConstructorInsideProducer;
//# sourceMappingURL=constructor-inside-producer.js.map