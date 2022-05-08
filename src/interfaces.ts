type Defined = number | string | symbol | object | null | bigint;
export type Id = symbol;
export type Dep = Defined;
export type Factory<T extends Dep> = () => T;
export type Ctor<T extends Host> = new (...params: any[]) => T;
export type Host = object;
