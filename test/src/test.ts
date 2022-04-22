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

	container.registerConstructor(ALike, A);
	container.registerConstructorSingleton(BLike, B);
	const a1 = container.initiate<ALike>(ALike);
	const a2 = container.initiate<ALike>(ALike);

	t.assert(a1 !== a2);
	t.assert(a1.b);
	t.assert(a2.b);
	t.assert(a1.b === a2.b);
});

test('factory injection singleton', async t => {
	const container = new Container();
	class A implements ALike {
		public constructor(
			@inject(BLike)
			public b: BLike,
		) { }
	}
	class B implements BLike { }

	container.registerFactorySingleton(ALike, () => new A(
		container.initiate(BLike),
	));
	container.registerFactorySingleton(BLike, () => new B());
	const a1 = container.initiate<ALike>(ALike);
	const a2 = container.initiate<ALike>(ALike);

	t.assert(a1 === a2);
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

test('duplicate', async t => {
	const container1 = new Container();
	class A implements ALike {
		public constructor(
			@inject(BLike)
			public b: BLike,
		) { }
	}
	class B implements BLike { }

	container1.registerConstructor(ALike, A);
	container1.registerConstructorSingleton(BLike, B);

	const container2 = container1.duplicate();

	const c1a1 = container1.initiate<ALike>(ALike);
	const c1a2 = container1.initiate<ALike>(ALike);

	const c2a1 = container2.initiate<ALike>(ALike);
	const c2a2 = container2.initiate<ALike>(ALike);

	t.assert(c2a1 !== c2a2);
	t.assert(c1a1.b === c1a2.b);
	t.assert(c1a1.b !== c2a1.b);
});
