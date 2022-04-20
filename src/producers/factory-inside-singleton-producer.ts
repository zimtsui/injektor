import { SingletonProducer } from './singleton-producer';
import {
	Dep,
	Factory,
} from '../interfaces';
import { ContainerLike } from '../container/container-like';
import { MultitionFactoryInsideProducer } from './multition-factory-inside-producer';


export class FactoryInsideSingletonProducer<T extends Dep> extends SingletonProducer<T> {
	public constructor(
		factory: Factory<T>,
		container: ContainerLike,
	) {
		const producer = new MultitionFactoryInsideProducer(
			factory,
			container,
		);
		super(producer);
	}
}
