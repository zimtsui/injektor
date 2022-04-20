import { Id, Host, Ctor } from '../interfaces';
import { PropName } from './injector-like';
import { ContainerLike } from '../container/container-like';
import { InjectorLike } from './injector-like';
export declare type Marks = (Id | undefined)[];
export declare class ConstructorInjector implements InjectorLike {
    private table;
    decorator: (id: Id) => (ctor: Ctor<Host>, name: PropName, index: number) => void;
    inject<T extends Host>(ctor: Ctor<T>, container: ContainerLike): T;
    private getMarks;
}
export declare const constructorInjector: ConstructorInjector;
