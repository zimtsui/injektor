import { NotSetterInjected, NotRegistered } from '../exceptions.ts';
import { type Id, type Dep, type Host, type PropName, type Proto } from '../interfaces.ts';
import assert from 'assert';
import { ContainerLike } from '../container/container-like.ts';


class LazySetterInjector {
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
						new NotSetterInjected(
							proto.constructor.name,
							`${id.description}`,
						),
					);
					const f = <(() => Dep) | undefined>container[id];
					assert(
						typeof f !== 'undefined',
						new NotRegistered(`${id.description}`),
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
