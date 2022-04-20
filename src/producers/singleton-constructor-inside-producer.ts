import { SingletonProducer } from './singleton-producer';
import {
	Dep,
	Ctor,
} from '../interfaces';
import { ContainerLike } from '../container/container-like';
import { ConstructorInsideProducer } from './constructor-inside-producer';


export class SingletonConstructorInsideProducer<T extends Dep> extends SingletonProducer<T> {
	public constructor(
		ctor: Ctor<T>,
		container: ContainerLike,
	) {
		const producer = new ConstructorInsideProducer(
			ctor,
			container,
		);
		super(producer);
	}
}
