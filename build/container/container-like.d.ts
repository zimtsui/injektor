import { Id, Dep, Factory, Ctor, Host } from '../interfaces';
export declare abstract class ContainerLike {
    [id: Id]: () => Dep;
    abstract registerConstructor<T extends Host>(ctor: Ctor<T>): () => T;
    rc<T extends Host>(ctor: Ctor<T>): () => T;
    abstract registerConstructorSingleton<T extends Host>(ctor: Ctor<T>): () => T;
    rcs<T extends Host>(ctor: Ctor<T>): () => T;
    abstract registerFactory<T extends Dep>(factory: Factory<T>): () => T;
    rf<T extends Dep>(factory: Factory<T>): () => T;
    abstract registerFactorySingleton<T extends Dep>(factory: Factory<T>): () => T;
    rfs<T extends Dep>(factory: Factory<T>): () => T;
    abstract registerValue<T extends Dep>(value: T): () => T;
    rv<T extends Dep>(value: T): () => T;
}
