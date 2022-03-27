import { initiators } from './initiators';
import assert = require('assert');
import {
	PropName,
	Proto,
	Id,
	Dependency
} from './interfaces';


export const lazyInject = (id: Id) => (
	proto: Proto,
	name: PropName,
) => {
	Reflect.defineProperty(proto, name, {
		enumerable: false,
		get(): Dependency {
			const container = initiators.get(this);
			assert(typeof container !== 'undefined');
			const value = container.initiate(id);
			Reflect.defineProperty(
				this,
				name,
				{ value },
			);
			return value;
		},
		set(value: Dependency): void {
			Reflect.defineProperty(
				this,
				name,
				{ value },
			);
		},
	});
}
