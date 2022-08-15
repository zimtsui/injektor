import { Id, Host, Ctor, PropName } from '../interfaces';
import { ContainerLike } from '../container/container-like';
declare class ConstructorInjector {
    private table;
    private extending;
    decorator: (id: Id) => (ctor: Ctor<Host>, name: PropName, index: number) => void;
    inject<T extends Host>(ctor: Ctor<T>, container: ContainerLike): T;
    private getParamMap;
    private getRealCtor;
    injextends: () => (ctor: Ctor<Host>) => void;
}
export declare const constructorInjector: ConstructorInjector;
export {};
