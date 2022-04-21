import { PropName } from './injectors/injector-like';


export class NotInjected extends Error {
	public constructor(name: PropName) {
		if (typeof name === 'symbol')
			super(`Symbol property ${name.description} hasn't been injected.`);
		else
			super(`Property ${name} hasn't been injected.`);
	}
}

export class Unregistered extends Error {
	public constructor() {
		super('Interface identifier is not registered.');
	}
}
