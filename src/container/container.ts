import assert = require('assert');
import {
	ContainerLike,
	Unregistered,
} from './container-like';
import { MultitionFactoryInsideProducer } from '../producers/multition-factory-inside-producer';
import { MultitionConstructorInsideProducer } from '../producers/multition-constructor-inside-producer';
import { FactoryInsideSingletonProducer } from '../producers/factory-inside-singleton-producer';
import { ConstructorInsideSingletonProducer } from '../producers/constructor-inside-singleton-producer';
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
			new MultitionConstructorInsideProducer(ctor, this),
		);
	}

	public registerConstructorSingleton<T extends Host>(
		id: Id,
		ctor: Ctor<T>,
	): void {
		this.registry.set(
			id,
			new ConstructorInsideSingletonProducer(ctor, this),
		);
	}

	public registerFactory<T extends Dep>(
		id: Id,
		factory: Factory<T>,
	): void {
		this.registry.set(
			id,
			new MultitionFactoryInsideProducer(factory, this),
		);
	}

	public registerFactorySingleton<T extends Dep>(
		id: Id,
		factory: Factory<T>,
	): void {
		this.registry.set(
			id,
			new FactoryInsideSingletonProducer(factory, this),
		);
	}
}
