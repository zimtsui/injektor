import { ContainerLike } from './container-like';
import { FactoryInsideMultitionProducer } from '../producers/factory-inside-multition-producer';
import { ConstructorInsideMultitionProducer } from '../producers/constructor-inside-multition-producer';
import { FactoryInsideSingletonProducer } from '../producers/factory-inside-singleton-producer';
import { ConstructorInsideSingletonProducer } from '../producers/constructor-inside-singleton-producer';
import { ValueProducer } from '../producers/value-producer';
import { ProducerLike } from '../producers/producer-like';
import {
	Id,
	Dep,
	Factory,
	Ctor,
	Host,
} from '../interfaces';


export abstract class BaseContainer extends ContainerLike {
	public registerConstructor<T extends Host>(
		ctor: Ctor<T>,
	): () => T {
		const producer: ProducerLike<T> = new ConstructorInsideMultitionProducer(ctor, this);
		return () => producer.getInstance()
	}

	public registerConstructorSingleton<T extends Host>(
		ctor: Ctor<T>,
	): () => T {
		const producer: ProducerLike<T> = new ConstructorInsideSingletonProducer(ctor, this);
		return () => producer.getInstance()
	}

	public registerFactory<T extends Dep>(
		factory: Factory<T>,
	): () => T {
		const producer: ProducerLike<T> = new FactoryInsideMultitionProducer(factory, this);
		return () => producer.getInstance()
	}

	public registerFactorySingleton<T extends Dep>(
		factory: Factory<T>,
	): () => T {
		const producer: ProducerLike<T> = new FactoryInsideSingletonProducer(factory, this);
		return () => producer.getInstance()
	}

	public registerValue<T extends Dep>(
		value: T,
	): () => T {
		const producer: ProducerLike<T> = new ValueProducer(value);
		return () => producer.getInstance()
	}
}
