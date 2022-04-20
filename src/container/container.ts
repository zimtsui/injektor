import assert = require('assert');
import {
	ContainerLike,
	Unregistered,
} from './container-like';
import { FactoryInsideProducer } from '../producers/factory-inside-producer';
import { ConstructorInsideProducer } from '../producers/constructor-inside-producer';
import { SingletonFactoryInsideProducer } from '../producers/singleton-factory-inside-producer';
import { SingletonConstructorInsideProducer } from '../producers/singleton-constructor-inside-producer';
import { ProducerLike } from '../producers/producer-like';
import {
	Id,
	Dep,
	Factory,
	Ctor,
	Host,
} from '../interfaces';


export class Container implements ContainerLike {
	private registry = new Map<Id, ProducerLike<Dep>>();

	public initiate<T extends Dep>(id: Id): T {
		const producer = <ProducerLike<T> | undefined>this.registry.get(id);
		assert(
			typeof producer !== 'undefined',
			new Unregistered(),
		);
		return producer.getInstance();
	}

	public registerConstructor<T extends Host>(
		id: Id,
		ctor: Ctor<T>,
	): void {
		this.registry.set(
			id,
			new ConstructorInsideProducer(ctor, this),
		);
	}

	public registerConstructorSingleton<T extends Host>(
		id: Id,
		ctor: Ctor<T>,
	): void {
		this.registry.set(
			id,
			new SingletonConstructorInsideProducer(ctor, this),
		);
	}

	public registerFactory<T extends Dep>(
		id: Id,
		factory: Factory<T>,
	): void {
		this.registry.set(
			id,
			new FactoryInsideProducer(factory, this),
		);
	}

	public registerFactorySingleton<T extends Dep>(
		id: Id,
		factory: Factory<T>,
	): void {
		this.registry.set(
			id,
			new SingletonFactoryInsideProducer(factory, this),
		);
	}
}
