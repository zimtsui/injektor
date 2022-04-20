import {
	Id,
	Dep,
	Factory,
	Ctor,
} from '../interfaces';


export interface ContainerLike {
	initiate<T extends Dep>(id: Id): T;

	registerConstructor<T extends Dep>(
		id: Id,
		constructor: Ctor<T>,
	): void;

	registerConstructorSingleton<T extends Dep>(
		id: Id,
		constructor: Ctor<T>,
	): void;

	registerFactory<T extends Dep>(
		id: Id,
		factory: Factory<T>,
	): void;

	registerFactorySingleton<T extends Dep>(
		id: Id,
		factory: Factory<T>,
	): void;
}

export class Unregistered extends Error {
	public constructor() {
		super('Interface identifier is not registered.');
	}
}
