export type Id = unknown;
export type Dependency = unknown;
export type Factory<T extends Dependency> = () => T;
export type Host = object;
export type Proto = object;
export type PropName = string | symbol;
