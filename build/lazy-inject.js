"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.lazyInject = void 0;
const assert = require("assert");
const initiators_1 = require("./initiators");
const interfaces_1 = require("./interfaces");
const lazyInject = (id) => (proto, name) => {
    const oldDescriptor = Reflect.getOwnPropertyDescriptor(proto, name);
    assert(typeof oldDescriptor === 'undefined', new interfaces_1.InjectionConflict());
    Reflect.defineProperty(proto, name, {
        configurable: true,
        enumerable: false,
        get() {
            const container = initiators_1.initiators.get(this);
            assert(typeof container !== 'undefined', new interfaces_1.NotInjected(name));
            const value = container.initiate(id);
            Reflect.defineProperty(this, name, {
                value,
                enumerable: true,
                configurable: true,
                writable: true,
            });
            return value;
        },
        set(value) {
            Reflect.defineProperty(this, name, {
                value,
                enumerable: true,
                configurable: true,
                writable: true,
            });
        },
    });
};
exports.lazyInject = lazyInject;
//# sourceMappingURL=lazy-inject.js.map