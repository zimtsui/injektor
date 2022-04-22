import { ProducerLike } from './producer-like';
import { ContainerLike } from '../container/container-like';
import { Dep, Id } from '../interfaces';
export declare class AliasProducer<T extends Dep> implements ProducerLike<T> {
    private id;
    private container;
    constructor(id: Id, container: ContainerLike);
    getInstance(): T;
    duplicate(container: ContainerLike): AliasProducer<T>;
}
