"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setterInject = void 0;
const setter_inj_tab_1 = require("../globals/setter-inj-tab");
const exceptions_1 = require("./exceptions");
const setterInject = (id) => (proto, name) => {
    const list = setter_inj_tab_1.setterInjTab.get(proto) || [];
    list.push([name, id]);
    setter_inj_tab_1.setterInjTab.set(proto, list);
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
exports.setterInject = setterInject;
//# sourceMappingURL=setter-inject.js.map