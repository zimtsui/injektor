# Injektor

Injektor is a dependency injection framework for TypeScript.

- No implicit globals.
- Instant Setter injection with support for circular dependency.
- Independent of experimental [metadata reflection](https://github.com/rbuckton/reflect-metadata).
- Compile-time check whether there are any declared type symbols forgotten to be registered with a constructor.

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
	inject,
} from '@zimtsui/injektor';

namespace TYPES {
	export const ALike = Symbol();
	export const BLike = Symbol();
}

interface ALike {
	b: BLike;
}
interface BLike { }

class Container extends BaseContainer {
	public [TYPES.ALike] = this.registerConstructor<ALike>(A);
	public [TYPES.BLike] = this.registerConstructor<BLike>(B);
}

class A implements ALike {
	public constructor(
		@inject(TYPES.BLike)
		public b: BLike,
	) { }
}
class B implements BLike { }

const container = new Container();
const a1 = container[TYPES.ALike]();
const a2 = container[TYPES.ALike]();

t.assert(a1.b !== a2.b);
```

### Instant setter injection

```diff
	import {
		BaseContainer,
-		inject,
+		instantInject,
	} from '@zimtsui/injektor';

	namespace TYPES {
		export const ALike = Symbol();
		export const BLike = Symbol();
	}

	interface ALike {
		b: BLike;
	}
	interface BLike { }

	class Container extends BaseContainer {
		public [TYPES.ALike] = this.registerConstructor<ALike>(A);
		public [TYPES.BLike] = this.registerConstructor<BLike>(B);
	}

	class A implements ALike {
-		public constructor(
-			@inject(TYPES.BLike)
-			public b: BLike,
-		) { }
+		@instantInject(TYPES.BLike)
+		public b!: BLike;
	}
	class B implements BLike { }

	const container = new Container();
	const a1 = container[TYPES.ALike]();
	const a2 = container[TYPES.ALike]();

	t.assert(a1.b !== a2.b);
```

### Singleton

```diff
	import {
		BaseContainer,
		instantInject,
	} from '@zimtsui/injektor';

	namespace TYPES {
		export const ALike = Symbol();
		export const BLike = Symbol();
	}

	interface ALike {
		b: BLike;
	}
	interface BLike { }

	class Container extends BaseContainer {
-		public [TYPES.ALike] = this.registerConstructor<ALike>(A);
-		public [TYPES.BLike] = this.registerConstructor<BLike>(B);
+		public [TYPES.ALike] = this.registerConstructorSingleton<ALike>(A);
+		public [TYPES.BLike] = this.registerConstructorSingleton<BLike>(B);
	}

	class A implements ALike {
		@instantInject(TYPES.BLike)
		public b!: BLike;
	}
	class B implements BLike { }

	const container = new Container();
	const a1 = container[TYPES.ALike]();
	const a2 = container[TYPES.ALike]();

-	t.assert(a1.b !== a2.b);
+	t.assert(a1.b === a2.b);
```

### Circular Dependency

```diff
	import {
		BaseContainer,
		instantInject,
	} from '@zimtsui/injektor';

	namespace TYPES {
		export const ALike = Symbol();
		export const BLike = Symbol();
	}

	interface ALike {
		b: BLike;
	}
-	interface BLike { }
+	interface BLike {
+		a: ALike;
+	}

	class Container extends BaseContainer {
		public [TYPES.ALike] = this.registerConstructorSingleton<ALike>(A);
		public [TYPES.BLike] = this.registerConstructorSingleton<BLike>(B);
	}

	class A implements ALike {
		@instantInject(TYPES.BLike)
		public b!: BLike;
	}
-	class B implements BLike { }
+	class B implements BLike {
+		@instantInject(TYPES.ALike)
+		public a!: ALike;
+	}

	const container = new Container();
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
namespace TYPES {
	export const ALike = Symbol();
	export const ALikeAlias = Symbol();
}

class Container extends BaseContainer {
	public [TYPES.ALikeAlias] = () => this[TYPES.ALike]();
}
```

### Duplicating a container

Just new another one.

```ts
class Container extends BaseContainer { }
const c1 = new Container();
const c2 = new Container();
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
