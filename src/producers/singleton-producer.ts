import { type ProducerLike } from './producer-like.ts';
import { type MultitionProducerLike } from './multition-producer-like.ts';
import { type Dep } from '../interfaces.ts';
import { CircularConstructorInjection } from '../exceptions.ts';
import assert from 'assert';


export abstract class SingletonProducer<T extends Dep> implements ProducerLike<T>{
	private singleton = new Nullable<T>();
	private locked = false;

	public constructor(
		private producer: MultitionProducerLike<T>,
	) { }

	public getInstance(): T {
		assert(!this.locked, new CircularConstructorInjection());
		this.locked = true;
		try {
			const singleton = this.singleton.getValue();
			this.locked = false;
			return singleton;
		} catch {
			const singleton = this.producer.getInstanceWithoutSetterInjection();
			this.singleton.setValue(singleton);
			this.locked = false;
			this.producer.setterInject(singleton);
			return singleton;
		}
	}
}

class Nullable<T> {
	private isNull = true;
	private value?: T;

	public getValue(): T {
		assert(!this.isNull);
		return this.value!;
	}

	public setValue(value: T) {
		this.isNull = false;
		this.value = value;
	}
}
