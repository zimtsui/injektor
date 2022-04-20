import {
	Ctor,
	Id,
	Dep,
} from '../interfaces';

export const ctorInjTab = new WeakMap<Ctor<Dep>, (Id | undefined)[]>();
