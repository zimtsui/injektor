import { SingletonProducer } from './singleton-producer';
import { Host, Ctor } from '../interfaces';
import { ContainerLike } from '../container/container-like';
export declare class ConstructorInsideSingletonProducer<T extends Host> extends SingletonProducer<T> {
    constructor(ctor: Ctor<T>, container: ContainerLike);
}
