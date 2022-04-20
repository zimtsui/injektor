import { Id, Dep, Factory, Ctor, Host } from '../interfaces';
export interface ContainerLike {
    initiate<T extends Dep>(id: Id): T;
    registerConstructor<T extends Host>(id: Id, constructor: Ctor<T>): void;
    registerConstructorSingleton<T extends Host>(id: Id, constructor: Ctor<T>): void;
    registerFactory<T extends Dep>(id: Id, factory: Factory<T>): void;
    registerFactorySingleton<T extends Dep>(id: Id, factory: Factory<T>): void;
}
export declare class Unregistered extends Error {
    constructor();
}
