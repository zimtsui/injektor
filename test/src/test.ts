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
	class A implements ALike {
		@inject(BLike)
		public b!: BLike;
	}
	class B implements BLike {
	}

	container.register(ALike, () => new A());
	container.register(BLike, () => new B());
	const a = container.initiate<ALike>(ALike);
	assert(a.b);
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

	const sickA = new A();
	const sickB = new B();
	container.register(ALike, () => sickA);
	container.register(BLike, () => sickB);
	const a = container.initiate<ALike>(ALike);
	const b = container.inject<BLike>(sickB);
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

	const sickA = new A();
	const sickB = new B();
	container.register(ALike, () => sickA);
	container.register(BLike, () => sickB);
	const a = container.initiate<ALike>(ALike);
	const b = container.inject<BLike>(sickB);
	assert(a.b);
	assert(b.a);
	assert(a.b === b);
	assert(b.a === a);
});
