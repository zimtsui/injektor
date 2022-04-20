import {
	Id,
	Proto,
	PropName,
	Host,
} from '../interfaces'
import { ContainerLike } from '../container/container-like';


export type Decorator = (id: Id) => (
	proto: Proto,
	name: PropName,
) => void;

export interface SetterInjectorLike {
	decorator: Decorator;
	inject<T extends Host>(
		host: T,
		container: ContainerLike,
	): T;
}

export class NotInjected extends Error {
	public constructor(name: PropName) {
		if (typeof name === 'symbol')
			super(`Symbol property ${name.description} hasn't been injected.`);
		else
			super(`Property ${name} hasn't been injected.`);
	}
}
