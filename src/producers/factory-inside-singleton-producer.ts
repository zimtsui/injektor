import { SingletonProducer } from './singleton-producer';
import {
	Dep,
	Factory,
} from '../interfaces';
import { ContainerLike } from '../container/container-like';
import { FactoryInsideMultitionProducer } from './factory-inside-multition-producer';


export class FactoryInsideSingletonProducer<T extends Dep> extends SingletonProducer<T> {
	private factory: Factory<T>;

	public constructor(
		factory: Factory<T>,
		container: ContainerLike,
	) {
		const producer = new FactoryInsideMultitionProducer(
			factory,
			container,
		);
		super(producer);
		this.factory = factory;
	}

	public duplicate(container: ContainerLike) {
		return new FactoryInsideSingletonProducer(
			this.factory,
			container,
		);
	}
}
