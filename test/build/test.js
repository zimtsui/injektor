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
const __1 = require("../..");
const ALike = 'ALike';
const BLike = 'BLike';
(0, ava_1.default)('setter injection', async (t) => {
    const container = new __1.Container();
    class A {
    }
    __decorate([
        (0, __1.instantInject)(BLike)
    ], A.prototype, "b", void 0);
    class B {
    }
    container.registerConstructor(BLike, B);
    container.registerConstructor(ALike, A);
    const a1 = container.initiate(ALike);
    const a2 = container.initiate(ALike);
    t.assert(a1.b);
    t.assert(a2.b);
    t.assert(a1.b !== a2.b);
});
(0, ava_1.default)('setter injection singleton', async (t) => {
    const container = new __1.Container();
    class A {
    }
    __decorate([
        (0, __1.instantInject)(BLike)
    ], A.prototype, "b", void 0);
    class B {
    }
    container.registerConstructorSingleton(BLike, B);
    container.registerConstructor(ALike, A);
    const a1 = container.initiate(ALike);
    const a2 = container.initiate(ALike);
    t.assert(a1.b);
    t.assert(a2.b);
    t.assert(a1.b === a2.b);
});
(0, ava_1.default)('constructor injection', async (t) => {
    const container = new __1.Container();
    let A = class A {
        constructor(b) {
            this.b = b;
        }
    };
    A = __decorate([
        __param(0, (0, __1.inject)(BLike))
    ], A);
    class B {
    }
    container.registerConstructor(BLike, B);
    container.registerConstructor(ALike, A);
    const a1 = container.initiate(ALike);
    const a2 = container.initiate(ALike);
    t.assert(a1 !== a2);
    t.assert(a1.b);
    t.assert(a2.b);
    t.assert(a1.b !== a2.b);
});
(0, ava_1.default)('constructor injection singleton', async (t) => {
    const container = new __1.Container();
    let A = class A {
        constructor(b) {
            this.b = b;
        }
    };
    A = __decorate([
        __param(0, (0, __1.inject)(BLike))
    ], A);
    class B {
    }
    container.registerConstructor(ALike, A);
    container.registerConstructorSingleton(BLike, B);
    const a1 = container.initiate(ALike);
    const a2 = container.initiate(ALike);
    t.assert(a1 !== a2);
    t.assert(a1.b);
    t.assert(a2.b);
    t.assert(a1.b === a2.b);
});
(0, ava_1.default)('factory injection singleton', async (t) => {
    const container = new __1.Container();
    let A = class A {
        constructor(b) {
            this.b = b;
        }
    };
    A = __decorate([
        __param(0, (0, __1.inject)(BLike))
    ], A);
    class B {
    }
    container.registerFactorySingleton(ALike, () => new A(container.initiate(BLike)));
    container.registerFactorySingleton(BLike, () => new B());
    const a1 = container.initiate(ALike);
    const a2 = container.initiate(ALike);
    t.assert(a1 === a2);
});
(0, ava_1.default)('circular setter injection', async (t) => {
    const container = new __1.Container();
    class A {
    }
    __decorate([
        (0, __1.instantInject)(BLike)
    ], A.prototype, "b", void 0);
    class B {
    }
    __decorate([
        (0, __1.instantInject)(ALike)
    ], B.prototype, "a", void 0);
    container.registerConstructorSingleton(ALike, A);
    container.registerConstructorSingleton(BLike, B);
    const a = container.initiate(ALike);
    const b = container.initiate(BLike);
    t.assert(a.b);
    t.assert(b.a);
    t.assert(a.b === b);
    t.assert(b.a === a);
});
(0, ava_1.default)('circular lazy setter injection', async (t) => {
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
    container.registerConstructorSingleton(ALike, A);
    container.registerConstructorSingleton(BLike, B);
    const a = container.initiate(ALike);
    const b = container.initiate(BLike);
    t.assert(a.b);
    t.assert(b.a);
    t.assert(a.b === b);
    t.assert(b.a === a);
});
(0, ava_1.default)('circular constructor injection', async (t) => {
    const container = new __1.Container();
    let A = class A {
        constructor(b) {
            this.b = b;
        }
    };
    A = __decorate([
        __param(0, (0, __1.inject)(BLike))
    ], A);
    let B = class B {
        constructor(a) {
            this.a = a;
        }
    };
    B = __decorate([
        __param(0, (0, __1.inject)(ALike))
    ], B);
    container.registerConstructorSingleton(ALike, A);
    container.registerConstructorSingleton(BLike, B);
    try {
        const a = container.initiate(ALike);
        throw new Error('');
    }
    catch (err) {
        t.assert(err instanceof __1.CircularConstructorInjection);
    }
});
(0, ava_1.default)('duplicate', async (t) => {
    const container1 = new __1.Container();
    let A = class A {
        constructor(b) {
            this.b = b;
        }
    };
    A = __decorate([
        __param(0, (0, __1.inject)(BLike))
    ], A);
    class B {
    }
    container1.registerConstructor(ALike, A);
    container1.registerConstructorSingleton(BLike, B);
    const container2 = container1.duplicate();
    const c1a1 = container1.initiate(ALike);
    const c1a2 = container1.initiate(ALike);
    const c2a1 = container2.initiate(ALike);
    const c2a2 = container2.initiate(ALike);
    t.assert(c2a1 !== c2a2);
    t.assert(c1a1.b === c1a2.b);
    t.assert(c1a1.b !== c2a1.b);
});
(0, ava_1.default)('alias', async (t) => {
    const container = new __1.Container();
    class A {
    }
    const ALikeAlias = {};
    container.registerConstructorSingleton(ALike, A);
    container.registerAlias(ALikeAlias, ALike);
    const a1 = container.initiate(ALike);
    const a2 = container.initiate(ALikeAlias);
    t.assert(a1 === a2);
});
//# sourceMappingURL=test.js.map