import {
	Id,
	Host,
	Ctor,
	Dep,
} from '../interfaces';
import { PropName } from './injector-like';
import { ContainerLike } from '../container/container-like';
import assert = require('assert');
import { InjectorLike } from './injector-like';
import { NotRegistered, NotContructorInjected } from '../exceptions';


export type Marks = (Id | undefined)[];

export class ConstructorInjector implements InjectorLike {
	private table = new WeakMap<Ctor<Host>, Marks>();
	private extending = new WeakSet<Ctor<Host>>();

	public decorator = (id: Id) => (
		ctor: Ctor<Host>,
		name: PropName,
		index: number,
	) => {
		const marks = this.table.get(ctor) || [];
		marks[index] = id;
		this.table.set(ctor, marks);
	}

	public inject<T extends Host>(
		ctor: Ctor<T>,
		container: ContainerLike,
	): T {
		const realCtor = this.getRealCtor(ctor);
		const arity = realCtor !== null ? realCtor.length : 0;
		const marks = this.getMarks(realCtor);
		const deps: unknown[] = [];
		for (let index = 0; index < arity; index++) {
			const id = marks[index];
			assert(
				typeof id !== 'undefined',
				new NotContructorInjected(
					ctor.name,
					`${index}`,
				),
			);
			const f = <(() => Dep) | undefined>container[id];
			assert(
				typeof f !== 'undefined',
				new NotRegistered(`${id.description}`),
			);
			deps.push(f());
		}
		return new ctor(...deps);
	}

	private getMarks(realCtor: Ctor<Host> | null): Marks {
		if (realCtor === null) return [];
		return this.table.get(realCtor) || [];
	}

	private getRealCtor(ctor: Ctor<Host> | null): Ctor<Host> | null {
		if (ctor === null) return ctor;
		if (!this.extending.has(ctor)) return ctor;
		return this.getRealCtor(<Ctor<Host> | null>Reflect.getPrototypeOf(ctor));
	}

	public injextends = () => (
		ctor: Ctor<Host>,
	) => {
		this.extending.add(ctor);
	}
}

export const constructorInjector = new ConstructorInjector();
