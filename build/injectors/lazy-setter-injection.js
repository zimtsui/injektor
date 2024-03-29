"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.lazySetterInjector = void 0;
const exceptions_1 = require("../exceptions");
const assert = require("assert");
class LazySetterInjector {
    constructor() {
        this.initiators = new WeakMap();
        this.decorator = (id) => (proto, name) => {
            const initiators = this.initiators;
            Reflect.defineProperty(proto, name, {
                configurable: true,
                enumerable: false,
                get() {
                    const container = initiators.get(this);
                    assert(typeof container !== 'undefined', new exceptions_1.NotSetterInjected(proto.constructor.name, `${id.description}`));
                    const f = container[id];
                    assert(typeof f !== 'undefined', new exceptions_1.NotRegistered(`${id.description}`));
                    const value = f();
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
    }
    inject(host, container) {
        this.initiators.set(host, container);
        return host;
    }
}
exports.lazySetterInjector = new LazySetterInjector();
//# sourceMappingURL=lazy-setter-injection.js.map