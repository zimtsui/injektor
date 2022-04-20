import {
	PropName,
	Proto,
	Id,
} from '../interfaces';

export const setterInjTab = new WeakMap<Proto, [PropName, Id][]>();
