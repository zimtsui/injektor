import { ProducerLike } from './producer-like';
import {
	Host,
	Ctor,
} from '../interfaces';
import { ContainerLike } from '../container/container-like';
import { FactoryInsideProducer } from './factory-inside-producer';
import { constructorInjector } from '../injectors/constructor-injector';


export class ConstructorInsideProducer<T extends Host> implements ProducerLike<T> {
	private factoryProducer: FactoryInsideProducer<T>;

	public constructor(
		ctor: Ctor<T>,
		container: ContainerLike,
	) {
		this.factoryProducer = new FactoryInsideProducer(
			() => constructorInjector.inject<T>(ctor, container),
			container,
		);
	}

	public getInstance(): T {
		return this.factoryProducer.getInstance();
	}
}
