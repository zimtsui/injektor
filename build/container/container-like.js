"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContainerLike = void 0;
class ContainerLike {
    i(id) {
        return this.initiate(id);
    }
    rc(id, ctor) {
        return this.registerConstructor(id, ctor);
    }
    rcs(id, ctor) {
        return this.registerConstructorSingleton(id, ctor);
    }
    rf(id, factory) {
        return this.registerFactory(id, factory);
    }
    rfs(id, factory) {
        return this.registerFactorySingleton(id, factory);
    }
    ra(id, alias) {
        return this.registerAlias(id, alias);
    }
    rv(id, value) {
        return this.registerValue(id, value);
    }
}
exports.ContainerLike = ContainerLike;
//# sourceMappingURL=container-like.js.map