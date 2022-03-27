import {
	PropName,
	Proto,
	Id,
} from './interfaces';

export const depLists = new WeakMap<Proto, [PropName, Id][]>();
