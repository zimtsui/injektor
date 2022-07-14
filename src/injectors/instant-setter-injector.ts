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
import { ContainerLike } from '../container/container-like';
import assert = require('assert');



export class InstantSetterInjector implements SetterInjectorLike {
	private table = new WeakMap<Proto, Marks>();

	public decorator = (id: Id) => (
		proto: Proto,
		name: PropName,
	) => {
		const marks = this.table.get(proto) || [];
		marks.push([name, id]);
		this.table.set(proto, marks);

		Reflect.defineProperty(
			proto,
			name,
			{
				configurable: true,
				enumerable: false,
				get(): never {
					throw new NotSetterInjected(id.description);
				},
				set(value: Dep): void {
					Reflect.defineProperty(
						this,
						name,
						{
							value,
							configurable: true,
							writable: true,
							enumerable: true,
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
		const marks = this.getMarks(host);
		for (const [name, id] of marks) {
			const f = <(() => Dep) | undefined>container[id];
			assert(
				typeof f !== 'undefined',
				new NotRegistered(id.description),
			);
			const value = f();
			Reflect.set(
				host,
				name,
				value,
			);
		}
		return host;
	}

	private getMarks(host: Host): Marks {
		return this.getMarksOnProto(
			host,
			Reflect.getPrototypeOf(host),
		);
	}

	private getMarksOnProto(
		host: Host,
		proto: Proto | null,
	): Marks {
		if (proto === null) return [];

		const marks = this.getMarksOnProto(
			host,
			Reflect.getPrototypeOf(proto),
		);

		const list = this.table.get(proto);
		if (typeof list !== 'undefined')
			return marks.concat(list);
		return marks;
	}
}

export type Marks = [PropName, Id][];

export const instantSetterInjector = new InstantSetterInjector();
