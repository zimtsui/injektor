import assert = require('assert');
import { ContainerLike } from './container-like';
import { Unregistered } from '../exceptions';
import { FactoryInsideMultitionProducer } from '../producers/factory-inside-multition-producer';
import { ConstructorInsideMultitionProducer } from '../producers/constructor-inside-multition-producer';
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

	public constructor(parent: Container)
	public constructor()
	public constructor(parent?: Container) {
		if (typeof parent === 'undefined') return;
		for (const [id, producer] of parent.registry)
			this.registry.set(id, producer.duplicate(this));
	}

	public duplicate(): ContainerLike {
		return new Container(this);
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
}
