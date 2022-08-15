"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SingletonProducer = void 0;
const exceptions_1 = require("../exceptions");
const assert = require("assert");
class SingletonProducer {
    constructor(producer) {
        this.producer = producer;
        this.singleton = new Nullable();
        this.locked = false;
    }
    getInstance() {
        assert(!this.locked, new exceptions_1.CircularConstructorInjection());
        this.locked = true;
        try {
            const singleton = this.singleton.getValue();
            this.locked = false;
            return singleton;
        }
        catch {
            const singleton = this.producer.getInstanceWithoutSetterInjection();
            this.singleton.setValue(singleton);
            this.locked = false;
            this.producer.setterInject(singleton);
            return singleton;
        }
    }
}
exports.SingletonProducer = SingletonProducer;
class Nullable {
    constructor() {
        this.isNull = true;
    }
    getValue() {
        assert(!this.isNull);
        return this.value;
    }
    setValue(value) {
        this.isNull = false;
        this.value = value;
    }
}
//# sourceMappingURL=singleton-producer.js.map