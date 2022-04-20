import { ProducerLike } from './producer-like';
import { Dep, Factory } from '../interfaces';
import { ContainerLike } from '../container/container-like';
export declare class FactoryInsideProducer<T extends Dep> implements ProducerLike<T> {
    private factory;
    private container;
    constructor(factory: Factory<T>, container: ContainerLike);
    getInstance(): T;
}
