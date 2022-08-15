"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FactoryInsideSingletonProducer = void 0;
const singleton_producer_1 = require("./singleton-producer");
const factory_inside_multition_producer_1 = require("./factory-inside-multition-producer");
class FactoryInsideSingletonProducer extends singleton_producer_1.SingletonProducer {
    constructor(factory, container) {
        const producer = new factory_inside_multition_producer_1.FactoryInsideMultitionProducer(factory, container);
        super(producer);
    }
}
exports.FactoryInsideSingletonProducer = FactoryInsideSingletonProducer;
//# sourceMappingURL=factory-inside-singleton-producer.js.map