import test from 'ava';
import {
	Container,
	inject,
	lazyInject,
	instantInject,
	CircularConstructorInjection,
} from '../..';

interface ALike {
	b?: BLike;
}
const ALike = 'ALike';
interface BLike {
	a?: ALike;
}
const BLike = 'BLike';



test('setter injection', async t => {
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

	t.assert(a1.b);
	t.assert(a2.b);
	t.assert(a1.b !== a2.b);
});

test('setter injection singleton', async t => {
	const container = new Container();
	class A {
		@instantInject(BLike)
		public b!: BLike;
	}
	class B implements BLike { }

	container.registerConstructorSingleton(BLike, B);
	container.registerConstructor(ALike, A);
	const a1 = container.initiate<ALike>(ALike);
	const a2 = container.initiate<ALike>(ALike);

	t.assert(a1.b);
	t.assert(a2.b);
	t.assert(a1.b === a2.b);
});

test('constructor injection', async t => {
	const container = new Container();
	class A implements ALike {
		public constructor(
			@inject(BLike)
			public b: BLike,
		) { }
	}
	class B implements BLike { }

	container.registerConstructor(BLike, B);
	container.registerConstructor(ALike, A);
	const a1 = container.initiate<ALike>(ALike);
	const a2 = container.initiate<ALike>(ALike);

	t.assert(a1 !== a2);
	t.assert(a1.b);
	t.assert(a2.b);
	t.assert(a1.b !== a2.b);
});

test('constructor injection singleton', async t => {
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
	container.initiate<BLike>(BLike);
	const a1 = container.initiate<ALike>(ALike);
	const a2 = container.initiate<ALike>(ALike);

	t.assert(a1 !== a2);
	t.assert(a1.b);
	t.assert(a2.b);
	t.assert(a1.b === a2.b);
});

test('circular setter injection', async t => {
	const container = new Container();
	class A implements ALike {
		@instantInject(BLike)
		public b!: BLike;
	}
	class B implements BLike {
		@instantInject(ALike)
		public a!: ALike;
	}

	container.registerConstructorSingleton(ALike, A);
	container.registerConstructorSingleton(BLike, B);
	const a = container.initiate<ALike>(ALike);
	const b = container.initiate<BLike>(BLike);

	t.assert(a.b);
	t.assert(b.a);
	t.assert(a.b === b);
	t.assert(b.a === a);
});


test('circular lazy setter injection', async t => {
	const container = new Container();
	class A implements ALike {
		@lazyInject(BLike)
		public b!: BLike;
	}
	class B implements BLike {
		@lazyInject(ALike)
		public a!: ALike;
	}

	container.registerConstructorSingleton(ALike, A);
	container.registerConstructorSingleton(BLike, B);
	const a = container.initiate<ALike>(ALike);
	const b = container.initiate<BLike>(BLike);

	t.assert(a.b);
	t.assert(b.a);
	t.assert(a.b === b);
	t.assert(b.a === a);
});

test('circular constructor injection', async t => {
	const container = new Container();
	class A implements ALike {
		public constructor(
			@inject(BLike)
			public b: BLike,
		) { }
	}
	class B implements BLike {
		public constructor(
			@inject(ALike)
			public a: ALike,
		) { }
	}

	container.registerConstructorSingleton(ALike, A);
	container.registerConstructorSingleton(BLike, B);
	try {
		const a = container.initiate<ALike>(ALike);
		throw new Error('');
	} catch (err) {
		t.assert(err instanceof CircularConstructorInjection);
	}
});
