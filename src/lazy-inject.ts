import { initiators } from './initiators';
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
		get(): Dependency | undefined {
			const container = initiators.get(this);
			if (typeof container === 'undefined')
				return undefined;
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
