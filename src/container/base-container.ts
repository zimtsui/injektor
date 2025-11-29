import { ContainerLike } from './container-like.ts';
import { FactoryInsideMultitionProducer } from '../producers/factory-inside-multition-producer.ts';
import { ConstructorInsideMultitionProducer } from '../producers/constructor-inside-multition-producer.ts';
import { FactoryInsideSingletonProducer } from '../producers/factory-inside-singleton-producer.ts';
import { ConstructorInsideSingletonProducer } from '../producers/constructor-inside-singleton-producer.ts';
import { ValueProducer } from '../producers/value-producer.ts';
import { type ProducerLike } from '../producers/producer-like.ts';
import { type Dep, type Factory, type Ctor, type Host } from '../interfaces.ts';


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
