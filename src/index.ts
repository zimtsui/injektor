export {
	Host,
	Dep,
	Ctor,
	Id,
	Factory,
} from './interfaces';
export { Container } from './container/container';
export * from './exceptions';

import { instantSetterInjector } from './injectors/instant-setter-injector';
export const instantInject = instantSetterInjector.decorator;

import { lazySetterInjector } from './injectors/lazy-setter-injection';
export const lazyInject = lazySetterInjector.decorator;

import { constructorInjector } from './injectors/constructor-injector';
export const inject = constructorInjector.decorator;
