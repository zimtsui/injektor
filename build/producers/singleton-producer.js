"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SingletonProducer = void 0;
class SingletonProducer {
    constructor(producer) {
        this.producer = producer;
    }
    getInstance() {
        if (typeof this.singleton === 'undefined')
            this.singleton = this.producer.getInstanceWithoutSetterInjection();
        this.producer.setterInject(this.singleton);
        return this.singleton;
    }
}
exports.SingletonProducer = SingletonProducer;
//# sourceMappingURL=singleton-producer.js.map