"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SingletonFactoryInsideProducer = void 0;
const singleton_producer_1 = require("./singleton-producer");
const multition_factory_inside_producer_1 = require("./multition-factory-inside-producer");
class SingletonFactoryInsideProducer extends singleton_producer_1.SingletonProducer {
    constructor(factory, container) {
        const producer = new multition_factory_inside_producer_1.MultitionFactoryInsideProducer(factory, container);
        super(producer);
    }
}
exports.SingletonFactoryInsideProducer = SingletonFactoryInsideProducer;
//# sourceMappingURL=singleton-factory-inside-producer.js.map