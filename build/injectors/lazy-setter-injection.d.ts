import { SetterInjectorLike } from './setter-injection-like';
import { Id, Host } from '../interfaces';
import { PropName, Proto } from './injector-like';
import { ContainerLike } from '../container/container-like';
export declare class LazySetterInjector implements SetterInjectorLike {
    private initiators;
    decorator: (id: Id) => (proto: Proto, name: PropName) => void;
    inject<T extends Host>(host: T, container: ContainerLike): T;
}
export declare const lazySetterInjector: LazySetterInjector;
