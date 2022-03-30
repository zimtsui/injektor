"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.inject = void 0;
const dep_lists_1 = require("./dep-lists");
const assert = require("assert");
const interfaces_1 = require("./interfaces");
const inject = (id) => (proto, name) => {
    const oldDescriptor = Reflect.getOwnPropertyDescriptor(proto, name);
    assert(typeof oldDescriptor === 'undefined', new interfaces_1.InjectionConflict());
    const list = dep_lists_1.depLists.get(proto) || [];
    list.push([name, id]);
    dep_lists_1.depLists.set(proto, list);
    Reflect.defineProperty(proto, name, {
        configurable: true,
        enumerable: false,
        get() {
            throw new interfaces_1.NotInjected(name);
        },
        set(value) {
            Reflect.defineProperty(this, name, {
                value,
                configurable: true,
                writable: true,
                enumerable: true,
            });
        },
    });
};
exports.inject = inject;
//# sourceMappingURL=instant-inject.js.map