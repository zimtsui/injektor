"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.constructorInjector = exports.ConstructorInjector = void 0;
const assert = require("assert");
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
            return container.initiate(id);
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