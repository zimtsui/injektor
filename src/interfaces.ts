export type Id = symbol;
export type Dep = unknown;
export type Factory<T extends Dep> = () => T;
export type Ctor<T extends Host> = new (...params: any[]) => T;
export type Host = object;
