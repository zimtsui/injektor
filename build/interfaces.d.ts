export declare type Id = symbol;
export declare type Dep = unknown;
export interface Factory<T extends Dep> {
    (): T;
}
export interface Ctor<T extends Host> {
    new (...params: any[]): T;
}
export interface Host {
}
export declare type Proto = object;
export declare type PropName = number | string | symbol;
