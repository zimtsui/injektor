import { Dep, Factory, Ctor } from './interfaces';
import { ContainerLike } from './container/container-like';
export interface Registration<T extends Dep> {
    getInstance(): T;
}
export declare class FactoryReg<T extends Dep> implements Registration<T> {
    private factory;
    private container;
    constructor(factory: Factory<T>, container: ContainerLike);
    getInstance(): T;
}
export declare class CtorReg<T extends Dep> implements Registration<T> {
    private reg;
    constructor(ctor: Ctor<T>, container: ContainerLike);
    getInstance(): T;
}
export declare abstract class SingletonReg<T extends Dep> implements Registration<T> {
    private reg;
    private singleton?;
    constructor(reg: Registration<T>);
    getInstance(): T;
}
export declare class CtorSingletonReg<T extends Dep> extends SingletonReg<T> {
    constructor(ctor: Ctor<T>, container: ContainerLike);
}
export declare class FactorySingletonReg<T extends Dep> extends SingletonReg<T> {
    constructor(factory: Factory<T>, container: ContainerLike);
}
