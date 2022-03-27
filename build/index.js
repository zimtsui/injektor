"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.lazyInject = exports.inject = exports.Container = void 0;
var initiators_1 = require("./initiators");
Object.defineProperty(exports, "Container", { enumerable: true, get: function () { return initiators_1.Container; } });
var instant_inject_1 = require("./instant-inject");
Object.defineProperty(exports, "inject", { enumerable: true, get: function () { return instant_inject_1.inject; } });
var lazy_inject_1 = require("./lazy-inject");
Object.defineProperty(exports, "lazyInject", { enumerable: true, get: function () { return lazy_inject_1.lazyInject; } });
//# sourceMappingURL=index.js.map