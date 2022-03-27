import assert = require('assert');
import { depLists } from './dep-lists';
import { injected } from './injected';
import {
	Id,
	Host,
	Dependency,
	Factory,
	Proto,
} from './interfaces';



export const initiators = new WeakMap<Host, Container>();

export class Container {
	private impls = new Map<Id, Factory<Dependency>>();

	public initiate(id: Id): Dependency {
		const factory = this.impls.get(id);
		assert(typeof factory !== 'undefined');
		const dep: Dependency = factory();
		if (
			typeof dep === 'object' &&
			dep !== null &&
			!injected.has(dep)
		)
			this.inject(dep);
		return dep;
	}

	public inject<T extends Host>(host: T): T {
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

		const list = depLists.get(proto);
		if (typeof list !== 'undefined')
			for (const [name, id] of list) {
				const value = this.initiate(id);
				Reflect.defineProperty(
					host,
					name,
					{ value },
				);
			}
	}

	public register<T extends Dependency>(
		id: Id,
		factory: Factory<T>,
	): void {
		this.impls.set(id, factory);
	}
}
