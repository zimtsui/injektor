import { Id, Host, Dependency, Factory } from './interfaces';
export declare const initiators: WeakMap<object, Container>;
export declare class Container {
    private factories;
    initiate<T extends Dependency>(id: Id): T;
    inject<T extends Host>(host: T): T;
    private injectLazyDeps;
    private injectInstantDeps;
    register<T extends Dependency>(id: Id, factory: Factory<T>): void;
}
export declare class Unregistered extends Error {
    constructor();
}
