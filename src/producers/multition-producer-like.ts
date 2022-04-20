import { Dep } from '../interfaces';
import { ProducerLike } from './producer-like';

export interface MultitionProducerLike<T extends Dep> extends ProducerLike<T> {
	getInstance(): T;
	getInstanceWithoutSetterInjection(): T;
	setterInject(instance: T): T;
}
