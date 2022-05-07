import {
	Id,
	Dep,
	Factory,
	Ctor,
	Host,
} from '../interfaces';


export abstract class ContainerLike {
	public abstract duplicate(): ContainerLike;

	public abstract initiate<T extends Dep>(id: Id): T;
	public i<T extends Dep>(id: Id): T {
		return this.initiate<T>(id);
	}

	public abstract registerConstructor<T extends Host>(
		id: Id,
		ctor: Ctor<T>,
	): void;
	public rc<T extends Host>(
		id: Id,
		ctor: Ctor<T>,
	): void {
		return this.registerConstructor(id, ctor)
	}

	public abstract registerConstructorSingleton<T extends Host>(
		id: Id,
		ctor: Ctor<T>,
	): void;
	public rcs<T extends Host>(
		id: Id,
		ctor: Ctor<T>,
	): void {
		return this.registerConstructorSingleton(id, ctor);
	}

	public abstract registerFactory<T extends Dep>(
		id: Id,
		factory: Factory<T>,
	): void;
	public rf<T extends Dep>(
		id: Id,
		factory: Factory<T>,
	): void {
		return this.registerFactory(id, factory);
	}

	public abstract registerFactorySingleton<T extends Dep>(
		id: Id,
		factory: Factory<T>,
	): void;
	public rfs<T extends Dep>(
		id: Id,
		factory: Factory<T>,
	): void {
		return this.registerFactorySingleton(id, factory);
	}

	public abstract registerAlias(
		id: Id,
		alias: Id,
	): void;
	public ra(
		id: Id,
		alias: Id,
	): void {
		return this.registerAlias(id, alias);
	}

	public abstract registerValue<T extends Dep>(
		id: Id,
		value: T,
	): void;
	public rv<T extends Dep>(
		id: Id,
		value: T,
	): void {
		return this.registerValue(id, value);
	}
}
