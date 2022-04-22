import { Dep } from '../interfaces';
import { ContainerLike } from '../container/container-like';


export interface ProducerLike<T extends Dep> {
	getInstance(): T;
	duplicate(container: ContainerLike): ProducerLike<T>;
}
