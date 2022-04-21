"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Container = void 0;
const assert = require("assert");
const exceptions_1 = require("../exceptions");
const multition_factory_inside_producer_1 = require("../producers/multition-factory-inside-producer");
const multition_constructor_inside_producer_1 = require("../producers/multition-constructor-inside-producer");
const factory_inside_singleton_producer_1 = require("../producers/factory-inside-singleton-producer");
const constructor_inside_singleton_producer_1 = require("../producers/constructor-inside-singleton-producer");
class Container {
    constructor() {
        this.registry = new Map();
    }
    initiate(id) {
        const producer = this.registry.get(id);
        assert(typeof producer !== 'undefined', new exceptions_1.Unregistered());
        return producer.getInstance();
    }
    registerConstructor(id, ctor) {
        this.registry.set(id, new multition_constructor_inside_producer_1.MultitionConstructorInsideProducer(ctor, this));
    }
    registerConstructorSingleton(id, ctor) {
        this.registry.set(id, new constructor_inside_singleton_producer_1.ConstructorInsideSingletonProducer(ctor, this));
    }
    registerFactory(id, factory) {
        this.registry.set(id, new multition_factory_inside_producer_1.MultitionFactoryInsideProducer(factory, this));
    }
    registerFactorySingleton(id, factory) {
        this.registry.set(id, new factory_inside_singleton_producer_1.FactoryInsideSingletonProducer(factory, this));
    }
}
exports.Container = Container;
//# sourceMappingURL=container.js.map