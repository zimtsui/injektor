import {
	SetterInjectorLike,
	NotInjected,
} from './setter-injection-like';
import {
	PropName,
	Id,
	Proto,
	Dep,
	Host,
} from '../interfaces';
import { ContainerLike } from '../container/container-like';


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
					throw new NotInjected(name);
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
			const value = container.initiate(id);
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
			host.constructor.prototype,
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