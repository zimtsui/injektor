import { type ProducerLike } from './producer-like.ts';
import { type Dep } from '../interfaces.ts';


export class ValueProducer<T extends Dep> implements ProducerLike<T>{
	public constructor(
		private value: T,
	) { }

	public getInstance(): T {
		return this.value;
	}
}
