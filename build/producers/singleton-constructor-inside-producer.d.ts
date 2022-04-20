import { SingletonProducer } from './singleton-producer';
import { Dep, Ctor } from '../interfaces';
import { ContainerLike } from '../container/container-like';
export declare class SingletonConstructorInsideProducer<T extends Dep> extends SingletonProducer<T> {
    constructor(ctor: Ctor<T>, container: ContainerLike);
}
