"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.constructorInjector = exports.ConstructorInjector = void 0;
const assert = require("assert");
const exceptions_1 = require("../exceptions");
class ConstructorInjector {
    constructor() {
        this.table = new WeakMap();
        this.extending = new WeakSet();
        this.decorator = (id) => (ctor, name, index) => {
            const marks = this.table.get(ctor) || [];
            marks[index] = id;
            this.table.set(ctor, marks);
        };
        this.injextends = () => (ctor) => {
            this.extending.add(ctor);
        };
    }
    inject(ctor, container) {
        const realCtor = this.getRealCtor(ctor);
        const arity = realCtor !== null ? realCtor.length : 0;
        const marks = this.getMarks(realCtor);
        const deps = [];
        for (let index = 0; index < arity; index++) {
            const id = marks[index];
            assert(typeof id !== 'undefined', new exceptions_1.NotContructorInjected(ctor.name, `${index}`));
            const f = container[id];
            assert(typeof f !== 'undefined', new exceptions_1.NotRegistered(`${id.description}`));
            deps.push(f());
        }
        return new ctor(...deps);
    }
    getMarks(realCtor) {
        if (realCtor === null)
            return [];
        return this.table.get(realCtor) || [];
    }
    getRealCtor(ctor) {
        if (ctor === null)
            return ctor;
        if (!this.extending.has(ctor))
            return ctor;
        return this.getRealCtor(Reflect.getPrototypeOf(ctor));
    }
}
exports.ConstructorInjector = ConstructorInjector;
exports.constructorInjector = new ConstructorInjector();
//# sourceMappingURL=constructor-injector.js.map