"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Container = void 0;
const assert = require("assert");
const container_like_1 = require("./container-like");
const exceptions_1 = require("../exceptions");
const factory_inside_multition_producer_1 = require("../producers/factory-inside-multition-producer");
const constructor_inside_multition_producer_1 = require("../producers/constructor-inside-multition-producer");
const factory_inside_singleton_producer_1 = require("../producers/factory-inside-singleton-producer");
const constructor_inside_singleton_producer_1 = require("../producers/constructor-inside-singleton-producer");
const alias_producer_1 = require("../producers/alias-producer");
class Container extends container_like_1.ContainerLike {
    constructor() {
        super(...arguments);
        this.registry = new Map();
    }
    duplicate() {
        const container = new Container();
        for (const [id, producer] of this.registry)
            container.registry.set(id, producer.duplicate(container));
        return container;
    }
    initiate(id) {
        const producer = this.registry.get(id);
        assert(typeof producer !== 'undefined', new exceptions_1.Unregistered());
        return producer.getInstance();
    }
    registerConstructor(id, ctor) {
        this.registry.set(id, new constructor_inside_multition_producer_1.ConstructorInsideMultitionProducer(ctor, this));
    }
    registerConstructorSingleton(id, ctor) {
        this.registry.set(id, new constructor_inside_singleton_producer_1.ConstructorInsideSingletonProducer(ctor, this));
    }
    registerFactory(id, factory) {
        this.registry.set(id, new factory_inside_multition_producer_1.FactoryInsideMultitionProducer(factory, this));
    }
    registerFactorySingleton(id, factory) {
        this.registry.set(id, new factory_inside_singleton_producer_1.FactoryInsideSingletonProducer(factory, this));
    }
    registerAlias(id, alias) {
        this.registry.set(id, new alias_producer_1.AliasProducer(alias, this));
    }
}
exports.Container = Container;
//# sourceMappingURL=container.js.map