import { ProducerLike } from './producer-like';
import { MultitionProducerLike } from './multition-producer-like';
import { Dep } from '../interfaces';
export declare abstract class SingletonProducer<T extends Dep> implements ProducerLike<T> {
    private producer;
    private singleton?;
    private locked;
    constructor(producer: MultitionProducerLike<T>);
    getInstance(): T;
}
