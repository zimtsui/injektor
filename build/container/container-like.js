"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContainerLike = void 0;
class ContainerLike {
    rc(ctor) {
        return this.registerConstructor(ctor);
    }
    rcs(ctor) {
        return this.registerConstructorSingleton(ctor);
    }
    rf(factory) {
        return this.registerFactory(factory);
    }
    rfs(factory) {
        return this.registerFactorySingleton(factory);
    }
    rv(value) {
        return this.registerValue(value);
    }
}
exports.ContainerLike = ContainerLike;
//# sourceMappingURL=container-like.js.map