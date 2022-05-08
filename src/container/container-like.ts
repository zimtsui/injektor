import {
	Id,
	Dep,
	Factory,
	Ctor,
	Host,
} from '../interfaces';


export abstract class ContainerLike {
	[id: Id]: () => Dep;

	public abstract registerConstructor<T extends Host>(
		ctor: Ctor<T>,
	): () => T;
	public rc<T extends Host>(
		ctor: Ctor<T>,
	): () => T {
		return this.registerConstructor(ctor)
	}

	public abstract registerConstructorSingleton<T extends Host>(
		ctor: Ctor<T>,
	): () => T;
	public rcs<T extends Host>(
		ctor: Ctor<T>,
	): () => T {
		return this.registerConstructorSingleton(ctor);
	}

	public abstract registerFactory<T extends Dep>(
		factory: Factory<T>,
	): () => T;
	public rf<T extends Dep>(
		factory: Factory<T>,
	): () => T {
		return this.registerFactory(factory);
	}

	public abstract registerFactorySingleton<T extends Dep>(
		factory: Factory<T>,
	): () => T;
	public rfs<T extends Dep>(
		factory: Factory<T>,
	): () => T {
		return this.registerFactorySingleton(factory);
	}

	public abstract registerValue<T extends Dep>(
		value: T,
	): () => T;
	public rv<T extends Dep>(
		value: T,
	): () => T {
		return this.registerValue(value);
	}
}
