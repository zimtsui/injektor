import { PropName } from './injectors/injector-like';


export class NotSetterInjected extends Error {
	public constructor(name: PropName) {
		if (typeof name === 'symbol')
			super(`Symbol property ${name.description} hasn't been injected.`);
		else
			super(`Property ${name} hasn't been injected.`);
	}
}

export class NotContructorInjected extends Error {
	public constructor(index: number) {
		let s = index.toString();
		if (s.endsWith('1')) s += 'st';
		else if (s.endsWith('2')) s += 'nd';
		else if (s.endsWith('3')) s += 'rd';
		else s += 'th';
		super(`The ${s} argument is not injected.`);
	}
}

export class Unregistered extends Error {
	public constructor() {
		super('Interface identifier is not registered.');
	}
}

export class CircularConstructorInjection extends Error {
	public constructor() {
		super('Circular constructor injection.');
	}
}
