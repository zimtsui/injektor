"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.inject = void 0;
const dep_lists_1 = require("./dep-lists");
const inject = (id) => (proto, name) => {
    const list = dep_lists_1.depLists.get(proto) || [];
    list.push([name, id]);
    dep_lists_1.depLists.set(proto, list);
};
exports.inject = inject;
//# sourceMappingURL=inject.js.map