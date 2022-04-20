"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ctorInject = void 0;
const ctor_inj_tab_1 = require("../globals/ctor-inj-tab");
function ctorInject(id) {
    return function (c, name, index) {
        const list = ctor_inj_tab_1.ctorInjTab.get(c) || [];
        list[index] = id;
        ctor_inj_tab_1.ctorInjTab.set(c, list);
    };
}
exports.ctorInject = ctorInject;
//# sourceMappingURL=ctor-inject.js.map