"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.instantSetterInjector = exports.InstantSetterInjector = void 0;
const exceptions_1 = require("../exceptions");
class InstantSetterInjector {
    constructor() {
        this.table = new WeakMap();
        this.decorator = (id) => (proto, name) => {
            const marks = this.table.get(proto) || [];
            marks.push([name, id]);
            this.table.set(proto, marks);
            Reflect.defineProperty(proto, name, {
                configurable: true,
                enumerable: false,
                get() {
                    throw new exceptions_1.NotInjected(name);
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
    }
    inject(host, container) {
        const marks = this.getMarks(host);
        for (const [name, id] of marks) {
            const value = container.initiate(id);
            Reflect.set(host, name, value);
        }
        return host;
    }
    getMarks(host) {
        return this.getMarksOnProto(host, host.constructor.prototype);
    }
    getMarksOnProto(host, proto) {
        if (proto === null)
            return [];
        const marks = this.getMarksOnProto(host, Reflect.getPrototypeOf(proto));
        const list = this.table.get(proto);
        if (typeof list !== 'undefined')
            return marks.concat(list);
        return marks;
    }
}
exports.InstantSetterInjector = InstantSetterInjector;
exports.instantSetterInjector = new InstantSetterInjector();
//# sourceMappingURL=instant-setter-injector.js.map