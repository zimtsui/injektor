import { SingletonProducer } from './singleton-producer';
import { Dep, Factory } from '../interfaces';
import { ContainerLike } from '../container/container-like';
export declare class SingletonFactoryInsideProducer<T extends Dep> extends SingletonProducer<T> {
    constructor(factory: Factory<T>, container: ContainerLike);
}
