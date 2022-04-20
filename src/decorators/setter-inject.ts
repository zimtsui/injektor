import { setterInjTab } from '../globals/setter-inj-tab';
import assert = require('assert');
import {
	Id,
	Proto,
	PropName,
	Dep,
} from '../interfaces';
import { NotInjected } from './exceptions';


export const setterInject = (id: Id) => (
	proto: Proto,
	name: PropName,
) => {
	const list = setterInjTab.get(proto) || [];
	list.push([name, id]);
	setterInjTab.set(proto, list);

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
