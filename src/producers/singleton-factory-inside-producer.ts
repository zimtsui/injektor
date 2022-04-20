import { SingletonProducer } from './singleton-producer';
import {
	Dep,
	Factory,
} from '../interfaces';
import { ContainerLike } from '../container/container-like';
import { FactoryInsideProducer } from './factory-inside-producer';


export class SingletonFactoryInsideProducer<T extends Dep> extends SingletonProducer<T> {
	public constructor(
		factory: Factory<T>,
		container: ContainerLike,
	) {
		const producer = new FactoryInsideProducer(
			factory,
			container,
		);
		super(producer);
	}
}
