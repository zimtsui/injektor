"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AliasProducer = void 0;
class AliasProducer {
    constructor(id, container) {
        this.id = id;
        this.container = container;
    }
    getInstance() {
        return this.container.initiate(this.id);
    }
    duplicate(container) {
        return new AliasProducer(this.id, container);
    }
}
exports.AliasProducer = AliasProducer;
//# sourceMappingURL=alias-producer.js.map