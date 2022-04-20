import { ContainerLike } from './container-like';
import { Id, Host, Dep, Factory, Ctor } from '../interfaces';
export declare const initiators: WeakMap<object, Container>;
export declare class Container implements ContainerLike {
    private registry;
    initiate<T extends Dep>(id: Id): T;
    setterInject<T extends Host>(host: T): T;
    private injectLazyDeps;
    private injectInstantDeps;
    registerConstructor<T extends Dep>(id: Id, ctor: Ctor<T>): void;
    registerConstructorSingleton<T extends Dep>(id: Id, ctor: Ctor<T>): void;
    registerFactory<T extends Dep>(id: Id, factory: Factory<T>): void;
    registerFactorySingleton<T extends Dep>(id: Id, factory: Factory<T>): void;
}
