import { Id, Host, PropName, Proto } from '../interfaces';
import { ContainerLike } from '../container/container-like';
declare class InstantSetterInjector {
    private table;
    decorator: (id: Id) => (proto: Proto, name: PropName) => void;
    inject<T extends Host>(host: T, container: ContainerLike): T;
    private getMarks;
    private getMarksOnProto;
}
export declare type Marks = [PropName, Id][];
export declare const instantSetterInjector: InstantSetterInjector;
export {};
