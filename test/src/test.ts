import test from 'ava';
import {
	BaseContainer,
	inject,
	lazyInject,
	instantInject,
	CircularConstructorInjection,
	NotContructorInjected
} from '../..';
import assert = require('assert');


namespace TYPES {
	export const ALike = Symbol();
	export const BLike = Symbol();
	export const ALikeAlias = Symbol();
}

interface ALike {
	b?: BLike;
}
interface BLike {
	a?: ALike;
}



test('setter injection', async t => {
	class Container extends BaseContainer {
		public [TYPES.ALike] = this.rc<ALike>(A);
		public [TYPES.BLike] = this.rc<BLike>(B);
	}

	class A {
		@instantInject(TYPES.BLike)
		public b!: BLike;
	}
	class B implements BLike { }

	const container = new Container();
	const a1 = container[TYPES.ALike]();
	const a2 = container[TYPES.ALike]();

	t.assert(a1.b);
	t.assert(a2.b);
	t.assert(a1.b !== a2.b);
});

test('setter injection singleton', async t => {
	class Container extends BaseContainer {
		public [TYPES.ALike] = this.rc<ALike>(A);
		public [TYPES.BLike] = this.rcs<BLike>(B);
	}
	class A {
		@instantInject(TYPES.BLike)
		public b!: BLike;
	}
	class B implements BLike { }

	const container = new Container();
	const a1 = container[TYPES.ALike]();
	const a2 = container[TYPES.ALike]();

	t.assert(a1.b);
	t.assert(a2.b);
	t.assert(a1.b === a2.b);
});

test('constructor injection', async t => {
	class Container extends BaseContainer {
		public [TYPES.ALike] = this.rc<ALike>(A);
		public [TYPES.BLike] = this.rc<BLike>(B);
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

	t.assert(a1 !== a2);
	t.assert(a1.b);
	t.assert(a2.b);
	t.assert(a1.b !== a2.b);
});

test('constructor injection singleton', async t => {
	class Container extends BaseContainer {
		public [TYPES.ALike] = this.rc<ALike>(A);
		public [TYPES.BLike] = this.rcs<BLike>(B);
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

	t.assert(a1 !== a2);
	t.assert(a1.b);
	t.assert(a2.b);
	t.assert(a1.b === a2.b);
});

test('factory injection singleton', async t => {
	class Container extends BaseContainer {
		public [TYPES.ALike] = this.rfs<ALike>(
			() => new A(
				this[TYPES.BLike](),
			),
		);
		public [TYPES.BLike] = this.rfs<BLike>(
			() => new B(),
		);
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

	t.assert(a1 === a2);
});

test('circular setter injection', async t => {
	class Container extends BaseContainer {
		public [TYPES.ALike] = this.rcs<ALike>(A);
		public [TYPES.BLike] = this.rcs<BLike>(B);
	}
	class A implements ALike {
		@instantInject(TYPES.BLike)
		public b!: BLike;
	}
	class B implements BLike {
		@instantInject(TYPES.ALike)
		public a!: ALike;
	}

	const container = new Container();
	const a = container[TYPES.ALike]();
	const b = container[TYPES.BLike]();

	t.assert(a.b);
	t.assert(b.a);
	t.assert(a.b === b);
	t.assert(b.a === a);
});


test('circular lazy setter injection', async t => {
	class Container extends BaseContainer {
		public [TYPES.ALike] = this.rcs<ALike>(A);
		public [TYPES.BLike] = this.rcs<BLike>(B);
	}
	class A implements ALike {
		@lazyInject(TYPES.BLike)
		public b!: BLike;
	}
	class B implements BLike {
		@lazyInject(TYPES.ALike)
		public a!: ALike;
	}

	const container = new Container();
	const a = container[TYPES.ALike]();
	const b = container[TYPES.BLike]();

	t.assert(a.b);
	t.assert(b.a);
	t.assert(a.b === b);
	t.assert(b.a === a);
});

test('circular constructor injection', async t => {
	class Container extends BaseContainer {
		public [TYPES.ALike] = this.rcs<ALike>(A);
		public [TYPES.BLike] = this.rcs<BLike>(B);
	}
	class A implements ALike {
		public constructor(
			@inject(TYPES.BLike)
			public b: BLike,
		) { }
	}
	class B implements BLike {
		public constructor(
			@inject(TYPES.ALike)
			public a: ALike,
		) { }
	}

	const container = new Container();
	try {
		const a = container[TYPES.ALike]();
		throw new Error('');
	} catch (err) {
		t.assert(err instanceof CircularConstructorInjection);
	}
});

test('duplicate', async t => {
	class Container extends BaseContainer {
		public [TYPES.ALike] = this.rc<ALike>(A);
		public [TYPES.BLike] = this.rcs<BLike>(B);
	}
	class A implements ALike {
		public constructor(
			@inject(TYPES.BLike)
			public b: BLike,
		) { }
	}
	class B implements BLike { }

	const container1 = new Container();
	const container2 = new Container();

	const c1a1 = container1[TYPES.ALike]();
	const c1a2 = container1[TYPES.ALike]();

	const c2a1 = container2[TYPES.ALike]();
	const c2a2 = container2[TYPES.ALike]();

	t.assert(c2a1 !== c2a2);
	t.assert(c1a1.b === c1a2.b);
	t.assert(c1a1.b !== c2a1.b);
});

test('alias', async t => {
	class Container extends BaseContainer {
		public [TYPES.ALike] = this.rcs<ALike>(A);
		public [TYPES.ALikeAlias] = () => this[TYPES.ALike]();
	}
	class A implements ALike { }
	interface ALikeAlias extends ALike { }

	const container = new Container();
	const a1 = container[TYPES.ALike]();
	const a2 = container[TYPES.ALikeAlias]();

	t.assert(a1 === a2);
});


test('abstract', async t => {
	abstract class AbstractContainer extends BaseContainer {
		public abstract [TYPES.ALike]: () => ALike;
	}
	class A implements ALike { }

	class Container extends AbstractContainer {
		public [TYPES.ALike] = this.rc<ALike>(A);
	}

	const container = new Container();
	const a1 = container[TYPES.ALike]();
});


test('args length', async t => {
	class Container extends BaseContainer {
		public [TYPES.ALike] = this.rc<ALike>(A);
		public [TYPES.BLike] = this.rc<BLike>(B);
	}
	class A implements ALike {
		public constructor(
			public b: BLike,
		) { }
	}
	class B implements BLike { }

	const container = new Container();
	assert.throws(
		() => container[TYPES.ALike](),
		NotContructorInjected,
	);
});
