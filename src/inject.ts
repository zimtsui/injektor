import { depLists } from './dep-lists';
import {
	Id,
	Proto,
	PropName,
} from './interfaces';

export const inject = (id: Id) => (
	proto: Proto,
	name: PropName,
) => {
	const list = depLists.get(proto) || [];
	list.push([name, id]);
	depLists.set(proto, list);
}
