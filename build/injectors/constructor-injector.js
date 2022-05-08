"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.constructorInjector = exports.ConstructorInjector = void 0;
const assert = require("assert");
const exceptions_1 = require("../exceptions");
class ConstructorInjector {
    constructor() {
        this.table = new WeakMap();
        this.decorator = (id) => (ctor, name, index) => {
            const marks = this.table.get(ctor) || [];
            marks[index] = id;
            this.table.set(ctor, marks);
        };
    }
    inject(ctor, container) {
        const marks = this.getMarks(ctor);
        const deps = marks.map(id => {
            assert(typeof id !== 'undefined');
            const f = container[id];
            assert(typeof f !== 'undefined', new exceptions_1.Unregistered());
            return f();
        });
        return new ctor(...deps);
    }
    getMarks(ctor) {
        return this.table.get(ctor) || [];
    }
}
exports.ConstructorInjector = ConstructorInjector;
exports.constructorInjector = new ConstructorInjector();
//# sourceMappingURL=constructor-injector.js.map