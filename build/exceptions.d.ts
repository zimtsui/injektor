import { PropName } from './injectors/injector-like';
export declare class NotSetterInjected extends Error {
    constructor(name: PropName);
}
export declare class NotContructorInjected extends Error {
    constructor(index: number);
}
export declare class Unregistered extends Error {
    constructor();
}
export declare class CircularConstructorInjection extends Error {
    constructor();
}
