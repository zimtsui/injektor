import {
	Dep,
	Factory,
	Ctor,
	Host,
} from './interfaces'
import { ContainerLike } from './container/container-like';
import { ctorInjTab } from './globals/ctor-inj-tab';
import assert = require('assert');


export interface Registration<T extends Dep> {
	getInstance(): T;
}

function isHost(x: Dep): x is Host {
	return typeof x === 'object' && x !== null;
}


export class FactoryReg<T extends Dep> implements Registration<T> {
	public constructor(
		private factory: Factory<T>,
		private container: ContainerLike,
	) { }

	public getInstance(): T {
		const instance = this.factory();
		if (isHost(instance))
			this.container.setterInject(instance);
		return instance;
	}
}

export class CtorReg<T extends Dep> implements Registration<T> {
	private reg: FactoryReg<T>;

	public constructor(
		ctor: Ctor<T>,
		container: ContainerLike,
	) {
		this.reg = new FactoryReg(
			() => {
				const ids = ctorInjTab.get(ctor) || [];
				const deps = ids.map(id => {
					assert(typeof id !== 'undefined');
					return container.initiate(id);
				});
				return new ctor(...deps);
			}, container,
		);
	}

	public getInstance(): T {
		return this.reg.getInstance();
	}
}

export abstract class SingletonReg<T extends Dep> implements Registration<T>{
	private singleton?: T;

	public constructor(
		private reg: Registration<T>,
	) { }

	public getInstance(): T {
		if (typeof this.singleton === 'undefined')
			this.singleton = this.reg.getInstance();
		return this.singleton;
	}
}


export class CtorSingletonReg<T extends Dep> extends SingletonReg<T> {
	public constructor(
		ctor: Ctor<T>,
		container: ContainerLike,
	) {
		const reg = new CtorReg(
			ctor,
			container,
		);
		super(reg);
	}
}

export class FactorySingletonReg<T extends Dep> extends SingletonReg<T> {
	public constructor(
		factory: Factory<T>,
		container: ContainerLike,
	) {
		const reg = new FactoryReg(
			factory,
			container,
		);
		super(reg);
	}
}
