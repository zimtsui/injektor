import { ProducerLike } from './producer-like';
import { MultitionProducerLike } from './multition-producer-like';
import { Dep } from '../interfaces';


export abstract class SingletonProducer<T extends Dep> implements ProducerLike<T>{
	private singleton?: T;

	public constructor(
		private producer: MultitionProducerLike<T>,
	) { }

	public getInstance(): T {
		if (typeof this.singleton === 'undefined')
			this.singleton = this.producer.getInstanceWithoutSetterInjection();
		this.producer.setterInject(this.singleton);
		return this.singleton;
	}
}
