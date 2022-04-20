import {
	Id,
	Host,
} from '../interfaces';
import { ContainerLike } from '../container/container-like';


export interface InjectorLike {
	decorator: (id: Id) => (...args: any[]) => void;
	inject<T extends Host>(
		injectable: any,
		container: ContainerLike,
	): T;
}
