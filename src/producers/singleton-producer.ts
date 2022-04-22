import { ProducerLike } from './producer-like';
import { MultitionProducerLike } from './multition-producer-like';
import { Dep } from '../interfaces';
import { CircularConstructorInjection } from '../exceptions';
import assert = require('assert');
import { ContainerLike } from '../container/container-like';


export abstract class SingletonProducer<T extends Dep> implements ProducerLike<T>{
	private singleton?: T;
	private locked = false;

	public constructor(
		private producer: MultitionProducerLike<T>,
	) { }

	public abstract duplicate(container: ContainerLike): SingletonProducer<T>;

	public getInstance(): T {
		if (typeof this.singleton === 'undefined') {
			assert(!this.locked, new CircularConstructorInjection());
			this.locked = true;
			this.singleton = this.producer.getInstanceWithoutSetterInjection();
			this.locked = false;
			this.producer.setterInject(this.singleton);
		}
		return this.singleton;
	}
}
