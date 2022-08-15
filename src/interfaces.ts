export type Id = symbol;
export type Dep = unknown;
export interface Factory<T extends Dep> {
	(): T;
}
export interface Ctor<T extends Host> {
	new(...params: any[]): T;
}
export interface Host { }
export type Proto = object;
export type PropName = number | string | symbol;
