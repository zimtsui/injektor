import {
	Ctor,
	Dep,
	Id,
} from '../interfaces';
import { ctorInjTab } from '../globals/ctor-inj-tab';

export function ctorInject(id: Id) {
	return function (
		c: Ctor<Dep>,
		name: unknown,
		index: number,
	) {
		const list = ctorInjTab.get(c) || [];
		list[index] = id;
		ctorInjTab.set(c, list);
	}
}
