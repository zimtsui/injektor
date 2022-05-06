import { instantSetterInjector } from './injectors/instant-setter-injector';
export const instantInject = instantSetterInjector.decorator;

import { lazySetterInjector } from './injectors/lazy-setter-injection';
export const lazyInject = lazySetterInjector.decorator;

import { constructorInjector } from './injectors/constructor-injector';
export const inject = constructorInjector.decorator;
