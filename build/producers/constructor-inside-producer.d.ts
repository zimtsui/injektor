import { Producer } from './producer-like';
import { Dep, Ctor } from '../interfaces';
import { ContainerLike } from '../container/container-like';
export declare class ConstructorInsideProducer<T extends Dep> implements Producer<T> {
    private factoryProducer;
    constructor(ctor: Ctor<T>, container: ContainerLike);
    getInstance(): T;
}
