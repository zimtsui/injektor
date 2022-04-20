declare type Defined = number | string | symbol | object | null | bigint;
export declare type Id = Defined;
export declare type Dep = number | string | symbol | object | null | bigint;
export declare type Factory<T extends Dep> = () => T;
export declare type Ctor<T extends Dep> = new (...params: any[]) => T;
export declare type Host = object;
export declare type Proto = object;
export declare type PropName = number | string | symbol;
export {};
