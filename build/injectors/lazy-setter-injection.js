"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.lazySetterInjector = exports.LazySetterInjector = void 0;
const setter_injection_like_1 = require("./setter-injection-like");
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
                    assert(typeof container !== 'undefined', new setter_injection_like_1.NotInjected(name));
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
    }
    inject(host, container) {
        this.initiators.set(host, container);
        return host;
    }
}
exports.LazySetterInjector = LazySetterInjector;
exports.lazySetterInjector = new LazySetterInjector();
//# sourceMappingURL=lazy-setter-injection.js.map