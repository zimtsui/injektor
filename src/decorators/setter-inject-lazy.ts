import assert = require('assert');
import { initiators } from '../container/container';
import {
	PropName,
	Proto,
	Id,
	Dep,
} from '../interfaces';
import { NotInjected } from './exceptions';


export const setterInjectLazy = (id: Id) => (
	proto: Proto,
	name: PropName,
) => {
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
					new NotInjected(name),
				);
				const value = container.initiate(id);
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
