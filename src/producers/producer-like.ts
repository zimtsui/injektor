import { type Dep } from '../interfaces.ts';


export interface ProducerLike<T extends Dep> {
	getInstance(): T;
}
