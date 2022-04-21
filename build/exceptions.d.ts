import { PropName } from './injectors/injector-like';
export declare class NotInjected extends Error {
    constructor(name: PropName);
}
export declare class Unregistered extends Error {
    constructor();
}
