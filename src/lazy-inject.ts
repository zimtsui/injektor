import assert = require('assert');
import { initiators } from './initiators';
import {
	PropName,
	Proto,
	Id,
	Dependency,
	NotInjected,
	InjectionConflict,
} from './interfaces';


export const lazyInject = (id: Id) => (
	proto: Proto,
	name: PropName,
) => {
	const oldDescriptor = Reflect.getOwnPropertyDescriptor(proto, name);
	assert(typeof oldDescriptor === 'undefined', new InjectionConflict());

	Reflect.defineProperty(
		proto,
		name,
		{
			configurable: true,
			enumerable: false,
			get(): Dependency | undefined {
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
			set(value: Dependency): void {
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
