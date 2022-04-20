export { Host, Dep, Ctor, Id, Factory, } from './interfaces';
export { Container } from './container/container';
export { Unregistered } from './container/container-like';
export { NotInjected } from './injectors/setter-injection-like';
export declare const instantInject: (id: string | number | bigint | symbol | object | null) => (proto: object, name: import("./injectors/injector-like").PropName) => void;
export declare const lazyInject: (id: string | number | bigint | symbol | object | null) => (proto: object, name: import("./injectors/injector-like").PropName) => void;
export declare const inject: (id: string | number | bigint | symbol | object | null) => (ctor: import("./interfaces").Ctor<object>, name: import("./injectors/injector-like").PropName, index: number) => void;
