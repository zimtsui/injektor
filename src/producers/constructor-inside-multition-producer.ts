import { MultitionProducerLike } from './multition-producer-like';
import {
	Host,
	Ctor,
} from '../interfaces';
import { ContainerLike } from '../container/container-like';
import { FactoryInsideMultitionProducer } from './factory-inside-multition-producer';
import { constructorInjector } from '../injectors/constructor-injector';


export class ConstructorInsideMultitionProducer<T extends Host> implements MultitionProducerLike<T> {
	private factoryProducer: FactoryInsideMultitionProducer<T>;

	public constructor(
		private ctor: Ctor<T>,
		container: ContainerLike,
	) {
		this.factoryProducer = new FactoryInsideMultitionProducer(
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
