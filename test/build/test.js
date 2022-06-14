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
const assert = require("assert");
class TYPES {
}
TYPES.ALike = Symbol();
TYPES.BLike = Symbol();
TYPES.ALikeAlias = Symbol();
(0, ava_1.default)('setter injection', async (t) => {
    var _a, _b;
    class Container extends __1.BaseContainer {
        constructor() {
            super(...arguments);
            this[_a] = this.rc(A);
            this[_b] = this.rc(B);
        }
    }
    _a = TYPES.ALike, _b = TYPES.BLike;
    class A {
    }
    __decorate([
        (0, __1.instantInject)(TYPES.BLike)
    ], A.prototype, "b", void 0);
    class B {
    }
    const container = new Container();
    const a1 = container[TYPES.ALike]();
    const a2 = container[TYPES.ALike]();
    t.assert(a1.b);
    t.assert(a2.b);
    t.assert(a1.b !== a2.b);
});
(0, ava_1.default)('setter injection singleton', async (t) => {
    var _a, _b;
    class Container extends __1.BaseContainer {
        constructor() {
            super(...arguments);
            this[_a] = this.rc(A);
            this[_b] = this.rcs(B);
        }
    }
    _a = TYPES.ALike, _b = TYPES.BLike;
    class A {
    }
    __decorate([
        (0, __1.instantInject)(TYPES.BLike)
    ], A.prototype, "b", void 0);
    class B {
    }
    const container = new Container();
    const a1 = container[TYPES.ALike]();
    const a2 = container[TYPES.ALike]();
    t.assert(a1.b);
    t.assert(a2.b);
    t.assert(a1.b === a2.b);
});
(0, ava_1.default)('constructor injection', async (t) => {
    var _a, _b;
    class Container extends __1.BaseContainer {
        constructor() {
            super(...arguments);
            this[_a] = this.rc(A);
            this[_b] = this.rc(B);
        }
    }
    _a = TYPES.ALike, _b = TYPES.BLike;
    let A = class A {
        constructor(b) {
            this.b = b;
        }
    };
    A = __decorate([
        __param(0, (0, __1.inject)(TYPES.BLike))
    ], A);
    class B {
    }
    const container = new Container();
    const a1 = container[TYPES.ALike]();
    const a2 = container[TYPES.ALike]();
    t.assert(a1 !== a2);
    t.assert(a1.b);
    t.assert(a2.b);
    t.assert(a1.b !== a2.b);
});
(0, ava_1.default)('constructor injection singleton', async (t) => {
    var _a, _b;
    class Container extends __1.BaseContainer {
        constructor() {
            super(...arguments);
            this[_a] = this.rc(A);
            this[_b] = this.rcs(B);
        }
    }
    _a = TYPES.ALike, _b = TYPES.BLike;
    let A = class A {
        constructor(b) {
            this.b = b;
        }
    };
    A = __decorate([
        __param(0, (0, __1.inject)(TYPES.BLike))
    ], A);
    class B {
    }
    const container = new Container();
    const a1 = container[TYPES.ALike]();
    const a2 = container[TYPES.ALike]();
    t.assert(a1 !== a2);
    t.assert(a1.b);
    t.assert(a2.b);
    t.assert(a1.b === a2.b);
});
(0, ava_1.default)('factory injection singleton', async (t) => {
    var _a, _b;
    class Container extends __1.BaseContainer {
        constructor() {
            super(...arguments);
            this[_a] = this.rfs(() => new A(this[TYPES.BLike]()));
            this[_b] = this.rfs(() => new B());
        }
    }
    _a = TYPES.ALike, _b = TYPES.BLike;
    let A = class A {
        constructor(b) {
            this.b = b;
        }
    };
    A = __decorate([
        __param(0, (0, __1.inject)(TYPES.BLike))
    ], A);
    class B {
    }
    const container = new Container();
    const a1 = container[TYPES.ALike]();
    const a2 = container[TYPES.ALike]();
    t.assert(a1 === a2);
});
(0, ava_1.default)('circular setter injection', async (t) => {
    var _a, _b;
    class Container extends __1.BaseContainer {
        constructor() {
            super(...arguments);
            this[_a] = this.rcs(A);
            this[_b] = this.rcs(B);
        }
    }
    _a = TYPES.ALike, _b = TYPES.BLike;
    class A {
    }
    __decorate([
        (0, __1.instantInject)(TYPES.BLike)
    ], A.prototype, "b", void 0);
    class B {
    }
    __decorate([
        (0, __1.instantInject)(TYPES.ALike)
    ], B.prototype, "a", void 0);
    const container = new Container();
    const a = container[TYPES.ALike]();
    const b = container[TYPES.BLike]();
    t.assert(a.b);
    t.assert(b.a);
    t.assert(a.b === b);
    t.assert(b.a === a);
});
(0, ava_1.default)('circular lazy setter injection', async (t) => {
    var _a, _b;
    class Container extends __1.BaseContainer {
        constructor() {
            super(...arguments);
            this[_a] = this.rcs(A);
            this[_b] = this.rcs(B);
        }
    }
    _a = TYPES.ALike, _b = TYPES.BLike;
    class A {
    }
    __decorate([
        (0, __1.lazyInject)(TYPES.BLike)
    ], A.prototype, "b", void 0);
    class B {
    }
    __decorate([
        (0, __1.lazyInject)(TYPES.ALike)
    ], B.prototype, "a", void 0);
    const container = new Container();
    const a = container[TYPES.ALike]();
    const b = container[TYPES.BLike]();
    t.assert(a.b);
    t.assert(b.a);
    t.assert(a.b === b);
    t.assert(b.a === a);
});
(0, ava_1.default)('circular constructor injection', async (t) => {
    var _a, _b;
    class Container extends __1.BaseContainer {
        constructor() {
            super(...arguments);
            this[_a] = this.rcs(A);
            this[_b] = this.rcs(B);
        }
    }
    _a = TYPES.ALike, _b = TYPES.BLike;
    let A = class A {
        constructor(b) {
            this.b = b;
        }
    };
    A = __decorate([
        __param(0, (0, __1.inject)(TYPES.BLike))
    ], A);
    let B = class B {
        constructor(a) {
            this.a = a;
        }
    };
    B = __decorate([
        __param(0, (0, __1.inject)(TYPES.ALike))
    ], B);
    const container = new Container();
    try {
        const a = container[TYPES.ALike]();
        throw new Error('');
    }
    catch (err) {
        t.assert(err instanceof __1.CircularConstructorInjection);
    }
});
(0, ava_1.default)('duplicate', async (t) => {
    var _a, _b;
    class Container extends __1.BaseContainer {
        constructor() {
            super(...arguments);
            this[_a] = this.rc(A);
            this[_b] = this.rcs(B);
        }
    }
    _a = TYPES.ALike, _b = TYPES.BLike;
    let A = class A {
        constructor(b) {
            this.b = b;
        }
    };
    A = __decorate([
        __param(0, (0, __1.inject)(TYPES.BLike))
    ], A);
    class B {
    }
    const container1 = new Container();
    const container2 = new Container();
    const c1a1 = container1[TYPES.ALike]();
    const c1a2 = container1[TYPES.ALike]();
    const c2a1 = container2[TYPES.ALike]();
    const c2a2 = container2[TYPES.ALike]();
    t.assert(c2a1 !== c2a2);
    t.assert(c1a1.b === c1a2.b);
    t.assert(c1a1.b !== c2a1.b);
});
(0, ava_1.default)('alias', async (t) => {
    var _a, _b;
    class Container extends __1.BaseContainer {
        constructor() {
            super(...arguments);
            this[_a] = this.rcs(A);
            this[_b] = () => this[TYPES.ALike]();
        }
    }
    _a = TYPES.ALike, _b = TYPES.ALikeAlias;
    class A {
    }
    const container = new Container();
    const a1 = container[TYPES.ALike]();
    const a2 = container[TYPES.ALikeAlias]();
    t.assert(a1 === a2);
});
(0, ava_1.default)('abstract', async (t) => {
    var _a;
    class AbstractContainer extends __1.BaseContainer {
    }
    class A {
    }
    class Container extends AbstractContainer {
        constructor() {
            super(...arguments);
            this[_a] = this.rc(A);
        }
    }
    _a = TYPES.ALike;
    const container = new Container();
    const a1 = container[TYPES.ALike]();
});
(0, ava_1.default)('args length', async (t) => {
    var _a, _b;
    class Container extends __1.BaseContainer {
        constructor() {
            super(...arguments);
            this[_a] = this.rc(A);
            this[_b] = this.rc(B);
        }
    }
    _a = TYPES.ALike, _b = TYPES.BLike;
    class A {
        constructor(b) {
            this.b = b;
        }
    }
    class B {
    }
    const container = new Container();
    assert.throws(() => container[TYPES.ALike](), __1.NotContructorInjected);
});
//# sourceMappingURL=test.js.map