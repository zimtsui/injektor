"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Container = exports.initiators = void 0;
const assert = require("assert");
const setter_inj_tab_1 = require("../globals/setter-inj-tab");
const injected_set_1 = require("../globals/injected-set");
const container_like_1 = require("./container-like");
const registration_1 = require("../registration");
exports.initiators = new WeakMap();
class Container {
    constructor() {
        this.registry = new Map();
    }
    initiate(id) {
        const reg = this.registry.get(id);
        assert(typeof reg !== 'undefined', new container_like_1.Unregistered());
        return reg.getInstance();
    }
    setterInject(host) {
        if (injected_set_1.injected.has(host))
            return host;
        injected_set_1.injected.add(host);
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
        const list = setter_inj_tab_1.setterInjTab.get(proto);
        if (typeof list !== 'undefined')
            for (const [name, id] of list) {
                const value = this.initiate(id);
                Reflect.set(host, name, value);
            }
    }
    registerConstructor(id, ctor) {
        this.registry.set(id, new registration_1.CtorReg(ctor, this));
    }
    registerConstructorSingleton(id, ctor) {
        this.registry.set(id, new registration_1.CtorSingletonReg(ctor, this));
    }
    registerFactory(id, factory) {
        this.registry.set(id, new registration_1.FactoryReg(factory, this));
    }
    registerFactorySingleton(id, factory) {
        this.registry.set(id, new registration_1.FactorySingletonReg(factory, this));
    }
}
exports.Container = Container;
//# sourceMappingURL=container.js.map