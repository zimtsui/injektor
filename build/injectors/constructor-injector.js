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
        const marks = this.getMarks(ctor);
        const deps = [];
        for (let index = 0; index < ctor.length; index++) {
            const id = marks[index];
            assert(typeof id !== 'undefined', new exceptions_1.NotContructorInjected());
            const f = container[id];
            assert(typeof f !== 'undefined', new exceptions_1.NotRegistered());
            deps.push(f());
        }
        return new ctor(...deps);
    }
    getMarks(ctor) {
        while (ctor !== null && this.extending.has(ctor))
            ctor = Reflect.getPrototypeOf(ctor);
        if (ctor === null)
            return [];
        return this.table.get(ctor) || [];
    }
}
exports.ConstructorInjector = ConstructorInjector;
exports.constructorInjector = new ConstructorInjector();
//# sourceMappingURL=constructor-injector.js.map