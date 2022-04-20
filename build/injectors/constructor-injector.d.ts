import { Id, Dep, Ctor } from '../interfaces';
import { ContainerLike } from '../container/container-like';
export declare type Marks = (Id | undefined)[];
export declare class ConstructorInjector {
    private table;
    decorator: (id: Id) => (ctor: Ctor<Dep>, name: unknown, index: number) => void;
    inject<T extends Dep>(ctor: Ctor<T>, container: ContainerLike): T;
    private getMarks;
}
export declare const constructorInjector: ConstructorInjector;
