"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Container = void 0;
const assert = require("assert");
const container_like_1 = require("./container-like");
const multition_factory_inside_producer_1 = require("../producers/multition-factory-inside-producer");
const multition_constructor_inside_producer_1 = require("../producers/multition-constructor-inside-producer");
const singleton_factory_inside_producer_1 = require("../producers/singleton-factory-inside-producer");
const singleton_constructor_inside_producer_1 = require("../producers/singleton-constructor-inside-producer");
class Container {
    constructor() {
        this.registry = new Map();
    }
    initiate(id) {
        const producer = this.registry.get(id);
        assert(typeof producer !== 'undefined', new container_like_1.Unregistered());
        return producer.getInstance();
    }
    registerConstructor(id, ctor) {
        this.registry.set(id, new multition_constructor_inside_producer_1.MultitionConstructorInsideProducer(ctor, this));
    }
    registerConstructorSingleton(id, ctor) {
        this.registry.set(id, new singleton_constructor_inside_producer_1.SingletonConstructorInsideProducer(ctor, this));
    }
    registerFactory(id, factory) {
        this.registry.set(id, new multition_factory_inside_producer_1.MultitionFactoryInsideProducer(factory, this));
    }
    registerFactorySingleton(id, factory) {
        this.registry.set(id, new singleton_factory_inside_producer_1.SingletonFactoryInsideProducer(factory, this));
    }
}
exports.Container = Container;
//# sourceMappingURL=container.js.map