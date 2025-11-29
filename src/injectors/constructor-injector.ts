import { type Id, type Host, type Ctor, type Dep, type PropName } from '../interfaces.ts';
import { ContainerLike } from '../container/container-like.ts';
import assert from 'assert';
import { NotRegistered, NotContructorInjected } from '../exceptions.ts';


type ParamMap = Map<number, Id>;

class ConstructorInjector {
	private table = new WeakMap<Ctor<Host>, ParamMap>();
	private extending = new WeakSet<Ctor<Host>>();

	public decorator = (id: Id) => (
		ctor: Ctor<Host>,
		name: PropName,
		index: number,
	) => {
		const paramMap: ParamMap = this.table.get(ctor) || new Map();
		paramMap.set(index, id);
		this.table.set(ctor, paramMap);
	}

	public inject<T extends Host>(
		ctor: Ctor<T>,
		container: ContainerLike,
	): T {
		const realCtor = this.getRealCtor(ctor);
		const arity = realCtor !== null ? realCtor.length : 0;
		const paramMap = this.getParamMap(realCtor);
		for (let index = 0; index < arity; index++)
			assert(
				paramMap.has(index),
				new NotContructorInjected(
					ctor.name,
					`${index}`,
				),
			);
		const deps: Dep[] = [...paramMap]
			.sort(([index1], [index2]) => index1 - index2)
			.slice(0, arity)
			.map(([index, id]) => {
				const f = <(() => Dep) | undefined>container[id];
				assert(
					typeof f !== 'undefined',
					new NotRegistered(`${id.description}`),
				);
				return f();
			});
		return new ctor(...deps);
	}

	private getParamMap(realCtor: Ctor<Host> | null): ParamMap {
		if (realCtor === null) return new Map();
		return this.table.get(realCtor) || new Map();
	}

	private getRealCtor(ctor: Ctor<Host> | null): Ctor<Host> | null {
		if (ctor === null) return ctor;
		if (!this.extending.has(ctor)) return ctor;
		return this.getRealCtor(<Ctor<Host> | null>Reflect.getPrototypeOf(ctor));
	}

	public injextends = () => (
		ctor: Ctor<Host>,
	) => {
		this.extending.add(ctor);
	}
}

export const constructorInjector = new ConstructorInjector();
