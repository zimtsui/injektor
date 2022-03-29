"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.lazyInject = void 0;
const initiators_1 = require("./initiators");
const lazyInject = (id) => (proto, name) => {
    Reflect.defineProperty(proto, name, {
        get() {
            const container = initiators_1.initiators.get(this);
            if (typeof container === 'undefined')
                return undefined;
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