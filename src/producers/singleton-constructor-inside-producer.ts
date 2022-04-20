import { SingletonProducer } from './singleton-producer';
import {
	Host,
	Ctor,
} from '../interfaces';
import { ContainerLike } from '../container/container-like';
import { MultitionConstructorInsideProducer } from './multition-constructor-inside-producer';


export class SingletonConstructorInsideProducer<T extends Host> extends SingletonProducer<T> {
	public constructor(
		ctor: Ctor<T>,
		container: ContainerLike,
	) {
		const producer = new MultitionConstructorInsideProducer(
			ctor,
			container,
		);
		super(producer);
	}
}
