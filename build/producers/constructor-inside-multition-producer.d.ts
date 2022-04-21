import { MultitionProducerLike } from './multition-producer-like';
import { Host, Ctor } from '../interfaces';
import { ContainerLike } from '../container/container-like';
export declare class ConstructorInsideMultitionProducer<T extends Host> implements MultitionProducerLike<T> {
    private factoryProducer;
    constructor(ctor: Ctor<T>, container: ContainerLike);
    getInstance(): T;
    getInstanceWithoutSetterInjection(): T;
    setterInject(instance: T): T;
}
