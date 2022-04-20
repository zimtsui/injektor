import assert = require('assert');
import { setterInjTab } from '../globals/setter-inj-tab';
import { injected } from '../globals/injected-set';
import {
	ContainerLike,
	Unregistered,
} from './container-like';
import {
	Registration,
	CtorReg,
	FactoryReg,
	CtorSingletonReg,
	FactorySingletonReg,
} from '../registration';
import {
	Id,
	Host,
	Dep,
	Factory,
	Proto,
	Ctor,
} from '../interfaces';


export const initiators = new WeakMap<Host, Container>();

export class Container implements ContainerLike {
	private registry = new Map<Id, Registration<Dep>>();

	public initiate<T extends Dep>(id: Id): T {
		const reg = <Registration<T> | undefined>this.registry.get(id);
		assert(
			typeof reg !== 'undefined',
			new Unregistered(),
		);
		return reg.getInstance();
	}

	public setterInject<T extends Host>(host: T): T {
		if (injected.has(host)) return host;
		injected.add(host);

		this.injectInstantDeps(host);
		this.injectLazyDeps(host);
		return host;
	}

	private injectLazyDeps<T extends Host>(host: T): void {
		initiators.set(host, this);
	}

	private injectInstantDeps<T extends Host>(
		host: T,
		proto: Proto | null = host.constructor.prototype,
	): void {
		if (proto === null) return;

		this.injectInstantDeps(
			host,
			Reflect.getPrototypeOf(proto),
		);

		const list = setterInjTab.get(proto);
		if (typeof list !== 'undefined')
			for (const [name, id] of list) {
				const value = this.initiate(id);
				Reflect.set(
					host,
					name,
					value,
				);
			}
	}

	public registerConstructor<T extends Dep>(
		id: Id,
		ctor: Ctor<T>,
	): void {
		this.registry.set(
			id,
			new CtorReg(ctor, this),
		);
	}

	public registerConstructorSingleton<T extends Dep>(
		id: Id,
		ctor: Ctor<T>,
	): void {
		this.registry.set(
			id,
			new CtorSingletonReg(ctor, this),
		);
	}

	public registerFactory<T extends Dep>(
		id: Id,
		factory: Factory<T>,
	): void {
		this.registry.set(
			id,
			new FactoryReg(factory, this),
		);
	}

	public registerFactorySingleton<T extends Dep>(
		id: Id,
		factory: Factory<T>,
	): void {
		this.registry.set(
			id,
			new FactorySingletonReg(factory, this),
		);
	}
}
