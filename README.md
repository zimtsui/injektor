# Injektor

Injektor is a dependency SETTER injection framework.

- No implicit globals.
- Instant injection with circular dependency.
- Not dependent on experimental metadata reflection.

## Comparison

- Why not TSyringe

	TSyringe makes proxies for circular dependencies.
- Why not TypeDI

	TypeDI cannot make container instance, but makes only a global container.

- Why not InversifyJS

	InversifyJS cannot inject circular dependencies instantly, but can only do lazily.

## Basic usage

### Constructor injection

```ts
import assert = require('assert');
import {
	inject,
	Container,
} from 'injektor';
const container = new Container();

interface ALike {}
const ALike = {};
interface BLike {}
const BLike = {};

class A implements ALike {
	public constructor(
		@inject(BLike)
		public b: BLike,
	) {}
}
class B implements BLike { }

container.registerConstructor(ALike, A);
container.registerConstructor(BLike, B);

const a = container.initiate<ALike>(ALike);
```

### Instant setter injection

```ts
import assert = require('assert');
import {
	instantInject,
	Container,
} from 'injektor';
const container = new Container();

interface ALike {}
const ALike = {};
interface BLike {}
const BLike = {};

class A implements ALike {
	@instantInject(BLike)
	public b!: BLike;
}
class B implements BLike { }

container.registerConstructor(ALike, A);
container.registerConstructor(BLike, B);

const a = container.initiate<ALike>(ALike);
```

### Lazy setter injection

```ts
import assert = require('assert');
import {
	lazyInject,
	Container,
} from 'injektor';
const container = new Container();

interface ALike {}
const ALike = {};
interface BLike {}
const BLike = {};

class A implements ALike {
	@lazyInject(BLike)
	public b!: BLike;
}
class B implements BLike { }

container.registerConstructor(ALike, A);
container.registerConstructor(BLike, B);

const a = container.initiate<ALike>(ALike);
```

### Singleton

```ts
import assert = require('assert');
import {
	inject,
	Container,
} from 'injektor';

interface ALike {}
const ALike = {};

const container = new Container();
class A implements ALike { }

container.registerConstructorSingleton(ALike, A);
const a1 = container.initiate<ALike>(ALike);
const a2 = container.initiate<ALike>(ALike);

assert(a1 === a2);
```

### Circular Dependency

```ts
import assert = require('assert');
import {
	instantInject,
	Container,
} from 'injektor';

interface ALike {}
const ALike = {};
interface BLike {}
const BLike = {};

const container = new Container();
class A implements ALike {
	@instantInject(BLike)
	public b!: BLike;
}
class B implements BLike {
	@instantInject(ALike)
	public a!: ALike;
}

container.registerConstructor(ALike, A);
container.registerConstructor(BLike, B);

const a = container.initiate<ALike>(ALike);
const b = container.initiate<BLike>(BLike);

assert(a.b === b);
assert(b.a === a);
```

### Factory Dependency

```ts
import assert = require('assert');
import {
	inject,
	Container,
} from 'injektor';
const container = new Container();

interface ALike {}
const ALike = {};
interface BLike {}
const BLike = {};

class A implements ALike {
	public constructor(
		@inject(BLike)
		public b!: BLike,
	) { }
}
class B implements BLike { }

container.registerFactorySingleton(ALike, () => new A(
	container.initiate<BLike>(BLike),
));
container.registerFactorySingleton(BLike, () => new B());

const a = container.initiate<ALike>(ALike);
```
