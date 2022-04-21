import {
	Id,
	Host,
} from '../interfaces'
import {
	PropName,
	Proto,
} from './injector-like';
import { ContainerLike } from '../container/container-like';
import { InjectorLike } from './injector-like';


export type Decorator = (id: Id) => (
	proto: Proto,
	name: PropName,
) => void;

export interface SetterInjectorLike extends InjectorLike {
	decorator: Decorator;
	inject<T extends Host>(
		host: T,
		container: ContainerLike,
	): T;
}
