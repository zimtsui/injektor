"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseContainer = void 0;
const container_like_1 = require("./container-like");
const factory_inside_multition_producer_1 = require("../producers/factory-inside-multition-producer");
const constructor_inside_multition_producer_1 = require("../producers/constructor-inside-multition-producer");
const factory_inside_singleton_producer_1 = require("../producers/factory-inside-singleton-producer");
const constructor_inside_singleton_producer_1 = require("../producers/constructor-inside-singleton-producer");
const value_producer_1 = require("../producers/value-producer");
class BaseContainer extends container_like_1.ContainerLike {
    registerConstructor(ctor) {
        const producer = new constructor_inside_multition_producer_1.ConstructorInsideMultitionProducer(ctor, this);
        return () => producer.getInstance();
    }
    registerConstructorSingleton(ctor) {
        const producer = new constructor_inside_singleton_producer_1.ConstructorInsideSingletonProducer(ctor, this);
        return () => producer.getInstance();
    }
    registerFactory(factory) {
        const producer = new factory_inside_multition_producer_1.FactoryInsideMultitionProducer(factory, this);
        return () => producer.getInstance();
    }
    registerFactorySingleton(factory) {
        const producer = new factory_inside_singleton_producer_1.FactoryInsideSingletonProducer(factory, this);
        return () => producer.getInstance();
    }
    registerValue(value) {
        const producer = new value_producer_1.ValueProducer(value);
        return () => producer.getInstance();
    }
}
exports.BaseContainer = BaseContainer;
//# sourceMappingURL=base-container.js.map