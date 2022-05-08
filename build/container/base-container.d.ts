import { ContainerLike } from './container-like';
import { Dep, Factory, Ctor, Host } from '../interfaces';
export declare abstract class BaseContainer extends ContainerLike {
    registerConstructor<T extends Host>(ctor: Ctor<T>): () => T;
    registerConstructorSingleton<T extends Host>(ctor: Ctor<T>): () => T;
    registerFactory<T extends Dep>(factory: Factory<T>): () => T;
    registerFactorySingleton<T extends Dep>(factory: Factory<T>): () => T;
    registerValue<T extends Dep>(value: T): () => T;
}
