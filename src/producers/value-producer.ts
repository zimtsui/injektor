import { ProducerLike } from './producer-like';
import { Dep } from '../interfaces';


export class ValueProducer<T extends Dep> implements ProducerLike<T>{
	public constructor(
		private value: T,
	) { }

	public getInstance(): T {
		return this.value;
	}

	public duplicate() {
		return new ValueProducer(this.value);
	}
}
