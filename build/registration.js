"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FactorySingletonReg = exports.CtorSingletonReg = exports.SingletonReg = exports.CtorReg = exports.FactoryReg = void 0;
const ctor_inj_tab_1 = require("./globals/ctor-inj-tab");
const assert = require("assert");
function isHost(x) {
    return typeof x === 'object' && x !== null;
}
class FactoryReg {
    constructor(factory, container) {
        this.factory = factory;
        this.container = container;
    }
    getInstance() {
        const instance = this.factory();
        if (isHost(instance))
            this.container.setterInject(instance);
        return instance;
    }
}
exports.FactoryReg = FactoryReg;
class CtorReg {
    constructor(ctor, container) {
        this.reg = new FactoryReg(() => {
            const ids = ctor_inj_tab_1.ctorInjTab.get(ctor) || [];
            const deps = ids.map(id => {
                assert(typeof id !== 'undefined');
                return container.initiate(id);
            });
            return new ctor(...deps);
        }, container);
    }
    getInstance() {
        return this.reg.getInstance();
    }
}
exports.CtorReg = CtorReg;
class SingletonReg {
    constructor(reg) {
        this.reg = reg;
    }
    getInstance() {
        if (typeof this.singleton === 'undefined')
            this.singleton = this.reg.getInstance();
        return this.singleton;
    }
}
exports.SingletonReg = SingletonReg;
class CtorSingletonReg extends SingletonReg {
    constructor(ctor, container) {
        const reg = new CtorReg(ctor, container);
        super(reg);
    }
}
exports.CtorSingletonReg = CtorSingletonReg;
class FactorySingletonReg extends SingletonReg {
    constructor(factory, container) {
        const reg = new FactoryReg(factory, container);
        super(reg);
    }
}
exports.FactorySingletonReg = FactorySingletonReg;
//# sourceMappingURL=registration.js.map