import { MultitionProducerLike } from './multition-producer-like';
import {
	Host,
	Ctor,
} from '../interfaces';
import { ContainerLike } from '../container/container-like';
import { MultitionFactoryInsideProducer } from './multition-factory-inside-producer';
import { constructorInjector } from '../injectors/constructor-injector';


export class MultitionConstructorInsideProducer<T extends Host> implements MultitionProducerLike<T> {
	private factoryProducer: MultitionFactoryInsideProducer<T>;

	public constructor(
		ctor: Ctor<T>,
		container: ContainerLike,
	) {
		this.factoryProducer = new MultitionFactoryInsideProducer(
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
