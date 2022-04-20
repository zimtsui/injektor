import { ProducerLike } from './producer-like';
import { Dep } from '../interfaces';


export abstract class SingletonProducer<T extends Dep> implements ProducerLike<T>{
	private singleton?: T;

	public constructor(
		private producer: ProducerLike<T>,
	) { }

	public getInstance(): T {
		if (typeof this.singleton === 'undefined')
			this.singleton = this.producer.getInstance();
		return this.singleton;
	}
}
