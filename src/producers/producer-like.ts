import { Dep } from '../interfaces';

export interface ProducerLike<T extends Dep> {
	getInstance(): T;
}
