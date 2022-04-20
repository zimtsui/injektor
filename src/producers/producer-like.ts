import { Dep } from '../interfaces';

export interface Producer<T extends Dep> {
	getInstance(): T;
}
