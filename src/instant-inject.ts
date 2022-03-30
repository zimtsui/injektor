import { depLists } from './dep-lists';
import assert = require('assert');
import {
	Id,
	Proto,
	PropName,
	Dependency,
	NotInjected,
	InjectionConflict,
} from './interfaces';

export const inject = (id: Id) => (
	proto: Proto,
	name: PropName,
) => {
	const oldDescriptor = Reflect.getOwnPropertyDescriptor(proto, name);
	assert(
		typeof oldDescriptor === 'undefined',
		new InjectionConflict(),
	);

	const list = depLists.get(proto) || [];
	list.push([name, id]);
	depLists.set(proto, list);

	Reflect.defineProperty(
		proto,
		name,
		{
			configurable: true,
			enumerable: false,
			get(): never {
				throw new NotInjected(name);
			},
			set(value: Dependency): void {
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
