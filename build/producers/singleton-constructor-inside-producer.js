"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SingletonConstructorInsideProducer = void 0;
const singleton_producer_1 = require("./singleton-producer");
const constructor_inside_producer_1 = require("./constructor-inside-producer");
class SingletonConstructorInsideProducer extends singleton_producer_1.SingletonProducer {
    constructor(ctor, container) {
        const producer = new constructor_inside_producer_1.ConstructorInsideProducer(ctor, container);
        super(producer);
    }
}
exports.SingletonConstructorInsideProducer = SingletonConstructorInsideProducer;
//# sourceMappingURL=singleton-constructor-inside-producer.js.map