import { SetterInjectorLike } from './setter-injection-like';
import { PropName, Id, Proto, Host } from '../interfaces';
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
