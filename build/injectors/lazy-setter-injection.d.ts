import { SetterInjectorLike } from './setter-injection-like';
import { PropName, Id, Proto, Host } from '../interfaces';
import { ContainerLike } from '../container/container-like';
export declare class LazySetterInjector implements SetterInjectorLike {
    private initiators;
    decorator: (id: Id) => (proto: Proto, name: PropName) => void;
    inject<T extends Host>(host: T, container: ContainerLike): T;
}
export declare const lazySetterInjector: LazySetterInjector;
