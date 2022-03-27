import { Id, Host, Dependency, Factory } from './interfaces';
export declare const initiators: WeakMap<object, Container>;
export declare class Container {
    private factories;
    private isObject;
    initiate<T extends Dependency>(id: Id): T;
    inject<T extends Host>(host: T): T;
    private injectLazyDeps;
    private injectInstantDeps;
    register<T extends Dependency>(id: Id, factory: Factory<T>): void;
}
