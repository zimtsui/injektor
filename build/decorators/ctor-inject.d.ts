import { Ctor, Dep, Id } from '../interfaces';
export declare function ctorInject(id: Id): (c: Ctor<Dep>, name: unknown, index: number) => void;
