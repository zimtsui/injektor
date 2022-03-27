"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Container = exports.initiators = void 0;
const assert = require("assert");
const dep_lists_1 = require("./dep-lists");
const injected_1 = require("./injected");
exports.initiators = new WeakMap();
class Container {
    constructor() {
        this.impls = new Map();
    }
    initiate(id) {
        const factory = this.impls.get(id);
        assert(typeof factory !== 'undefined');
        const dep = factory();
        if (typeof dep === 'object' &&
            dep !== null &&
            !injected_1.injected.has(dep))
            this.inject(dep);
        return dep;
    }
    inject(host) {
        injected_1.injected.add(host);
        this.injectInstantDeps(host);
        this.injectLazyDeps(host);
        return host;
    }
    injectLazyDeps(host) {
        exports.initiators.set(host, this);
    }
    injectInstantDeps(host, proto = host.constructor.prototype) {
        if (proto === null)
            return;
        this.injectInstantDeps(host, Reflect.getPrototypeOf(proto));
        const list = dep_lists_1.depLists.get(proto);
        if (typeof list !== 'undefined')
            for (const [name, id] of list) {
                const value = this.initiate(id);
                Reflect.defineProperty(host, name, { value });
            }
    }
    register(id, factory) {
        this.impls.set(id, factory);
    }
}
exports.Container = Container;
//# sourceMappingURL=initiators.js.map