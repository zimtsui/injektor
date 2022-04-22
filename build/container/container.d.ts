import { ContainerLike } from './container-like';
import { Id, Dep, Factory, Ctor, Host } from '../interfaces';
export declare class Container implements ContainerLike {
    private registry;
    constructor(parent: Container);
    constructor();
    duplicate(): ContainerLike;
    initiate<T extends Dep>(id: Id): T;
    registerConstructor<T extends Host>(id: Id, ctor: Ctor<T>): void;
    registerConstructorSingleton<T extends Host>(id: Id, ctor: Ctor<T>): void;
    registerFactory<T extends Dep>(id: Id, factory: Factory<T>): void;
    registerFactorySingleton<T extends Dep>(id: Id, factory: Factory<T>): void;
}
