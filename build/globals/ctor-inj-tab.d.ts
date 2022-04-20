import { Ctor, Dep } from '../interfaces';
export declare const ctorInjTab: WeakMap<Ctor<Dep>, ((string | number | bigint | symbol | object | null) | undefined)[]>;
