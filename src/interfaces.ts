type Defined = number | string | symbol | object | null | bigint;
export type Id = Defined;
export type Dep = number | string | symbol | object | null | bigint;
export type Factory<T extends Dep> = () => T;
export type Ctor<T extends Dep> = new (...params: any[]) => T;
export type Host = object;
export type Proto = object;
export type PropName = number | string | symbol;
