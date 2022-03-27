"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const ava_1 = require("ava");
const assert = require("assert");
const __1 = require("../..");
const ALike = {};
const BLike = {};
(0, ava_1.default)('simple', async (t) => {
    const container = new __1.Container();
    class A {
    }
    __decorate([
        (0, __1.inject)(BLike)
    ], A.prototype, "b", void 0);
    class B {
    }
    container.register(BLike, () => new B());
    const a1 = container.inject(new A());
    const a2 = container.inject(new A());
    assert(a1.b);
    assert(a2.b);
    assert(a1.b !== a2.b);
});
(0, ava_1.default)('singleton', async (t) => {
    const container = new __1.Container();
    class A {
    }
    __decorate([
        (0, __1.inject)(BLike)
    ], A.prototype, "b", void 0);
    class B {
    }
    const uninjectedB = new B();
    container.register(BLike, () => uninjectedB);
    const a1 = container.inject(new A());
    const a2 = container.inject(new A());
    assert(a1.b);
    assert(a2.b);
    assert(a1.b === a2.b);
});
(0, ava_1.default)('circular', async (t) => {
    const container = new __1.Container();
    class A {
    }
    __decorate([
        (0, __1.inject)(BLike)
    ], A.prototype, "b", void 0);
    class B {
    }
    __decorate([
        (0, __1.inject)(ALike)
    ], B.prototype, "a", void 0);
    const uninjectedA = new A();
    const uninjectedB = new B();
    container.register(ALike, () => uninjectedA);
    container.register(BLike, () => uninjectedB);
    const a = container.initiate(ALike);
    const b = container.inject(uninjectedB);
    assert(a.b);
    assert(b.a);
    assert(a.b === b);
    assert(b.a === a);
});
(0, ava_1.default)('lazy circular', async (t) => {
    const container = new __1.Container();
    class A {
    }
    __decorate([
        (0, __1.lazyInject)(BLike)
    ], A.prototype, "b", void 0);
    class B {
    }
    __decorate([
        (0, __1.lazyInject)(ALike)
    ], B.prototype, "a", void 0);
    const uninjectedA = new A();
    const uninjectedB = new B();
    container.register(ALike, () => uninjectedA);
    container.register(BLike, () => uninjectedB);
    const a = container.initiate(ALike);
    const b = container.inject(uninjectedB);
    assert(a.b);
    assert(b.a);
    assert(a.b === b);
    assert(b.a === a);
});
//# sourceMappingURL=test.js.map