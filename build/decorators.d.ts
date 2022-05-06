export declare const instantInject: (id: string | number | bigint | symbol | object | null) => (proto: object, name: import("./injectors/injector-like").PropName) => void;
export declare const lazyInject: (id: string | number | bigint | symbol | object | null) => (proto: object, name: import("./injectors/injector-like").PropName) => void;
export declare const inject: (id: string | number | bigint | symbol | object | null) => (ctor: import("./interfaces").Ctor<object>, name: import("./injectors/injector-like").PropName, index: number) => void;
