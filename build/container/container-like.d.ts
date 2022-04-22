import { Id, Dep, Factory, Ctor, Host } from '../interfaces';
export declare abstract class ContainerLike {
    abstract duplicate(): ContainerLike;
    abstract initiate<T extends Dep>(id: Id): T;
    abstract registerConstructor<T extends Host>(id: Id, ctor: Ctor<T>): void;
    rc<T extends Host>(id: Id, ctor: Ctor<T>): void;
    abstract registerConstructorSingleton<T extends Host>(id: Id, ctor: Ctor<T>): void;
    rcs<T extends Host>(id: Id, ctor: Ctor<T>): void;
    abstract registerFactory<T extends Dep>(id: Id, factory: Factory<T>): void;
    rf<T extends Dep>(id: Id, factory: Factory<T>): void;
    abstract registerFactorySingleton<T extends Dep>(id: Id, factory: Factory<T>): void;
    rfs<T extends Dep>(id: Id, factory: Factory<T>): void;
    abstract registerAlias(id: Id, alias: Id): void;
    ra(id: Id, alias: Id): void;
}
