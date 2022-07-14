export class NotSetterInjected extends Error {
	public constructor(
		ctorName: string,
		propName: string,
	) {
		super(`${ctorName}'s prop #${propName}`);
	}
}
export class NotContructorInjected extends Error {
	public constructor(
		ctorName: string,
		paramIndex: string,
	) {
		super(`${ctorName}'s parameter #${paramIndex}`);
	}
}
export class NotRegistered extends Error {
	public constructor(idName: string) {
		super(`Id ${idName}`);
	}
}
export class CircularConstructorInjection extends Error { }
