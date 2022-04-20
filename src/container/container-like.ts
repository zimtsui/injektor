import assert = require('assert');
import { setterInjTab } from '../globals/setter-inj-tab';
import { injected } from '../globals/injected-set';
import {
	Id,
	Host,
	Dep,
	Factory,
	Ctor,
} from '../interfaces';


export interface ContainerLike {
	initiate<T extends Dep>(id: Id): T;

	setterInject<T extends Host>(host: T): T;

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
