import { type MultitionProducerLike } from './multition-producer-like.ts';
import { type Dep, type Host, type Factory } from '../interfaces.ts';
import { ContainerLike } from '../container/container-like.ts';
import { instantSetterInjector } from '../injectors/instant-setter-injector.ts';
import { lazySetterInjector } from '../injectors/lazy-setter-injection.ts';


export class FactoryInsideMultitionProducer<T extends Dep> implements MultitionProducerLike<T> {
	public constructor(
		private factory: Factory<T>,
		private container: ContainerLike,
	) { }

	public getInstance(): T {
		const instance = this.getInstanceWithoutSetterInjection();
		return this.setterInject(instance);
	}

	public getInstanceWithoutSetterInjection(): T {
		return this.factory();
	}

	public setterInject(instance: T): T {
		if (!isHost(instance)) return instance;
		instantSetterInjector.inject(instance, this.container);
		lazySetterInjector.inject(instance, this.container);
		return instance;
	}
}

function isHost(x: Dep): x is Host {
	return typeof x === 'object' && x !== null;
}
