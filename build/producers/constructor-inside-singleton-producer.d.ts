import { SingletonProducer } from './singleton-producer';
import { Host, Ctor } from '../interfaces';
import { ContainerLike } from '../container/container-like';
export declare class ConstructorInsideSingletonProducer<T extends Host> extends SingletonProducer<T> {
    private ctor;
    constructor(ctor: Ctor<T>, container: ContainerLike);
    duplicate(container: ContainerLike): ConstructorInsideSingletonProducer<T>;
}
