import { ProducerLike } from './producer-like';
import { Host, Ctor } from '../interfaces';
import { ContainerLike } from '../container/container-like';
export declare class ConstructorInsideProducer<T extends Host> implements ProducerLike<T> {
    private factoryProducer;
    constructor(ctor: Ctor<T>, container: ContainerLike);
    getInstance(): T;
}
