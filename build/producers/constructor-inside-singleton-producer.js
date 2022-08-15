"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConstructorInsideSingletonProducer = void 0;
const singleton_producer_1 = require("./singleton-producer");
const constructor_inside_multition_producer_1 = require("./constructor-inside-multition-producer");
class ConstructorInsideSingletonProducer extends singleton_producer_1.SingletonProducer {
    constructor(ctor, container) {
        const producer = new constructor_inside_multition_producer_1.ConstructorInsideMultitionProducer(ctor, container);
        super(producer);
    }
}
exports.ConstructorInsideSingletonProducer = ConstructorInsideSingletonProducer;
//# sourceMappingURL=constructor-inside-singleton-producer.js.map