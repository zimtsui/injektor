import assert = require('assert');
import { ContainerLike } from './container-like';
import { Unregistered } from '../exceptions';
import { FactoryInsideMultitionProducer } from '../producers/factory-inside-multition-producer';
import { ConstructorInsideMultitionProducer } from '../producers/constructor-inside-multition-producer';
import { FactoryInsideSingletonProducer } from '../producers/factory-inside-singleton-producer';
import { ConstructorInsideSingletonProducer } from '../producers/constructor-inside-singleton-producer';
import { AliasProducer } from '../producers/alias-producer';
import { ValueProducer } from '../producers/value-producer';
import { ProducerLike } from '../producers/producer-like';
import {
	Id,
	Dep,
	Factory,
	Ctor,
	Host,
} from '../interfaces';


export class Container extends ContainerLike {
	private registry = new Map<Id, ProducerLike<Dep>>();

	public duplicate(): ContainerLike {
		const container = new Container();
		for (const [id, producer] of this.registry)
			container.registry.set(
				id,
				producer.duplicate(container),
			);
		return container;
	}

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
			new ConstructorInsideMultitionProducer(ctor, this),
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
			new FactoryInsideMultitionProducer(factory, this),
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

	public registerAlias(
		id: Id,
		alias: Id,
	): void {
		this.registry.set(
			id,
			new AliasProducer(alias, this),
		);
	}

	public registerValue(
		id: Id,
		value: Dep,
	): void {
		this.registry.set(
			id,
			new ValueProducer(value),
		);
	}
}
