import { ProducerLike } from './producer-like';
import { Dep } from '../interfaces';
export declare class ValueProducer<T extends Dep> implements ProducerLike<T> {
    private value;
    constructor(value: T);
    getInstance(): T;
    duplicate(): ValueProducer<T>;
}
