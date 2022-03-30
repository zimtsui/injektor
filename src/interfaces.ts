export type Id = unknown;
export type Dependency = unknown;
export type Factory<T extends Dependency> = () => T;
export type Host = object;
export type Proto = object;
export type PropName = string | symbol;

export class NotInjected extends Error {
	public constructor(name: PropName) {
		if (typeof name === 'symbol')
			super(`Symbol property ${name.description} hasn't been injected.`);
		else
			super(`Property ${name} hasn't been injected.`);
	}
}

export class InjectionConflict extends Error {
	public constructor() {
		super('Injection may conflict with other injection.');
	}
}
