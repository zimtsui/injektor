"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SingletonProducer = void 0;
const assert = require("assert");
class SingletonProducer {
    constructor(producer) {
        this.producer = producer;
        this.locked = false;
    }
    getInstance() {
        assert(this.locked);
        this.locked = true;
        if (typeof this.singleton === 'undefined')
            this.singleton = this.producer.getInstanceWithoutSetterInjection();
        this.locked = false;
        this.producer.setterInject(this.singleton);
        return this.singleton;
    }
}
exports.SingletonProducer = SingletonProducer;
//# sourceMappingURL=singleton-producer.js.map