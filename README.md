# Injektor

[![Npm package version](https://badgen.net/npm/v/@zimtsui/injektor)](https://www.npmjs.com/package/@zimtsui/injektor)

Injektor is a dependency injection framework for TypeScript.

- No implicit globals.
- Instant Setter injection with support for circular dependency.
- Independent of experimental [metadata reflection](https://github.com/rbuckton/reflect-metadata).
- Compile-time registration.

## Comparison

Why not [TSyringe](https://github.com/microsoft/tsyringe)

TSyringe makes proxies for circular dependencies, which is too hacking.

Why not [TypeDI](https://github.com/typestack/typedi)

TypeDI cannot make container instance, but makes only a global container.

Why not [InversifyJS](https://github.com/inversify/InversifyJS)

InversifyJS cannot inject circular dependencies instantly, but can only do lazily.

## Basic usage

### Constructor injection

```ts
import {
	BaseContainer,
	ContainerLike,
	inject,
} from '@zimtsui/injektor';

class TYPES {
	public static readonly ALike = Symbol();
	public static readonly BLike = Symbol();
}

interface ALike {
	b: BLike;
}
interface BLike { }

class A implements ALike {
	public constructor(
		@inject(TYPES.BLike)
		public b: BLike,
	) { }
}
class B implements BLike { }

class Container extends BaseContainer {
	public [TYPES.ALike] = this.registerConstructor<ALike>(A);
	public [TYPES.BLike] = this.registerConstructor<BLike>(B);
}

const container: ContainerLike = new Container();
const a1 = container[TYPES.ALike]();
const a2 = container[TYPES.ALike]();

t.assert(a1.b !== a2.b);
```

### Instant setter injection

```diff
	import {
		BaseContainer,
		ContainerLike,
-		inject,
+		instantInject,
	} from '@zimtsui/injektor';

	class TYPES {
		public static readonly ALike = Symbol();
		public static readonly BLike = Symbol();
	}

	interface ALike {
		b: BLike;
	}
	interface BLike { }

	class A implements ALike {
-		public constructor(
-			@inject(TYPES.BLike)
-			public b: BLike,
-		) { }
+		@instantInject(TYPES.BLike)
+		public b!: BLike;
	}
	class B implements BLike { }

	class Container extends BaseContainer {
		public [TYPES.ALike] = this.registerConstructor<ALike>(A);
		public [TYPES.BLike] = this.registerConstructor<BLike>(B);
	}

	const container: ContainerLike = new Container();
	const a1 = container[TYPES.ALike]();
	const a2 = container[TYPES.ALike]();

	t.assert(a1.b !== a2.b);
```

### Singleton

```diff
	import {
		BaseContainer,
		ContainerLike,
		instantInject,
	} from '@zimtsui/injektor';

	class TYPES {
		public static readonly ALike = Symbol();
		public static readonly BLike = Symbol();
	}

	interface ALike {
		b: BLike;
	}
	interface BLike { }

	class A implements ALike {
		@instantInject(TYPES.BLike)
		public b!: BLike;
	}
	class B implements BLike { }

	class Container extends BaseContainer {
-		public [TYPES.ALike] = this.registerConstructor<ALike>(A);
-		public [TYPES.BLike] = this.registerConstructor<BLike>(B);
+		public [TYPES.ALike] = this.registerConstructorSingleton<ALike>(A);
+		public [TYPES.BLike] = this.registerConstructorSingleton<BLike>(B);
	}

	const container: ContainerLike = new Container();
	const a1 = container[TYPES.ALike]();
	const a2 = container[TYPES.ALike]();

-	t.assert(a1.b !== a2.b);
+	t.assert(a1.b === a2.b);
```

### Circular Dependency

```diff
	import {
		BaseContainer,
		ContainerLike,
		instantInject,
	} from '@zimtsui/injektor';

	class TYPES {
		public static readonly ALike = Symbol();
		public static readonly BLike = Symbol();
	}

	interface ALike {
		b: BLike;
	}
-	interface BLike { }
+	interface BLike {
+		a: ALike;
+	}

	class A implements ALike {
		@instantInject(TYPES.BLike)
		public b!: BLike;
	}
-	class B implements BLike { }
+	class B implements BLike {
+		@instantInject(TYPES.ALike)
+		public a!: ALike;
+	}

	class Container extends BaseContainer {
		public [TYPES.ALike] = this.registerConstructorSingleton<ALike>(A);
		public [TYPES.BLike] = this.registerConstructorSingleton<BLike>(B);
	}

	const container: ContainerLike = new Container();
	const a1 = container[TYPES.ALike]();
	const a2 = container[TYPES.ALike]();

-	t.assert(a1.b === a2.b);
+	t.assert(a.b === b);
+	t.assert(b.a === a);
```

### Factory Dependency

```ts
class Container extends BaseContainer {
	public [TYPES.ALike] = this.registerFactory<ALike>(() => new A());
}
```

### Value Dependency

```ts
declare const a: ALike;

class Container extends BaseContainer {
	public [TYPES.ALike] = this.registerValue<ALike>(a);
}
```

### Alias

```ts
class TYPES {
	public static readonly ALike = Symbol();
	public static readonly ALikeAlias = Symbol();
}

class Container extends BaseContainer {
	public [TYPES.ALikeAlias] = () => this[TYPES.ALike]();
}
```

### Duplicating a container

Just new another one.

```ts
class Container extends BaseContainer { }
const c1: ContainerLike = new Container();
const c2: ContainerLike = new Container();
```

### extending a container

Just extend the parent container class.

```ts
class ParentContainer extends BaseContainer { }
class ChildContainer extends ParentContainer { }
```

### Abstract Dependency

The software architect can defer the determination of concrete dependencies until deployment.

```ts
abstract class AbstractContainer extends BaseContainer {
	public abstract [TYPES.ALike]: () => ALike;
}
```

### Integrity during circular injection

During circular injection, a singleton acquired from the container may haven't been fully injected yet.

```ts
import {
	BaseContainer,
	ContainerLike,
	instantInject,
} from '@zimtsui/injektor';

class TYPES {
	public static readonly ALike = Symbol();
	public static readonly BLike = Symbol();
}

interface ALike {
	b: BLike;
}
interface BLike {
	a: ALike;
}

class A implements ALike {
	@instantInject(TYPES.BLike)
	public b!: BLike;
}
class B implements BLike {
	@instantInject(TYPES.ALike)
	public a!: ALike;
}

class Container extends BaseContainer {
	public [TYPES.ALike] = this.registerConstructorSingleton<ALike>(A);
	public [TYPES.BLike] = this.registerFactorySingleton<BLike>(() => {
		const a = this[TYPES.ALike]();
		assert(a.b); // throws an exception that the property 'b' hasn't been injected into 'a'.
		return new B();
	});
}

const container: ContainerLike = new Container();
const a = container[TYPES.ALike]();
```

### Constructor injection for inherited construtors

`injextends()` decorator means injecting this class the same as its parent.

```diff
	class Container extends BaseContainer {
		public [TYPES.ALike] = this.rc<ALike>(AChild);
		public [TYPES.BLike] = this.rcs<BLike>(B);
	}
	class A implements ALike {
		public constructor(
			@inject(TYPES.BLike)
			public b: BLike,
		) { }
	}
-	class AChild extends A {
-		public constructor(
-			@inject(TYPES.BLike)
-			b: BLike,
-		) { super(b); }
-	}
+	@injextends()
+	class AChild extends A { }
	class B implements BLike { }

	const container = new Container();
	const a = container[TYPES.ALike]();

	t.assert(a.b);
```
