import { ProducerLike } from './producer-like';
import { ContainerLike } from '../container/container-like';
import {
	Dep,
	Id,
} from '../interfaces';


export class AliasProducer<T extends Dep> implements ProducerLike<T> {
	public constructor(
		private id: Id,
		private container: ContainerLike,
	) { }

	public getInstance(): T {
		return this.container.initiate<T>(this.id);
	}

	public duplicate(container: ContainerLike) {
		return new AliasProducer<T>(
			this.id,
			container,
		);
	}
}
