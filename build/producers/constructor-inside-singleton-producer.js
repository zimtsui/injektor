"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConstructorInsideSingletonProducer = void 0;
const singleton_producer_1 = require("./singleton-producer");
const multition_constructor_inside_producer_1 = require("./multition-constructor-inside-producer");
class ConstructorInsideSingletonProducer extends singleton_producer_1.SingletonProducer {
    constructor(ctor, container) {
        const producer = new multition_constructor_inside_producer_1.MultitionConstructorInsideProducer(ctor, container);
        super(producer);
    }
}
exports.ConstructorInsideSingletonProducer = ConstructorInsideSingletonProducer;
//# sourceMappingURL=constructor-inside-singleton-producer.js.map