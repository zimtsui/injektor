import {
	Id,
	Dep,
	Ctor,
} from '../interfaces';
import { ContainerLike } from '../container/container-like';
import assert = require('assert');
import { InjectorLike } from './injector-like';


export type Marks = (Id | undefined)[];

export class ConstructorInjector implements InjectorLike {
	private table = new WeakMap<Ctor<Dep>, Marks>();

	public decorator = (id: Id) => (
		ctor: Ctor<Dep>,
		name: unknown,
		index: number,
	) => {
		const marks = this.table.get(ctor) || [];
		marks[index] = id;
		this.table.set(ctor, marks);
	}

	public inject<T extends Dep>(
		ctor: Ctor<T>,
		container: ContainerLike,
	): T {
		const marks = this.getMarks(ctor);
		const deps = marks.map(id => {
			assert(typeof id !== 'undefined');
			return container.initiate(id);
		});
		return new ctor(...deps);
	}

	private getMarks(ctor: Ctor<Dep>): Marks {
		return this.table.get(ctor) || [];
	}
}

export const constructorInjector = new ConstructorInjector();
