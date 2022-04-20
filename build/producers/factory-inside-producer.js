"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FactoryInsideProducer = void 0;
const instant_setter_injector_1 = require("../injectors/instant-setter-injector");
class FactoryInsideProducer {
    constructor(factory, container) {
        this.factory = factory;
        this.container = container;
    }
    getInstance() {
        const host = this.factory();
        if (!isHost(host))
            return host;
        instant_setter_injector_1.instantSetterInjector.inject(host, this.container);
        return host;
    }
}
exports.FactoryInsideProducer = FactoryInsideProducer;
function isHost(x) {
    return typeof x === 'object' && x !== null;
}
//# sourceMappingURL=factory-inside-producer.js.map