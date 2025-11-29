import { type MultitionProducerLike } from './multition-producer-like.ts';
import { type Host, type Ctor } from '../interfaces.ts';
import { ContainerLike } from '../container/container-like.ts';
import { FactoryInsideMultitionProducer } from './factory-inside-multition-producer.ts';
import { constructorInjector } from '../injectors/constructor-injector.ts';


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
