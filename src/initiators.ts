import assert = require('assert');
import { depLists } from './dep-lists';
import {
	Id,
	Host,
	Dependency,
	Factory,
	Proto,
} from './interfaces';


export const initiators = new WeakMap<Host, Container>();

export class Container {
	private factories = new Map<Id, Factory<Dependency>>();

	public initiate<T extends Dependency>(id: Id): T {
		const factory = <(() => T) | undefined>
			this.factories.get(id);
		assert(
			typeof factory !== 'undefined',
			new Unregistered(),
		);
		return factory();
	}

	public inject<T extends Host>(host: T): T {
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

		const list = depLists.get(proto);
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

	public register<T extends Dependency>(
		id: Id,
		factory: Factory<T>,
	): void {
		this.factories.set(id, factory);
	}
}

export class Unregistered extends Error {
	public constructor() {
		super('Interface identifier is not registered.');
	}
}
