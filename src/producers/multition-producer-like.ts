import { type Dep } from '../interfaces.ts';
import { type ProducerLike } from './producer-like.ts';

export interface MultitionProducerLike<T extends Dep> extends ProducerLike<T> {
	getInstance(): T;
	getInstanceWithoutSetterInjection(): T;
	setterInject(instance: T): T;
}
