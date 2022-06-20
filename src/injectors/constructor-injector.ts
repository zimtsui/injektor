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
		if (this.extending.has(ctor)) {
			const parent = <Ctor<T> | null>Reflect.getPrototypeOf(ctor);
			assert(
				parent !== null,
				new NotContructorInjected(),
			);
			return this.inject(
				parent,
				container,
			);
		}
		const marks = this.getMarks(ctor);
		const deps: unknown[] = [];
		for (let index = 0; index < ctor.length; index++) {
			const id = marks[index];
			assert(
				typeof id !== 'undefined',
				new NotContructorInjected(),
			);
			const f = <(() => Dep) | undefined>container[id];
			assert(
				typeof f !== 'undefined',
				new NotRegistered(),
			);
			deps.push(f());
		}
		return new ctor(...deps);
	}

	private getMarks(ctor: Ctor<Host>): Marks {
		return this.table.get(ctor) || [];
	}

	public injextends = () => (
		ctor: Ctor<Host>,
	) => {
		this.extending.add(ctor);
	}
}

export const constructorInjector = new ConstructorInjector();
