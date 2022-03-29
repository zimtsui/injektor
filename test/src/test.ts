import test from 'ava';
import assert = require('assert');
import {
	inject,
	lazyInject,
	Container,
} from '../..';

interface ALike {
	b?: BLike;
}
const ALike = {};
interface BLike {
	a?: ALike;
}
const BLike = {};



test('simple', async t => {
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
});

test('singleton', async t => {
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
});


test('circular', async t => {
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
});


test('lazy circular', async t => {
	const container = new Container();
	class A implements ALike {
		@lazyInject(BLike)
		public b!: BLike;
	}
	class B implements BLike {
		@lazyInject(ALike)
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
});
