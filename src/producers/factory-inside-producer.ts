import { Producer } from './producer-like';
import {
	Dep,
	Host,
	Factory,
} from '../interfaces';
import {
	ContainerLike,
} from '../container/container-like';
import { instantSetterInjector } from '../injectors/instant-setter-injector';


export class FactoryInsideProducer<T extends Dep> implements Producer<T> {
	public constructor(
		private factory: Factory<T>,
		private container: ContainerLike,
	) { }

	public getInstance(): T {
		const host = this.factory();
		if (!isHost(host)) return host;
		instantSetterInjector.inject(host, this.container);
		return host;
	}
}

function isHost(x: Dep): x is Host {
	return typeof x === 'object' && x !== null;
}
