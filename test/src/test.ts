import test from 'ava';
import assert = require('assert');
import {
	Container,
	inject,
	lazyInject,
	instantInject,
} from '../..';

interface ALike {
	b?: BLike;
}
const ALike = {};
interface BLike {
	a?: ALike;
}
const BLike = {};



test('setter inj / ctor reg', async t => {
	const container = new Container();
	class A {
		@instantInject(BLike)
		public b!: BLike;
	}
	class B implements BLike { }

	container.registerConstructor(BLike, B);
	container.registerConstructor(ALike, A);
	const a1 = container.initiate<ALike>(ALike);
	const a2 = container.initiate<ALike>(ALike);

	assert(a1.b);
	assert(a2.b);
	assert(a1.b !== a2.b);
});

test('setter inj / ctor singleton reg', async t => {
	const container = new Container();
	class A {
		@instantInject(BLike)
		public b!: BLike;
	}
	class B implements BLike { }

	container.registerConstructorSingleton(BLike, B);
	container.registerConstructor(ALike, A);
	const a1 = container.initiate<ALike>(A);
	const a2 = container.initiate<ALike>(A);

	assert(a1.b);
	assert(a2.b);
	assert(a1.b === a2.b);
});

test('ctor inj', async t => {
	const container = new Container();
	class A implements ALike {
		public constructor(
			@inject(BLike)
			public b: BLike,
		) { }
	}
	class B implements BLike { }

	container.registerConstructorSingleton(BLike, B);
	container.registerConstructor(ALike, A);
	const a1 = container.initiate<ALike>(ALike);
	const a2 = container.initiate<ALike>(ALike);

	assert(a1 !== a2)
	assert(a1.b);
	assert(a2.b);
	assert(a1.b === a2.b);
});

test('circular', async t => {
	const container = new Container();
	class A implements ALike {
		@instantInject(BLike)
		public b!: BLike;
	}
	class B implements BLike {
		@instantInject(ALike)
		public a!: ALike;
	}

	const a = new A();
	const b = new B();
	container.registerFactory(ALike, () => a);
	container.registerFactory(BLike, () => b);
	container.initiate<ALike>(a);
	container.initiate<BLike>(b);

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
	container.registerFactory(ALike, () => a);
	container.registerFactory(BLike, () => b);
	container.initiate<ALike>(a);
	container.initiate<BLike>(b);
	assert(a.b);
	assert(b.a);
	assert(a.b === b);
	assert(b.a === a);
});
