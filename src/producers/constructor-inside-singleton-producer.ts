import { SingletonProducer } from './singleton-producer.ts';
import { type Host, type Ctor } from '../interfaces.ts';
import { ContainerLike } from '../container/container-like.ts';
import { ConstructorInsideMultitionProducer } from './constructor-inside-multition-producer.ts';


export class ConstructorInsideSingletonProducer<T extends Host> extends SingletonProducer<T> {
	public constructor(
		ctor: Ctor<T>,
		container: ContainerLike,
	) {
		const producer = new ConstructorInsideMultitionProducer(
			ctor,
			container,
		);
		super(producer);
	}
}
