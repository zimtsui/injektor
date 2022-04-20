"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FactoryInsideSingletonProducer = void 0;
const singleton_producer_1 = require("./singleton-producer");
const multition_factory_inside_producer_1 = require("./multition-factory-inside-producer");
class FactoryInsideSingletonProducer extends singleton_producer_1.SingletonProducer {
    constructor(factory, container) {
        const producer = new multition_factory_inside_producer_1.MultitionFactoryInsideProducer(factory, container);
        super(producer);
    }
}
exports.FactoryInsideSingletonProducer = FactoryInsideSingletonProducer;
//# sourceMappingURL=factory-inside-singleton-producer.js.map