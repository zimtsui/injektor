"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValueProducer = void 0;
class ValueProducer {
    constructor(value) {
        this.value = value;
    }
    getInstance() {
        return this.value;
    }
    duplicate() {
        return new ValueProducer(this.value);
    }
}
exports.ValueProducer = ValueProducer;
//# sourceMappingURL=value-producer.js.map