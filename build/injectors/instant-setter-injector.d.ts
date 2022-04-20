import { SetterInjectorLike } from './setter-injection-like';
import { Id, Host } from '../interfaces';
import { PropName, Proto } from './injector-like';
import { ContainerLike } from '../container/container-like';
export declare class InstantSetterInjector implements SetterInjectorLike {
    private table;
    decorator: (id: Id) => (proto: Proto, name: PropName) => void;
    inject<T extends Host>(host: T, container: ContainerLike): T;
    private getMarks;
    private getMarksOnProto;
}
export declare type Marks = [PropName, Id][];
export declare const instantSetterInjector: InstantSetterInjector;
