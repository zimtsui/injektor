import { ProducerLike } from './producer-like';
import { Dep } from '../interfaces';
export declare abstract class SingletonProducer<T extends Dep> implements ProducerLike<T> {
    private producer;
    private singleton?;
    constructor(producer: ProducerLike<T>);
    getInstance(): T;
}
