import { SingletonProducer } from './singleton-producer';
import {
	Host,
	Ctor,
} from '../interfaces';
import { ContainerLike } from '../container/container-like';
import { ConstructorInsideMultitionProducer } from './constructor-inside-multition-producer';


export class ConstructorInsideSingletonProducer<T extends Host> extends SingletonProducer<T> {
	private ctor: Ctor<T>;
	public constructor(
		ctor: Ctor<T>,
		container: ContainerLike,
	) {
		const producer = new ConstructorInsideMultitionProducer(
			ctor,
			container,
		);
		super(producer);
		this.ctor = ctor;
	}

	public duplicate(container: ContainerLike) {
		return new ConstructorInsideSingletonProducer(
			this.ctor,
			container,
		);
	}
}
