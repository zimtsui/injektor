export declare const instantInject: (id: symbol) => (proto: object, name: import("./interfaces").PropName) => void;
export declare const lazyInject: (id: symbol) => (proto: object, name: import("./interfaces").PropName) => void;
export declare const inject: (id: symbol) => (ctor: import("./interfaces").Ctor<import("./interfaces").Host>, name: import("./interfaces").PropName, index: number) => void;
export declare const injextends: () => (ctor: import("./interfaces").Ctor<import("./interfaces").Host>) => void;
