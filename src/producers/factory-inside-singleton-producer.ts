import { SingletonProducer } from './singleton-producer.ts';
import { type Dep, type Factory } from '../interfaces.ts';
import { ContainerLike } from '../container/container-like.ts';
import { FactoryInsideMultitionProducer } from './factory-inside-multition-producer.ts';


export class FactoryInsideSingletonProducer<T extends Dep> extends SingletonProducer<T> {
	public constructor(
		factory: Factory<T>,
		container: ContainerLike,
	) {
		const producer = new FactoryInsideMultitionProducer(
			factory,
			container,
		);
		super(producer);
	}
}
