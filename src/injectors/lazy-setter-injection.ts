import { SetterInjectorLike } from './setter-injection-like';
import { NotSetterInjected, NotRegistered } from '../exceptions';
import {
	Id,
	Dep,
	Host,
} from '../interfaces';
import {
	PropName,
	Proto,
} from './injector-like';
import assert = require('assert');
import { ContainerLike } from '../container/container-like';



export class LazySetterInjector implements SetterInjectorLike {
	private initiators = new WeakMap<Host, ContainerLike>();

	public decorator = (id: Id) => (
		proto: Proto,
		name: PropName,
	) => {
		const initiators = this.initiators;
		Reflect.defineProperty(
			proto,
			name,
			{
				configurable: true,
				enumerable: false,
				get(): Dep | undefined {
					const container = initiators.get(this);
					assert(
						typeof container !== 'undefined',
						new NotSetterInjected(id.description),
					);
					const f = <(() => Dep) | undefined>container[id];
					assert(
						typeof f !== 'undefined',
						new NotRegistered(id.description),
					);
					const value = f();
					Reflect.defineProperty(
						this,
						name,
						{
							value,
							enumerable: true,
							configurable: true,
							writable: true,
						},
					);
					return value;
				},
				set(value: Dep): void {
					Reflect.defineProperty(
						this,
						name,
						{
							value,
							enumerable: true,
							configurable: true,
							writable: true,
						},
					);
				},
			},
		);
	}

	public inject<T extends Host>(
		host: T,
		container: ContainerLike,
	): T {
		this.initiators.set(host, container);
		return host;
	}
}

export const lazySetterInjector = new LazySetterInjector();
