import { PropName } from '../interfaces';


export class NotInjected extends Error {
	public constructor(name: PropName) {
		if (typeof name === 'symbol')
			super(`Symbol property ${name.description} hasn't been injected.`);
		else
			super(`Property ${name} hasn't been injected.`);
	}
}
