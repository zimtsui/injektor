import { MultitionProducerLike } from './multition-producer-like';
import { Dep, Factory } from '../interfaces';
import { ContainerLike } from '../container/container-like';
export declare class MultitionFactoryInsideProducer<T extends Dep> implements MultitionProducerLike<T> {
    private factory;
    private container;
    constructor(factory: Factory<T>, container: ContainerLike);
    getInstance(): T;
    getInstanceWithoutSetterInjection(): T;
    setterInject(instance: T): T;
}