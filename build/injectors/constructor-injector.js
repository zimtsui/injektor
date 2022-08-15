"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.constructorInjector = void 0;
const assert = require("assert");
const exceptions_1 = require("../exceptions");
class ConstructorInjector {
    constructor() {
        this.table = new WeakMap();
        this.extending = new WeakSet();
        this.decorator = (id) => (ctor, name, index) => {
            const paramMap = this.table.get(ctor) || new Map();
            paramMap.set(index, id);
            this.table.set(ctor, paramMap);
        };
        this.injextends = () => (ctor) => {
            this.extending.add(ctor);
        };
    }
    inject(ctor, container) {
        const realCtor = this.getRealCtor(ctor);
        const arity = realCtor !== null ? realCtor.length : 0;
        const paramMap = this.getParamMap(realCtor);
        for (let index = 0; index < arity; index++)
            assert(paramMap.has(index), new exceptions_1.NotContructorInjected(ctor.name, `${index}`));
        const deps = [...paramMap]
            .sort(([index1], [index2]) => index1 - index2)
            .slice(0, arity)
            .map(([index, id]) => {
            const f = container[id];
            assert(typeof f !== 'undefined', new exceptions_1.NotRegistered(`${id.description}`));
            return f();
        });
        return new ctor(...deps);
    }
    getParamMap(realCtor) {
        if (realCtor === null)
            return new Map();
        return this.table.get(realCtor) || new Map();
    }
    getRealCtor(ctor) {
        if (ctor === null)
            return ctor;
        if (!this.extending.has(ctor))
            return ctor;
        return this.getRealCtor(Reflect.getPrototypeOf(ctor));
    }
}
exports.constructorInjector = new ConstructorInjector();
//# sourceMappingURL=constructor-injector.js.map