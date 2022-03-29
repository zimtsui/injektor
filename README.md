# Injektor

Injektor is a non-intrusive IoC container and dependency SETTER injection framework.

- No implicit globals.
- No proxies, getters, setters, or any other hacking modifications being applied to your instance or the prototype chain.
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

### Simple

```ts
import assert = require('assert');
import {
	inject,
	Container,
} from 'injektor';

interface BLike {}
const BLike = {};

const container = new Container();
class A {
	@inject(BLike)
	public b!: BLike;
}
class B implements BLike { }

container.register(BLike, () => new B());
const a1 = container.inject(new A());
const a2 = container.inject(new A());

assert(a1.b);
assert(a2.b);
assert(a1.b !== a2.b);
```

### Singleton

```ts
import assert = require('assert');
import {
	inject,
	Container,
} from 'injektor';

interface BLike {}
const BLike = {};

const container = new Container();
class A {
	@inject(BLike)
	public b!: BLike;
}
class B implements BLike { }

const b = new B();
container.register(BLike, () => b);
const a1 = container.inject(new A());
const a2 = container.inject(new A());

assert(a1.b);
assert(a2.b);
assert(a1.b === a2.b);
```

### Circular Dependency

```ts
import assert = require('assert');
import {
	inject,
	Container,
} from 'injektor';

interface ALike {}
const ALike = {};
interface BLike {}
const BLike = {};

const container = new Container();
class A implements ALike {
	@inject(BLike)
	public b!: BLike;
}
class B implements BLike {
	@inject(ALike)
	public a!: ALike;
}

const a = new A();
const b = new B();
container.register(ALike, () => a);
container.register(BLike, () => b);
container.inject<ALike>(a);
container.inject<BLike>(b);

assert(a.b);
assert(b.a);
assert(a.b === b);
assert(b.a === a);
```
