export declare const instantInject: (id: symbol) => (proto: object, name: import("./injectors/injector-like").PropName) => void;
export declare const lazyInject: (id: symbol) => (proto: object, name: import("./injectors/injector-like").PropName) => void;
export declare const inject: (id: symbol) => (ctor: import("./interfaces").Ctor<object>, name: import("./injectors/injector-like").PropName, index: number) => void;
