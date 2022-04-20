"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
const ava_1 = require("ava");
const assert = require("assert");
const __1 = require("../..");
const ALike = {};
const BLike = {};
(0, ava_1.default)('setter inj / ctor reg', async (t) => {
    const container = new __1.Container();
    class A {
    }
    __decorate([
        (0, __1.setterInject)(BLike)
    ], A.prototype, "b", void 0);
    class B {
    }
    container.registerConstructor(BLike, B);
    const a1 = container.setterInject(new A());
    const a2 = container.setterInject(new A());
    assert(a1.b);
    assert(a2.b);
    assert(a1.b !== a2.b);
});
(0, ava_1.default)('setter inj / ctor singleton reg', async (t) => {
    const container = new __1.Container();
    class A {
    }
    __decorate([
        (0, __1.setterInject)(BLike)
    ], A.prototype, "b", void 0);
    class B {
    }
    container.registerConstructorSingleton(BLike, B);
    const a1 = container.setterInject(new A());
    const a2 = container.setterInject(new A());
    assert(a1.b);
    assert(a2.b);
    assert(a1.b === a2.b);
});
(0, ava_1.default)('ctor inj', async (t) => {
    const container = new __1.Container();
    let A = class A {
        constructor(b) {
            this.b = b;
        }
    };
    A = __decorate([
        __param(0, (0, __1.ctorInject)(BLike))
    ], A);
    class B {
    }
    container.registerConstructorSingleton(BLike, B);
    container.registerConstructor(ALike, A);
    const a1 = container.initiate(ALike);
    const a2 = container.initiate(ALike);
    assert(a1 !== a2);
    assert(a1.b);
    assert(a2.b);
    assert(a1.b === a2.b);
});
(0, ava_1.default)('circular', async (t) => {
    const container = new __1.Container();
    class A {
    }
    __decorate([
        (0, __1.setterInject)(BLike)
    ], A.prototype, "b", void 0);
    class B {
    }
    __decorate([
        (0, __1.setterInject)(ALike)
    ], B.prototype, "a", void 0);
    const a = new A();
    const b = new B();
    container.registerFactory(ALike, () => a);
    container.registerFactory(BLike, () => b);
    container.setterInject(a);
    container.setterInject(b);
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
        (0, __1.setterInjectLazy)(BLike)
    ], A.prototype, "b", void 0);
    class B {
    }
    __decorate([
        (0, __1.setterInjectLazy)(ALike)
    ], B.prototype, "a", void 0);
    const a = new A();
    const b = new B();
    container.registerFactory(ALike, () => a);
    container.registerFactory(BLike, () => b);
    container.setterInject(a);
    container.setterInject(b);
    assert(a.b);
    assert(b.a);
    assert(a.b === b);
    assert(b.a === a);
});
//# sourceMappingURL=test.js.map