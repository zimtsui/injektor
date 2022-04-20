import { Producer } from './producer-like';
import { Dep } from '../interfaces';
export declare abstract class SingletonProducer<T extends Dep> implements Producer<T> {
    private producer;
    private singleton?;
    constructor(producer: Producer<T>);
    getInstance(): T;
}
