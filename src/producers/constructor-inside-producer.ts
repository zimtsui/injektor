import { MultitionProducerLike } from './multition-producer-like';
import {
	Host,
	Ctor,
} from '../interfaces';
import { ContainerLike } from '../container/container-like';
import { FactoryInsideProducer } from './factory-inside-producer';
import { constructorInjector } from '../injectors/constructor-injector';


export class ConstructorInsideProducer<T extends Host> implements MultitionProducerLike<T> {
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

	public getInstanceWithoutSetterInjection(): T {
		return this.factoryProducer.getInstanceWithoutSetterInjection();
	}

	public setterInject(instance: T): T {
		return this.factoryProducer.setterInject(instance);
	}
}
