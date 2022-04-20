"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setterInjectLazy = void 0;
const assert = require("assert");
const container_1 = require("../container/container");
const exceptions_1 = require("./exceptions");
const setterInjectLazy = (id) => (proto, name) => {
    Reflect.defineProperty(proto, name, {
        configurable: true,
        enumerable: false,
        get() {
            const container = container_1.initiators.get(this);
            assert(typeof container !== 'undefined', new exceptions_1.NotInjected(name));
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
exports.setterInjectLazy = setterInjectLazy;
//# sourceMappingURL=setter-inject-lazy.js.map