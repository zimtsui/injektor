import { ProducerLike } from './producer-like';
import { Dep, Ctor } from '../interfaces';
import { ContainerLike } from '../container/container-like';
export declare class ConstructorInsideProducer<T extends Dep> implements ProducerLike<T> {
    private factoryProducer;
    constructor(ctor: Ctor<T>, container: ContainerLike);
    getInstance(): T;
}
