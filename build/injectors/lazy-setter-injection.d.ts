import { Id, Host, PropName, Proto } from '../interfaces';
import { ContainerLike } from '../container/container-like';
declare class LazySetterInjector {
    private initiators;
    decorator: (id: Id) => (proto: Proto, name: PropName) => void;
    inject<T extends Host>(host: T, container: ContainerLike): T;
}
export declare const lazySetterInjector: LazySetterInjector;
export {};
