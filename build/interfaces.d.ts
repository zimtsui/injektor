export declare type Id = unknown;
export declare type Dependency = unknown;
export declare type Factory<T extends Dependency> = () => T;
export declare type Host = object;
export declare type Proto = object;
export declare type PropName = string | symbol;
export declare class NotInjected extends Error {
    constructor(name: PropName);
}
export declare class InjectionConflict extends Error {
    constructor();
}
