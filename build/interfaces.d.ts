export declare type Id = symbol;
export declare type Dep = unknown;
export declare type Factory<T extends Dep> = () => T;
export declare type Ctor<T extends Host> = new (...params: any[]) => T;
export declare type Host = object;
