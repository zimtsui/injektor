export declare class NotSetterInjected extends Error {
    constructor(ctorName: string, propName: string);
}
export declare class NotContructorInjected extends Error {
    constructor(ctorName: string, paramIndex: string);
}
export declare class NotRegistered extends Error {
    constructor(idName: string);
}
export declare class CircularConstructorInjection extends Error {
}
