"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SingletonFactoryInsideProducer = void 0;
const singleton_producer_1 = require("./singleton-producer");
const factory_inside_producer_1 = require("./factory-inside-producer");
class SingletonFactoryInsideProducer extends singleton_producer_1.SingletonProducer {
    constructor(factory, container) {
        const producer = new factory_inside_producer_1.FactoryInsideProducer(factory, container);
        super(producer);
    }
}
exports.SingletonFactoryInsideProducer = SingletonFactoryInsideProducer;
//# sourceMappingURL=singleton-factory-inside-producer.js.map