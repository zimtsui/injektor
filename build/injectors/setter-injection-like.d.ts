import { Id, Proto, PropName, Host } from '../interfaces';
import { ContainerLike } from '../container/container-like';
import { InjectorLike } from './injector-like';
export declare type Decorator = (id: Id) => (proto: Proto, name: PropName) => void;
export interface SetterInjectorLike extends InjectorLike {
    decorator: Decorator;
    inject<T extends Host>(host: T, container: ContainerLike): T;
}
export declare class NotInjected extends Error {
    constructor(name: PropName);
}
