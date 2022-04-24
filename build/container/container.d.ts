import { ContainerLike } from './container-like';
import { Id, Dep, Factory, Ctor, Host } from '../interfaces';
export declare class Container extends ContainerLike {
    private registry;
    duplicate(): Container;
    initiate<T extends Dep>(id: Id): T;
    registerConstructor<T extends Host>(id: Id, ctor: Ctor<T>): void;
    registerConstructorSingleton<T extends Host>(id: Id, ctor: Ctor<T>): void;
    registerFactory<T extends Dep>(id: Id, factory: Factory<T>): void;
    registerFactorySingleton<T extends Dep>(id: Id, factory: Factory<T>): void;
    registerAlias(id: Id, alias: Id): void;
    registerValue(id: Id, value: Dep): void;
}
