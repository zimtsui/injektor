"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SingletonProducer = void 0;
const exceptions_1 = require("../exceptions");
const assert = require("assert");
class SingletonProducer {
    constructor(producer) {
        this.producer = producer;
        this.locked = false;
    }
    getInstance() {
        if (typeof this.singleton === 'undefined') {
            assert(!this.locked, new exceptions_1.CircularConstructorInjection());
            this.locked = true;
            this.singleton = this.producer.getInstanceWithoutSetterInjection();
            this.locked = false;
            this.producer.setterInject(this.singleton);
        }
        return this.singleton;
    }
}
exports.SingletonProducer = SingletonProducer;
//# sourceMappingURL=singleton-producer.js.map